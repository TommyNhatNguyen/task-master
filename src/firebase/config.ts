// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7RxSUsUfXvRkPwp66gu_vG9N0X6z0D8k",
  authDomain: "chat-app-88d8f.firebaseapp.com",
  projectId: "chat-app-88d8f",
  storageBucket: "chat-app-88d8f.appspot.com",
  messagingSenderId: "401423416709",
  appId: "1:401423416709:web:2169317e34e02e49f898ec",
  measurementId: "G-FMWED34MRY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
