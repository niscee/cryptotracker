import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const SingleCurrrencyChart = ({ chart }) => {
  const data = {
    labels: chart.map((item) => {
      const new_date = new Date(item[0]).toLocaleDateString("en-US");
      return new_date;
    }),
    datasets: [
      {
        data: chart.map((item) => {
          return item[1];
        }),
        fill: true,
        lineTension: 0.5,
        backgroundColor: "yellow",
        borderColor: "black",
        borderWidth: 2,
        label: "Price (Past 365 days)",
      },
    ],
  };
  return (
    <div className="text-white p-2 mt-8">
      <Line data={data} />
    </div>
  );
};

export default SingleCurrrencyChart;
