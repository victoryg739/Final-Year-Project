import React, { useState } from "react";
import Image from "next/image";
import drPoppy from "/public/dr_poppy.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 mr-20 sm:px-6 lg:px-8 rounded-lg">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <Image
                src={drPoppy}
                alt="Dr Poppy"
                width={60}
                height={60}
                className="bg-blue-300 p-1.5 rounded-3xl mr-2"
              />
              <div className="font-extrabold text-xl"> Poppy AI</div>
            </div>
            {/* <a href="/" className="text-xl font-bold text-gray-800">
              MyLogo
            </a> */}
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Disease Diagnosis
              </a>

              <a
                href="/ai-psychiatrist"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                AI Psychatrist
              </a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium">
              Disease Diagnosis
            </a>
            <a
              href="/ai-psychiatrist"
              className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
            >
              AI Psychatrist
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
