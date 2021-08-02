import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBsv2UvDfWjm6f31B7T1GPEMA0q_MULVZk",
  authDomain: "jms-eats-70330.firebaseapp.com",
  projectId: "jms-eats-70330",
  storageBucket: "jms-eats-70330.appspot.com",
  messagingSenderId: "371776288397",
  appId: "1:371776288397:web:41234305fbea4a40ac54c4",
  measurementId: "G-8688R4M7VM",
};

firebase.initializeApp(firebaseConfig);



const db = firebase.firestore();
const storage = firebase.storage()
const auth = firebase.auth;
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


if (window.location.hostname === "localhost") {
  db.useEmulator('localhost', 8082);
  auth().useEmulator('http://localhost:9099/', { disableWarnings: true });
}

export {
    db,
    googleAuthProvider,
    firebase,
    storage
}