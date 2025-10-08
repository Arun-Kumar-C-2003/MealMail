"use client";
import { useRouter } from "next/navigation";
import { GoogleIcon, TwitterIcon, FacebookIcon } from "./svgicons";

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

export const Login = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/login")}
      className="w-full hover:cursor-pointer py-2 px-4 bg-gray-950 text-slate-50 rounded-md hover:bg-gray-800 transition mt-2"
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
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-stretch justify-center rounded px-6 py-12 text-gray-800">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[url('/images/food.jpg')] rounded bg-cover bg-center text-white">
        <div className=" p-8 rounded-lg text-center">
          <h1 className="text-6xl font-bold leading-tight mb-4">
            Discover Delicious
            <br />
            Recipes
          </h1>
          <p className="text-sm">
            Join our community and explore a world of flavors
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center  bg-gray-50">
        <div className="w-full max-w-md bg-white  sm:mt-5 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-2 text-center">Welcome</h2>
          <p className="text-center text-gray-600 mb-6">
            Sign in or create an account to get started
          </p>

          <SignUp />
          <Login />

          <div className="mt-6 text-center">
            <p className="text-gray-500">Or continue with</p>
            <ConnectBtns />
          </div>

          <TermsPolicyPara />
        </div>
      </div>
    </div>
  );
}
