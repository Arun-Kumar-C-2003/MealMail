"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const old = () => {
  // const searchParams = useSearchParams();
  // const recipeTitle = searchParams.get("food");
  // const totalPrice = parseFloat(searchParams.get("price"));
  // const q = parseInt(searchParams.get("quantity"));
  // const image = searchParams.get("pic");
  // const [quantity, setQuantity] = useState(0);

  const cartData = useSelector((state) => state.cart);
  // const q = parseInt()
  // const basePrice = q > 0 ? totalPrice / q : totalPrice;
  // const [price, setPrice] = useState(totalPrice);

  console.log(cartData);

  // useEffect(() => {
  //   // setQuantity(searchParams.get("quantity"));
  //   // const q = parseInt(searchParams.get("quantity"));
  //   if (!isNaN(q)) setQuantity(q);
  // }, [selector]);

  // useEffect(() => {
  //   setPrice(basePrice * quantity);
  // }, [basePrice, quantity]);

  // return (
  //   <>
  //     <div className="pt-20 flex justify-center">
  //       <div className="bg-white  shadow-md ">
  //         <div className="flex flex-col p-10 ">
  //           <div className="flex gap-5 items-center bg-white shadow p-5 rounded border">
  //             <div className="flex gap-2 items-center">
  //               <img
  //                 src={image}
  //                 alt="recipe Image"
  //                 className="rounded-full object-cover w-10 aspect-square"
  //               />
  //               <p className=" font-medium">{recipeTitle}</p>
  //             </div>
  //             <p>&#8377; {price}</p>
  //             <div className="bg-gray-50 flex space-x-8 py-1 px-2 rounded-md items-center shadow">
  //               <button
  //                 onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
  //                 className="bg-white w-5 hover:text-amber-500 cursor-pointer h-5 rounded-full shadow flex items-center p-1 justify-center "
  //               >
  //                 -
  //               </button>
  //               <p>{quantity}</p>
  //               <button
  //                 onClick={() => setQuantity(quantity + 1)}
  //                 className="bg-white w-5 hover:text-amber-500 cursor-pointer h-5 rounded-full shadow flex items-center p-1 justify-center"
  //               >
  //                 +
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
};

const Cart = () => {
  const cartData = useSelector((state) => state.cart);
  const totalPrice = parseFloat(cartData.price);
  const initialQuantity = parseInt(cartData.quantity);
  const [quantity, setQuantity] = useState(0);
  const basePrice =
    initialQuantity > 0 ? totalPrice / initialQuantity : totalPrice;
  const [price, setPrice] = useState(totalPrice);
  useEffect(() => {
    if (!isNaN(initialQuantity)) setQuantity(initialQuantity);
  }, [cartData]);

  useEffect(() => {
    setPrice(basePrice * quantity);
  }, [basePrice, quantity]);

  if (cartData.length === 0)
    return (
      <>
        <div className="w-full pt-16 h-screen bg-gray-50 flex flex-col">
          <h1 className="pl-8 pt-5 text-4xl font-medium">My Cart</h1>
          <div className="grow flex items-center justify-center">
            <p className="text-gray-400 text-xl text-center">
              Your cart is empty
            </p>
          </div>
        </div>
      </>
    );
  console.log(cartData);

  return (
    <>
      if (cartData.length === 0) return (
      <>
        <div className="w-full pt-16 h-screen bg-gray-50 flex flex-col">
          <h1 className="pl-8 pt-5 text-4xl font-medium">My Cart</h1>
          <div className="flexZ">
            <div className="p-10">
              {cartData?.map((item, index) => (
                <div
                  className="flex bg-white shadow rounded-xl p-2 mb-2 items-center "
                  key={index}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 aspect-square rounded-full mr-2 object-cover "
                  />
                  <div className="flex flex-col justify-center">
                    <p className="font-medium text-lg">{item.title}</p>
                    <p className="text-gray-500 text-xs">{item.description}</p>
                    <div className="bg-gray-50 w-32 shadow flex justify-between items-center p-2 rounded-xl mt-3">
                      <button
                        className="bg-white flex items-center justify-center rounded-full shadow w-5 h-5 hover:text-amber-500 cursor-pointer"
                        onClick={() =>
                          setQuantity(quantity > 1 ? quantity - 1 : 1)
                        }
                      >
                        -
                      </button>
                      <p>{quantity}</p>
                      <button
                        className="bg-white flex items-center justify-center rounded-full shadow w-5 h-5 hover:text-amber-500 cursor-pointer"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white shadwo">
              <h5>Order Summary</h5>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Cart;
