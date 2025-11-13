"use client";
import { useState, useEffect, useRef } from "react";
import { TrashIcon } from "./svgicons";
import ImageUploader from "./imageuploader";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";

export default function CreateRecipe() {
  const options = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Keto",
    "Paleo",
    "Other",
  ];
  const [selected, setSelected] = useState("");
  const [otherType, setOtherType] = useState("");
  const [otherCuisine, setOtherCuisine] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cuisineType, setcuisineType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [servings, setServings] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [inputs, setInputs] = useState([""]);
  const [textInputs, setTextInputs] = useState([""]);
  const [images, setImages] = useState([]);

  const isAddingNewInput = useRef(false);
  const inputRefs = useRef([]);
  const textInputRefs = useRef([]);
  const router = useRouter();
  // const isFirstRender = useRef(true);

  // const handleImageUpload = (e) => {
  //   let file;
  //   for (i = 0; i < 5; i++) {
  //     file = e.target.files[i];
  //   }
  //   if (file) setImage(file);
  // };
  const compressionOptions = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    const cleanedIngredients = inputs
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [measure, ...rest] = item.split(" ");
        return { measure, name: rest.join(" ") };
      });

    const cleanedInstructions = textInputs
      .map((item) => item.trim())
      .filter(Boolean);

    const recipePayload = {
      title: title.trim(),
      description: description.trim(),
      cuisineType:
        cuisineType.toLowerCase() === "other" ? otherCuisine : cuisineType,
      difficulty,
      cookTime,
      servings,
      dietary: selected.toLowerCase() === "other" ? otherType : selected,
      ingredients: cleanedIngredients,
      instructions: cleanedInstructions,
      // likedBy: [],
      images: [],
    };

    // Upload images and collect URLs
    const uploadImage = async (file) => {
      let image = file;
      if (image.size > 0.5 * 1024 * 1024) {
        try {
          const compressedImage = await imageCompression(
            image,
            compressionOptions
          );
          image = compressedImage;
          // console.log(
          //   "compressedFile instanceof Blob",
          //   compressedImage instanceof Blob
          // ); // true
          // console.log(
          //   `compressedFile size ${compressedImage.size / 1024 / 1024} MB`
          // );
        } catch (error) {
          console.error("Error in image compression", error);
        }
      }
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
          try {
            const response = await fetch("/api/upload", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                file: reader.result,
                fileName: image.name,
              }),
            });

            const result = await response.json();
            resolve(result.url);
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = reject;
      });
    };

    try {
      const imageUrls = await Promise.all(images.map(uploadImage));
      recipePayload.images = imageUrls.map((url, index) => ({
        url,
        isCover: index === 0,
      }));

      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipePayload),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Recipe Created Successfully");
        router.push("/home");
      } else {
        alert("Error Creating recipe: " + result.error);
      }
    } catch (error) {
      console.error("Error in Create Page", error);
    }
  };

  // Handle images — can be single file, multiple files, or URLs
  // if (structImages && structImages.length > 0) {
  //   structImages.forEach((img, index) => {
  //     // If img is a File object (e.g. from <input type="file">)
  //     if (img instanceof File) {
  //       formData.append(`images`, img); // backend should handle as array
  //     } else {
  //       // If img is a URL or string, send it as JSON or text
  //       formData.append(`images`, img);
  //     }
  //   });
  // }

  const handleInputChange = (setter) => (e) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setter("");
    }
    const numberValue = parseFloat(inputValue);
    if (!isNaN(numberValue) && numberValue >= 1) {
      setter(inputValue);
    }
  };

  const addInputBar = (e) => {
    e.preventDefault();
    setInputs((prev) => [...prev, ""]); // add a new empty input
    isAddingNewInput.current = true;
  };

  const handleChange = (index, e) => {
    const newInputs = [...inputs];
    newInputs[index] = e.target.value;
    setInputs(newInputs);
  };

  const handleTextInputChange = (index, e) => {
    const newInputs = [...textInputs];
    newInputs[index] = e.target.value;
    setTextInputs(newInputs);
  };

  const addTextInput = (e) => {
    e.preventDefault();
    setTextInputs((prev) => [...prev, ""]);
  };

  const removeInput = (idx, e) => {
    e.preventDefault();
    if (inputs.length > 1) {
      const removeInputIndex = idx;
      const newInputs = inputs.filter((_, index) => index !== removeInputIndex);
      setInputs(newInputs);
    }
  };

  const removeTextInput = (idx, e) => {
    e.preventDefault();
    if (textInputs.length > 1) {
      const removeInputIndex = idx;
      const newInputs = textInputs.filter(
        (_, index) => index !== removeInputIndex
      );
      setTextInputs(newInputs);
    }
  };

  useEffect(() => {
    // If we are adding a new input, focus it
    if (isAddingNewInput.current && inputRefs.current.length > 0) {
      const lastInput = inputRefs.current[inputRefs.current.length - 1];
      if (lastInput) {
        lastInput.focus(); // Focus the newly added input
      }
      isAddingNewInput.current = false; // Reset the flag
    }
  }, [inputs]);

  useEffect(() => {
    // If we are adding a new input, focus it
    if (isAddingNewInput.current && textInputRefs.current.length > 0) {
      const lastInput = textInputRefs.current[textInputRefs.current.length - 1];
      if (lastInput) {
        lastInput.focus(); // Focus the newly added input
      }
      isAddingNewInput.current = false; // Reset the flag
    }
  }, [textInputs]);

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     // Skip focusing on the first render
  //     isFirstRender.current = false;
  //     return; // Don't focus on the input yet
  //   }

  //   if (textInputRefs.current.length > 0) {
  //     // Focus the last input after it's added
  //     const lastInput = textInputRefs.current[textInputRefs.current.length - 1];
  //     if (lastInput) lastInput.focus();
  //   }
  // }, [textInputs]);

  return (
    <>
      <div className="pt-16"></div>
      <div className="hero-div bg-amber-100 px-3 py-5 text-center">
        <h4 className="font-medium text-3xl">Create Your Recipe</h4>
        <p className="text-xs text-gray-500">
          Your next recipe could inspire thousands of foodies
        </p>
      </div>

      <form
        method="post"
        className="p-3 bg-none md:bg-white md:shadow-xl md:w-[75%] md:mx-auto md:p-10"
      >
        <h5 className="title font-medium">Recipe Title</h5>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Name your recipe..."
          className=" focus:ring-amber-500 w-full p-2 py-2 px-3 mt-1 outline outline-black/70 focus:outline-amber-500 rounded"
        />
        <h5 className="image-input font-medium mt-2">Recipe Images</h5>
        {/* <div className="p-5 flex items-center flex-col border-2 border-black/50 mt-2 border-dashed  hover:bg-orange-100 transition-colors cursor-pointer duration-150 ease-in  rounded">
          <UploadIcon clasname={`w-10 h-10 fill-gray-500 `} />
          <h5>Drag & drop your image here</h5>
          <p className="text-xs text-gray-700">
            or click to browse (JPG, PNG up to 5MB)
          </p>
          <button className="bg-amber-500 mt-2 px-3 text-white py-2 rounded-full">
            Choose Image
          </button>
        </div> */}
        <ImageUploader onChange={setImages} />
        <h5 className="image-input font-medium mt-2">Recipe Details</h5>
        <p>Description & Story</p>
        <textarea
          type="text"
          placeholder="Tell the story behind this dish."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=" focus:ring-amber-500   w-full p-2  py-2 px-3 mt-1 outline outline-black/70 focus:outline-amber-500 rounded"
        ></textarea>

        <div className="recipe-preferences mt-2 gap-2 flex flex-col md:flex-row">
          <div className="cuisine-selection flex flex-col">
            <label htmlFor="cuisineType">cuisine Type</label>
            <select
              name="cuisine-type"
              id="cuisineType"
              value={cuisineType}
              onChange={(e) => setcuisineType(e.target.value)}
              className=" transition-colors duration-100 ease-in-out   py-2 px-3 mt-1 outline outline-black/70 focus:outline-amber-500 rounded"
            >
              <option value="" disabled>
                Select cuisine...
              </option>
              {["Indian", "Italian", "Mexican", "Chinese", "Other"].map(
                (item, idx) => (
                  <option key={`cuisine+${idx}`} value={`${item}`}>
                    {item}
                  </option>
                )
              )}
            </select>

            <div
              className={`transform transition-all duration-300 ease-in-out origin-top ${
                cuisineType.toLowerCase() === "other"
                  ? "opacity-100 scale-100 translate-y-0 max-h-40"
                  : "opacity-0 scale-95 -translate-y-2 max-h-0 overflow-hidden"
              }`}
            >
              <label htmlFor="other-cuisine">New Cuisine Type</label>
              <input
                id="other-cuisine"
                type="text"
                value={otherCuisine}
                onChange={(e) => setOtherCuisine(e.target.value)}
                placeholder="Enter your cuisine name"
                className=" focus:ring-amber-500 w-full p-2  py-2 px-3 mt-1 outline outline-black/70 focus:outline-amber-500 rounded"
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="difficulty">Difficulty Level</label>
            <select
              name="difficulty"
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="py-2 px-3 mt-1 outline outline-black/70 focus:outline-amber-500 rounded"
            >
              <option value="" disabled>
                Select Difficulty
              </option>
              {["Easy", "Medium", "Hard"].map((item, idx) => (
                <option value={`${item}`} key={`difficulty+${idx}`}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* <div className="w-100 h-100 bg-red-500"></div> */}

        <div className="time-serve flex md:flex-row flex-col gap-2 mt-2">
          <div className="flex flex-col ">
            <label htmlFor="cook-time">Cook Time</label>
            <input
              type="number"
              value={cookTime}
              id="cook-time"
              onChange={handleInputChange(setCookTime)}
              placeholder="10 min"
              className="py-2 px-3 mt-1 outline outline-black/70 focus:outline-amber-500 rounded"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="servings">Servings</label>
            <input
              min={1}
              id="servings"
              type="number"
              value={servings}
              onChange={handleInputChange(setServings)}
              placeholder="4 Servings"
              className="py-2 px-3 mt-1 outline outline-black/70 focus:outline-amber-500 rounded"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <label className="mt-2">Dietary Preferences</label>

          <div className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                value={selected}
                onClick={() => setSelected(option)}
                className={`px-4 py-2 rounded-full border transition-all duration-200
              ${
                selected === option
                  ? "bg-amber-500 border-amber-500 text-white"
                  : "border-gray-400 text-gray-700 hover:border-amber-500"
              }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Smooth “Other” input field */}
          <div
            className={`transform transition-all duration-300 ease-in-out origin-top ${
              selected === "Other"
                ? "opacity-100 scale-100 translate-y-0 max-h-40"
                : "opacity-0 scale-95 -translate-y-2 max-h-0 overflow-hidden"
            }`}
          >
            <label htmlFor="other-preference" className="block mb-1">
              New Dietary Preference
            </label>
            <input
              id="other-preference"
              type="text"
              value={otherType}
              onChange={(e) => setOtherType(e.target.value)}
              placeholder="Enter your dietary type"
              className="w-full  outline outline-black/70 p-2 rounded focus:outline-amber-500 focus:ring-amber-500 "
            />
          </div>
        </div>
        <h5 className="mt-1 font-medium">Ingredients</h5>
        <div className="border rounded px-2 py-4 relative flex flex-col  gap-2 mt-2">
          <div className="flex flex-col gap-2">
            {inputs.map((value, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  ref={(el) => (inputRefs.current[idx] = el)}
                  key={idx}
                  type="text"
                  placeholder="Ingredient names..."
                  value={value}
                  onChange={(e) => handleChange(idx, e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addInputBar(e);
                    }
                  }}
                  className="w-full mb-1 outline p-2 rounded outline-black/70 focus:outline-amber-500"
                />
                <button onClick={(e) => removeInput(idx, e)}>
                  <TrashIcon classname="fill-amber-500  hover:bg-amber-500 bg-transparent rounded p-1 transition-colors duration-150 ease-in-out w-7 hover:fill-white aspect-square" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end mr-8">
            <button
              title="Add ingredient"
              className="bg-amber-500 outline-0 hover:bg-amber-400  rounded-lg px-2 py-1 text-center transition-colors duration-150 ease-in-out w-15 text-white"
              onClick={addInputBar}
            >
              {/* <AddIcon classname="fill-amber-500 absolute right-2  transform -translate-y-2   aspect-square  hover:bg-amber-500 bg-transparent rounded p-1 transition-colors duration-150 ease-in-out w-7 hover:fill-white " /> */}
              Add
            </button>
          </div>
        </div>
        <div>
          <h5 className="font-medium">Instructions</h5>
          <div>
            {textInputs.map((value, idx) => (
              <div key={idx} className="mt-2 flex gap-2">
                <div>
                  <span className="aspect-square w-7 flex justify-center  bg-amber-500 text-white  rounded-full">
                    {idx + 1}
                  </span>
                </div>
                <textarea
                  ref={(el) => (textInputRefs.current[idx] = el)}
                  type="text"
                  name="instruction"
                  id="instruction"
                  value={value}
                  placeholder="eg. Saute the vegges for 5 minutes."
                  className="outline p-2 focus:outline-amber-500 rounded w-full"
                  onChange={(e) => handleTextInputChange(idx, e)}
                  // onKeyDown={(e) => {
                  //   if (e.key === "Enter") {
                  //     e.preventDefault();
                  //     addTextInput(e);
                  //   }
                  // }}
                ></textarea>
                <button onClick={(e) => removeTextInput(idx, e)}>
                  <TrashIcon classname="fill-amber-500  hover:bg-amber-500 bg-transparent rounded p-1 transition-colors duration-150 ease-in-out w-7 hover:fill-white aspect-square" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-3 mr-8">
            <button
              title="Add ingredient"
              className="bg-amber-500 outline-0 hover:bg-amber-400  rounded-lg px-2 py-1 text-center transition-colors duration-150 ease-in-out w-15 text-white"
              onClick={(e) => {
                e.preventDefault();
                addTextInput(e);
              }}
            >
              {/* <AddIcon classname="fill-amber-500 absolute right-2  transform -translate-y-2   aspect-square  hover:bg-amber-500 bg-transparent rounded p-1 transition-colors duration-150 ease-in-out w-7 hover:fill-white " /> */}
              Add
            </button>
          </div>
        </div>
        <div className="flex mb-10 md:mb-0 mt-2 mx-auto gap-2 w-[75%] items-center justify-end">
          <input
            type="button"
            value="Cancel"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
            className="bg-stone-800 drop-shadow-md cursor-pointer p-2 rounded-full w-full text-white "
          />
          <input
            type="button"
            value="Publish"
            onClick={(e) => handlePublish(e)}
            className="bg-amber-500 drop-shadow-md p-2 rounded-full cursor-pointer w-full text-white "
          />
        </div>
        {/* <input type="number" name="value" id="value" min={1} className=" outline-2 focus:outline-black" /> */}
      </form>
    </>
  );
}

export const IncrementDecrementInput = () => {
  const [value, setValue] = useState(0);

  // Function to handle increment
  const increment = (e) => {
    e.preventDefault(); // Prevent default behavior (e.g., form submit or page reload)
    setValue((prevValue) => prevValue + 1);
  };

  // Function to handle decrement
  const decrement = (e) => {
    e.preventDefault(); // Prevent default behavior
    setValue((prevValue) => prevValue - 1);
  };

  // Function to handle input change (in case the user manually enters a value)
  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  return (
    <div>
      <button onClick={decrement} style={{ fontSize: "20px", margin: "5px" }}>
        ⬇
      </button>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min="0"
        style={{ width: "60px", textAlign: "center" }}
      />
      <button onClick={increment} style={{ fontSize: "20px", margin: "5px" }}>
        ⬆
      </button>
    </div>
  );
};

export const ServingsInput = () => {
  // State to hold the servings value
  const [servings, setServings] = useState(4);

  // Handle increment
  const increment = (e) => {
    e.preventDefault();
    setServings((prev) => prev + 1);
  };

  // Handle decrement
  const decrement = (e) => {
    e.preventDefault();
    setServings((prev) => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1
  };

  return (
    <div className="flex flex-col items-start">
      <label htmlFor="servings" className="font-medium mb-2">
        Servings
      </label>
      <div className="relative flex items-center">
        {/* Input Field */}
        <input
          type="number"
          id="servings"
          value={servings}
          onChange={(e) => setServings(Number(e.target.value))}
          className="w-20 text-center border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500 pr-10" // Added padding to make room for buttons
        />
        {/* Button Container */}
        {/* <div className="absolute right-0 top-0 flex flex-col justify-between h-full p-1">
          <button
            onClick={increment}
            className="w-4 h-4 bg-gray-300 text-black rounded-t hover:bg-gray-400 focus:outline-none"
          >
            <MenuUpArrowIcon/>
          </button>
          <button
            onClick={decrement}
            className="w-4 h-4 bg-gray-300 text-black rounded-b hover:bg-gray-400 focus:outline-none"
          >
            <MenuDownArrowIcon/>
          </button>
        </div> */}
      </div>
    </div>
  );
};
