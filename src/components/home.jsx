"use client";
import {
  AddIcon,
  CartIcon,
  DeliveryIcon,
  HomeIcon,
  LikeFilledIcon,
  ProfileIcon,
  ResetIcon,
  SearchIcon,
  ShareIcon,
  StoreIcon,
} from "@/components/svgicons";
import NavBar from "./navbar";
// import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const randomBG = [
    "bg-blue-500/80",
    "bg-red-500/80",
    "bg-green-500/80",
    "bg-yellow-500/80",
    "bg-cyan-500/80",
    "bg-purple-500/80",
    "bg-orange-500/80",
    "bg-sky-500/80",
    "bg-teal-500/80",
    "bg-emerald-500/80",
  ];

  const filterOptions = [
    "All",
    "Pure veg",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
  ];
  const sortOptions = ["Popular", "Rating", "Newest", "Cook Time"];
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  const [likeState, setLikeState] = useState(false);
  const [followState, setFollowState] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const router = useRouter();

  const time = "20";

  useEffect(() => {
    async function getAllUserRecipes() {
      try {
        const response = await fetch("/api/recipes/user_recipes");
        console.log("Getting Recipes");
        // src\app\api\recipes\user_recipes\route.js
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setUserRecipes(data);
          setTotalRecipes(data.length);
        } else {
          setUserRecipes([]);
          setTotalRecipes(0);
        }
      } catch (error) {
        console.error("Error in Home page getting user recipes:", error);
        setUserRecipes([]);
        setTotalRecipes(0);
      }
    }
    getAllUserRecipes();
  }, []);
  return (
    <>
      <NavBar />

      {/* Hero Section */}
      <div className="pt-16 ">
        <div className="p-4 md:p-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl text-black/90 font-bold ">
              Discover Recipes
            </h1>
            <p className="text-lg text-gray-700 mt-2 ">
              Explore thousands of delicious recipes from our community
            </p>
          </div>
          <span className="hidden md:block">
            <button
              className="bg-amber-500 cursor-pointer shadow text-white w-full px-10 py-3 rounded-full hover:bg-amber-400 transition-colors duration-150 ease-in"
              onClick={() => router.push("/addrecipe")}
            >
              Create Recipe
            </button>
          </span>
        </div>
        <hr className="border-t border-gray-300" />

        {/* Filter & Sort */}
        {/* sticky top-16 z-40  left-0 */}
        <div className="bg-white">
          <div className="flex  justify-between md:flex-wrap flex-col md:flex-row gap-3  p-1 pb-2 md:py-8 md:px-5 ml-4">
            <div className="flex flex-col md:flex-row ">
              <h5 className="text-black/80 text-lg font-medium">Filter by:</h5>
              <div className="flex mt-1 md:ml-2 overflow-x-auto no-scrollbar scroll-smooth items-baseline gap-2 ">
                {filterOptions.map((option, index) => (
                  <span
                    key={`${option}+${index}`}
                    onClick={() => setSelectedOption(option)}
                    className={`px-4 py-1 flex-shrink-0 whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                      selectedOption === option
                        ? "bg-amber-500 text-white hover:bg-amber-400"
                        : "bg-gray-200 text-black/90 hover:bg-gray-300"
                    }  rounded-full  `}
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-baseline mr-10">
              <select
                name="sortby"
                id="sortby"
                className="outline outline-gray-700 p-1 mr-5 focus:outline-amber-500 rounded-md"
              >
                {sortOptions.map((option, index) => (
                  <option
                    key={index}
                    value={`${option}`}
                  >{`sort by: ${option}`}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Reset Option => As of now, not necessary */}
        {/* <div
            className="bg-black/90 flex items-center cursor-pointer rounded-md hover:bg-black/80 p-1 "
            onClick={() => {
                setSelectedOption(filterOptions[0]);
                
            }}
          >
            <ResetIcon classname={`w-5 h-5 aspect-square fill-white `} />
          </div> */}
        <hr className="border-t border-gray-300" />

        <div className="bg-gray-100 p-3 md:px-8 mb-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 ">
          {userRecipes.slice(0, totalRecipes).map((recipe, index) => {
            const randomBGClass = randomBG[index % randomBG.length];

            return (
              //Recipe Cards
              <div
                key={recipe._id}
                className="rounded-2xl transition-colors border border-transparent duration-500 ease-in-out  shadow-md hover:border-black/80 bg-white   pb-1 "
              >
                <div className="relative">
                  {recipe.images && recipe.images.length > 0 ? (
                    <img
                      src={
                        recipe.images.find((img) => img.isCover)?.url ||
                        "/images/cooking.jpg"
                      }
                      alt={recipe.title}
                      className="w-full h-44  object-cover cursor-pointer  rounded-t-2xl"
                      onClick={() =>
                        router.push(`/recipedetails?id=${recipe._id}`)
                      }
                    />
                  ) : (
                    <img
                      src={recipe?.image?.url || "/images/cooking.jpg"}
                      alt={recipe.title}
                      className="w-full h-44  object-cover cursor-pointer  rounded-t-2xl"
                      onClick={() =>
                        router.push(`/recipedetails?id=${recipe._id}`)
                      }
                    />
                  )}
                  <div className=" absolute bottom-2  left-2 flex flex-wrap gap-1">
                    <span className="bg-black/70 p-1 text-white rounded-full text-xs md:text-sm px-3 py-1 md:py-2 ">
                      {recipe?.cookTime ?? time} mins
                    </span>
                    <span
                      className={`${randomBGClass} p-1 text-white rounded-full text-xs md:text-sm px-3 py-1 md:py-2 `}
                    >
                      {recipe.dietary}
                    </span>
                  </div>
                  <button
                    onClick={() => setLikeState(!likeState)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 transition"
                  >
                    <LikeFilledIcon
                      classname={`fill-gray-500  w-4 sm:w-5 md:w-6 cursor-pointer`}
                    />
                  </button>
                  <span className="absolute top-0 bg-rose-500/90 font-medium rounded-tl-2xl rounded-br-xl p-1 text-white text-center">
                    &nbsp; &#8377;180 &nbsp;
                  </span>
                </div>
                <div className="p-2">
                  <h5 className="font-medium text-xl text-black/90">
                    {recipe.title}
                  </h5>
                  <p className="text-gray-700">{recipe.description}</p>
                </div>

                <div className="px-3 pb-2 flex justify-between items-center">
                  <div className="flex   gap-2 items-center">
                    <img
                      src="/images/chef2.jpg"
                      alt="chef"
                      className="w-8 aspect-square object-cover  cursor-pointer  rounded-full"
                    />
                    <p>
                      {" "}
                      {recipe?.user?.username
                        ? recipe?.user?.username
                        : "MealMail"}
                    </p>
                    <button
                      onClick={() => setFollowState(!followState)}
                      className={` text-sm text-black border-gray-700/80 hover:text-gray-500  border py-0.5 px-2 cursor-pointer transition-colors duration-150 ease-in rounded-full`}
                    >
                      {/* {followState ? "Following" : "Follow"} */}
                      Follow
                    </button>
                  </div>
                  <p className="font-medium">
                    <span className="text-amber-500">★</span>4.8
                  </p>
                </div>

                {/* Order & Share button only,Like at top */}
                <div className="w-full flex justify-start gap-1 p-2">
                  <button className="w-[55%] cursor-pointer flex gap-1 relative overflow-hidden items-center text-amber-500 justify-center border border-amber-500 rounded-full p-1 group">
                    <span className="absolute inset-0 bg-amber-500 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-0"></span>
                    <span className="relative z-10 flex items-center gap-1 transition-colors duration-300 group-hover:text-white">
                      <CartIcon classname="group-hover:fill-white fill-amber-500 w-4 h-4" />
                      Order
                    </span>
                  </button>

                  <button className="relative group overflow-hidden  border border-black/70 cursor-pointer  flex gap-1 justify-center w-[35%]  text-black p-1 rounded-full">
                    <span className="absolute inset-0 bg-black transition-transform -translate-x-full duration-300 ease-out group-hover:translate-x-0 z-0"></span>
                    <span className="relative z-10 group-hover:text-white flex gap-1 items-center">
                      <ShareIcon
                        classname={`fill-black group-hover:fill-white w-5 h-5`}
                      />
                      Share
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

{
  /* Recipe Card */
}
// <div className="rounded-2xl bg-white  pb-1 ">
//   <div className="relative">
//     <img
//       src="/images/carouselimg3.jpg"
//       alt="chef"
//       className="w-full h-44 object-cover cursor-pointer  rounded-t-2xl"
//     />
//     <div className=" absolute bottom-2  left-2 flex flex-wrap gap-1">
//       <span className="bg-black/70 p-1 text-white rounded-full text-xs md:text-sm px-3 py-1 md:py-2 ">
//         {time}
//       </span>
//       <span className="bg-green-500/80 p-1 text-white rounded-full text-xs md:text-sm px-3 py-1 md:py-2 ">
//         Dessert
//       </span>
//     </div>
//     <button
//       onClick={() => setLikeState(!likeState)}
//       className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 transition"
//     >
//       <LikeFilledIcon
//         classname={`fill-gray-500  w-4 sm:w-5 md:w-6 cursor-pointer`}
//       />
//     </button>
//     <span className="absolute top-0 bg-rose-500/90 font-medium rounded-tl-xl rounded-br-xl p-1 text-white text-center">
//       Rs.140
//     </span>
//   </div>
//   <div className="p-2">
//     <h5 className="font-medium text-xl text-black/90">
//       Creamy Truffle Pasta
//     </h5>
//     <p className="text-gray-700">
//       Rich and indulgent pasta with truffle cream sauce
//     </p>
//   </div>

//   <div className="px-3 pb-2 flex justify-between items-center">
//     <div className="flex   gap-2 items-center">
//       <img
//         src="/images/chef2.jpg"
//         alt="chef"
//         className="w-8 aspect-square object-cover  cursor-pointer  rounded-full"
//       />
//       <p>Chef Marco</p>
//       <button
//         onClick={() => setFollowState(!followState)}
//         className={`bg-orange-400 text-white py-0.5 px-2 cursor-pointer transition-colors duration-150 ease-in rounded-full`}
//       >
//         {/* {followState ? "Following" : "Follow"} */}
//         Follow
//       </button>
//     </div>
//     <p className="font-medium">
//       <span className="text-amber-500">★</span>4.8
//     </p>
//   </div>

//   {/* Order & Share button only,Like at top */}
//   <div className="w-full flex gap-1 p-2">
//     <button className="w-full flex gap-1 items-center justify-center bg-amber-500 text-white rounded-full p-2">
//       <CartIcon classname={`fill-white w-4 h-4`} />
//       Order
//     </button>
//     <button className="bg-black/50 flex gap-1 items-center  text-white py-2 px-3 rounded-full">
//       <ShareIcon classname={`fill-white w-5 h-5`} />
//       Share
//     </button>
//   </div>
// </div>

{
  /* Recipe Card */
}
// <div className="rounded-2xl bg-white  pb-1 ">
//   <div className="relative">
//     <img
//       src="/images/carouselimg1.jpg"
//       alt="chef"
//       className="w-full h-44 object-cover cursor-pointer  rounded-t-2xl"
//     />
//     <div className=" absolute bottom-2  left-2 flex flex-wrap gap-1">
//       <span className="bg-black/70 p-1 text-white rounded-full text-xs md:text-sm px-3 py-1 md:py-2 ">
//         {time}
//       </span>
//       <span className="bg-red-500/80 p-1 text-white rounded-full text-xs md:text-sm px-3 py-1 md:py-2 ">
//         {type}
//       </span>
//     </div>
//     <button
//       onClick={() => setLikeState(!likeState)}
//       className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 transition"
//     >
//       <LikeFilledIcon
//         classname={`fill-gray-500  w-4 sm:w-5 md:w-6 cursor-pointer`}
//       />
//     </button>
//     <span className="absolute top-0 bg-rose-500/90 font-medium rounded-tl-xl rounded-br-xl p-1 text-white text-center">
//       {amount}
//     </span>
//   </div>
//   <div className="p-2">
//     <h5 className="font-medium text-xl text-black/90">
//       Creamy Truffle Pasta
//     </h5>
//     <p className="text-gray-700">
//       Rich and indulgent pasta with truffle cream sauce
//     </p>
//   </div>

//   <div className="px-3 pb-2 flex justify-between items-center">
//     <div className="flex   gap-2 items-center">
//       <img
//         src="/images/chef2.jpg"
//         alt="chef"
//         className="w-8 aspect-square object-cover  cursor-pointer  rounded-full"
//       />
//       <p>Chef Marco</p>
//       <button
//         onClick={() => setFollowState(!followState)}
//         className={`bg-orange-400 text-white py-0.5 px-2 cursor-pointer transition-colors duration-150 ease-in rounded-full`}
//       >
//         {/* {followState ? "Following" : "Follow"} */}
//         Follow
//       </button>
//     </div>
//     <p className="font-medium">
//       <span className="text-amber-500">★</span>4.8
//     </p>
//   </div>

//   {/* Order & Share button only,Like at top */}
//   <div className="w-full flex gap-1 p-2">
//     <button className="w-full flex gap-1 items-center justify-center bg-amber-500 text-white rounded-full p-2">
//       <CartIcon classname={`fill-white w-4 h-4`} />
//       Order
//     </button>
//     <button className="bg-black/50 flex gap-1 items-center  text-white py-2 px-3 rounded-full">
//       <ShareIcon classname={`fill-white w-5 h-5`} />
//       Share
//     </button>
//   </div>
// </div>

{
  /* <button className="relative overflow-hidden px-6 py-2 font-bold hover:text-white text-black border border-gray-800 rounded group">
                    <span className="absolute inset-0 bg-blue-500 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-0"></span>

                    <span className="relative z-10 ">Order</span>
                  </button> */
}

{
  /* <Link
                    href="/order"
                    class="relative inline-flex items-center justify-center p-1 w-[55%] overflow-hidden  transition duration-300 ease-out border border-black rounded-full group"
                  >
                    <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-amber-500 group-hover:translate-x-0 ease">
                      <CartIcon classname={`fill-white w-5 h-5`} />
                    </span>
                    <span class="absolute flex items-center justify-center w-full h-full text-amber-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                      Order
                    </span>
                    <span class="relative invisible">Order</span>
                  </Link> */
}
