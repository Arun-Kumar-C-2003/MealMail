"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import useRandomMeals from "@/app/api/mealdb/recipeapi";
import { useSession } from "next-auth/react";
import {
  LikeFilledIcon,
  CommentIcon,
  StoreIcon,
  ShareIcon,
  ProfileRoundedIcon,
} from "./svgicons";
import CustomCarousel from "./carousel";

//Filters
// const categories = ["Veg", "Non-Veg", "Vegan"];
// const ratings = ["Highest", "Average", "Lowest"];
// const popularities = ["High", "Low", "New"];
// const foodTypes = ["Chinese", "Indian", "Mexican", "Western", "Italian"];

function Spinner() {
  return (
    <div className="w-6 mx-auto h-6 border-4 border-dashed rounded-full animate-spin border-orange-600"></div>
  );
}

export default function Home() {
  const { data: clientSession, status } = useSession();
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [activePopoverId, setActivePopoverId] = useState(null);
  const [activeCommentPopoverId, setActiveCommentPopoverId] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const popoverRefs = useRef({});

  useEffect(() => {
    async function getAllUserRecipes() {
      try {
        const response = await fetch("api/recipes/user_recipes");
        // src\app\api\recipes\user_recipes\route.js
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setRecipes(data);
          setTotalRecipes(data.length);
        } else {
          setRecipes([]);
          setTotalRecipes(0);
        }
      } catch (error) {
        console.error("Error in Home page getting user recipes:", error);
        setRecipes([]);
        setTotalRecipes(0);
      }
    }
    getAllUserRecipes();
  }, []);

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
    <>
      {/* <CustomCarousel /> */}
      <div
        className={`m-auto flex justify-center items-center h-screen ${
          status === "loading" ? "" : "hidden"
        }`}
      >
        <Spinner />
      </div>

      <section className={`${status === "loading" ? "hidden" : ""} mb-6 mx-2`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center">
            <input
              type="search"
              placeholder="Search recipes, chefs, restaurants..."
              className="w-full rounded-lg border-2 bg-gray-50 border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-orange-500"
            />
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto mb-3">
        <div className="grid mx-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.slice(0, totalRecipes).map((recipe) => (
            <div
              key={recipe._id}
              ref={(div) => (popoverRefs.current[recipe._id] = div)}
              className="bg-white border-2 shadow border-transparent hover:border-black hover:shadow-2xl rounded-lg overflow-hidden flex flex-col h-full transition-all duration-300 ease-in-out"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                <div className="flex">
                  <span className="mr-2 mt-0.5">
                    <ProfileRoundedIcon />
                  </span>
                  <span className="text-gray-600 font-medium">
                    {recipe?.user?.username ? recipe?.user?.username : "MealMail"}
                  </span>
                </div>
                <span className="text-orange-600 cursor-pointer">Follow</span>
              </div>
              {/* Recipe Image */}
              <img
                src={recipe?.image?.url || "/images/cooking.jpg"}
                alt={recipe.title}
                className="w-full h-44 object-cover cursor-pointer"
                onClick={() => router.push(`/recipedetails?id=${recipe._id}`)}
              />

              {/* Card Buttons */}
              <div className="flex justify-between items-center px-4 py-2 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <button className="text-gray-700 hover:text-orange-600">
                    <LikeFilledIcon classname="w-5 h-5 hover:cursor-pointer stroke-black stroke-2 fill-transparent hover:stroke-gray-600 active:fill-orange-600 active:stroke-none" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveCommentPopoverId(
                        activeCommentPopoverId === recipe._id
                          ? null
                          : recipe._id
                      )
                    }
                  >
                    <CommentIcon
                      classname={`w-5 h-5 hover:cursor-pointer ${
                        activeCommentPopoverId == recipe._id
                          ? "fill-orange-600"
                          : "hover:fill-gray-600"
                      }`}
                    />
                  </button>
                  <button className="text-gray-700 hover:text-orange-600">
                    <ShareIcon classname="w-5 h-5 hover:cursor-pointer fill-transparent stroke-black stroke-2 hover:stroke-gray-600 active:fill-orange-600" />
                  </button>
                </div>

                <button
                  onClick={() =>
                    setActivePopoverId(
                      activePopoverId === recipe._id ? null : recipe._id
                    )
                  }
                >
                  <StoreIcon
                    classname={`w-5 h-5 hover:cursor-pointer ${
                      activePopoverId === recipe._id
                        ? "fill-orange-600"
                        : "hover:fill-gray-600 "
                    }`}
                  />
                </button>
              </div>

              {/* Popovers */}
              {activePopoverId === recipe._id && (
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
              {activeCommentPopoverId === recipe._id && (
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
                  {recipe.title.length > 20
                    ? recipe.title.slice(0, 20) + "..."
                    : recipe.title}
                </p>
                <p className="text-sm text-gray-500 mt-auto">
                  View all comments
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export { Spinner };
