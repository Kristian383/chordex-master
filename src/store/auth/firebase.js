import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: `${process.env.VUE_APP_FIREBASE_API_KEY}`,
  authDomain: "chordex-54eb0.firebaseapp.com",
  projectId: "chordex-54eb0",
  storageBucket: `${process.env.VUE_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.VUE_APP_FIREBASE_APP_ID}`,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
