"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const Cart = () => {
  const searchParams = useSearchParams();
  const recipeTitle = searchParams.get("food");
  const image = searchParams.get("pic");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // setQuantity(searchParams.get("quantity"));
    const q = parseInt(searchParams.get("quantity"));
    const p = parseFloat(searchParams.get("price"));
    setQuantity(q);
    setPrice(p);
  }, [searchParams]);
  return (
    <>
      <div className="pt-20 flex justify-center">
        <div className="bg-white  shadow-md ">
          <div className="flex flex-col p-10 ">
            <div className="flex gap-5 items-center bg-gray-50 p-5 rounded border">
              <div className="flex gap-2 items-center">
                <img
                  src={image}
                  alt="recipe Image"
                  className="rounded-full w-10 aspect-square"
                />
                <p className=" font-medium">{recipeTitle}</p>
              </div>
              <p>&#8377; {price}</p>
              <div className="bg-white flex space-x-8 py-1 px-2 rounded-md items-center shadow">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                >
                  -
                </button>
                <p>{quantity}</p>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
