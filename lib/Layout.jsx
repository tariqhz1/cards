"use client";
import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";

export function Layout({ children }) {
  const pathname = usePathname();
  return (
    <div className="bg-[#000000f0]">
      <Navbar />
      <main className="flex-auto">{children}</main>
      {pathname.split("/").length !== 3 && pathname.split("/").length !== 4 && (
        <Footer />
      )}
    </div>
  );
}
