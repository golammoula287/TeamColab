
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "ibizansaas.firebaseapp.com",
  projectId: "ibizansaas",
  storageBucket: "ibizansaas.firebasestorage.app",
  messagingSenderId: "110087878761",
  appId: "1:110087878761:web:f651afc4412a78e9644af8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);