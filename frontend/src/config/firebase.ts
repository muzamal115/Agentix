import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "agentix-33a95.firebaseapp.com",
  projectId: "agentix-33a95",
  storageBucket: "agentix-33a95.firebasestorage.app",
  messagingSenderId: "1053728744811",
  appId: "1:1053728744811:web:ac173311934b4c1571982e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();