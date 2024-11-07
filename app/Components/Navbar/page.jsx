"use client";
import React, { useState } from "react";
import { navdData } from "../../Helpers/Data";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";  // Import Sidebar Component

const Page = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);  // Sidebar state

  // Toggle sidebar visibility
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative">
      <nav className="bg-[#000000] px-16 py-4 -mt-1 lg:mt-6 flex items-center justify-between">
        {/* Logo */}
        <div>
          <Image src="/LVH-logo.webp" alt="lvh pic" height={100} width={100} />
        </div>

        {/* Desktop navigation (hidden on mobile) */}
        <ul className="hidden md:flex justify-between items-center">
          {navdData.map((item, index) => (
            <li key={index} className="relative text-white mx-4 group">
              <Link href={item.href} className="relative z-10 hover:text-[#c4a053]">
                {item.name}
              </Link>
              <div className="underline"></div>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleSidebar}
            className="text-white p-2"
          >
            {/* Hamburger icon (three lines) */}
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
          </button>
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Page;
