// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxnVjt-_77LDFc3ZI2kjKBvmVVYUOuV6c",
  authDomain: "pronadjise-9ff8f.firebaseapp.com",
  projectId: "pronadjise-9ff8f",
  storageBucket: "pronadjise-9ff8f.firebasestorage.app",
  messagingSenderId: "494188187068",
  appId: "1:494188187068:web:4dacac480cdf2e12042fb9",
  measurementId: "G-Q4FZZ4QLET",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
