// firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//     appId: import.meta.env.VITE_FIREBASE_APP_ID,
//     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyBQ5BEx6WKA1wWig4qjH5quM2rjVh9OweM",
  authDomain: "eco-adventure-website.firebaseapp.com",
  projectId: "eco-adventure-website",
  storageBucket: "eco-adventure-website.firebasestorage.app",
  messagingSenderId: "779536370966",
  appId: "1:779536370966:web:a00d566bdf9a405a451437",
  measurementId: "G-Z6PW547326"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
