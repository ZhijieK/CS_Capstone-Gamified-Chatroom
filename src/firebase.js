import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5XkJcYUHBwm5ZQBm4l8vjOvQUbNVMiRU",
  authDomain: "gamified-chatroom-db9aa.firebaseapp.com",
  projectId: "gamified-chatroom-db9aa",
  storageBucket: "gamified-chatroom-db9aa.appspot.com",
  messagingSenderId: "663395097278",
  appId: "1:663395097278:web:03475731a4beda59335cef"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore();
export const storage = getStorage(app);