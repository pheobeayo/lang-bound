import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, EmailAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyD9zneTyHyRJalxiBBXHHep3BUbYo6GjfQ",

  authDomain: "lacent20-f6930.firebaseapp.com",

  projectId: "lacent20-f6930",

  storageBucket: "lacent20-f6930.appspot.com",

  messagingSenderId: "179571536605",

  appId: "1:179571536605:web:a1909ba9b2866c9f46e134"

};


let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new EmailAuthProvider();

export { provider, auth, app, db };