// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCyhAz712ZUOAiesBerbeKh9P39GFEP7K4",
    authDomain: "clairenet-billing-system.firebaseapp.com",
    projectId: "clairenet-billing-system",
    storageBucket: "clairenet-billing-system.appspot.com",
    messagingSenderId: "914202204276",
    appId: "1:914202204276:web:b0855dc27f3420751d1921"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };