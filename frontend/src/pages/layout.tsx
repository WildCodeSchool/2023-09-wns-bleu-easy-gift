import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-bgPrimary relative  overflow-y-scroll flex flex-col justify-between">
      <Navbar />
      <main className="relative mt-20 w-full mx-auto  h-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
