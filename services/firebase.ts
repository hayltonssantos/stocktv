// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGkA51n-RKG1pK_3ZJH-ieljuYBxULUVA",
  authDomain: "armazem-torres-vedras.firebaseapp.com",
  projectId: "armazem-torres-vedras",
  storageBucket: "armazem-torres-vedras.appspot.com",
  messagingSenderId: "732216106792",
  appId: "1:732216106792:web:c36152d6a4240df852ba1d",
  measurementId: "G-5S2X55912H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;