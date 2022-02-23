import React from "react";
import 'chart.js/auto';
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [12, 22, 33],
    },
  ],
};

const Test = () => {
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default Test;
