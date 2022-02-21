import React from "react";
import Showcase from "./Showcase";
import SingleCurrency from "./SingleCurrency";
import { Routes, Route } from "react-router-dom";
import NoMatch from "./NoMatch";

const RouteCollection = () => {
  const route_list = [
    { url: "/", element: <Showcase /> },
    { url: "/detail", element: <SingleCurrency /> },
  ];
  return (
    <Routes>
      {route_list.map((list, key) => {
        return <Route key={key} path={list.url} element={list.element}></Route>;
      })}
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default RouteCollection;
