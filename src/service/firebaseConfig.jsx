// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT78wiSdSQjYCUme9P7SJNsxHrbLrsGEY",
  authDomain: "horizon-f2795.firebaseapp.com",
  projectId: "horizon-f2795",
  storageBucket: "horizon-f2795.firebasestorage.app",
  messagingSenderId: "1000819347901",
  appId: "1:1000819347901:web:036c219b2f2c34aee342d4",
  measurementId: "G-57LP8JX5Y9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();