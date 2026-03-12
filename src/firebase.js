import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmtk2-9y_Q6PDJlpKBn_7nuj3gm6qUZZU",
  authDomain: "devils-in-me.firebaseapp.com",
  projectId: "devils-in-me",
  storageBucket: "devils-in-me.firebasestorage.app",
  messagingSenderId: "935239820725",
  appId: "1:935239820725:web:492e06eed13457c3fd65fc",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
