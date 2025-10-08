"use client";
import { useState } from "react";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dietary, setDietary] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("dietary", dietary);
    formData.append("category", category);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    if (image) formData.append("image", image);

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Recipe created successfully!");
        setTitle("");
        setDescription("");
        setDietary("");
        setCategory("");
        setIngredients("");
        setInstructions("");
        setImage(null);
      } else {
        alert("Error creating recipe: " + result.error);
      }
    } catch (error) {
      alert("Failed to submit: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-6">Add Recipe</h3>

      <div className="flex flex-col gap-4">
        {/* Title */}
        <div>
          <label htmlFor="recipetitle" className="block font-medium mb-1">
            Recipe Title
          </label>
          <input
            required
            id="recipetitle"
            type="text"
            placeholder="e.g., Spicy Chicken Curry"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full md:w-1/2 border border-gray-400 rounded p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Briefly describe your recipe"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full md:w-1/2 border border-gray-400 rounded p-2"
          />
        </div>

        {/* Image Upload */}
        <div className="w-full md:w-1/2 border border-gray-400 rounded p-4">
          <h5 className="font-semibold mb-2">Upload Recipe Image</h5>
          <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
          <label
            htmlFor="imageUpload"
            className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700"
          >
            Browse
          </label>
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleImageUpload}
            className="hidden"
          />
          {image && (
            <p className="mt-2 text-green-600 text-sm">Selected: {image.name}</p>
          )}
        </div>

        {/* Dietary */}
        <div>
          <label htmlFor="dietary" className="block font-medium mb-1">
            Dietary Type
          </label>
          <select
            id="dietary"
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
            required
            className="w-full md:w-1/4 border border-gray-400 rounded p-2"
          >
            <option value="" disabled>Select type</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full md:w-1/4 border border-gray-400 rounded p-2"
          >
            <option value="" disabled>Select category</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        {/* Ingredients */}
        <div>
          <label className="block font-medium mb-1">Ingredients</label>
          <textarea
            placeholder="e.g., Chicken 400g, Oil 2tbsp"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full md:w-1/2 border border-gray-400 rounded p-2"
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="block font-medium mb-1">Instructions</label>
          <textarea
            placeholder="Step 1: Add spices and marinate. Step 2: Cook for 20 mins."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full md:w-1/2 border border-gray-400 rounded p-2"
          />
        </div>

        {/* Buttons: Preview + Submit */}
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Preview Recipe
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Publish Recipe
          </button>
        </div>

        {/* Buttons: Cancel + Save Draft */}
        <div className="flex flex-wrap gap-4 mt-4">
          <button
            type="button"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
          >
            Cancel
          </button>
          <button
            type="button"
            className="border border-gray-700 px-4 py-2 rounded text-gray-800 bg-white hover:bg-gray-100"
          >
            Save Draft
          </button>
        </div>
      </div>
    </form>
  );
}
