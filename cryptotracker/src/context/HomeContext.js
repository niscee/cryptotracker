import React, { createContext } from "react";

export const HomeContextProvider = createContext();

export const HomeContext = ({ children }) => {
  const initialState = {
    cryptos: null,
  };
  return (
    <HomeContextProvider.Provider value={{ cryptos: initialState.cryptos }}>
      {children}
    </HomeContextProvider.Provider>
  );
};
