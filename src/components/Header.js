import React from "react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Home
            </a>
            <a
              href="/trees"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Trees
            </a>
            <a
              href="/profile"
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Profile
            </a>
          </nav>

          {/* Mobile Menu */}
          <MobileMenu />

          {/* Optional: User Avatar Placeholder */}
          <div className="hidden md:flex items-center ml-6">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium text-white">
              U
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
