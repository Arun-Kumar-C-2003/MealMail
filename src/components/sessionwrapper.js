"use client";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavBar from "./navbar";

export const NavPathChecker = () => {
  const pathname = usePathname();
  const hideNavBar = ["/", "/login", "/signup"];
  const showNavBar = !hideNavBar.includes(pathname);
  return showNavBar ? <NavBar /> : null;
};

export default function SessionWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
