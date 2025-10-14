"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Spinner } from "./home";

export default function Profile() {
  const [postCount, setPostCount] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [activeIcon, setActiveIcon] = useState("posts");
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      try {
        const response = await fetch("/api/recipes/");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setRecipes(data);
          setPostCount(data.length);
        } else {
          setRecipes([]);
          setPostCount(0);
        }
      } catch (error) {
        console.error("Error Occurred:", error);
        setRecipes([]);
        setPostCount(0);
      } finally {
        setLoading(false);
      }
    }
    getRecipes();
  }, []);

  const { data: session, status } = useSession();
  if (status === "loading") return null;

  const renderContent = () => {
    if (activeIcon === "posts") {
      if (loading) {
        return <Spinner/>;
      }
      if (recipes.length === 0) {
        return <p className="text-center">No Posts</p>;
      }
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes.map((recipe, index) => (
            <div key={index} className="bg-white rounded-lg cursor-pointer hover:-translate-y-1 transition-transform duration-300 ease-in-out overflow-hidden shadow-md flex flex-col">
              {recipe.image && recipe.image.url ? (
                <img
                  src={recipe.image.url}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-48 bg-gray-100">
                  <p className="text-gray-500 text-center">No image available</p>
                </div>
              )}
              <div className="p-4 flex-1">
                <p className="font-semibold text-lg text-center">{recipe.title}</p>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (activeIcon === "orders") {
      return <p className="text-center">No orders</p>;
    } else if (activeIcon === "drafts") {
      return <p className="text-center">No drafts</p>;
    }
  };

  const scrollToSection = () => {
    const el = document.getElementById("scrolltosection");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      {/* Profile header */}
      <div className="flex flex-col md:flex-row items-center justify-center md:items-start space-x-0 md:space-x-6 mb-8">
        <div>
          <img
            src="/images/cooking.jpg"
            alt="profile image"
            className="w-36 h-36 rounded-full object-cover"
          />
        </div>
        <div className="mt-4 md:mt-0 text-center md:text-left">
          <div className="flex items-center justify-center gap-2 ms-2 md:justify-start space-x-3">
            <span className="text-xl">
              {session?.user?.name || "Guest"}
            </span>
            <button className="px-3 py-1  bg-gray-800 text-white rounded hover:bg-gray-700 transition">
              Edit Profile
            </button>
          </div>
          <div className="mt-4 flex space-x-6 justify-center md:justify-start">
            <div className="text-center">
              <h5 className="text-lg font-bold">{postCount}</h5>
              <p
                className="text-gray-500 cursor-pointer"
                onClick={scrollToSection}
              >
                Recipes
              </p>
            </div>
            <div className="text-center">
              <h5 className="text-lg font-bold">{followers}</h5>
              <p className="text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <h5 className="text-lg font-bold">{following}</h5>
              <p className="text-gray-500">Following</p>
            </div>
          </div>
        </div>
      </div>

      {/* Icons navigation */}
      <div className="flex justify-center space-x-16 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          viewBox="0 -960 960 960"
          width="30"
          className={`cursor-pointer ${activeIcon === "posts" ? "fill-orange-600" : "fill-gray-900"}`}
          onClick={() => setActiveIcon("posts")}
          title="Posts"
        >
          <path d="M168-192q-29 0-50.5-21.5T96-264v-432q0-30 21.5-51t50.5-21h216l96 96h312q30 0 51 21t21 51v336q0 29-21 50.5T792-192H168Z" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          viewBox="0 -960 960 960"
          width="30"
          className={`cursor-pointer ${activeIcon === "orders" ? "fill-orange-600" : "fill-gray-900"}`}
          onClick={() => setActiveIcon("orders")}
          title="Order History"
        >
          <path d="m670-140 160-100-160-100v200ZM240-600h480v-80H240v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM120-80v-680q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v267q-28-14-58.5-20.5T720-520H240v80h284q-17 17-31.5 37T467-360H240v80h203q-2 10-2.5 19.5T440-240q0 42 11.5 80.5T486-86l-6 6-60-60-60 60-60-60-60 60-60-60-60 60Z" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          viewBox="0 -960 960 960"
          width="30"
          className={`cursor-pointer ${activeIcon === "drafts" ? "fill-orange-600" : "fill-gray-900"}`}
          onClick={() => setActiveIcon("drafts")}
          title="Drafts"
        >
          <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520h200L520-800v200Z" />
        </svg>
      </div>

      {/* Content Section */}
      <div
        id="scrolltosection"
        className="border border-gray-300 rounded-lg p-4"
      >
        {renderContent()}
      </div>
    </div>
  );
}
