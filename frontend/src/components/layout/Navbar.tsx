import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Authentication from "../Authentication";
import Cookies from "js-cookie";
import Logout from "../Logout";
import { checkUserConnected } from "@/utils/checkConnection";
import { maxWidthScreen } from "@/constants/styles";

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
    <nav className="w-full h-16 sticky top-0 shadow-lg z-10 bg-bgPrimary">
      <div
        className={`max-w-[${maxWidthScreen}] h-full flex justify-between items-center gap-2 mx-auto px-10`}
      >
        <Link href="/">
          <h1 className="font-rubik">Crazy Gift</h1>
        </Link>
        <div className="flex gap-2">
          {!isConnected && (
            <Button className="shadow-md">
              <Link href="/auth/login">Connexion</Link>
            </Button>
          )}
          <Logout />
        </div>
      </div>
    </nav>
  );
}
