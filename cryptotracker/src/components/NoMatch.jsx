import React from "react";

const NoMatch = () => {
  return (
    <div className="flex items-center justify-center h-[500px]">
      <div className="border border-white w-[70%] md:w-[50%] m-auto text-center p-8 text-red-500 font-bold text-xl">
        <p>😥 404 Page Not Found</p>
      </div>
    </div>
  );
};

export default NoMatch;
