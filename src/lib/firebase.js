import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBB8PkUWDmRpr3ZOV2z9m9Mev8hEO4S1gw",
  authDomain: "react-chat-app-25799.firebaseapp.com",
  projectId: "react-chat-app-25799",
  storageBucket: "react-chat-app-25799.appspot.com",
  messagingSenderId: "531721096206",
  appId: "1:531721096206:web:f57b3bba09bcb406cdc05f",
  measurementId: "G-FBEWESCHZ9",
};

initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
