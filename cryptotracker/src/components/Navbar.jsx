import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserDashboard from "./UserDashboard";
import { AuthContextProvider } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContextProvider);
  return (
    <>
      <div className="w-full h-20 bg-zinc-800 sticky top-0 z-10">
        <div className="text-yellow-300 md:w-[80%] w-[95%] m-auto flex flex-row justify-between items-center h-full px-2">
          <Link to="/">
            <p className="text-lg font-extrabold md:text-3xl tracking-wide">
              Crypto Tracker
            </p>
          </Link>
          <div className="bg-yellow-300 text-black border border-white py-1 px-4">
            {user ? (
              <p
                className="text-sm cursor-pointer"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Dashboard
              </p>
            ) : (
              <p
                className="text-sm cursor-pointer"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                Login
              </p>
            )}
          </div>
        </div>
      </div>
      {open && <UserDashboard setOpen={setOpen} open={open} user={user} />}
    </>
  );
};

export default Navbar;
