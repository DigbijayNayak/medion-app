// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBef6MiXjHrAxcq3B0JMWu6IpkBAZcXMDM",
  authDomain: "medion-app-8e581.firebaseapp.com",
  projectId: "medion-app-8e581",
  storageBucket: "medion-app-8e581.appspot.com",
  messagingSenderId: "1086877097278",
  appId: "1:1086877097278:web:ecc0f7b34b89ffa92ca06f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);