// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMUwxWzVCvsk1rn_lmlsA-y7hG1Q_cf-Y",
  authDomain: "my-contact-app-7d74a.firebaseapp.com",
  projectId: "my-contact-app-7d74a",
  storageBucket: "my-contact-app-7d74a.appspot.com",
  messagingSenderId: "454921522839",
  appId: "1:454921522839:web:a70be9b2ec84c0f5afe3d2",
  measurementId: "G-2SYM5SJGRX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
const analytics = getAnalytics(app);