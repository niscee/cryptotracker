import Navbar from "./components/Navbar";
import RouteCollection from "./components/RouteCollection";
import React, { useContext } from "react";
import Notification from "./components/Notification";
import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  const { notify } = useContext(AuthContextProvider);
  return (
    <div>
      {notify && <Notification />}
      <Navbar />
      <RouteCollection />
    </div>
  );
};

export default App;
