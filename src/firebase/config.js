

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlFI-kDBdSxaKcY2bsB-Z5lB-kvgqYTxQ",
  authDomain: "expense-tracker-145.firebaseapp.com",
  projectId: "expense-tracker-145",
  storageBucket: "expense-tracker-145.firebasestorage.app",
  messagingSenderId: "606401554720",
  appId: "1:606401554720:web:431285fd875a4efb254f45",
  measurementId: "G-N8HZH65W14"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Auth instance — used for login, signup, logout
export const auth = getAuth(app);

// Google provider — used for "Sign in with Google"
export const googleProvider = new GoogleAuthProvider();

// Firestore instance — used for all database operations
export const db = getFirestore(app);
