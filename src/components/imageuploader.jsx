"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import {
  TrashIcon,
  PhotoIcon,
  MenuUpArrowIcon,
  MenuDownArrowIcon,
} from "./svgicons";

const MAX_FILES = 5;
const MAX_SIZE = 5 * 1024 * 1024;

const formatFileSize = (bytes) => {
  const megabytes = bytes / (1024 * 1024);
  return `${megabytes.toFixed(2)} MB`;
};

export default function ImageUploader() {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // Cleanup Object URLs
  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]); // ✅ FIXED: Added images dependency

  // --- Dropzone Logic ---
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
  // Handle rejections
  fileRejections.forEach(({ file, errors }) => {
    errors.forEach((err) => {
      if (err.code === "file-too-large" || file.size > MAX_SIZE) {
        alert(`File "${file.name}" is too large. Max size is ${formatFileSize(MAX_SIZE)}.`);
      } else if (err.code === "too-many-files") {
        alert(`Maximum of ${MAX_FILES} images allowed.`);
      } else if (err.code === "file-invalid-type") {
        alert(`File "${file.name}" is not an accepted image type.`);
      }
    });
  });

  setImages((prevImages) => {
    if (prevImages.length >= MAX_FILES) {
      alert(`Already at maximum of ${MAX_FILES} images allowed.`);
      return prevImages;
    }

    // ✅ FIX: Filter out files that are too large
    const validFiles = acceptedFiles.filter(file => file.size <= MAX_SIZE);
    
    // Alert for any files that were filtered out
    if (validFiles.length < acceptedFiles.length) {
      alert(`Some files were too large and were not added. Max size is ${formatFileSize(MAX_SIZE)}.`);
    }

    const filesToAdd = validFiles.slice(0, MAX_FILES - prevImages.length);
    const newImageFiles = filesToAdd.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: `${file.name}-${file.size}-${Date.now()}` // ✅ ADD UNIQUE ID
      })
    );

    return [...prevImages, ...newImageFiles];
  });
}, []); // ✅ FIXED: Removed images.length dependency// ✅ FIXED: Removed images.length dependency

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".gif", ".webp"] },
    maxFiles: MAX_FILES,
    maxSize: MAX_SIZE,
  });

  // --- Fixed Image Management Functions ---

  // ✅ FIXED: Remove image with proper event handling
  const handleRemoveImage = (imageId) => {
    return (e) => {
      e.preventDefault();
      e.stopPropagation(); // ✅ CRITICAL: Stop event bubbling
      
      setImages((prevImages) => {
        const imageToRemove = prevImages.find(img => img.id === imageId);
        if (imageToRemove) {
          URL.revokeObjectURL(imageToRemove.preview);
        }
        return prevImages.filter(img => img.id !== imageId);
      });
    };
  };

  // ✅ FIXED: Move image with proper event handling
  const handleMoveImage = (fromIndex, toIndex) => {
    return (e) => {
      e.preventDefault();
      e.stopPropagation(); // ✅ CRITICAL: Stop event bubbling
      
      if (toIndex < 0 || toIndex >= images.length) return;
      
      setImages((prevImages) => {
        const newImages = [...prevImages];
        const [movedImage] = newImages.splice(fromIndex, 1);
        newImages.splice(toIndex, 0, movedImage);
        return newImages;
      });
    };
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("draggedImageIndex", index.toString());
  };

  const handleDropImage = (e, targetIndex) => {
    e.preventDefault();
    const draggedIndexString = e.dataTransfer.getData("draggedImageIndex");
    if (!draggedIndexString) return;

    const draggedIndex = Number(draggedIndexString);
    if (draggedIndex === targetIndex) return;
    
    // ✅ FIXED: Call move function directly
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const [movedImage] = newImages.splice(draggedIndex, 1);
      newImages.splice(targetIndex, 0, movedImage);
      return newImages;
    });
  };

  const isCover = (index) => index === 0;

  // ✅ FIXED: Button click handler
  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation(); // ✅ CRITICAL: Stop event bubbling
    fileInputRef.current?.click();
  };

  // ✅ FIXED: File input change handler
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      // Create file objects with unique IDs
      const filesWithIds = fileArray.map(file => 
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: `${file.name}-${file.size}-${Date.now()}`
        })
      );
      onDrop(filesWithIds, []);
    }
    e.target.value = null;
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Dropzone Area */}
      <div
        {...getRootProps({
          className: `border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer 
            ${
              isDragActive
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-300 bg-gray-50 hover:border-gray-400"
            }`,
        })}
      >
        <input {...getInputProps()} />
        <PhotoIcon classname="mx-auto h-12 w-12 fill-gray-400" />
        <p className="mt-2 text-md text-gray-700">
          {isDragActive
            ? "Drop them like they're hot! 🔥"
            : "Drag and drop images here, or use the button below to select files."}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          (Up to {MAX_FILES} images, max {formatFileSize(MAX_SIZE)} each)
        </p>
      </div>

      {/* Separated Upload Button */}
      <div className="flex justify-center mt-4">
        <button
          type="button" // ✅ IMPORTANT: type="button" prevents form submission
          onClick={handleButtonClick}
          className="bg-amber-500 hover:bg-amber-600 px-6 text-white py-2 rounded-full shadow-md transition-colors"
        >
          Select Images
        </button>
      </div>

      {/* Hidden input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
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
                key={image.id} // ✅ FIXED: Use unique ID instead of index
                className="relative flex items-center p-4 border rounded-xl shadow-lg bg-white group hover:shadow-xl transition-shadow"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDropImage(e, index)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) =>
                  e.currentTarget.classList.add("border-indigo-400", "bg-indigo-50")
                }
                onDragLeave={(e) =>
                  e.currentTarget.classList.remove("border-indigo-400", "bg-indigo-50")
                }
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0 border border-gray-200">
                  <Image
                    src={image.preview}
                    alt={`Preview of ${image.name}`}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-md font-medium text-gray-900 truncate">
                    {image.name}
                  </p>
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
                        type="button" // ✅ IMPORTANT: type="button"
                        onClick={handleMoveImage(index, index - 1)}
                        className="p-1 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                        title="Move up (Make Cover)"
                      >
                        <MenuUpArrowIcon classname="h-4 w-4" />
                      </button>
                    )}
                    {index < images.length - 1 && (
                      <button
                        type="button" // ✅ IMPORTANT: type="button"
                        onClick={handleMoveImage(index, index + 1)}
                        className="p-1 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                        title="Move down"
                      >
                        <MenuDownArrowIcon classname="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    type="button" // ✅ IMPORTANT: type="button"
                    onClick={handleRemoveImage(image.id)}
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