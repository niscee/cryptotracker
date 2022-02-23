import React from "react";
import ShowcaseHeading from "./ShowcaseHeading";
import InputField from "./InputField";
import ShowcaseTable from "./ShowcaseTable";
import Header from "./Header";

const Showcase = () => {
  return (
    <>
      <Header />
      <div className="w-full mt-12 md:mt-24">
        <div className="w-[90%] md:w-[80%] m-auto">
          <ShowcaseHeading />
          <InputField />
          <div className="">
            <ShowcaseTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Showcase;
