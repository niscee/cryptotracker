import React, { useEffect } from "react";

const UserDashboardWatchlist = ({
  getCurrencyWatchlist,
  watchlist,
  user,
  deleteCurrencyWatchlist,
}) => {
  useEffect(() => {
    getCurrencyWatchlist();
  }, [user]);

  return (
    <div className="md:w-[50%] mt-12 m-auto text-center">
      <p className="text-lg md:text-3xl font-bold text-yellow-300">
        - My WatchList -
      </p>
      <div className="p-4 text-sm md:text-lg h-[250px] md:h-full overflow-auto">
        {watchlist &&
          watchlist.map((item, key) => {
            return (
              <div
                key={key}
                className="bg-red-500 border-2 border-black text-white flex items-center justify-between flex-wrap p-2 md:w-[80%] mt-2 m-auto rounded"
              >
                <p>{item.currency}</p>
                <p>{item.symbol}</p>
                <button
                  onClick={() => {
                    deleteCurrencyWatchlist(item.id);
                  }}
                >
                  ❎
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserDashboardWatchlist;
