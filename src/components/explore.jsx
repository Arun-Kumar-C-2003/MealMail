'use client';

export default function Explore() {
  return (
    <div className="px-6 md:px-12 max-w-6xl mx-auto py-8">
      <h3 className="text-2xl font-semibold mb-4">Explore</h3>

      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search recipes, restaurants and more"
        className="w-full md:w-3/4 border border-gray-800 px-4 py-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <h5 className="text-lg font-medium mb-4">Trending Categories</h5>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:w-3/4 mb-6">
        <img src="/images/cooking.jpg" alt="" className="rounded-2xl object-cover w-full h-32 md:h-40" />
        <img src="/images/food.jpg" alt="" className="rounded-2xl object-cover w-full h-32 md:h-40" />
        <img src="/images/illustration1.jpeg" alt="" className="rounded-2xl object-cover w-full h-32 md:h-40" />
        <img src="/images/illustration2.jpeg" alt="" className="rounded-2xl object-cover w-full h-32 md:h-40" />
      </div>

      <div className="flex flex-wrap justify-around md:w-3/4 mb-8 text-gray-700 text-sm md:text-base">
        <p>Popular cuisines</p>
        <p>Dietary Trends</p>
        <p>Seasonal Dishes</p>
        <p>Quick Meals</p>
      </div>

      <hr className="border border-gray-800 mb-6" />

      <h5 className="text-lg font-medium mb-4">Editor's Picks</h5>

      <div className="grid grid-cols-3 gap-4 md:w-1/2 mb-6">
        <img src="/images/cooking.jpg" alt="" className="rounded-2xl object-cover aspect-square w-full" />
        <img src="/images/food.jpg" alt="" className="rounded-2xl object-cover aspect-square w-full" />
        <img src="/images/illustration1.jpeg" alt="" className="rounded-2xl object-cover aspect-square w-full" />
      </div>

      <div className="flex flex-wrap justify-around md:w-1/2 mb-8 text-gray-700 text-sm md:text-base">
        <p>Top blogs</p>
        <p>New Recipes</p>
        <p>Meal Plans</p>
      </div>

      <hr className="border border-gray-800 mb-6" />

      <h5 className="text-lg font-medium mb-4">New Restaurants</h5>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:w-3/4 mb-6">
        <img src="/images/cooking.jpg" alt="" className="rounded-2xl object-cover w-full h-32 md:h-40" />
        <img src="/images/food.jpg" alt="" className="rounded-2xl object-cover w-full h-32 md:h-40" />
        <img src="/images/illustration1.jpeg" alt="" className="rounded-2xl object-cover w-full h-32 md:h-40" />
        <img src="/images/illustration2.jpeg" alt="" className="rounded-2xl object-cover w-full h-32 md:h-40" />
      </div>

      <div className="flex flex-wrap justify-around md:w-3/4 text-gray-700 text-sm md:text-base">
        <p>Popular cuisines</p>
        <p>Dietary Trends</p>
        <p>Seasonal Dishes</p>
        <p>Quick Meals</p>
      </div>
    </div>
  );
}
