"use client";
import React, { useState } from "react";
import bpplogo from "../assets/bpplogoo.png";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 py-2 w-full border-b bg-white">
      <nav>
        <div className="max-w-full mx-auto">
          <div className="flex justify-between items-center mx-auto w-5/6">
            {/* Logo Section */}
            <div className="flex items-center gap-24 raleway">
              <div>
                <Link
                  to="/"
                  className="flex gap-3 items-center"
                >
                  <img src={bpplogo} alt="BPP Logo" className="w-14 lg:w-32"/>
                  <div className="flex flex-col justify-center">
                  <div>
                  <span className="text-sm lg:text-4xl font-extrabold montserrat" style={{color: "#79a5f2"}}> BHARATIYA POPULAR PARTY </span>
                  </div>
              
  <span className="text-center  navbarText px-2 lg:text-lg text-white"  style={{background: "#CF502D"}}>Decentralized Democracy, Centralized Progress</span>
</div>
                </Link>
              </div>
            </div>
            {/* Desktop Menu */}
            <div className="hidden poppins-bold lg:flex gap-8">
              <a href="#" className="hover:text-gray-600">
                Enroll
              </a>
              <a href="#vision" className="hover:text-gray-600">
                Vision
              </a>
              <a href="#mission" className="hover:text-gray-600">
                Our Mission
              </a>
            </div>
            {/* Mobile Menu Button */}
            <div className="flex gap-6 lg:hidden">
              <button
                onClick={() => setToggleMenu(!toggleMenu)}
                aria-label="Toggle menu"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`fixed z-40 w-full bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12 origin-top transition-height duration-700 ${
            !toggleMenu ? 'h-0' : 'h-full'
          }`}
        >
          <div className="px-8 mt-6">
            <div className="flex flex-col gap-8 font-bold tracking-wider">
              <a href="#" className="border-l-4 border-gray-600 pl-4">
                Enroll
              </a>
              <a href="#vision" className="pl-4">
                Vision
              </a>
              <a href="#mission" className="pl-4">
                Our Mission
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
