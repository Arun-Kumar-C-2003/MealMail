"use client";
import Link from "next/link";
import {HomeIcon,AddIcon, LikeFilledIcon, CartIcon, ProfileIcon,SearchIcon,StoreIcon,DeliveryIcon,HamburgerIcon,} from "./svgicons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

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
  const pathname = usePathname();
  const isLogoActive = pathname === navLinks[0].linkTo;
  // const isActive = navLinks.some((link) => pathname === `/${link.linkTo}`);

  const router = useRouter();
  const navigator = (href) => {
    if (router.pathname !== href) {
      router.push(href);
    }
  };

  return (
    <>
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
                  // href={`/${link.linkTo == "home" ? "home" : link.linkTo}`}
                  aria-disabled={isActive}
                  className={`${
                    isActive ? "text-amber-500" : "text-black/90"
                  } p-2 bg-transparent  hover:text-amber-500 rounded-md  transition-colors duration-150 ease-in`}
                >
                  {/* {link.charAt(0).toUpperCase() + link.slice(1)} */}
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
                className="ml-2 w-full outline-none bg-transparent"
              />
            </div>

            {/* Liked Recipes Button */}
            <button title="liked">
              <LikeFilledIcon classname="w-6 cursor-pointer h-6 transition-colors duration-150 ease-in hover:fill-amber-500 fill-gray-700" />
            </button>

            {/* Cart Button */}
            <button title="cart">
              <CartIcon
                classname={`w-6 transition-colors duration-150 ease-in hover:fill-amber-500 cursor-pointer h-6 fill-gray-700`}
              />
            </button>

            {/* Profile Icon => User Profile Appears Instead of Icon */}
            <button title="profile" onClick={() => router.push("/profile")}>
              {pathname === "/profile" ? (
                <HamburgerIcon
                  classname={`w-6 h-6 transition-colors duration-150 ease-in hover:stroke-amber-500 cursor-pointer stroke-gray-700`}
                />
              ) : (
                <ProfileIcon
                  classname={`w-6 h-6 transition-colors duration-150 ease-in hover:fill-amber-500 cursor-pointer fill-gray-700`}
                />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Bottom Navigation for mobile devices */}
      <footer className="md:hidden flex w-full fixed z-50 bottom-0 bg-gray-800 py-2 px-10 rounded-t-md">
        <div className="w-full text-white flex justify-between">
          {iconsPath.map((item, index) => {
            const href = `/${item.link}`;
            const isActive = pathname === href;
            return (
              <Link
                key={`${item.link + index}`}
                href={href}
                // href={`/${link.linkTo == "home" ? "home" : link.linkTo}`}
                aria-disabled={isActive}
                className={`${isActive ? "bg-amber-500 rounded-md" : ""
                }  fill-gray-200 w-7 h-7  transition-colors duration-300 p-1 ease-in-out`}>
                {/* {link.charAt(0).toUpperCase() + link.slice(1)} */}
                <item.icon />
              </Link>
            );
          })}
        </div>
      </footer>
    </>
  );
}

{
  /* <div className="w-full text-white flex justify-between">
  <button>
    <HomeIcon classname={`fill-gray-200 w-5 h-5`} />
  </button>
  <button>
    <SearchIcon classname={`fill-gray-200 w-5 h-5`} />
  </button>
  <button>
    <AddIcon classname={`fill-gray-200 w-5 h-5`} />
  </button>
  <button>
    <StoreIcon classname={`fill-gray-200 w-5 h-5`} />
  </button>
</div>; */
}

{
  /* <DeliveryIcon classname={`fill-gray-200 w-5 h-5`} /> */
}
