export default (state, action) => {
  switch (action.type) {
    case "SET_COINS":
      return {
        ...state,
        cryptos: action.payload,
      };

    case "SEARCH_COIN":
      return {
        ...state,
        searchCoin: state.cryptos.filter((item) => {
          return (
            item.id.toLowerCase().includes(action.payload) ||
            item.symbol.toLowerCase().includes(action.payload)
          );
        }),
      };
    case "SEARCH_COIN_EMPTY":
      return {
        ...state,
        searchCoin: [],
      };
  }
};
