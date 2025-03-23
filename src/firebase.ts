import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, onSnapshot, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-9_SZi5CaKQJ5UFkNHqYKNz7sNPcDGpE",
  authDomain: "portfolio-likes-54822.firebaseapp.com",
  projectId: "portfolio-likes-54822",
  storageBucket: "portfolio-likes-54822.firebasestorage.app",
  messagingSenderId: "1033940459876",
  appId: "1:1033940459876:web:8b4e1be772c9631542da71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);