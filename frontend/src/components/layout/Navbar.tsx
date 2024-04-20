import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Logout from "../Logout";
import { checkUserConnected } from "@/utils/checkConnection";
import { maxWidthScreen } from "@/constants/styles";

export default function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const isConnected = checkUserConnected();
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="w-full h-16 sticky top-0 shadow-lg z-10 bg-bgPrimary">
      <div
        className={`max-w-[${maxWidthScreen}] h-full flex justify-between items-center gap-2 mx-auto px-10`}
      >
        {/* Burger Icon for Mobile Screens */}
        <button onClick={() => setMenuOpen(!isMenuOpen)} className="md:hidden">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo Link */}
        <Link href="/">
          <h1 className="font-rubik">Easy Gift</h1>
        </Link>

        {/* Links for Larger Screens */}
        <div className={`hidden md:flex md:flex-row gap-4`}>
          <Link href="#">Mes groupes</Link>
          <Link href="#">Mes chats</Link>
          <Link href="#">TestOPSSur Staging</Link>
        </div>

        {/* Side Drawer for Mobile Screens */}
        <div
          ref={menuRef}
          className={`absolute left-0 top-0 w-[75%] h-110 bg-bgPrimary shadow-lg transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out flex flex-col gap-4 p-4 md:hidden`}
        >
          {/* Close Button */}
          <button onClick={() => setMenuOpen(false)} className="self-end">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Link href="#" onClick={closeMenu}>
            Mes groupes
          </Link>
          <Link href="#" onClick={closeMenu}>
            Mes chats
          </Link>
          <Link href="#" onClick={closeMenu}>
            Link 3
          </Link>
          {!isConnected && (
            <>
              <Button className="shadow-md">
                <Link onClick={closeMenu} href="/auth/login">
                  Login
                </Link>
              </Button>
              <Button className="shadow-md">
                <Link onClick={closeMenu} href="/auth/login">
                  Sign up
                </Link>
              </Button>
            </>
          )}
          <Logout />
        </div>

        {/* Auth Buttons for Larger Screens */}
        <div className={`hidden md:flex md:flex-row gap-2`}>
          {!isConnected && (
            <>
              <Button className="shadow-md">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button className="shadow-md">
                <Link href="/auth/login">Sign up</Link>
              </Button>
            </>
          )}
          {isConnected && <Logout />}
        </div>
      </div>
    </nav>
  );
}
