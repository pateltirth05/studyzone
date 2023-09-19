import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyAEhVXebZWQf6cgtbuerle4TfCoIbqgyNc",
    authDomain: "studyzone5.firebaseapp.com",
    projectId: "studyzone5",
    storageBucket: "studyzone5.appspot.com",
    messagingSenderId: "953021686005",
    appId: "1:953021686005:web:fa4160e79c15fe8cf2e5bc",
    measurementId: "G-WBHFRKX0XJ"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);
export {auth,app,db,storage};