import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Your actual config is fine
const firebaseConfig = {
  apiKey: "AIzaSyAhqk6NVe98OuOu5_hfQfIqm3l8N3teyKE",
  authDomain: "messages-ddd2c.firebaseapp.com",
  projectId: "messages-ddd2c",
  storageBucket: "messages-ddd2c.appspot.com", // ✅ use .appspot.com not .app
  messagingSenderId: "1015630686257",
  appId: "1:1015630686257:web:92aa305964d9b9d77c4d10",
  measurementId: "G-55DSEF4WRP"
};

// ✅ Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ✅ This line is important