export const CoinList = (currency) => {
  return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
};

export const Trending = "https://api.coingecko.com/api/v3/search/trending";

export const CoinDetail = (coin) => {
  return `https://api.coingecko.com/api/v3/coins/${coin}`;
};

export const CoinMarketChart = (coin) => {
  return `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=100&interval=weekly`;
};
