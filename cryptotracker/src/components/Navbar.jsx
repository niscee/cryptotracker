import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-zinc-800">
      <div className="text-yellow-400 md:w-[80%] w-[95%] m-auto flex flex-row justify-between items-center h-full px-2">
        <Link to="/">
          <p className="text-lg font-extrabold md:text-2xl tracking-wide">
            Crypto Tracker
          </p>
        </Link>
        <div className="border border-white py-1 px-4">
          <p className="text-sm">USD</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
