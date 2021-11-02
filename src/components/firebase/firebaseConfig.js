import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyDW_MZwQ4wqfJpgLHdbrmXzAODZ1NqtLL8",
  authDomain: "restaurant-2fe17.firebaseapp.com",
  databaseURL: "https://restaurant-2fe17-default-rtdb.firebaseio.com",
  projectId: "restaurant-2fe17",
  storageBucket: "restaurant-2fe17.appspot.com",
  messagingSenderId: "1031122206368",
  appId: "1:1031122206368:web:777970f07ece570da853c5"
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
