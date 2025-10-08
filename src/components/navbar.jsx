"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ProfileIcon, LikeIcon } from "./svgicons";

export default function NavBar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (status === "loading") return null;

  const mainLinks = ["home", "explore", "contact", "FAQs", "about"];
  const userLinks = [
    { href: "/profile", label: session?.user?.name || "Guest", icon: ProfileIcon },
    { href: "/notification", label: "Notification", icon: "🔔" },
    { href: "/addrecipe", label: "Add Recipe", icon: "➕" },
    { href: "/saved", label: "Saved", icon: LikeIcon},
    { href: "/cart", label: "Cart", icon: "🛒" },
  ];

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="bg-white shadow mb-5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5 relative">
        {/* Logo */}
        <a
          href="/home"
          className="text-2xl font-bold text-orange-600 hover:text-orange-500"
        >
          Meal Mail
        </a>

        {/* Center Nav (desktop only) */}
        <ul className="hidden md:flex flex-1 justify-center space-x-6">
          {mainLinks.map((link) => (
            <li key={link}>
              <a
                href={`/${link === "home" ? "home" : link}`}
                className="text-gray-800 p-2 bg-transparent hover:bg-gray-50 rounded font-medium transition"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger Icon (always visible) */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-orange-600 hover:text-orange-700 focus:outline-none transition-transform duration-200"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-4 top-16 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <ul className="flex flex-col py-2">
              {/* On mobile, show main links too */}
              <div className="md:hidden">
                {mainLinks.map((link) => (
                  <li key={`mobile-${link}`}>
                    <a
                      href={`/${link === "home" ? "home" : link}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                      onClick={handleLinkClick}
                    >
                      {link.charAt(0).toUpperCase() + link.slice(1)}
                    </a>
                  </li>
                ))}
                <hr className="my-2 border-gray-200" />
              </div>

              {/* User Section (always in dropdown) */}
              {userLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    onClick={handleLinkClick}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </a>
                </li>
              ))}

              <hr className="my-2 border-gray-200" />

              {/* Logout Button */}
              <li>
                <button
                  onClick={() => {
                    handleLinkClick();
                    signOut({ callbackUrl: "/login" });
                  }}
                  className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  🚪 <span className="ml-2">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
