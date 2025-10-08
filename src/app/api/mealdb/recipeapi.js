  'use client';
import { useState, useEffect } from "react";



export default function useRandomMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const categoriesRes = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const categoriesData = await categoriesRes.json();
        const categories = categoriesData.categories;

        let allMeals = [];

        for (const category of categories) {
          const mealsRes = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`);
          const mealsData = await mealsRes.json();

          if (mealsData.meals) {
            allMeals = [...allMeals, ...mealsData.meals];
          }
        }

        const shuffled = allMeals.sort(() => 0.5 - Math.random());
        setMeals(shuffled);
      } catch (error) {
        console.error('Error fetching meals:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMeals();
  }, []);

  return { meals, loading };
}
