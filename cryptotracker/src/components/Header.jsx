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
          <p className="text-white text-4xl mb-4 font-bold pb-2 md:text-6xl tracking-wide">
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

{
  /* <div className="w-full mt-12 md:mt-24 bg-red-500 h-[600px]">
  <div className="w-full md:w-[90%] m-auto" style={headerStyle}>
    <div className="m-auto text-center">
      <p className="text-white text-4xl mb-4 font-bold pb-2 md:text-6xl tracking-wide">
        Crypto Tracker
      </p>
      <p className="text-gray-300 text-sm md:text-lg">
        Best place to get all the info regarding your favourite crypto currency.
      </p>
      <div className="mt-32 flex items-center justify-between flex-wrap w-[50%] m-auto">
        {pics.map((pic) => {
          return (
            <div>
              <img src="./images/1027.png" className="md:h-24" />
              <p className="text-gray-300 mt-4 text-sm md:text-lg">Ethereum</p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</div>; */
}
