// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ8pHNYNiWLwyuUkTbbtcauz8-1L5M8mE",
  authDomain: "astro-authentication-4a7b1.firebaseapp.com",
  projectId: "astro-authentication-4a7b1",
  storageBucket: "astro-authentication-4a7b1.firebasestorage.app",
  messagingSenderId: "722043827319",
  appId: "1:722043827319:web:d1405573932080c2db4272"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'es';

export const firebase = {
  app,
  auth
}
