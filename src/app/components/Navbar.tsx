"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import drPoppy from "/public/dr_poppy.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/status");
        const data = await res.json();
        console.log(data);
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error("Error checking auth:", error);
      }
    };

    checkAuth();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image src={drPoppy} alt="Dr Poppy" width={50} height={50} className="bg-blue-300 p-1.5 rounded-3xl mr-2" />
            <span className="font-extrabold text-xl">Poppy AI</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center ">
            <a href="/" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
              Disease Diagnosis
            </a>
            <a href="/ai-psychiatrist" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
              AI Psychiatrist
            </a>
            <a href="/settings" className="text-gray-700 hover:text-gray-900 text-sm font-medium">
              Settings
            </a>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="bg-red-400 text-white px-4 py-2 rounded-md text-sm font-medium">
                Logout
              </button>
            ) : (
              <a href="/sign-in" className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 py-3 space-y-2">
          <a href="/" className="block text-gray-700 hover:text-gray-900 text-base font-medium">
            Disease Diagnosis
          </a>
          <a href="/ai-psychiatrist" className="block text-gray-700 hover:text-gray-900 text-base font-medium">
            AI Psychiatrist
          </a>
          <a href="/settings" className="block text-gray-700 hover:text-gray-900 text-base font-medium">
            Settings
          </a>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full bg-red-400 text-white px-4 py-2 rounded-md text-base font-medium"
            >
              Logout
            </button>
          ) : (
            <a
              href="/sign-in"
              className="block bg-blue-500 text-white px-4 py-2 rounded-md text-base font-medium text-center"
            >
              Login
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
