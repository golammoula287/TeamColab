// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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