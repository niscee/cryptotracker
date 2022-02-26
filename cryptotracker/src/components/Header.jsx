import React from "react";
import Carousel from "./Carousel";

const headerStyle = {
  backgroundImage: "url('./images/c.webp')",
  backgroundSize: "cover",
  height: "100%",
};

const Header = () => {
  return (
    <div className="w-full mt-8 md:mt-16 p-2 h-[500px]">
      <div className="md:w-[90%] w-full m-auto py-8" style={headerStyle}>
        <div className="m-auto text-center md:w-[80%]">
          <p className="text-yellow-300 text-4xl mb-4 font-bold pb-2 md:text-6xl tracking-wide">
            Crypto Tracker
          </p>
          <p className="text-gray-300 text-sm md:text-lg">
            Best place to get all the info regarding your favourite crypto
            currency.
          </p>

          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Header;

