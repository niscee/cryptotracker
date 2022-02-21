import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HomeContext } from "./context/HomeContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <HomeContext>
        <App />
      </HomeContext>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
