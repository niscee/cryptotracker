import React from "react";
import parse from "html-react-parser";

const SingleCurrencyDetail = ({ singleCoin }) => {
  const {
    name,
    symbol,
    image,
    description,
    market_cap_rank,
    market_data: { current_price, market_cap },
  } = singleCoin;
  return (
    <div className="p-2 text-center text-white">
      <div className="block md:flex flex-row items-center justify-between p-4 md:w-[40%] m-auto mb-8">
        <img
          src={image.large}
          alt="currency"
          className="block m-auto"
        />
        <div className="text-lg leading-loose mt-4 md:mt-0">
          <p className="text-3xl text-yellow-300 font-bold">{name}</p>
          <p>Market Rank: {market_cap_rank}</p>
          <p>Current Price: ${current_price.usd}</p>
          <p>Market Cap: ${market_cap.usd}</p>
        </div>
      </div>
      <hr />
      <p className="text-white leading-10 text-lg mt-4">
        {parse(description.en)}
      </p>
    </div>
  );
};

export default SingleCurrencyDetail;
