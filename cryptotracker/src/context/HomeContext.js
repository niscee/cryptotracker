import React, { createContext, useReducer } from "react";
import HomeReducer from "./HomeReducer";

export const HomeContextProvider = createContext();

export const HomeContext = ({ children }) => {
  const initialState = {
    cryptos: [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        image:
          "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        current_price: 37063,
        market_cap: 703964454598,
        market_cap_rank: 1,
        fully_diluted_valuation: 779509093627,
        total_volume: 25114204442,
        high_24h: 39468,
        low_24h: 36957,
        price_change_24h: -1669.151422015777,
        price_change_percentage_24h: -4.30949,
        market_cap_change_24h: -31078453415.637695,
        market_cap_change_percentage_24h: -4.22811,
        circulating_supply: 18964825,
        total_supply: 21000000,
        max_supply: 21000000,
        ath: 69045,
        ath_change_percentage: -46.23853,
        ath_date: "2021-11-10T14:24:11.849Z",
        atl: 67.81,
        atl_change_percentage: 54641.23,
        atl_date: "2013-07-06T00:00:00.000Z",
        roi: null,
        last_updated: "2022-02-21T23:44:12.651Z",
      },
      {
        id: "ethereum",
        symbol: "eth",
        name: "Ethereum",
        image:
          "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
        current_price: 2578.73,
        market_cap: 308884372113,
        market_cap_rank: 2,
        fully_diluted_valuation: null,
        total_volume: 18979122828,
        high_24h: 2754.63,
        low_24h: 2577.23,
        price_change_24h: -71.438878929776,
        price_change_percentage_24h: -2.69564,
        market_cap_change_24h: -8343515529.240662,
        market_cap_change_percentage_24h: -2.63013,
        circulating_supply: 119677949.874,
        total_supply: null,
        max_supply: null,
        ath: 4878.26,
        ath_change_percentage: -47.09252,
        ath_date: "2021-11-10T14:24:19.604Z",
        atl: 0.432979,
        atl_change_percentage: 595994.84221,
        atl_date: "2015-10-20T00:00:00.000Z",
        roi: {
          times: 92.0265122953671,
          currency: "btc",
          percentage: 9202.65122953671,
        },
        last_updated: "2022-02-21T23:43:46.364Z",
      },
      {
        id: "tether",
        symbol: "usdt",
        name: "Tether",
        image:
          "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png?1598003707",
        current_price: 0.999826,
        market_cap: 79691784850,
        market_cap_rank: 3,
        fully_diluted_valuation: null,
        total_volume: 50821825931,
        high_24h: 1.008,
        low_24h: 0.994907,
        price_change_24h: -0.001659865729,
        price_change_percentage_24h: -0.16574,
        market_cap_change_24h: 454540049,
        market_cap_change_percentage_24h: 0.57364,
        circulating_supply: 79354706739.8809,
        total_supply: 79354706739.8809,
        max_supply: null,
        ath: 1.32,
        ath_change_percentage: -24.09861,
        ath_date: "2018-07-24T00:00:00.000Z",
        atl: 0.572521,
        atl_change_percentage: 75.40802,
        atl_date: "2015-03-02T00:00:00.000Z",
        roi: null,
        last_updated: "2022-02-21T23:42:31.899Z",
      },
      {
        id: "binancecoin",
        symbol: "bnb",
        name: "BNB",
        image:
          "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",
        current_price: 357.98,
        market_cap: 60270707741,
        market_cap_rank: 4,
        fully_diluted_valuation: 60270707741,
        total_volume: 1704944003,
        high_24h: 393.88,
        low_24h: 358.46,
        price_change_24h: -25.203900373586,
        price_change_percentage_24h: -6.57749,
        market_cap_change_24h: -4259756160.9460907,
        market_cap_change_percentage_24h: -6.60116,
        circulating_supply: 168137035.9,
        total_supply: 168137035.9,
        max_supply: 168137035.9,
        ath: 686.31,
        ath_change_percentage: -47.76943,
        ath_date: "2021-05-10T07:24:17.097Z",
        atl: 0.0398177,
        atl_change_percentage: 900157.53466,
        atl_date: "2017-10-19T00:00:00.000Z",
        roi: null,
        last_updated: "2022-02-21T23:43:56.675Z",
      },
      {
        id: "usd-coin",
        symbol: "usdc",
        name: "USD Coin",
        image:
          "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389",
        current_price: 0.999928,
        market_cap: 52657400959,
        market_cap_rank: 5,
        fully_diluted_valuation: null,
        total_volume: 4246801447,
        high_24h: 1.011,
        low_24h: 0.991194,
        price_change_24h: -0.001329632993,
        price_change_percentage_24h: -0.1328,
        market_cap_change_24h: -67350099.05355835,
        market_cap_change_percentage_24h: -0.12774,
        circulating_supply: 52619975414.329,
        total_supply: 52619975414.329,
        max_supply: null,
        ath: 1.17,
        ath_change_percentage: -14.58078,
        ath_date: "2019-05-08T00:40:28.300Z",
        atl: 0.891848,
        atl_change_percentage: 12.3192,
        atl_date: "2021-05-19T13:14:05.611Z",
        roi: null,
        last_updated: "2022-02-21T23:43:54.492Z",
      },
      {
        id: "ripple",
        symbol: "xrp",
        name: "XRP",
        image:
          "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1605778731",
        current_price: 0.709368,
        market_cap: 34059097808,
        market_cap_rank: 6,
        fully_diluted_valuation: 71031508711,
        total_volume: 4427762081,
        high_24h: 0.801716,
        low_24h: 0.710315,
        price_change_24h: -0.076799784028,
        price_change_percentage_24h: -9.76889,
        market_cap_change_24h: -3651555022.807026,
        market_cap_change_percentage_24h: -9.68309,
        circulating_supply: 47949281138,
        total_supply: 100000000000,
        max_supply: 100000000000,
        ath: 3.4,
        ath_change_percentage: -79.09885,
        ath_date: "2018-01-07T00:00:00.000Z",
        atl: 0.00268621,
        atl_change_percentage: 26343.05433,
        atl_date: "2014-05-22T00:00:00.000Z",
        roi: null,
        last_updated: "2022-02-21T23:43:15.118Z",
      },
      {
        id: "cardano",
        symbol: "ada",
        name: "Cardano",
        image:
          "https://assets.coingecko.com/coins/images/975/large/cardano.png?1547034860",
        current_price: 0.865087,
        market_cap: 27756840454,
        market_cap_rank: 7,
        fully_diluted_valuation: 38952242344,
        total_volume: 1542587462,
        high_24h: 0.985941,
        low_24h: 0.865605,
        price_change_24h: -0.075171195064,
        price_change_percentage_24h: -7.99474,
        market_cap_change_24h: -2507459081.081856,
        market_cap_change_percentage_24h: -8.2852,
        circulating_supply: 32066390668.4135,
        total_supply: 45000000000,
        max_supply: 45000000000,
        ath: 3.09,
        ath_change_percentage: -71.93881,
        ath_date: "2021-09-02T06:00:10.474Z",
        atl: 0.01925275,
        atl_change_percentage: 4399.22277,
        atl_date: "2020-03-13T02:22:55.044Z",
        roi: null,
        last_updated: "2022-02-21T23:44:47.888Z",
      },
      {
        id: "solana",
        symbol: "sol",
        name: "Solana",
        image:
          "https://assets.coingecko.com/coins/images/4128/large/solana.png?1640133422",
        current_price: 83.67,
        market_cap: 26811603253,
        market_cap_rank: 8,
        fully_diluted_valuation: null,
        total_volume: 2256947700,
        high_24h: 95.91,
        low_24h: 83.84,
        price_change_24h: -8.389225850508,
        price_change_percentage_24h: -9.11321,
        market_cap_change_24h: -2686679185.576,
        market_cap_change_percentage_24h: -9.10792,
        circulating_supply: 319793033.23846,
        total_supply: 508180963.57,
        max_supply: null,
        ath: 259.96,
        ath_change_percentage: -67.8061,
        ath_date: "2021-11-06T21:54:35.825Z",
        atl: 0.500801,
        atl_change_percentage: 16611.42401,
        atl_date: "2020-05-11T19:35:23.449Z",
        roi: null,
        last_updated: "2022-02-21T23:44:21.151Z",
      },
      {
        id: "terra-luna",
        symbol: "luna",
        name: "Terra",
        image:
          "https://assets.coingecko.com/coins/images/8284/large/luna1557227471663.png?1567147072",
        current_price: 50.32,
        market_cap: 19572226299,
        market_cap_rank: 9,
        fully_diluted_valuation: 50412281894,
        total_volume: 1520061720,
        high_24h: 53.56,
        low_24h: 49.37,
        price_change_24h: 0.62566,
        price_change_percentage_24h: 1.25911,
        market_cap_change_24h: 162752329,
        market_cap_change_percentage_24h: 0.83852,
        circulating_supply: 388243213.037402,
        total_supply: 801869427.327846,
        max_supply: 1000000000,
        ath: 103.34,
        ath_change_percentage: -51.2084,
        ath_date: "2021-12-27T02:13:02.051Z",
        atl: 0.121798,
        atl_change_percentage: 41296.11796,
        atl_date: "2020-03-18T17:03:01.083Z",
        roi: null,
        last_updated: "2022-02-21T23:45:04.012Z",
      },
      {
        id: "binance-usd",
        symbol: "busd",
        name: "Binance USD",
        image:
          "https://assets.coingecko.com/coins/images/9576/large/BUSD.png?1568947766",
        current_price: 0.99699,
        market_cap: 18051518618,
        market_cap_rank: 10,
        fully_diluted_valuation: null,
        total_volume: 3536395367,
        high_24h: 1.02,
        low_24h: 0.982592,
        price_change_24h: -0.005432657822,
        price_change_percentage_24h: -0.54195,
        market_cap_change_24h: -125486749.06877136,
        market_cap_change_percentage_24h: -0.69036,
        circulating_supply: 18110422307.31,
        total_supply: 18110422307.31,
        max_supply: null,
        ath: 1.15,
        ath_change_percentage: -13.51109,
        ath_date: "2020-03-13T02:35:42.953Z",
        atl: 0.901127,
        atl_change_percentage: 10.77886,
        atl_date: "2021-05-19T13:04:37.445Z",
        roi: null,
        last_updated: "2022-02-21T23:43:38.441Z",
      },
      {
        id: "polkadot",
        symbol: "dot",
        name: "Polkadot",
        image:
          "https://assets.coingecko.com/coins/images/12171/large/polkadot.png?1639712644",
        current_price: 16.21,
        market_cap: 17613797726,
        market_cap_rank: 11,
        fully_diluted_valuation: null,
        total_volume: 931489236,
        high_24h: 17.7,
        low_24h: 16.2,
        price_change_24h: -0.888056082689,
        price_change_percentage_24h: -5.19437,
        market_cap_change_24h: -1015938279.6983185,
        market_cap_change_percentage_24h: -5.45332,
        circulating_supply: 1086674373.80167,
        total_supply: 1167623506.70607,
        max_supply: null,
        ath: 54.98,
        ath_change_percentage: -70.47449,
        ath_date: "2021-11-04T14:10:09.301Z",
        atl: 2.7,
        atl_change_percentage: 501.80384,
        atl_date: "2020-08-20T05:48:11.359Z",
        roi: null,
        last_updated: "2022-02-21T23:45:08.040Z",
      },
      {
        id: "avalanche-2",
        symbol: "AVAX",
        name: "Avalanche",
        image:
          "https://assets.coingecko.com/coins/images/12559/large/coin-round-red.png?1604021818",
        current_price: 70.45,
        market_cap: 17342242868,
        market_cap_rank: 12,
        fully_diluted_valuation: 50879426520,
        total_volume: 1242583766,
        high_24h: 82.56,
        low_24h: 70.67,
        price_change_24h: -7.813735859674,
        price_change_percentage_24h: -9.9842,
        market_cap_change_24h: -1878200295.4966354,
        market_cap_change_percentage_24h: -9.77189,
        circulating_supply: 245411863.280518,
        total_supply: 377752194.4695483,
        max_supply: 720000000,
        ath: 144.96,
        ath_change_percentage: -51.36097,
        ath_date: "2021-11-21T14:18:56.538Z",
        atl: 2.8,
        atl_change_percentage: 2417.17627,
        atl_date: "2020-12-31T13:15:21.540Z",
        roi: null,
        last_updated: "2022-02-21T23:44:31.727Z",
      },
      {
        id: "dogecoin",
        symbol: "doge",
        name: "Dogecoin",
        image:
          "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1547792256",
        current_price: 0.129402,
        market_cap: 17165631596,
        market_cap_rank: 13,
        fully_diluted_valuation: null,
        total_volume: 726959530,
        high_24h: 0.141085,
        low_24h: 0.129385,
        price_change_24h: -0.00845040488,
        price_change_percentage_24h: -6.13002,
        market_cap_change_24h: -1142418699.8103027,
        market_cap_change_percentage_24h: -6.23998,
        circulating_supply: 132670764299.894,
        total_supply: null,
        max_supply: null,
        ath: 0.731578,
        ath_change_percentage: -82.31423,
        ath_date: "2021-05-08T05:08:23.458Z",
        atl: 0.0000869,
        atl_change_percentage: 148783.30571,
        atl_date: "2015-05-06T00:00:00.000Z",
        roi: null,
        last_updated: "2022-02-21T23:45:06.272Z",
      },
      {
        id: "shiba-inu",
        symbol: "shib",
        name: "Shiba Inu",
        image:
          "https://assets.coingecko.com/coins/images/11939/large/shiba.png?1622619446",
        current_price: 0.00002429,
        market_cap: 13354757082,
        market_cap_rank: 14,
        fully_diluted_valuation: null,
        total_volume: 1359214230,
        high_24h: 0.00002751,
        low_24h: 0.00002432,
        price_change_24h: -0.000001473409,
        price_change_percentage_24h: -5.71892,
        market_cap_change_24h: -805847369.9546089,
        market_cap_change_percentage_24h: -5.69077,
        circulating_supply: 549147116493103,
        total_supply: 1000000000000000,
        max_supply: null,
        ath: 0.00008616,
        ath_change_percentage: -71.81072,
        ath_date: "2021-10-28T03:54:55.568Z",
        atl: 5.6e-11,
        atl_change_percentage: 43088600.84561,
        atl_date: "2020-11-28T11:26:25.838Z",
        roi: null,
        last_updated: "2022-02-21T23:44:05.298Z",
      },
      {
        id: "terrausd",
        symbol: "ust",
        name: "TerraUSD",
        image:
          "https://assets.coingecko.com/coins/images/12681/large/UST.png?1601612407",
        current_price: 1.004,
        market_cap: 12171191831,
        market_cap_rank: 15,
        fully_diluted_valuation: null,
        total_volume: 385370476,
        high_24h: 1.014,
        low_24h: 0.992465,
        price_change_24h: 0.00079997,
        price_change_percentage_24h: 0.07975,
        market_cap_change_24h: 53589444,
        market_cap_change_percentage_24h: 0.44224,
        circulating_supply: 12135043874.597,
        total_supply: 12134930791.75,
        max_supply: null,
        ath: 1.092,
        ath_change_percentage: -8.02414,
        ath_date: "2021-01-11T22:30:57.984Z",
        atl: 0.857992,
        atl_change_percentage: 17.0513,
        atl_date: "2021-05-19T13:14:26.898Z",
        roi: null,
        last_updated: "2022-02-21T23:45:11.238Z",
      },
    ],
    searchCoin: [],
    loading: false,
  };

  // initializing reducer
  const [state, dispatch] = useReducer(HomeReducer, initialState);

  // set all available coins.
  const setCoins = (results) => {
    try {
      const final_results = [...results];
      dispatch({
        type: "SET_COINS",
        payload: results,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  // set search coin.
  const setSearch = (val) => {
    try {
      if (val) {
        dispatch({
          type: "SEARCH_COIN",
          payload: val,
        });
      } else {
        dispatch({
          type: "SEARCH_COIN_EMPTY",
          payload: val,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <HomeContextProvider.Provider
      value={{
        cryptos: state.cryptos,
        searchCoin: state.searchCoin,
        setCoins,
        setSearch,
      }}
    >
      {children}
    </HomeContextProvider.Provider>
  );
};
