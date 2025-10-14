"use client";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  ProfileIcon,
  LikeIcon,
  LogoutIcon,
  AddIcon,
  NotificationIcon,
  CartIcon,
  HamburgerIcon,
  CrossIcon,
} from "./svgicons";
import Link from "next/link";


export default function NavBar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef();
  const menuRef = useRef();
  
  const mainLinks = ["home", "explore", "contact", "FAQs", "about"];
  const userLinks = [
    {
      href: "/profile",
      label: session?.user?.name || "Guest",
      icon: <ProfileIcon classname="w-5 h-5 fill-orange-600" />,
    },
    {
      href: "/notification",
      label: "Notification",
      icon: <NotificationIcon classname="w-5 h-5 fill-orange-600" />,
    },
    {
      href: "/addrecipe",
      label: "Add Recipe",
      icon: <AddIcon classname="w-5 h-5 fill-orange-600" />,
    },
    {
      href: "/saved",
      label: "Saved",
      icon: <LikeIcon classname="w-5 h-5 fill-orange-600" />,
    },
    {
      href: "/cart",
      label: "Cart",
      icon: <CartIcon classname="w-5 h-5 fill-orange-600" />,
    },
  ];
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    
    function handleEscKey(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [menuOpen]);
  const handleLinkClick = () => setMenuOpen(false);
  if (status === "loading") return null;

  return (
    <header className="bg-white shadow mb-5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5 relative">
        {/* Logo */}
        <Link
          href="/home"
          className="text-2xl font-bold text-orange-600 hover:text-orange-500"
        >
          Meal Mail
        </Link>

        {/* Center Nav (desktop only) */}
        <ul className="hidden md:flex flex-1 justify-center space-x-6">
          {mainLinks.map((link) => (
            <li key={link}>
              <Link
                href={`/${link === "home" ? "home" : link}`}
                className="text-gray-800 p-2 bg-transparent hover:bg-gray-50 rounded font-medium transition"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>share</title>
            <path d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z" />
          </svg>
        </button>
        {/* Hamburger Icon (always visible) */}
        <button
          ref={buttonRef}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-orange-600 hover:text-orange-700 focus:outline-none transition-transform duration-200"
          aria-label="Toggle menu"
        >
          {menuOpen ? <CrossIcon /> : <HamburgerIcon />}
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-4 top-16 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <ul className="flex flex-col py-2">
              {/* On mobile, show main links too */}
              <div className="md:hidden">
                {mainLinks.map((link) => (
                  <li key={`mobile-${link}`}>
                    <Link
                      href={`/${link === "home" ? "home" : link}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition"
                      onClick={handleLinkClick}
                    >
                      {link.charAt(0).toUpperCase() + link.slice(1)}
                    </Link>
                  </li>
                ))}
                <hr className="my-2 border-gray-200" />
              </div>

              {/* User Section (always in dropdown) */}
              {userLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    onClick={handleLinkClick}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
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
                  className="w-full text-left flex items-center px-4 py-2 hover:bg-red-50 hover:text-orange-600"
                >
                  <LogoutIcon classname="w-5 h-5 fill-orange-600" />{" "}
                  <span className="ml-2">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
