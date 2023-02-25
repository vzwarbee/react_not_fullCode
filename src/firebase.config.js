


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6k_AD6KHAYb0nyUhAoORcvJbZEarM9f4",
    authDomain: "maltimart-dece5.firebaseapp.com",
    projectId: "maltimart-dece5",
    storageBucket: "maltimart-dece5.appspot.com",
    messagingSenderId: "202742768399",
    appId: "1:202742768399:web:d3a8cbce7d6f56d8fcd47a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;