'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function RecipeDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          setRecipe(data.meals[0]);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading recipe...</p>;
  if (!recipe) return <p className="text-center mt-10 text-red-600">Recipe not found.</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        {recipe.strMeal}
      </h2>

      <div className="flex justify-center mb-8">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="rounded-xl shadow-md w-64 h-auto object-cover"
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
          <p className="whitespace-pre-line leading-relaxed">
            {recipe.strInstructions}
          </p>
        </div>
      </div>
    </div>
  );
}
