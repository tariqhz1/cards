/// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq4eO1Fme6TwCFR3kTyqJhJc95ccFPsRU",
  authDomain: "cards-b5bba.firebaseapp.com",
  projectId: "cards-b5bba",
  storageBucket: "cards-b5bba.appspot.com",
  messagingSenderId: "83450526037",
  appId: "1:83450526037:web:587729b23e24a2c5e317dc",
  measurementId: "G-920KLJBC1K"
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
