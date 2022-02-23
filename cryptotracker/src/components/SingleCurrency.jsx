import React, { useEffect, useState } from "react";
import SingleCurrencyDetail from "./SingleCurrencyDetail";
import SingleCurrrencyChart from "./SingleCurrrencyChart";
import SingleCurrencyState from "./SingleCurrencyState";
import { useParams } from "react-router-dom";

const SingleCurrency = () => {
  const [fetchSingleCoinDetail, singleCoin, fetchSingleCoinChart, chart] =
    SingleCurrencyState();

  const params = useParams();
  const coinId = params.id;

  useEffect(() => {
    fetchSingleCoinDetail(coinId);
  }, []);

  useEffect(() => {
    fetchSingleCoinChart(coinId);
  }, []);

  if (!singleCoin) {
    return "Please Wait";
  }

  console.log(chart);

  return (
    <div className="w-full mt-4 md:mt-16 p-2 h-[500px]">
      <div className="md:w-[80%] w-full m-auto py-8">
        <SingleCurrencyDetail singleCoin={singleCoin} />
        <SingleCurrrencyChart chart={chart} />
      </div>
    </div>
  );
};

export default SingleCurrency;
