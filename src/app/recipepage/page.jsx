import { CartIcon, LikeFilledIcon, ShareIcon } from "@/components/svgicons";

export default function ModernRecipePage() {
  const images = [
    "/images/cooking.jpg",
    "/images/cooking.jpg",
    "/images/cooking.jpg",
    "/images/cooking.jpg",
  ];
  return (
    <>
      <div className="head-container m-4 sm:m-7 md:flex md:gap-6">
        {/* Main Image */}
        <div className="main-img-container  relative w-full max-w-xl  aspect-video">
          <img
            src="/images/food.jpg"
            alt="cooking image"
            className="rounded-xl  w-full h-full object-cover"
          />

          {/* Like Button */}
          <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-105 transition">
            <LikeFilledIcon classname="fill-red-500 w-4 sm:w-5 md:w-6" />
          </button>

          {/* Labels */}
          <div className="absolute md:top-[59%] top-[32%]   left-3 flex flex-wrap gap-2">
            <span className="bg-black/75 text-white text-xs sm:text-sm px-3 py-1 md:py-2 rounded-full">
              25 min
            </span>
            <span className="bg-green-500/90 text-white text-xs sm:text-sm px-3 py-1 md:py-2 rounded-full">
              Vegetarian
            </span>
          </div>
          {/* Sub Images */}
          <div className="sub-images-container max-w-xl  mt-3 sm:mt-4  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
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
              Creamy Truffle Pasta
            </h1>
            <p className="description md:text-lg text-gray-600 text-left">
              Rich and indulgent pasta with truffle cream sauce, perfectly
              balanced with parmesan cheese and fresh herbs. This
              restaurant-quality dish brings luxury dining to your home kitchen.
            </p>
          </div>
          <div className="flex items-center md:gap-4 md:mt-3 gap-2 mt-3 ">
            <img
              src="/images/chef2.jpg"
              alt="chef"
              className="w-15 h-15 object-cover rounded-full"
            />
            <span className="text-start">
              <h5 className="text-black/75 font-medium">Chef Dan</h5>
              <p className="text-gray-700 text-xs md:text-sm">Foodie</p>
            </span>
            <button className="bg-orange-600 hover:cursor-pointer hover:bg-orange-500 text-white font-medium p-2 w-25 h-10 rounded-full">
              Follow
            </button>
          </div>
          <div className="recipe-counts mt-2 flex justify-between md:justify-normal md:gap-10   text-center">
            <span>
              <h3 className="font-medium text-lg md:text-2xl text-black/90">
                4.8
              </h3>
              <p className="text-sm text-gray-700">Rating</p>
            </span>
            <span>
              <h3 className="font-medium text-lg md:text-2xl text-black/90">
                25
              </h3>
              <p className="text-sm text-gray-700">Minutes</p>
            </span>
            <span>
              <h3 className="font-medium text-lg md:text-2xl text-black/90">
                4
              </h3>
              <p className="text-sm text-gray-700">Servings</p>
            </span>
            <span>
              <h3 className="font-medium text-lg md:text-2xl text-black/90">
                343
              </h3>
              <p className="text-sm text-gray-700">Likes</p>
            </span>
          </div>
          <div className="price-order flex justify-between md:justify-normal md:gap-3 md:mt-4 mt-2">
            <span className="price text-center  bg-black/80 text-white py-2 px-3  rounded-full">Rs.189</span>
            <button className="bg-orange-600 py-2 px-3 gap-2 hover:bg-orange-500 cursor-pointer  text-white flex rounded-full">
              <CartIcon classname="fill-white w-4 sm:w-5 md:w-4" />
              Order Now
            </button>
            <button className="bg-black/80 cursor-pointer hover:bg-black/70 md:p-3  rounded-full w-15 md:w-24 flex justify-center">        
              <ShareIcon classname='fill-white w-5' />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
