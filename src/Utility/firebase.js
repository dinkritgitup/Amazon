
import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth'
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxapfG19Vl3FXDC-DXQ8S5f2mcYm6iuGE",
  authDomain: "clone-5fb1e.firebaseapp.com",
  projectId: "clone-5fb1e",
  storageBucket: "clone-5fb1e.firebasestorage.app",
  messagingSenderId: "413891581755",
  appId: "1:413891581755:web:2f22573ef9c963807c091e",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()
