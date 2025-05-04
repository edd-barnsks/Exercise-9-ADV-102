import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBlKu5tM5ZzErrS2H0ro2nab46_bVqwL00",
    authDomain: "adv-exercise-9-c4ff8.firebaseapp.com",
    projectId: "adv-exercise-9-c4ff8",
    storageBucket: "adv-exercise-9-c4ff8.firebasestorage.app",
    messagingSenderId: "1060330666464",
    appId: "1:1060330666464:web:c3a683b767cd2a68b9d385",
    measurementId: "G-F9H856FJGB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage  };