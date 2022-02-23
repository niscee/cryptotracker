import React, { useEffect } from "react";
import ShowcaseState from "./ShowcaseState";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

// iterating coin list.
const tableItems = (cryptos) => {
  return cryptos.map((crypto, key) => {
    return (
      <tr className="border-b-2 border-slate-200 h-28" key={key}>
        <td className="m-auto">
          <img
            src={crypto.image}
            alt="coin"
            className="h-16 w-16 transition hover:scale-75"
          />
        </td>
        <td>
          {crypto?.symbol.toUpperCase()}
          <br />
          {crypto?.id}
        </td>
        <td>{crypto?.current_price}</td>
        {crypto?.price_change_24h < 0 ? (
          <td className="text-red-500">{crypto?.price_change_24h}%</td>
        ) : (
          <td className="text-green-500">+{crypto?.price_change_24h}%</td>
        )}
        <td>${crypto?.market_cap}</td>
        <td>
          <Link to={`${crypto?.id}/detail`} title="click to view detail">
            👀
          </Link>
        </td>
      </tr>
    );
  });
};

const ShowcaseTable = () => {
  const [
    fetchCoins,
    currentCryptos,
    currentPageHandler,
    pageCollection,
    currentPage,
  ] = ShowcaseState();

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <div className="mt-4">
      <div className="overflow-auto">
        <table className="table-auto md:table-fixed w-full text-white text-center border-separate">
          <thead className="bg-yellow-300 h-12 text-black ">
            <tr>
              <th></th>
              <th>Coin</th>
              <th>Price</th>
              <th>24th Change</th>
              <th>Market Cap</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>{tableItems(currentCryptos)}</tbody>
        </table>
      </div>
      <div>
        <Pagination
          currentPageHandler={currentPageHandler}
          pageCollection={pageCollection}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ShowcaseTable;
