import React, { useState } from "react";
import MenuDiscussions from "@/components/discussions/MenuDiscussion";
import EspaceDiscussion from "@/components/discussions/EspaceDiscussion";

const DiscussionsPage = () => {
  const [isMenuHidden, setIsMenuHidden] = useState<boolean>(false);


  const toggleMenu = () => {
    setIsMenuHidden(!isMenuHidden);
  };


  const FloatingButton = ({ toggleMenu }: { toggleMenu: () => void }) => {
    return (
      <button
        onClick={toggleMenu}
        className="fixed left-2 top-1/2 transform -translate-y-1/2 bg-red400 text-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
        </svg>
      </button>
    );
  };

  return (
    <>
      <div
        className="absolute left-0 top-0 w-1 h-full z-10"
      ></div>
      <section className="w-full max-h-[93vh] h-screen flex flex-col overflow-y-auto md:flex-grow md:flex md:flex-row">
        <MenuDiscussions isMenuHidden={isMenuHidden} toggleMenu={toggleMenu} />
        <EspaceDiscussion isMenuHidden={isMenuHidden} />
        {isMenuHidden && <FloatingButton toggleMenu={toggleMenu} />
        }
      </section>
    </>
  );
}


export default DiscussionsPage;
