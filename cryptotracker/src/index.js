import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HomeContext } from "./context/HomeContext";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContext>
        <HomeContext>
          <App />
        </HomeContext>
      </AuthContext>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
