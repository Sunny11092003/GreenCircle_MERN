// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
