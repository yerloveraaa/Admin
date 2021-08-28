import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyCeB910YPS1oJI9af8WDYZRtJJtSR8H3xU",
  authDomain: "jmsdevstudio.firebaseapp.com",
  databaseURL: "https://jmsdevstudio-default-rtdb.firebaseio.com",
  projectId: "jmsdevstudio",
  storageBucket: "jmsdevstudio.appspot.com",
  messagingSenderId: "254310668330",
  appId: "1:254310668330:web:0d4092fcd28b0fab5d8b53",
  measurementId: "G-KQSGKQCP67"
};

firebase.initializeApp(firebaseConfig);



const db = firebase.firestore();
const storage = firebase.storage()
const message =  firebase.messaging()
const auth = firebase.auth;
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


// if (window.location.hostname === "localhost") {
//   db.useEmulator('localhost', 8083);
//   auth().useEmulator('http://localhost:5002', { disableWarnings: true });
// }

export {
    db,
    googleAuthProvider,
    firebase,
    storage,
    message
}