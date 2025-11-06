"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ConnectBtns } from "@/components/welcome";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/home");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-start">
            <a href="#" className="text-sm text-neutral-700 hover:underline">
              Forgot Password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 text-white rounded-md cursor-pointer ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-500"
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600 mt-2">
              {error}
            </p>
          )}

          <div className="text-center">
            <Link href="/signup" className="text-sm text-neutral-700 hover:underline">
              New to MealMail? Sign Up
            </Link>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-500 mb-2">Or continue with</p>
          <ConnectBtns />
        </div>
      </div>
    </div>
  );
}
