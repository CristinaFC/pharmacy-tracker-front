// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import 'firebase/auth';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRLLDaVK-mIj8GgPlaiWEv9DqbVehXLOM",
  authDomain: "pharmacytracker-e3700.firebaseapp.com",
  projectId: "pharmacytracker-e3700",
  storageBucket: "pharmacytracker-e3700.appspot.com",
  messagingSenderId: "333588286777",
  appId: "1:333588286777:web:d16280bf7ffe54519aace8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
