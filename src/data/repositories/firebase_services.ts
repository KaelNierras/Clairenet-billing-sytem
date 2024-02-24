// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Customer } from '@/models/customer/customer_model';
import { UserCredentials } from "@/models/authentication/login_model";

// Initialize Firebase when the module is loaded
const config = {
    apiKey: "AIzaSyCyhAz712ZUOAiesBerbeKh9P39GFEP7K4",
    authDomain: "clairenet-billing-system.firebaseapp.com",
    projectId: "clairenet-billing-system",
    storageBucket: "clairenet-billing-system.appspot.com",
    messagingSenderId: "914202204276",
    appId: "1:914202204276:web:b0855dc27f3420751d1921"
};
const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

export const signInWithEmail = async (user: UserCredentials) => {
  try {
    await signInWithEmailAndPassword(auth, user.email, user.password);
  } catch (error: any) {
    console.log(error.message);
    throw error;
  } 
};

export const addUserData = async (user: Customer) => {
    try {
        await setDoc(doc(db, 'users'), {
            customerName: user.customerName,
            address: user.address,
            createdDate: user.createdDate,
            status: user.status,
        });
        console.log('User data added successfully!');
    } catch (error) {
        console.error('Error adding user data:', error);
        throw error;
    }
};