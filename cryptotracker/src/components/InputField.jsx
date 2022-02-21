import React from "react";

const InputField = () => {
  return (
    <div className="mt-8">
      <input
        className="bg-black border border-gray-600 w-full p-4 rounded text-white"
        placeholder="Search for your favourite cryptocurrency......"
        type="text"
        name="search"
      />
    </div>
  );
};

export default InputField;
