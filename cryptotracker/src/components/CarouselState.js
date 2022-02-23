import { Trending } from "../config/api";
import React, { useState } from "react";

const CarouselState = () => {
  const [trending, setTrending] = useState([]);

  // fetching trending coins.
  const fetchTrendingCoin = async () => {
    const res = await fetch(Trending, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    setTrending(data["coins"]);
  };

  return [trending, fetchTrendingCoin];
};

export default CarouselState;
