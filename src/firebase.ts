// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNNCwEdeYZFvtjtO_kTPUqSraFjp6rons",
  authDomain: "conterpoint-7df1e.firebaseapp.com",
  projectId: "conterpoint-7df1e",
  storageBucket: "conterpoint-7df1e.appspot.com",
  messagingSenderId: "337461369997",
  appId: "1:337461369997:web:068ad08703c4ec9d5796c4",
  measurementId: "G-HG6YYEVYB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default getFirestore(app);