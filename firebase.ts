import firebase from 'firebase';

// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyDwxebMEJ__w9FWSw3LOo7Pzym8rNL7wwo",
   authDomain: "rn-locations.firebaseapp.com",
   databaseURL: "https://rn-locations-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "rn-locations",
   storageBucket: "rn-locations.appspot.com",
   messagingSenderId: "411453139351",
   appId: "1:411453139351:web:8cb8d0082703c92b06bcd2",
   measurementId: "G-41V029H32T"
 };

 const firebaseInit = firebase.initializeApp(firebaseConfig);
 
 export default firebaseInit;
 