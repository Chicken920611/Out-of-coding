// GRID // ARCADE — shared Firebase config
//
// 1. Go to https://console.firebase.google.com -> Add project (free tier is plenty).
// 2. In the project, go to Build > Firestore Database -> Create database
//    -> start in production mode (we set explicit rules below) -> pick any region.
// 3. Go to Project settings (gear icon) > General > "Your apps" > click the
//    </> (web) icon to register a web app -> copy the firebaseConfig object
//    it gives you and paste the values in below.
// 4. In Firestore -> Rules, paste the ruleset from firestore.rules (in this
//    same folder) and click Publish.
// 5. Commit this file with your real values and push — GitHub Pages will
//    serve it just like any other static file. The apiKey here is safe to
//    expose publicly; it only identifies your project, it is not a secret.
//    Firestore Rules (step 4) are what actually control access.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp-i5FEUqQpQh3JJrWXOweKYzlIne14Ts",
  authDomain: "getoutfromcoding.firebaseapp.com",
  projectId: "getoutfromcoding",
  storageBucket: "getoutfromcoding.firebasestorage.app",
  messagingSenderId: "425564652854",
  appId: "1:425564652854:web:489f4adca78a8f35b3df97",
  measurementId: "G-KG0068479S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = firebase.firestore();
