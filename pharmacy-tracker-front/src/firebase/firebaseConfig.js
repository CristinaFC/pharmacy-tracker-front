// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/auth';
import 'firebase/firestore';
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


export const createUserDocument = async (user) => {
  if (!user) return;

  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const {email} = user;

    try {
      userRef.set({
        email,
      })
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
}
