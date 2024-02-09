import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Authentication from "./Authentication";
import Cookies from "js-cookie";
import Logout from "./Logout";
import { checkUserConnected } from "@/utils/checkConnection";

type TopState = {
  email: string;
};

export default function Navbar() {
  // const [state, setState] = useState<TopState>({ email: "" });
  // useEffect(() => {
  //   const email = Cookies.get("email") ?? "";
  //   setState({ email });
  // }, [Cookies.get("email")]);

  // const isConnected = state.email !== "";

  const pathname = usePathname();

  const isLoginPage = pathname.includes("/auth");

  const isConnected = checkUserConnected();

  return (
    <nav className="w-full  bg-slate-200 flex justify-between items-center gap-2">
      <h1>Crazy Gift</h1>
      <div className="flex gap-2">
        {!isConnected && (
          <Button>
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
        <Logout />
      </div>
    </nav>
  );
}
