import { initializeApp } from "firebase/app";
import firebaseConfig from "./config/firebaseconfig";
import { getFirestore } from "firebase/firestore"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, provider, signInWithPopup, GoogleAuthProvider, signOut, db };
