"use client";
import { CartIcon, LikeFilledIcon, ShareIcon } from "@/components/svgicons";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "./loaders";
import Modal from "./modal";
import { useSession } from "next-auth/react";

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
    "Vegetarian",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
  ];
  const sortOptions = ["Popular", "Rating", "Newest", "Cook Time"];
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);
  const [followState, setFollowState] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const [likes, setLikes] = useState({});
  const { data: session } = useSession();
  const router = useRouter();

  const time = "20";

  useEffect(() => {
    async function getAllUserRecipes() {
      try {
        // src\app\api\recipes\user_recipes\route.js
        const response = await fetch(
          `/api/recipes/user_recipes?page=${page}&limit=10`
        );
        console.log("Getting Recipes");
        const data = await response.json();
        if (Array.isArray(data.userRecipes) && data.userRecipes.length > 0) {
          setUserRecipes((prev) => {
            const combined = [...prev, ...data.userRecipes];
            const unique = Array.from(
              new Map(combined.map((r) => [r._id, r])).values()
            );
            return unique;
          });

          setAllRecipes((prev) => {
            const combined = [...prev, ...data.userRecipes];
            const unique = Array.from(
              new Map(combined.map((r) => [r._id, r])).values()
            );
            return unique;
          });

          setHasMore(data.hasMore);
        } else {
          setUserRecipes([]);
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error in Home page getting user recipes:", error);
        setUserRecipes([]);
      } finally {
        setLoading(false);
      }
    }
    getAllUserRecipes();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, [hasMore]);

  useEffect(() => {
    if (selectedOption.toLowerCase() === "all") setUserRecipes(allRecipes);
    else {
      setUserRecipes(
        // allRecipes.filter((recipe) =>
        //   Object.values(recipe).some(
        //     (field) =>
        //       typeof field === "string" &&
        //       field.toLowerCase().includes(selectedOption.toLowerCase())
        //   )
        // )
        allRecipes.filter(
          (item) =>
            item.dietary?.toLocaleLowerCase() ===
            selectedOption.toLocaleLowerCase()
        )
      );
    }
  }, [allRecipes, selectedOption]);

  const handleFilter = (option) => {
    setSelectedOption(option);
  };

  // const handleLike = async (id) => {
  //   // setLikes((prev) => ({
  //   //   ...prev,
  //   //   [id]: !prev[id],
  //   // }));
  //   try {
  //     const res = await fetch(`api/recipes/${id}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ likedBy: [session?.user?.name] }),
  //     });
  //     const data = await res.json();
  //     alert(data.message);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Something Went wrong");
  //   }
  // };

  const handleLike = async (id) => {
    if (!session?.user?.name) {
      alert("Please log in to like recipes.");
      return;
    }

    const userName = session.user.name;
    const currentLikes = likes[id] || [];
    const hasLiked = currentLikes.includes(userName);

    // Optimistic UI update
    const optimisticLikes = hasLiked
      ? currentLikes.filter((u) => u !== userName)
      : [...currentLikes, userName];

    setLikes((prev) => ({ ...prev, [id]: optimisticLikes }));

    try {
      const res = await fetch(`/api/recipes/${id}/like`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName }),
      });

      if (!res.ok) throw new Error("Failed to update like");
      const data = await res.json();

      // Replace with actual DB response
      setLikes((prev) => ({ ...prev, [id]: data.likedBy }));
    } catch (error) {
      console.error("Like error:", error);

      // Rollback UI on failure
      setLikes((prev) => ({ ...prev, [id]: currentLikes }));
    }
  };

  useEffect(() => {
    if (userRecipes.length > 0) {
      const initialLikes = {};
      userRecipes.forEach((recipe) => {
        initialLikes[recipe._id] = recipe.likedBy || [];
      });
      setLikes(initialLikes);
    }
  }, [userRecipes]);

  return (
    <>
      {/* <NavBar /> */}

      {/* Hero Section */}
      <div className="pt-16 ">
        <div className="p-4 md:p-8 flex items-center justify-between">
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
                    onClick={() => {
                      setSelectedOption(option);
                      handleFilter(option);
                    }}
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
        {loading ? <Spinner /> : ""}
        <div className="bg-gray-100 p-3 md:px-8 mb-10 md:mb-0 grid gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 ">
          {userRecipes.map((recipe, index) => {
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike(recipe._id);
                    }}
                    className="absolute top-3 cursor-pointer right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 transition"
                  >
                    <LikeFilledIcon
                      classname={`${
                        likes[recipe._id]?.includes(session?.user?.name)
                          ? "fill-red-500"
                          : "fill-gray-500"
                      } w-6 h-6 `}
                    />
                    {/* <span className="ml-1 text-xs text-gray-600">
                      {likes[recipe._id]?.length || 0}
                    </span> */}
                  </button>

                  <span className="absolute top-0 bg-rose-500/90 font-medium rounded-tl-2xl rounded-br-xl p-1 text-white text-center">
                    &nbsp; &#8377;180 &nbsp;
                  </span>
                </div>
                <div className="p-2">
                  <h5 className="font-medium text-xl text-black/90">
                    {recipe.title}
                  </h5>
                  <p className="text-gray-700 text-sm mt-1 mb-1">
                    {recipe.description}
                  </p>
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
                  <button
                    className="w-[55%] cursor-pointer flex gap-1 relative overflow-hidden items-center text-amber-500 justify-center border border-amber-500 rounded-full p-1 group"
                    onClick={() => {
                      setOpen(true);
                      setSelectedRecipe(recipe);
                    }}
                  >
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
        {hasMore && <div ref={loader} className="h-10"></div>}

        {isOpen && (
          <Modal recipe={selectedRecipe} open={isOpen} setOpen={setOpen} />
        )}
      </div>
    </>
  );
}
