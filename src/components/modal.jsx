"use client";
import { useEffect, useState } from "react";
import { CrossIcon } from "./svgicons";

export default function Modal({ recipe, open, setOpen }) {
  const [quantity, setQuantity] = useState(1);

  const handleOpen = () => setOpen(!open);

  // useEffect(() => {
  //   if (open) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [open]);

  useEffect(() => {
    if (open) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-2xl shadow-xl w-full max-w-sm mx-auto transform transition-all duration-300 max-h-[90vh] overflow-hidden ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800 truncate pr-2">
            {recipe?.title}
          </h2>
          <button
            onClick={handleOpen}
            className="flex-shrink-0 cursor-pointer text-gray-500 hover:text-gray-700 p-1"
          >
            <CrossIcon />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Image - Fixed reasonable height */}
          <div className="relative h-48 sm:h-56 w-full">
            <img
              src={
                recipe?.images?.length
                  ? recipe.images.find((img) => img.isCover)?.url
                  : recipe?.image?.url || "/images/cooking.jpg"
              }
              alt={recipe?.title || "Recipe"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {recipe?.description?.length > 150
                ? recipe.description.slice(0, 150) + "..."
                : recipe?.description}
            </p>

            {/* Price and Quantity */}
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900">&#8377;200</div>

              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setQuantity(quantity > 1 ? quantity - 1 : 1);
                  }}
                  className="w-6 h-6 flex items-center cursor-pointer justify-center bg-white rounded-full shadow text-gray-600 hover:text-amber-500"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium mx-2">
                  {quantity}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setQuantity(quantity + 1);
                  }}
                  className="w-6 h-6 cursor-pointer flex items-center justify-center  bg-white rounded-full shadow text-gray-600 hover:text-amber-500"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons - Always visible at bottom */}
        <div className="border-t p-4 bg-white">
          <div className="flex gap-3">
            <button
              onClick={handleOpen}
              className="flex-1 py-2 px-4 border border-gray-800 rounded-lg font-medium text-gray-800 hover:bg-gray-800 cursor-pointer hover:text-white transition-colors"
            >
              Add To Cart
            </button>
            <button
              onClick={handleOpen}
              className="flex-1 py-2 px-4 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-400 cursor-pointer transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
