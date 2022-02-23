import React, { useContext } from "react";
import { HomeContextProvider } from "../context/HomeContext";

const InputField = () => {
  const { setSearch } = useContext(HomeContextProvider);

  const inputHandler = (val) => {
    setSearch(val);
  };

  return (
    <div className="mt-8">
      <input
        className="bg-black border border-gray-600 w-full p-4 rounded text-white focus:outline-none"
        placeholder="Search for your favourite cryptocurrency......"
        type="text"
        name="search"
        onChange={(e) => {
          inputHandler(e.target.value);
        }}
      />
    </div>
  );
};

export default InputField;
