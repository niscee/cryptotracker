import React, { useContext } from "react";
import UserDashboardNavbar from "./UserDashboardNavbar";
import UserDashboardImage from "./UserDashboardImage";
import UserDashboardWatchlist from "./UserDashboardWatchlist";
import { AuthContextProvider } from "../context/AuthContext";

const UserDashboard = ({ setOpen, open, user }) => {
  const {
    signInUser,
    signOutUser,
    getCurrencyWatchlist,
    watchlist,
    deleteCurrencyWatchlist,
  } = useContext(AuthContextProvider);
  return (
    <div className="userdashboard fixed top-0 right-0 h-[100%] drop-shadow-2xl w-[80%] md:w-[40%] z-10 text-white">
      <UserDashboardNavbar
        open={open}
        setOpen={setOpen}
        user={user}
        signOutUser={signOutUser}
      />
      {user ? (
        <>
          <UserDashboardImage user={user} />
          <UserDashboardWatchlist
            getCurrencyWatchlist={getCurrencyWatchlist}
            watchlist={watchlist}
            user={user}
            deleteCurrencyWatchlist={deleteCurrencyWatchlist}
          />
        </>
      ) : (
        <div className="w-[50%] h-screen m-auto flex items-center justify-center">
          <button
            className="bg-blue-500 px-8 py-2 text-white font-bold border-2 border-white"
            onClick={() => {
              signInUser();
            }}
          >
            Sign In With Google
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
