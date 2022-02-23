import React, { useState } from "react";
import { CoinDetail, CoinMarketChart } from "../config/api";

const SingleCurrencyState = () => {
  const [singleCoin, setSingleCoin] = useState(null);
  const [chart, setChart] = useState([]);

  // fetching single coin details.
  const fetchSingleCoinDetail = async (coinId) => {
    const resp = await fetch(CoinDetail(coinId));
    const res = await resp.json();
    setSingleCoin(res);
  };

  // fetching single coin market chart.
  const fetchSingleCoinChart = async (coinId) => {
    const resp = await fetch(CoinMarketChart(coinId));
    const res = await resp.json();
    const finalData = res.prices;
    setChart(finalData);
  };

  return [fetchSingleCoinDetail, singleCoin, fetchSingleCoinChart, chart];
};

export default SingleCurrencyState;
