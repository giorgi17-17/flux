import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: "flux-57fcb.firebaseapp.com",
  projectId: "flux-57fcb",
  storageBucket: "flux-57fcb.appspot.com",
  messagingSenderId: "890785384769",
  appId: "1:890785384769:web:3a5820c496391054d679c0",
  measurementId: "G-6WPJ0W7R48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
// export {auth, provider}