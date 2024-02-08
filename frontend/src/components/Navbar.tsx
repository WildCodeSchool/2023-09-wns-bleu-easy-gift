import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full  bg-slate-200 md:flex-row flex flex-col justify-center gap-2">
      <h1>Crazy Gift</h1>

      <Button size={"sm"}>Sign in</Button>
      <Button size={"lg"}>Sign in</Button>
      <Button size={"icon"}>Sign in</Button>
      <Button variant={"ghost"} className="bg-red-500">
        Sign in
      </Button>
      <Button variant={"destructive"}>Sign in</Button>
      <Button className="bg-green-500 hover:bg-purple-500 ">Sign in</Button>
      <Button variant={"link"}>
        <Link href="/auth">Login</Link>
      </Button>
      <Button>Sign in</Button>
    </nav>
  );
}
