"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { usePathname, useRouter } from "next/navigation";

export default function Profile() {
  const [postCount, setPostCount] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [activeIcon, setActiveIcon] = useState("posts");
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();

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
        return <p className="text-center">Loading....</p>;
      }
      if (recipes.length === 0) {
        return <p className="text-center">No Posts</p>;
      }
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="bg-white rounded-lg cursor-pointer hover:-translate-y-1 transition-transform duration-300 ease-in-out overflow-hidden shadow-md flex flex-col"
            >
              <img
                src={
                  recipe?.images?.find((img) => img.isCover)?.url ||
                  "/images/cooking.jpg"
                }
                alt={recipe.title}
                className="w-full h-48 object-cover"
                onClick={() => router.push(`/recipedetails?id=${recipe._id}`)}
              />
              <div className="p-4 flex-1">
                <p className="font-semibold text-lg text-center">
                  {recipe.title}
                </p>
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
    <div className="mt-10 border-t border-gray-200  flex justify-center">
      <div className="shadow-xl py-8 px-10">
        <div className="flex  gap-30">
          {/* Profile Picture */}
          <div>
            <img
              src="/images/cooking.jpg"
              alt="profile image"
              className="w-36 h-36 rounded-full object-cover"/>

            <div className="flex justify-center mt-5 pl-10">
              <span className=" text-xl font-semibold">
                {session?.user?.name || "Guest"}
              </span>
            </div>
          </div>
          {/* Post Count */}
          <div className="mt-12">
            <h5 className="text-lg font-bold">{postCount}</h5>
            <p
              className="text-gray-500 cursor-pointer"
              onClick={scrollToSection}
            >
              Recipes
            </p>
          </div>
          {/* User Info */}
          <div>
            <h5 className="text-lg font-bold mt-12">{followers}</h5>
            <p className="text-gray-500">Followers</p>
          </div>
          {/* Following */}
          <div className="">
            <h5 className="text-lg font-bold mt-12">{following}</h5>
            <p className="text-gray-500">Following</p>

          </div>
        </div>
        <div className="border-t border-gray-200 mt-6">
          <section className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">My Creations</h2>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                + Add Recipe
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={
                      recipe?.images?.find((img) => img.isCover)?.url ||
                      "/images/cooking.jpg"
                    }
                    alt={recipe.name}
                    className="w-full h-48 object-cover"
                    onClick={() => setActiveIcon("posts")}
                    title="Posts"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1">
                      {recipe.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {recipe.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>⭐ {recipe.rating || "4.5"}</span>
                      <button className="text-orange-500 hover:underline">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
