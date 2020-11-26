import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCzvP863tvpY-cRP3sNkxTgkFJs7fuT8bk",
  authDomain: "bamit-30312s.firebaseapp.com",
  databaseURL: "https://bamit-30312s.firebaseio.com",
  projectId: "bamit-30312s",
  storageBucket: "bamit-30312s.appspot.com",
  messagingSenderId: "84093899258",
  appId: "1:84093899258:web:6effb59324c50d18a85443",
  measurementId: "G-D7QF01BE4J",
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export default db;
