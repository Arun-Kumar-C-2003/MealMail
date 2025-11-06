"use client";
import { useRouter } from "next/navigation";
import { GoogleIcon, TwitterIcon, FacebookIcon } from "./svgicons";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LiaChevronDownSolid } from "react-icons/lia";
import { FaHome } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { FiMail } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

export const SignUp = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/signup")}
      className="w-full py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-500 transition"
    >
      Sign Up
    </button>
  );
};

export const WelcomeHome = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="w-full cursor-pointer py-2 px-4 bg-amber-500 text-white rounded-md hover:bg-amber-400 transition"
    >
      Home
    </button>
  );
};

export const Login = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/login")}
      className="w-full cursor-pointer py-2 px-4 bg-gray-950 text-slate-50 rounded-md hover:bg-gray-800 transition mt-2"
    >
      Sign In
    </button>
  );
};

export const ConnectBtns = () => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <a
        href="#googleauth"
        className="p-3 bg-gray-100 rounded-full shadow hover:bg-gray-200 transition"
      >
        {/* <i className="fa-brands fa-google text-lg text-red-500" /> */}
        <GoogleIcon />
      </a>
      <a
        href="#facebookauth"
        className="p-3 bg-gray-100 rounded-full shadow hover:bg-gray-200 transition"
      >
        {/* <i className="fa-brands fa-facebook-f text-lg text-blue-600" /> */}
        <FacebookIcon />
      </a>
      <a
        href="#xauth"
        className="p-3 bg-gray-100 rounded-full shadow hover:bg-gray-200 transition"
      >
        {/* <i className="fa-brands fa-x-twitter text-lg text-black" /> */}
        <TwitterIcon />
      </a>
    </div>
  );
};

export const TermsPolicyPara = () => {
  return (
    <p className="text-xs text-gray-500  text-center mt-4">
      By signing up, you agree to our{" "}
      <a href="#terms" className="text-orange-400 hover:underline">
        Terms of Service
      </a>{" "}
      and{" "}
      <a href="#policy" className="text-orange-400 hover:underline">
        Privacy Policy
      </a>
    </p>
  );
};





export default function Welcome() {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: false,
  };

  const foods = [
    { name: "Crispy Dosa", price: "40.00", rating: 5, img: "/pro.jpg" },
    { name: "Crispy Paneer", price: "50.00", rating: 4, img: "/pro1.jpg" },
    { name: "Masala Dosa", price: "55.00", rating: 4, img: "/pro2.jpg" },
    { name: "Cheese Sandwich", price: "60.00", rating: 4, img: "/pro3.jpg" },
    { name: "Veg Roll", price: "45.00", rating: 4, img: "/pro4.jpg" },
    { name: "Idli Sambar", price: "35.00", rating: 4, img: "/pro5.jpg" },
  ];

  const best = [
    { name: "Dosa Delight", img: "/pop.jpg", cap: "Hot and tasty bites you can't resist!" },
    { name: "Paneer Special", img: "/pop2.jpg", cap: "Crispy and golden, your breakfast favorite!" },
    { name: "Spicy Treat", img: "/pop1.jpg", cap: "Soft paneer with rich spicy flavors." },
    { name: "Pongal", img: "/pop3.jpg", cap: "Hot and tasty bites you can't resist!" },
  ];

  const images = ["/foodhome.jpg", "/home1.jpg", "/home2.jpg"];

  const handleScroll = () => {
    const section = document.getElementById("work");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="overflow-hidden">
      {/* 🔹 SLIDER SECTION */}
      <div className="relative w-full overflow-hidden">
        <Slider {...settings} className="absolute inset-0 h-full z-0">
          {images.map((src, i) => (
            <div key={i} className="relative w-full h-screen">
              <Image src={src} alt={`slide-${i}`} fill className="brightness-70  object-cover md:object-none " />
              {/* <img src={src} alt={`slide-${i}`}  className="brightness-70 object-contain  " /> */}
            </div>
          ))}
        </Slider>

        {/* 🔹 TOP NAV */}
        <ul className="absolute top-5 right-10 z-10 items-baseline flex gap-5 sm:gap-7">
          {/* <li className="list-none bg-white p-2 rounded-xl text-sm sm:text-base font-bold text-black  hover:text-amber-500 cursor-pointer transition">
            HOME
          </li>
          <li className="list-none bg-white p-2 rounded-xl text-sm sm:text-base font-bold text-black  hover:text-amber-500 cursor-pointer transition">
            SIGN UP
          </li> */}
          <li><WelcomeHome/></li>
          <li><Login/></li>
        </ul>

        {/* 🔹 MAIN TEXT */}
        <div className="absolute inset-0 flex flex-col justify-center items-start pl-6 sm:pl-10 md:pl-20 lg:pl-[60px]">
          <p
            style={{ fontFamily: "Nosifer" }}
            className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-snug"
          >
            Welcome to the House of <br /> Meal Mail
          </p>
          <p
            style={{ fontFamily: "Niconne" }}
            className="text-white mt-4 text-lg sm:text-xl md:text-2xl lg:text-[30px] font-bold"
          >
            Join Our Community And Explore a <br /> World Of Flavors...
          </p>
        </div>

        {/* 🔹 SCROLL DOWN BUTTON */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex justify-center items-center z-20">
          <div onClick={handleScroll} className="flex items-center space-x-1 group cursor-pointer">
            <LiaChevronDownSolid className="text-white group-hover:text-yellow-400 transition" />
            <span
              style={{ fontFamily: "Eagle Lake", fontSize: "20px" }}
              className="text-white font-bold group-hover:text-yellow-400 transition"
            >
              Scroll Down
            </span>
            <LiaChevronDownSolid className="text-white group-hover:text-yellow-400 transition" />
          </div>
        </div>
      </div>

      {/* 🔹 ABOUT SECTION */}
      <div id="work" className="relative max-h-screen md:min-h-screen bg-white flex flex-col md:flex-row justify-center items-center px-6 sm:px-10 md:px-20 lg:px-32 py-10">
        <div className="absolute inset-0 opacity-50 bg-[url('/back.jpg')] bg-cover bg-center"></div>
        <div className="relative flex flex-col md:flex-row items-center md:justify-between w-full gap-6 md:gap-16">
          <p
            style={{ fontFamily: "Romanesco" }}
            className="text-black text-xl sm:text-2xl md:text-3xl w-full md:w-1/2 leading-relaxed bg-white">
            "Every bite is a journey. From home-cooked favorites to hidden
            culinary gems, we bring the world of flavors straight to your
            doorstep. Share your meals, discover new tastes, and let every dish
            tell its story — because great food is meant to be experienced, not
            just eaten..."
          </p>
          <div className="w-full ">
            <img src="/food2.jpg" className=" h-full rounded-lg md:h- " />
          </div>
        </div>
      </div>

      {/* 🔹 SHOP NOW SECTION */}
      <div className="bg-[url('/pic12.jpg')] bg-cover bg-center h-screen py-20 text-center">
        <h2 className="font-serif font-bold text-xl md:text-2xl text-black">Enjoy Great Recipe...</h2>
        <h3 style={{ fontFamily: "Eagle Lake" }} className="text-2xl md:text-4xl text-red-600 mt-4">
          Simple And Delicious Food !!
        </h3>
        <button className="mt-8 px-6 py-3 bg-black text-white font-bold rounded-lg shadow-xl hover:bg-gray-200 hover:text-black transition font-[math] tracking-wider">
          Shop Now
        </button>
      </div>

      {/* 🔹 BEST SELLING PRODUCTS */}
      <div className="text-center mt-16">
        <h2 className="text-2xl md:text-3xl font-bold font-[math]">Our Best Selling Products</h2>
        <p className="text-gray-600 mt-4 px-4 md:px-20">
          Discover our most loved dishes, crafted with passion and flavor.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center py-10 px-6">
        {foods.map((food, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden w-72 hover:shadow-2xl transition duration-300 border-y border-transparent hover:border-red-500">
            <img src={food.img} alt={food.name} className="w-full h-48 object-cover" />
            <div className="text-center p-4">
              <div className="flex justify-center text-red-500 mb-1">
                {Array(food.rating).fill(0).map((_, i) => <span key={i}>⭐</span>)}
              </div>
              <h3 className="font-bold text-lg">{food.name}</h3>
              <div className="flex justify-center my-2"><div className="w-2 h-2 bg-red-600 rotate-45"></div></div>
              <p className="text-gray-600 font-semibold">₹{food.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 POPULAR COLLECTION */}
      <h2 className="text-center text-red-600 font-serif font-bold text-2xl mt-20">Popular Collection</h2>
      <p className="text-center text-gray-600 mt-3 text-base md:text-lg">“Our most loved dishes — cooked with passion!”</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center py-10 px-6">
        {best.map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden w-60 sm:w-72 hover:shadow-2xl transition duration-300">
            <img src={item.img} alt={item.name} className="w-full h-40 sm:h-48 object-cover" />
            <div className="text-center p-4">
              <h3 className="font-bold text-lg text-red-600">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-1">{item.cap}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 CONTACT SECTION */}
      <div className="relative bg-[url('/peap.jpg')] bg-cover bg-center py-20 text-white">
        <h2 className="text-2xl md:text-3xl font-cursive text-center font-bold mb-8">Contact Us!</h2>
        <ul className="flex  items-center justify-center space-x-4 text-sm md:text-base font-semibold">
          <li className="flex items-center space-x-2"><FaHome size={30} /><span>79A1 Vallankumaranvilai</span></li>
          <li className="flex items-center space-x-2"><LuPhoneCall size={30} /><span>000-637977</span></li>
          <li className="flex items-center space-x-2"><FiMail size={30} /><span>suriya@gmail.com</span></li>
          <li className="flex items-center space-x-2"><IoTimeOutline size={30} /><span>8.30Am to 9.30Pm</span></li>
        </ul> 

        <div className="flex justify-center mt-10">
          <p style={{ fontFamily: "cursive" }} className="mr-4 text-lg">Connect With Us</p>
          <div className="flex gap-5 text-xl">
            <FaFacebook className="cursor-pointer hover:text-blue-500" />
            <FaTwitterSquare className="cursor-pointer hover:text-sky-400" />
            <FaSquareInstagram className="cursor-pointer hover:text-pink-500" />
          </div>
        </div> <hr/>
      </div> 
    </div>
  );
}



