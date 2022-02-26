import React, { createContext, useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  db,
} from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export const AuthContextProvider = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState(null);
  const [notify, setNotify] = useState(false);

  // user sign in.
  const signInUser = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUser(user.providerData[0]);
    } catch (e) {
      console.log(e.message);
    }
  };

  // user signout.
  const signOutUser = async () => {
    try {
      const res = await signOut(auth);
      setUser(null);
    } catch (e) {
      console.log(e.message);
    }
  };

  // add currency to watchlist.
  const addCurrencyWatchlist = async (currency, symbol) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        currency: currency,
        google_id: user.uid,
        symbol: symbol,
      });
      setNotify(true);
      setTimeout(() => {
        setNotify(false);
      }, 2000);
    } catch (e) {
      console.log(e.message);
    }
  };

  // get user watchlisted currency.
  const getCurrencyWatchlist = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("google_id", "==", user.uid.toString())
      );
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setWatchlist(results);
    } catch (e) {
      console.log(e.message);
    }
  };

  // delete currency from watchlist.
  const deleteCurrencyWatchlist = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setWatchlist(
        watchlist.filter((item) => {
          return id !== item.id;
        })
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <AuthContextProvider.Provider
      value={{
        user: user,
        signInUser,
        signOutUser,
        addCurrencyWatchlist,
        getCurrencyWatchlist,
        watchlist,
        deleteCurrencyWatchlist,
        notify,
      }}
    >
      {children}
    </AuthContextProvider.Provider>
  );
};
