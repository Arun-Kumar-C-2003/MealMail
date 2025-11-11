"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  HomeIcon,
  AddIcon,
  LikeFilledIcon,
  CartIcon,
  ProfileIcon,
  SearchIcon,
  StoreIcon,
  DeliveryIcon,
  HamburgerIcon,
  CrossIcon,
} from "./svgicons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdBorderColor } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

export default function NavBar() {
  const navLinks = [
    { linkTo: "home", linkName: "Home" },
    { linkTo: "addrecipe", linkName: "Create" },
    { linkTo: "order", linkName: "Order" },
    { linkTo: "stores", linkName: "Stores" },
  ];

  const iconsPath = [
    { icon: HomeIcon, link: "home" },
    { icon: SearchIcon, link: "search" },
    { icon: AddIcon, link: "addrecipe" },
    { icon: DeliveryIcon, link: "orders" },
    { icon: StoreIcon, link: "stores" },
  ];

  const router = useRouter();
  const pathname = usePathname();
  const isLogoActive = pathname === navLinks[0].linkTo;

  const navigator = (href) => {
    if (pathname !== href) {
      router.push(href);
    }
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOutside = () => setOpen(false);
    window.addEventListener("click", handleOutside);
    return () => window.removeEventListener("click", handleOutside);
  }, []);

  return (
    <div>
      <header className="bg-white fixed z-50 top-0 shadow w-full">
        <nav className="max-w-full mx-auto flex items-center justify-between px-5 md:px-8 py-3 relative">
          <Link
            href="/home"
            aria-disabled={isLogoActive}
            className="text-2xl font-bold hover:scale-105 text-white bg-amber-500 p-2 rounded-md hover:bg-amber-400 transition duration-150 ease-in "
          >
            MealMail
          </Link>
          <ul className="hidden md:flex flex-1 ml-10 md:space lg:space-x-5 text-lg ">
            {navLinks.map((link, index) => {
              const href = `/${link.linkTo}`;
              const isActive = pathname === href;
              return (
                <Link
                  key={`${link.linkName + index}`}
                  href={href}
                  aria-disabled={isActive}
                  className={`${
                    isActive ? "text-amber-500" : "text-black/90"
                  } p-2 bg-transparent  hover:text-amber-500 rounded-md  transition-colors duration-150 ease-in`}
                >
                  {link.linkName}
                </Link>
              );
            })}
          </ul>

          <div className="flex space-x-7 items-center">
            <div className="hidden md:flex items-center border border-gray-600 rounded-full p-1 focus-within:border-transparent focus-within:ring-2 focus-within:ring-amber-500">
              {/* Icon */}
              <SearchIcon classname="fill-gray-400 w-8 h-8" />

              {/* Input */}
              <input
                type="text"
                placeholder="Search recipes, creators..."
                className="ml-2 placeholder-gray-500 w-full outline-none bg-transparent"
              />
            </div>

            {/* Liked Recipes Button */}
            <div className="flex  items-baseline space-x-7">
              <button title="liked ">
                <LikeFilledIcon classname="w-6 cursor-pointer h-6 transition-colors duration-150 ease-in hover:fill-amber-500 fill-gray-700" />
              </button>

              {/* Cart Button */}
              <div className="relative">
                <button title="cart" onClick={() => router.push("/cart")}>
                  <CartIcon classname="w-6 h-6 fill-gray-700 transition-colors duration-150 ease-in hover:fill-amber-500 cursor-pointer" />
                </button>
              </div>
              {pathname === "/profile" ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((prev) => !prev);
                  }}
                >
                  {open ? (
                    <CrossIcon classname="w-6 h-6 transition-colors duration-150 ease-in hover:stroke-amber-500 cursor-pointer stroke-gray-700" />
                  ) : (
                    <HamburgerIcon
                      classname={`w-6 h-6 transition-colors duration-150 ease-in hover:stroke-amber-500 cursor-pointer stroke-gray-700`}
                    />
                  )}
                </button>
              ) : (
                <button title="profile" onClick={() => router.push("/profile")}>
                  <ProfileIcon
                    classname={`w-7 h-7 transition-colors duration-150 ease-in hover:fill-amber-500 cursor-pointer fill-gray-700`}
                  />
                </button>
              )}
              {open && pathname === "/profile" && (
                <div className="absolute right-6 mt-15 w-58  h-auto bg-white shadow-lg rounded-xl z-50 p-2">
                  <button className="flex items-center gap-3 w-full text-center px-15 py-4 text-gray-700 rounded-md hover:bg-amber-50 hover:text-amber-600 transition">
                    <MdOutlineMenuBook className="text-xl" />
                    <span>Menu</span>
                  </button>

                  <button className="flex  gap-3  text-center px-15 py-4 text-gray-700 rounded-md hover:bg-amber-50 hover:text-amber-600 transition">
                    <MdOutlineCollectionsBookmark className="h-7 text-xl" />
                    <span>Collection</span>
                  </button>

                  <button className="flex items-center gap-3 w-full text-left px-15 py-4 text-gray-700 rounded-md hover:bg-amber-50 hover:text-amber-600 transition">
                    <MdBorderColor className="text-xl" />
                    <span>Order</span>
                  </button>

                  <button className="flex items-center gap-3 w-full text-left px-15 py-4 text-gray-700 rounded-md hover:bg-amber-50 hover:text-amber-600 transition">
                    <IoSettingsOutline className="text-xl" />
                    <span>Settings</span>
                  </button>

                  <div className="border-t" />
                  <button
                    className="flex gap-3 w-full text-center px-15 py-5 text-gray-700 rounded-md hover:bg-red-50 hover:text-red-500 transition"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    <RiLogoutCircleRLine className="text-xl" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <footer className="md:hidden flex w-full fixed z-50 bottom-0 bg-gray-800 py-2 px-10 rounded-t-md">
        <div className="w-full text-white flex justify-between">
          {iconsPath.map((item, index) => {
            const href = `/${item.link}`;
            const isActive = pathname === href;
            return (
              <Link
                key={`${item.link + index}`}
                href={href}
                aria-disabled={isActive}
                className={`${
                  isActive ? "bg-amber-500 rounded-md" : ""
                }  fill-gray-200 w-7 h-7  transition-colors duration-300 p-1 ease-in-out`}
              >
                {/* {link.charAt(0).toUpperCase() + link.slice(1)} */}
                <item.icon />
              </Link>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
