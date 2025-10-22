'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
// Assuming the path to your SVG icons is correct
import { TrashIcon, PhotoIcon, MenuUpArrowIcon, MenuDownArrowIcon } from './svgicons';

const MAX_FILES = 5;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes

// Helper to format file size
const formatFileSize = (bytes) => {
  const megabytes = bytes / (1024 * 1024);
  return `${megabytes.toFixed(2)} MB`;
};

export default function ImageUploader() {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null); // Ref for the hidden file input

  // Function to clean up Object URLs when the component unmounts or images are replaced/removed
  useEffect(() => {
    // Cleanup function for when the component unmounts
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, []); // Empty dependency array means this runs only on mount/unmount


  // --- Dropzone Logic ---

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (images.length >= MAX_FILES) {
        alert(`Already at maximum of ${MAX_FILES} images allowed.`);
        return;
      }

      // Handle rejections before processing
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach((err) => {
          if (err.code === 'file-too-large' || file.size > MAX_SIZE) {
            alert(`File "${file.name}" is too large. Max size is ${formatFileSize(MAX_SIZE)}.`);
          } else if (err.code === 'too-many-files') {
            alert(`Maximum of ${MAX_FILES} images allowed.`);
          } else if (err.code === 'file-invalid-type') {
            alert(`File "${file.name}" is not an accepted image type.`);
          } else {
            alert(`File "${file.name}" had an error: ${err.message}`);
          }
        });
      });

      // Filter to respect the MAX_FILES limit for *new* additions
      const filesToAdd = acceptedFiles.slice(0, MAX_FILES - images.length);

      const newImageFiles = filesToAdd.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file), // Create a preview URL
        })
      );

      setImages((prevImages) => [...prevImages, ...newImageFiles]);
    },
    [images.length]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.webp'] }, // Use object for clearer accepted types
    maxFiles: MAX_FILES,
    maxSize: MAX_SIZE, // react-dropzone handles size rejection for us
    // We can rely on react-dropzone's onDrop/onDropRejected for alerts, but the custom logic in onDrop provides more specific control and prevents half-processing.
  });


  // --- Image Management Functions ---

  // Removing image from the list and cleaning up object URL
  const handleRemoveImage = (index) => {
    setImages((prevImages) => {
      const imageToRemove = prevImages[index];
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview); // Cleanup object URL
      }
      return prevImages.filter((_, i) => i !== index);
    });
  };

  // Moving image up or down in the list
  const handleMoveImage = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= images.length) return; // Bounds check
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('draggedImageIndex', index.toString()); // Use a distinct key and stringify
  };

  const handleDropImage = (e, targetIndex) => {
    e.preventDefault(); // Prevent default to stop a new window opening (for some browsers)
    const draggedIndexString = e.dataTransfer.getData('draggedImageIndex');
    if (!draggedIndexString) return;

    const draggedIndex = Number(draggedIndexString);

    if (draggedIndex === targetIndex) return; // Don't move if it's the same image
    handleMoveImage(draggedIndex, targetIndex);
  };

  const isCover = (index) => index === 0;

  // Manually trigger the hidden file input when the button is clicked
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Image Uploader 🖼️</h2>
      
      {/* The primary issue was putting the 'Upload Images' button inside the div 
        that had getRootProps. We've fixed this by separating them. 
      */}

      {/* Dropzone Area */}
      <div
        {...getRootProps({ 
          className: `border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer 
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400'}` 
        })}
      >
        <input {...getInputProps()} /> {/* Hidden input managed by useDropzone */}
        <PhotoIcon classname="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-md text-gray-700">
          {isDragActive
            ? 'Drop them like they\'re hot! 🔥'
            : 'Drag and drop images here, or use the button below to select files.'}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          (Up to {MAX_FILES} images, max {formatFileSize(MAX_SIZE)} each)
        </p>
      </div>
      
      {/* Separated Upload Button */}
      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={handleButtonClick} // Use the new handler to click the hidden input
          className="bg-amber-500 hover:bg-amber-600 px-6 text-white py-2 rounded-full font-medium shadow-md transition-colors"
        >
          Select Images
        </button>
      </div>

      {/* Hidden input to be triggered by the button click */}
      <input
        id="image-upload-input"
        ref={fileInputRef} // Attach the ref
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        // This onChange is no longer strictly necessary if we rely on the primary useDropzone input, 
        // but we'll include the logic to ensure files selected via this button are handled by onDrop.
        // The better fix is to ensure the button's click doesn't bubble up to getRootProps, 
        // which we've done by moving it out.
        onChange={(e) => {
          const files = e.target.files;
          if (files) onDrop(Array.from(files), []); // Manually call onDrop with the selected files
          e.target.value = null; // Clear input value to allow selecting the same file(s) again
        }}
      />


      {/* Uploaded Images List */}
      {images.length > 0 && (
        <>
          <hr className="my-6 border-gray-200" />
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            Uploaded Images ({images.length} / {MAX_FILES})
          </h3>
          <ul className="space-y-3">
            {images.map((image, index) => (
              <li
                key={index}
                className="relative flex items-center p-4 border rounded-xl shadow-lg bg-white group hover:shadow-xl transition-shadow"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDropImage(e, index)}
                onDragOver={(e) => e.preventDefault()} // Essential to allow a drop target
                // Optional: add a visual cue for drag targets
                onDragEnter={(e) => e.currentTarget.classList.add('border-indigo-400', 'bg-indigo-50')}
                onDragLeave={(e) => e.currentTarget.classList.remove('border-indigo-400', 'bg-indigo-50')}
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0 border border-gray-200">
                  <Image
                    src={image.preview}
                    alt={`Preview of ${image.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    // No need for an empty onLoad, it's unused
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-medium text-gray-900 truncate">{image.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(image.size)}
                  </p>
                </div>

                {/* Cover image indicator */}
                {isCover(index) && (
                  <span className="ml-4 px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded-full tracking-wider">
                    COVER
                  </span>
                )}

                <div className="ml-auto flex items-center space-x-2 opacity-100 transition-opacity">
                  {/* Reorder buttons */}
                  <div className="flex flex-col space-y-1">
                    {index > 0 && (
                      <button
                        onClick={() => handleMoveImage(index, index - 1)}
                        className="p-1 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up (Make Cover)"
                      >
                        <MenuUpArrowIcon classname="h-4 w-4" />
                      </button>
                    )}
                    {index < images.length - 1 && (
                      <button
                        onClick={() => handleMoveImage(index, index + 1)}
                        className="p-1 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <MenuDownArrowIcon classname="h-4 w-4" />
                      </button>
                    )}
                  </div>


                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="ml-4 p-2 rounded-full text-red-500 hover:bg-red-100 transition-colors"
                    title="Remove image"
                  >
                    <TrashIcon classname="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}