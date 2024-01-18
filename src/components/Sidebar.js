import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SquaresFour, List, Plus } from "phosphor-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";

const Sidebars = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Medium-sized screen sidebar */}
      <div className="hidden lg:block relative flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          <Link to="/" onClick={closeSidebar}>
            <div
              role="button"
              tabIndex="0"
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <SquaresFour size={24} />
              </div>
              Home
            </div>
          </Link>
          <Link to="/my-lists" onClick={closeSidebar}>
            <div
              role="button"
              tabIndex="0"
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <List size={24} />
              </div>
              My Lists
            </div>
          </Link>
          <Link to="/new-list" onClick={closeSidebar}>
            <div
              role="button"
              tabIndex="0"
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <Plus size={24} />
              </div>
              Create New List
            </div>
          </Link>
        </nav>
      </div>

      {/* Hamburger menu for small and medium-sized screens */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button className="p-4" onClick={toggleSidebar}>
          <RxHamburgerMenu size={30} />
        </button>
      </div>

      {/* Mobile-sized screen sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-full bg-white z-50 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <button className="p-4 absolute top-4 right-4" onClick={toggleSidebar}>
          ✖
          <ImCross />
        </button>
        Ahsaniqbal
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          <Link to="/" onClick={closeSidebar}>
            <div
              role="button"
              tabIndex="0"
              className=" mt-5 flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4 ">
                <SquaresFour size={24} />
              </div>
              Home
            </div>
          </Link>
          <Link to="/my-lists" onClick={closeSidebar}>
            <div
              role="button"
              tabIndex="0"
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <List size={24} />
              </div>
              My Lists
            </div>
          </Link>
          <Link to="/new-list" onClick={closeSidebar}>
            <div
              role="button"
              tabIndex="0"
              className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            >
              <div className="grid place-items-center mr-4">
                <Plus size={24} />
              </div>
              Create New List
            </div>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebars;
