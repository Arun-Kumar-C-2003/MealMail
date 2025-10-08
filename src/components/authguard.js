"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthGuard({ children }) {
  const { status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const publicRoutes = ["/", "/login", "/signup"]; // public routes

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" && !publicRoutes.includes(pathname)) {
      router.push("/login");
    }

    if (status === "authenticated" && publicRoutes.includes(pathname)) {
      router.push("/home");
    }
  }, [status, pathname, router]);

  return <>{children}</>;
}
