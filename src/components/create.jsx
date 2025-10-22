"use client";
import { useState } from "react";
import { MenuDownArrowIcon, MenuUpArrowIcon, UploadIcon } from "./svgicons";
import ImageUploader from "./imageuploader";

export default function CreateRecipe() {
  const [cusineType, setCusineType] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [servings, setServings] = useState("");
  const [cookTime, setCookTime] = useState("");

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

  return (
    <>
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
        <ImageUploader />
        <h5 className="image-input font-medium mt-2">Recipe Details</h5>
        <p>Description & Story</p>
        <input
          type="text"
          placeholder="Tell the story behind this dish."
          className=" focus:ring-amber-500   w-full p-2  py-2 px-3 mt-1 outline outline-black/70 focus:outline-amber-500 rounded"
        />

        <div className="recipe-preferences mt-2 gap-2 flex flex-col md:flex-row">
          <div className="cusine-selection flex flex-col">
            <label htmlFor="cusineType">Cusine Type</label>
            <select
              name="cusine-type"
              id="cusineType"
              value={cusineType}
              onChange={(e) => setCusineType(e.target.value)}
              className=" transition-colors duration-100 ease-in-out   py-2 px-3 mt-1 outline outline-black/70 focus:outline-amber-500 rounded"
            >
              <option value="" disabled>
                Select Cusine...
              </option>
              {["Indian", "Italian", "Mexican", "Chinese", "Other"].map(
                (item, idx) => (
                  <option key={`cusine+${idx}`} value={`${item}`}>
                    {item}
                  </option>
                )
              )}
            </select>

            <div
              className={`transition-all duration-300 ease-in-out ${
                cusineType.toLowerCase() === "other"
                  ? "max-h-96 opacity-100 visible"
                  : "max-h-0 opacity-0 invisible"
              }`}
            >
              <label htmlFor="other-cusine">New Cuisine Type</label>
              <input
                id="other-cusine"
                type="text"
                placeholder="Enter your cuisine name"
                className="outline-2 outline-gray-300 bg-gray-50 focus:ring-amber-500 focus:outline-amber-500 mt-3 w-full p-2 rounded"
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
          {/* <div className="dietry-preferences">
            {["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo"].map((item,idx)=>(
                {item}
            ))}
          </div> */}
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
