import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDwHr8SEBnrIRdLqs_0yqxs7OISh2TD6jw",
  authDomain: "chat-app-f7a2c.firebaseapp.com",
  projectId: "chat-app-f7a2c",
  storageBucket: "chat-app-f7a2c.appspot.com",
  messagingSenderId: "729456141060",
  appId: "1:729456141060:web:8d5f779f1f976411786651",
  measurementId: "G-LHKQGJXW61"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const dataBase = getDatabase(app);
