import React from "react";

const UserDashboardNavbar = ({ setOpen, open, user, signOutUser }) => {
  return (
    <>
      <div className="flex items-center justify-between w-full p-4">
        {user && (
          <p
            className="text-sm bg-yellow-300 text-black cursor-pointer px-2 py-1 border border-white"
            onClick={() => {
              signOutUser();
            }}
          >
            Logout
          </p>
        )}
        <p
          className="text-lg cursor-pointer px-2 font-sm"
          onClick={() => {
            setOpen(!open);
          }}
        >
          ❌
        </p>
      </div>
      <hr />
    </>
  );
};

export default UserDashboardNavbar;
