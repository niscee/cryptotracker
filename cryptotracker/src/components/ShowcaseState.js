import React, { useContext, useState } from "react";
import { CoinList } from "../config/api";
import { HomeContextProvider } from "../context/HomeContext";

const ShowcaseState = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const context = useContext(HomeContextProvider);
  const { cryptos, setCoins, searchCoin } = context;

  // fetching all available coins in the market.
  const fetchCoins = async () => {
    const resp = await fetch(CoinList("usd"));
    const res = await resp.json();
    setCoins(res);
  };

  // getting item index and slicing cryptos..
  const indexLastItem = currentPage * perPage;
  const indexFirstItem = indexLastItem - perPage;
  const totalItem = searchCoin.length > 0 ? searchCoin : cryptos;
  const currentCryptos =
    searchCoin.length > 0
      ? searchCoin.slice(indexFirstItem, indexLastItem)
      : cryptos.slice(indexFirstItem, indexLastItem);

  // pagination number.
  const pageCollection = [];
  for (let i = 1; i <= Math.ceil(totalItem.length / perPage); i++) {
    pageCollection.push(i);
  }

  // current page handler.
  const currentPageHandler = (page) => {
    setCurrentPage(page);
  };

  return [
    fetchCoins,
    currentCryptos,
    currentPageHandler,
    pageCollection,
    currentPage,
  ];
};

export default ShowcaseState;
