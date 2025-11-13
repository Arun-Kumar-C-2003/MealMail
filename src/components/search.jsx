"use client";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Search() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/recipes/user_recipes");
        const data = await res.json();
        console.log("Fetched recipes:", data);
        setProducts(Array.isArray(data.userRecipes) ? data.userRecipes : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filtered =
    search.trim() === ""
      ? []
      : products.filter((item) =>
          item.title?.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="flex flex-col items-center mt-27 relative">
      <div className="relative w-180">
        <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl cursor-pointer" />
    
        <input
          type="search"
          value={search}
          placeholder="Search for Restaurant and Food..!"
          onChange={(e) => setSearch(e.target.value)}
          className="border w-full p-3 pr-10 rounded-lg outline-none"
        /> 
        
        {search && (
          <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-lg z-10 max-h-80 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <div
                  key={item._id}
                  onClick={()=> router.push(`/recipedetails?id=${item._id}`)}
                  className="flex items-center gap-4 p-3 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={item.images?.[0]?.url || "/noimg.png"}
                    alt={item.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.title || "Untitled"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.dietary || "Dish"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-3 text-gray-500 text-center">No results found</p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-25 mt-10 flex mt-1 md:ml-2 overflow-x-100 no-scrollbar scroll-smooth items-baseline gap-2">
        <img src="/food1.jpg" className="w-14 h-14 rounded-lg" />
        <img src="/food1.jpg" className="w-14 h-14 rounded-lg" />
        <img src="/food1.jpg" className="w-14 h-14 rounded-lg" />
        <img src="/food1.jpg" className="w-14 h-14 rounded-lg" />
        <img src="/food1.jpg" className="w-14 h-14 rounded-lg" />
      </div>

      <div className="flex gap-28 mt-5 flex mt-1 md:ml-2 overflow-x-auto no-scrollbar scroll-smooth items-baseline gap-2">
        <p>Breakfast</p>
        <p>Coffee</p>
        <p>Lunch</p>
        <p>Briyani</p>
        <p>Dinner</p>
      </div>
    </div>
  );
}
