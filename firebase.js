import firebase from "firebase";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAXtiM975owhum66gwnkjSuyo87JCeZcU",
  authDomain: "whatsapp-next-f77b2.firebaseapp.com",
  projectId: "whatsapp-next-f77b2",
  storageBucket: "whatsapp-next-f77b2.appspot.com",
  messagingSenderId: "19621155839",
  appId: "1:19621155839:web:17957de597577ab3a5cdca",
  measurementId: "G-48Z7GE07F0",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
