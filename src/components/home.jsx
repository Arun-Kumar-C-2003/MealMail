"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useRandomMeals from "@/app/api/mealdb/recipeapi";
import { useSession } from "next-auth/react";

const categories = ["Veg", "Non-Veg", "Vegan"];
const ratings = ["Highest", "Average", "Lowest"];
const popularities = ["High", "Low", "New"];
const foodTypes = ["Chinese", "Indian", "Mexican", "Western", "Italian"];

export default function Home() {
  const { data: clientSession, status } = useSession();
  const router = useRouter();

  const [Category, setCategory] = useState("Category");
  const [Rating, setRating] = useState("Rating");
  const [Popularity, setPopularity] = useState("Popularity");
  const [FoodType, setFoodType] = useState("Food Type");

  const [openDropdown, setOpenDropdown] = useState(null);
  const [activePopoverId, setActivePopoverId] = useState(null);
  const [activeCommentPopoverId, setActiveCommentPopoverId] = useState(null);
  const popoverRefs = useRef({});

  const { meals, loading } = useRandomMeals();

  useEffect(() => {
    if (status !== "loading" && !clientSession) {
      router.push("/login");
    }
  }, [status, clientSession, router]);

  // Handle click outside dropdowns or popovers
  useEffect(() => {
    function handleClickOutside(e) {
      const openStoreId = activePopoverId;
      const openCommentId = activeCommentPopoverId;

      const storePop = popoverRefs.current[openStoreId];
      const commentPop = popoverRefs.current[openCommentId];

      const clickedOutsideStore = storePop && !storePop.contains(e.target);
      const clickedOutsideComment =
        commentPop && !commentPop.contains(e.target);

      if (openStoreId && clickedOutsideStore) setActivePopoverId(null);
      if (openCommentId && clickedOutsideComment)
        setActiveCommentPopoverId(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activePopoverId, activeCommentPopoverId]);

  const handleDropdownToggle = (menu) =>
    setOpenDropdown(openDropdown === menu ? null : menu);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="px-4 py-6">
      {/* Search + Filters */}
      <section className="mb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-start">
            <input
              type="search"
              placeholder="Search recipes, chefs, restaurants..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-start gap-2 mt-4">
            {/* Category */}
            <div className="relative">
              <button
                className="px-3 py-2 bg-orange-600 text-white rounded-md"
                onClick={() => handleDropdownToggle("category")}
              >
                {Category}
              </button>
              {openDropdown === "category" && (
                <ul className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {categories.map((c) => (
                    <li key={c}>
                      <button
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setCategory(c);
                          setOpenDropdown(null);
                        }}
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Rating */}
            <div className="relative">
              <button
                className="px-3 py-2 bg-orange-600 text-white rounded-md"
                onClick={() => handleDropdownToggle("rating")}
              >
                {Rating}
              </button>
              {openDropdown === "rating" && (
                <ul className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {ratings.map((r) => (
                    <li key={r}>
                      <button
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setRating(r);
                          setOpenDropdown(null);
                        }}
                      >
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Food Type */}
            <div className="relative">
              <button
                className="px-3 py-2 bg-orange-600 text-white rounded-md"
                onClick={() => handleDropdownToggle("food")}
              >
                {FoodType}
              </button>
              {openDropdown === "food" && (
                <ul className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {foodTypes.map((f) => (
                    <li key={f}>
                      <button
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setFoodType(f);
                          setOpenDropdown(null);
                        }}
                      >
                        {f}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Popularity */}
            <div className="relative">
              <button
                className="px-3 py-2 bg-orange-600 text-white rounded-md"
                onClick={() => handleDropdownToggle("popularity")}
              >
                {Popularity}
              </button>
              {openDropdown === "popularity" && (
                <ul className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {popularities.map((p) => (
                    <li key={p}>
                      <button
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setPopularity(p);
                          setOpenDropdown(null);
                        }}
                      >
                        {p}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Clear all */}
            <button
              className="ml-auto px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
              onClick={() => {
                setCategory("Category");
                setFoodType("Food Type");
                setPopularity("Popularity");
                setRating("Rating");
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      </section>

      {/* Cards */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.slice(0, 48).map((meal) => (
            <div
              key={meal.idMeal}
              ref={(el) => (popoverRefs.current[meal.idMeal] = el)}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                <div>

                <span className="mr-2">😶</span>
                <span className="text-gray-600 font-medium">UserName</span>
                </div>
                <span className="text-orange-600 cursor-pointer">Follow</span>
              </div>

              {/* Image */}
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-44 object-cover cursor-pointer"
                onClick={() => router.push(`/recipedetails?id=${meal.idMeal}`)}
              />

              {/* Actions */}
              <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button className="text-gray-700 hover:text-orange-600">❤️</button>
                  <button
                    onClick={() =>
                      setActiveCommentPopoverId(
                        activeCommentPopoverId === meal.idMeal
                          ? null
                          : meal.idMeal
                      )
                    }
                    className="text-gray-700 hover:text-orange-600"
                  >
                    💬
                  </button>
                  <button className="text-gray-700 hover:text-orange-600">🔗</button>
                </div>

                <button
                  onClick={() =>
                    setActivePopoverId(
                      activePopoverId === meal.idMeal ? null : meal.idMeal
                    )
                  }
                  className="text-gray-700 hover:text-orange-600"
                >
                  🏪
                </button>
              </div>

              {/* Popovers */}
              {activePopoverId === meal.idMeal && (
                <div className="absolute bg-white border border-gray-300 shadow-md rounded-md p-3 right-6 mt-2 z-20">
                  <p className="text-red-600 font-semibold mb-2">Order Now</p>
                  <div className="flex items-center justify-between border border-gray-200 rounded-md p-2">
                    <img
                      src="/images/cooking.jpg"
                      alt="store"
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <span
                      className="cursor-pointer font-medium"
                      onClick={() => router.push("/storeprofile")}
                    >
                      store-name
                    </span>
                    <button className="px-2 py-1 bg-orange-600 text-white rounded-md">
                      Order
                    </button>
                  </div>
                </div>
              )}

              {activeCommentPopoverId === meal.idMeal && (
                <form
                  onSubmit={handleSubmit}
                  className="absolute bg-white border border-gray-300 shadow-md rounded-md p-3 right-6 mt-2 z-20 flex flex-col space-y-2"
                >
                  <textarea
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Write your taste!!"
                    name="comment"
                  />
                  <button className="self-end px-3 py-1 bg-orange-600 text-white rounded-md">
                    Post
                  </button>
                </form>
              )}

              {/* Content */}
              <div className="px-4 py-3 flex flex-col flex-1">
                <p className="text-sm text-gray-600">
                  {Math.floor(Math.random() * 10000) + 1000} likes
                </p>
                <p className="font-semibold mt-1">
                  {meal.strMeal.length > 20
                    ? meal.strMeal.slice(0, 20) + "..."
                    : meal.strMeal}
                </p>
                <p className="text-sm text-gray-500 mt-auto">
                  View all comments
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
