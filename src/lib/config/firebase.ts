// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj-az6HTyHMaCMWhX91a7qXNzBJXZZRMk",
  authDomain: "latinassexc.firebaseapp.com",
  projectId: "latinassexc",
  storageBucket: "latinassexc.appspot.com",
  messagingSenderId: "657959277000",
  appId: "1:657959277000:web:3482a161eef2c067f1f0fd",
  measurementId: "G-CSEBP0Q76L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const storage = getStorage(app);