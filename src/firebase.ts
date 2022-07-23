// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPBV0DSGuads7uazNutNZQN-AH9FwxXK0",
  authDomain: "medion-app-b9d1d.firebaseapp.com",
  projectId: "medion-app-b9d1d",
  storageBucket: "medion-app-b9d1d.appspot.com",
  messagingSenderId: "714630622896",
  appId: "1:714630622896:web:efa0d1ac6055bd84d05575"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);