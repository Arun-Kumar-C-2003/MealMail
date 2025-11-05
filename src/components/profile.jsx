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
                  recipe.images.find((img) => img.isCover)?.url ||
                  "/images/cooking.jpg"
                }
                alt={recipe.title}
                className="w-full h-48 object-cover"
                onClick={() => router.push(`/recipedetails?id=${recipe._id}`)}
              />
              {/* {recipe.image && recipe.image.url ? (
                <img
                  src={recipe.image.url}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <img
                  src="/images/cooking.jpg"
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
              )} */}
              {/* <div className="flex items-center justify-center h-48 bg-gray-100">
                  <p className="text-gray-500 text-center">No image available</p>
                </div> */}
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
     <div className="flex  gap-12">
      {/* Profile Picture */}
      <div>
        <img
          src="/images/cooking.jpg"
          alt="profile image"
          className="w-36 h-36 rounded-full object-cover"/>

         <div className="flex justify-center mt-5">
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
          onClick={scrollToSection}>Recipes</p>
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
  </div>
  <div>
  </div>
  
</div>
  );
}
