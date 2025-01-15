import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="container flex items-center justify-between p-4">
      <Link href="/">
        <h1 className="ml-2 text-2xl font-bold">ToDo App</h1>
      </Link>
      {/* 
      <Link
        href=""
        className="border-solid border-2 border-black px-6 py-2 rounded-lg text-white bg-black"
      >
        Log Out
      </Link>
      */}
    </nav>
  );
};

export default NavBar;
