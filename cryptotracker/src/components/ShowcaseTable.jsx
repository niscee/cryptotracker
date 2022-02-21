import React, { useEffect } from "react";

const pics = [
  "https://assets.coingecko.com/coins/images/16125/large/Baby_Doge.png?1",
  "https://assets.coingecko.com/coins/images/13256/large/api3.jpg?1606751424",
  "https://assets.coingecko.com/coins/images/10354/large/logo-grey-circle.png?1614910406",
  "https://assets.coingecko.com/coins/images/23267/large/Ix-ms0fq_400x400.jpg?1643414048",
  "https://assets.coingecko.com/coins/images/16125/large/Baby_Doge.png?1",
  "https://assets.coingecko.com/coins/images/13256/large/api3.jpg?1606751424",
];

const tableItems = (pics) => {
  return pics.map((pic) => {
    return (
      <tr className="border-b-2 border-slate-200 h-28">
        <td className="m-auto">
          <img src={pic} alt="coin" className="h-16 w-16" />
        </td>
        <td>Malcolm Lockyer</td>
        <td>Malcolm Lockyer</td>
        <td>1961</td>
        <td>1961</td>
      </tr>
    );
  });
};

const ShowcaseTable = () => {
  return (
    <div className="mt-4">
      <table className="table-fixed w-full text-white text-center">
        <thead className="bg-yellow-300 h-12 text-black">
          <tr>
            <th></th>
            <th>Coin</th>
            <th>Price</th>
            <th>24th Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>

        <tbody>{tableItems(pics)}</tbody>
      </table>
    </div>
  );
};

export default ShowcaseTable;
