import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrXAhRzLfo7cyQXyKKC0D3-oN8-h5btSA",
  authDomain: "chordex-54eb0.firebaseapp.com",
  projectId: "chordex-54eb0",
  storageBucket: "chordex-54eb0.appspot.com",
  messagingSenderId: "275592631859",
  appId: "1:275592631859:web:e104ac3ff0d1f5356c3546",
  // measurementId: "G-9XE2V1QFHM" dd
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// To apply the default browser preference instead of explicitly setting it.
// auth.useDeviceLanguage()

export { auth };
// const analytics = getAnalytics(app);
