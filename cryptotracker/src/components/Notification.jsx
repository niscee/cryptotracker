import React from "react";

const Notification = ({ msg }) => {
  return (
    <div className="z-10 flex items-center justify-center bg-green-500 p-2 md:w-[40%] m-auto w-[90%] fixed bottom-0 right-0 left-0">
      <p className="text-white font-bold">
        Coin has been added to your watchlist.
      </p>
    </div>
  );
};

export default Notification;
