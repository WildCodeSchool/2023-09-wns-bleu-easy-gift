import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Authentication from "./Authentication";

export default function Navbar() {
  const pathname = usePathname();

  const isLoginPage = pathname.includes("/auth");

  return (
    <nav className="w-full  bg-slate-200 flex justify-between items-center gap-2">
      <h1>Crazy Gift</h1>

      {!isLoginPage && (
        <Button variant={"link"}>
          <Link href="/auth">Login</Link>
        </Button>
      )}
    </nav>
  );
}
