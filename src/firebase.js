// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHlppkQ0CGV3cxs3IT4ybrOC2p4QmZ8lo",
  authDomain: "treeqrsystem.firebaseapp.com",
  databaseURL: "https://treeqrsystem-default-rtdb.firebaseio.com",
  projectId: "treeqrsystem",
  storageBucket: "treeqrsystem.firebasestorage.app",
  messagingSenderId: "391723015713",
  appId: "1:391723015713:web:2f85beae0f23fb89b44d60",
  measurementId: "G-HLS37X56H7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database & Auth
export const db = getDatabase(app);
export const auth = getAuth(app);

// Sign in anonymously once
signInAnonymously(auth)
  .then(() => console.log("✅ Signed in anonymously"))
  .catch((err) => console.error("❌ Anonymous login failed", err));
