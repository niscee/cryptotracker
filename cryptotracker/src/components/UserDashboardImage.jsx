import React from "react";

const UserDashboardImage = ({ user }) => {
  return (
    <div className="mt-8 w-[60%] m-auto text-center">
      <img src={user.photoURL} alt="user" className="block m-auto rounded" />
      <p className="text-xl font-bold mt-4">{user.displayName}</p>
    </div>
  );
};

export default UserDashboardImage;
