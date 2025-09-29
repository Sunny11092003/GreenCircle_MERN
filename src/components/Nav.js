import React from "react";

const Nav = () => {
  return (
    <nav className="hidden md:flex space-x-6">
      <a href="/" className="hover:text-gray-200">Home</a>
      <a href="/trees" className="hover:text-gray-200">Trees</a>
      <a href="/profile" className="hover:text-gray-200">Profile</a>
    </nav>
  );
};

export default Nav;
