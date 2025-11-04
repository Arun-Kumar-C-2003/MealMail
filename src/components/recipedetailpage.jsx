"use client";
import { CartIcon, LikeFilledIcon, ShareIcon } from "@/components/svgicons";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "./loaders";

export default function RecipeDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [recipe, setRecipe] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchRecipeData() {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        const data = await response.json();
        if (data) {
          if (Array.isArray(data) && data.length > 0) {
            setRecipe(data[0]);
          } else {
            setRecipe(data);
          }
        }
      } catch (error) {
        console.error("Error in Recipedetailpage useeffect", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchRecipeData();
  }, [id]);

  // const images = [
  //   "/images/cooking.jpg",
  //   "/images/cooking.jpg",
  //   "/images/cooking.jpg",
  //   "/images/cooking.jpg",
  // ];
  const imgs = recipe?.images || [];
  const coverImage = imgs[0]?.url;
  const images = imgs.filter((i) => !i?.isCover && i?.url).map((i) => i.url);

  if (loading) return <Spinner />;
  if (!recipe)
    return <p className="text-center mt-10 text-red-600">Recipe not found.</p>;

  const ingredients = recipe.ingredients
    ? recipe.ingredients.map((item) => `${item.quantity} ${item.name}`)
    : [];
  return (
    <>
      <div className="pt-16"></div>
      <div className="head-container m-4 sm:m-7 md:flex md:gap-6 overflow-hidden">
        {/* Main Image */}
        <div className="main-img-container   aspect-video ">
          <div className="relative w-full max-w-xl h-full ">
            <img
              src={coverImage}
              alt="cooking image"
              className="rounded-xl  w-full h-full object-cover"
            />

            {/* Like Button */}
            <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 transition">
              <LikeFilledIcon classname="fill-red-500 w-4 sm:w-5 md:w-6" />
            </button>

            {/* Labels */}
            <div className="absolute bottom-2 left-3 flex flex-wrap gap-2">
              <span className="bg-black/75 text-white text-xs sm:text-sm px-3 py-1 md:py-2 rounded-full">
                {recipe?.servings} mins
              </span>
              <span className="bg-green-500/90 text-white text-xs sm:text-sm px-3 py-1 md:py-2 rounded-full">
                {recipe?.dietary}
              </span>
            </div>
          </div>
          {/* Sub Images */}
          <div className="sub-images-container max-w-xl hidden  mt-3 sm:mt-4  md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
            {images.map((image, idx) => (
              <img
                src={image}
                alt={`Image ${idx + 1}`}
                key={idx}
                className="sm:w-full w-3xs aspect-[4/3] object-cover rounded-xl"
              />
            ))}
          </div>
        </div>

        <div className="overall-detail md:flex flex-col">
          <div className="recipe-main">
            <h1 className="recipe-title font-bold text-black/75 text-2xl md:text-4xl md:mb-3 mt-1">
              {recipe?.title}
            </h1>
            <p className="description md:text-lg text-gray-600 text-left">
              {/* Rich and indulgent pasta with truffle cream sauce, perfectly
              balanced with parmesan cheese and fresh herbs. This
              restaurant-quality dish brings luxury dining to your home kitchen. */}
              {recipe?.description}
            </p>
          </div>
          <div className="flex items-center md:mt-3 gap-2 md:gap-7 mt-3 ">
            <img
              src="/images/chef2.jpg"
              alt="chef"
              className="w-15 h-15 object-cover rounded-full"
            />
            <span className="text-start">
              <h5 className="text-black/75 font-medium">
                {" "}
                {recipe?.user?.username ? recipe?.user?.username : "MealMail"}
              </h5>
              <p className="text-gray-700 text-xs md:text-sm">Foodie</p>
            </span>
            <button className="bg-amber-500 transition duration-150 ease-in hover:cursor-pointer hover:bg-amber-400 text-white p-2 w-25 h-10 rounded-full">
              Follow
            </button>
          </div>
          <div className="recipe-counts mt-2 flex justify-between md:justify-normal md:gap-18 text-center">
            {[
              { value: "4.8", label: "Rating" },
              { value: recipe?.cookTime, label: "Minutes" },
              { value: recipe?.servings, label: "Servings" },
              { value: "343", label: "Likes" },
            ].map((item) => (
              <div key={item.label}>
                <h3 className="font-medium text-lg md:text-2xl text-black/90">
                  {item.value}
                </h3>
                <p className="text-sm text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="price-order flex justify-between md:justify-normal md:gap-5 md:mt-7 mt-2">
            <span className="price text-center  bg-black/80 text-white py-2 px-3  rounded-full">
                &#8377;189  
            </span>
            <button className="bg-amber-500 py-2 px-3 gap-2 hover:bg-amber-400 transition duration-150 ease-in cursor-pointer  text-white flex rounded-full">
              <CartIcon classname="fill-white w-4 sm:w-5 md:w-4" />
              Order Now
            </button>
            <button className="bg-black/80 cursor-pointer hover:bg-black/70 md:p-3  rounded-full w-15 md:w-24 flex justify-center">
              <ShareIcon classname="fill-white w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="main-container pt-5 px-3 md:p-6 pb-10 md:flex md:gap-5 gap-0 bg-gray-50">
        <div>
          <div className="ingredients bg-white rounded-xl md:p-7 mt-5 px-3 pt-5">
            <div className="flex justify-between">
              <h3 className="font-medium text-xl">Ingredients</h3>
              <span className="flex gap-2  text-gray-600 ">
                Servings:
                <p className="text-black font-medium text-xl">
                  {recipe?.servings}
                </p>
              </span>
            </div>
            {/* <p className="mt-3 text-gray-700 text-justify">
              500 g (about 1 lb) boneless chicken thighs or breasts, cut into
              chunks 1 cup plain yogurt (Greek or regular) 2 tbsp lemon juice 2
              tbsp ginger-garlic paste (or 1 tbsp each minced ginger and garlic)
              2 tsp garam masala 1 tsp cumin powder 1 tsp coriander powder 1 tsp
              turmeric 1–2 tsp red chili powder (adjust for spice level) Salt to
              taste 2 tbsp oil (optional, for tenderness)
            </p> */}
            {recipe?.ingredients?.map((item, index) => (
              <div
                className="mt-3 text-gray-700 flex space-x-1 text-justify"
                key={index}
              >
                <input
                  type="checkbox"
                  name="recipecheckbox"
                  id="recipe_check_box"
                  className=" mr-2 w-5 aspect-square accent-amber-400 outline-0 border-2"
                />
                <span className="font-medium">{item.measure}</span>{" "}
                <span>{item.name}</span>
              </div>
            ))}
          </div>
          <div
            className={`bg-white text-justify md:p-7 mt-5 px-3 pt-5 rounded-xl ${
              recipe?.instructions?.length < 3
                ? "min-h-[50vh] min-w-[45vw] lg:min-w-[60vw]"
                : ""
            }`}
          >
            <h3 className="font-medium text-xl">Instructions</h3>
            {/* <p className="text-gray-700 mt-2 ">
              Step 1: Marinate the ChickenIn a large bowl, mix together:Yogurt,
              lemon juice, ginger-garlic paste, garam masala, cumin, coriander,
              turmeric, red chili powder, salt, and oil (if using).Add the
              chicken pieces and coat them evenly with the marinade.Cover and
              refrigerate for at least 1 hour (overnight gives best flavor).🔥
              Step 2: Cook the ChickenPreheat your grill, oven, or stovetop
              pan.Thread the marinated chicken onto skewers (if grilling) or
              simply cook in a hot pan with a little oil.Grill or pan-sear until
              the chicken is cooked through and slightly charred — about 5–7
              minutes per side.Set aside. (It’s okay if it’s not fully cooked;
              it’ll finish in the sauce.)🍅 Step 3: Prepare the Masala SauceHeat
              2 tbsp oil or ghee in a large pan over medium heat.Add the chopped
              onions and sauté until golden brown (about 8–10 minutes).Add the
              ginger-garlic paste and cook for another minute until
              fragrant.Stir in the tomato puree and cook until the oil separates
              from the mixture (about 5–8 minutes).Add the spices: cumin,
              coriander, paprika, red chili powder, and garam masala. Stir
              well.Pour in ½ cup of water (or as needed) and simmer for 3–5
              minutes.🥣 Step 4: Combine and SimmerAdd the cooked chicken pieces
              into the sauce.Stir to coat and simmer for 10 minutes, allowing
              the flavors to blend.Stir in the cream (or coconut cream) and
              crushed fenugreek leaves (if using).Simmer gently for another 5
              minutes until the sauce thickens and turns rich and creamy.Taste
              and adjust salt, spice, or cream to your liking.🌿 Step 5: Garnish
              and ServeAdd a small knob of butter for extra richness.Garnish
              with fresh cilantro and a squeeze of lemon juice.Serve hot with
              naan, roti, or steamed basmati rice.
            </p> */}
            {recipe?.instructions?.map((item, index) => (
              <div
                key={index}
                className="border p-2 mt-2 flex items-baseline gap-x-2 w-full rounded-md  border-gray-300"
              >
                <span className="bg-amber-500 p-1 w-8 flex items-center justify-center text-white aspect-square rounded-full">
                  {index + 1}
                </span>
                <p className="text-gray-800 mt-2 ">{item}</p>
              </div>
            ))}
          </div>
          {/* Review Box */}
          <div className="pt-5 px-3 md:p-6 pb-6 bg-white mt-3  rounded-xl">
            <div className="flex justify-between items-baseline ">
              <span className="font-medium">Reviews(125)</span>
            </div>
            <div className="mt-3 flex gap-2">
              <img
                src="/images/chef2.jpg"
                alt="profile"
                className="w-10 h-10 object-cover rounded-full"
              />
              <textarea
                name="review"
                id="review"
                className="outline-gray-500 w-full py-2 px-3 outline-2 focus:outline-amber-500 rounded-lg"
                placeholder="share your thoughts"
              ></textarea>
            </div>
            <div className="flex justify-end text-white mt-2 ">
              <button className="bg-amber-500 cursor-pointer hover:bg-amber-400 transition ease-in duration-150 text-center rounded-full p-2">
                Post Review
              </button>
            </div>
            {/* Reviews & Profiles */}
            <div className="reviews">
              {[
                {
                  image: images[0],
                  name: "Sara",
                  time: "2 hours ago",
                  review:
                    "This recipe is absolutely amazing! Made it for dinner last night and my family loved it. The truffle oil really makes a difference.",
                },
                {
                  image: images[0],
                  name: "Mike",
                  time: "5 hours ago",
                  review:
                    "Perfect recipe! I added some mushrooms and it was even better. Thanks for sharing Chef Marco!",
                },
              ].map((item, idx) => (
                <div className="mt-3 flex gap-2" key={idx}>
                  <img
                    src={item.image}
                    alt={`profile+${idx}`}
                    className=" w-10 h-10 block object-cover aspect-square cursor-pointer rounded-full"
                  />
                  <div className=" w-full py-2 px-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between">
                      <h5 className="font-medium text-lg">{item.name}</h5>
                      <p className="text-sm text-gray-800">{item.time}</p>
                    </div>
                    <p className="mt-2 text-left text-gray-600">
                      {item.review}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <button className="text-amber-500 hover:text-amber-400 cursor-pointer font-medium">
                view all comments
              </button>
            </div>
          </div>
        </div>

        {/* Profile and Related recipes */}
        <div className="profile-recipes">
          {/* Profile Content */}
          <div className="profile-content bg-white py-5 mt-5 md:mt-0 px-20 rounded-xl">
            <div className="profile-content flex flex-col items-center">
              <img
                src="/images/chef2.jpg"
                alt="chef"
                className="w-15 h-15 object-cover rounded-full"
              />
              <h5 className="text-black/75 font-medium">Chef Dan</h5>
              <p className="text-gray-700 text-xs md:text-sm">Foodie</p>
              <span className="flex gap-x-5">
                {[
                  { count: "147", label: "Recipes" },
                  { count: "10.5k", label: "Followers" },
                  { count: "10", label: "Following" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col text-center mt-2 "
                  >
                    <h3 className="font-medium text-lg md:text-2xl text-black/90">
                      {item.count}
                    </h3>
                    <p className="text-sm text-gray-700">{item.label}</p>
                  </div>
                ))}
              </span>
              <button className="bg-amber-500 transition duration-150 ease-in w-full cursor-pointer hover:bg-amber-400 p-2 mt-3 rounded-full text-white">
                Follow
              </button>
            </div>
          </div>

          {/* Recipes From Profile */}
          <div className="bg-white rounded-xl py-5 mt-5  px-5">
            <span className="font-bold mb-3 flex text-xl gap-1">
              More from Chef <p>Dan</p>{" "}
            </span>

            <div className="flex flex-col gap-4">
              {[
                {
                  name: "Classic Carbonara",
                  rating: 4.7,
                  time: "20 min",
                  image: images[0],
                },
                {
                  name: "Mushroom Risotto",
                  rating: 4.8,
                  time: "35 min",
                  image: images[1],
                },
                {
                  name: "Classic Tiramisu",
                  rating: 4.9,
                  time: "4 hours",
                  image: images[2],
                },
                // {
                //   name: "Creamy Ice Cake",
                //   rating: 4.9,
                //   time: "4 hours",
                //   image: images[2],
                // },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 cursor-pointer bg-transparent hover:bg-white/30 hover:shadow p-1 hover:p-1 transition-colors duration-300 ease-in-out  rounded-xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div>
                    <h5 className="font-semibold text-lg">{item.name}</h5>
                    <div className="flex items-center text-gray-600 text-sm">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span>{item.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl py-5 mt-5   px-5">
            <h5 className="font-bold mb-3 flex text-xl">Related Recipes</h5>
            <div className=" relative rounded-xl shadow-lg bg-gray-50 hover:scale-105 transition-transform duration-150 ease-in-out">
              <img
                src="/images/carouselimg1.jpg"
                alt="chef"
                className="w-full  object-cover cursor-pointer  rounded-t-2xl"
              />
              <button className="absolute top-5 cursor-pointer right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 transition">
                <LikeFilledIcon classname="fill-gray-500 w-4 sm:w-5 md:w-6" />
              </button>
              <div className="py-2 px-3">
                <h5 className="font-medium text-lg mb-1">
                  Perfect Beef Tenderloin
                </h5>
                <p className="text-sm text-gray-700">
                  Perfectly seared tenderloin with red wine reduction
                </p>
                <div className="flex justify-between mt-3">
                  <p>
                    <span className="text-yellow-500 mr-1">★</span>
                    4.8
                  </p>
                  <p>20 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
