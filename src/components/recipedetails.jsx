"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "./home";

export default function RecipeDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchRecipe() {
  //     try {
  //       const res = await fetch(
  //         `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  //       );
  //       const data = await res.json();
  //       if (data.meals && data.meals.length > 0) {
  //         setRecipe(data.meals[0]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching recipe:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   if (id) {
  //     fetchRecipe();
  //   }
  // }, [id]);
  useEffect(() => {
    async function fetchRecipeById() {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        console.log("UseEffect called");
        const data = await response.json();
        if (data) {
          setRecipe(Array.isArray(data) ? data[0] : data);
        }
      } catch (error) {
        console.error(`Error in recipe details useEffect ${error}`);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchRecipeById();
  }, [id]);
  if (loading) return <Spinner />;
  // <p className="text-center mt-10 text-gray-600">Loading recipe...</p>;
  if (!recipe)
    return <p className="text-center mt-10 text-red-600">Recipe not found.</p>;

  const ingredients = recipe.ingredients
    ? recipe.ingredients.map((item) => `${item.quantity} ${item.name}`)
    : [];

  // for (let i = 1; i <= 20; i++) {
  //   const ingredient = recipe[`ingredients${i}`];
  //   const measure = recipe[`strMeasure${i}`];
  //   if (ingredient && ingredient.trim() !== "") {
  //     ingredients.push(`${measure} ${ingredient}`);
  //   }
  // }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {recipe.title}
      </h2>

      <div className="flex justify-center mb-8">
        <img
          src={recipe?.image?.url ?? "/images/cooking.jpg"}
          alt={recipe.title}
          className="rounded-xl shadow-md w-50 h-50 object-cover"
        />
      </div>

      <div className="text-gray-700 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc pl-6 space-y-1">
            {ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
          {/* <ol className="list-decimal pl-6 space-y-2">
            {recipe?.instructions?.map((step, idx)=>(
              <li key={idx}>{step}</li>
            ))}

          </ol> */}
          <p className="whitespace-pre-line leading-relaxed">
            {recipe.instructions}
          </p>

          {/* const instructions = recipe.instructions.filter(line => line.trim() !== ":"); */}
        </div>
      </div>
    </div>
  );
}
