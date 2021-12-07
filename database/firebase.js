// database/firebaseDb.js

import  firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCJHwCa1Ly1eh6pkIuM7NK1q9yMgrlbLXo",
  authDomain: "etdmiu2.firebaseapp.com",
  databaseURL: "https://etdmiu2-default-rtdb.firebaseio.com",
  projectId: "etdmiu2",
  storageBucket: "etdmiu2.appspot.com",
  messagingSenderId: "366052477419",
  appId: "1:366052477419:web:b10fd036184a8d659d31ae",
  measurementId: "G-MV7N65VD4P"
};


firebase.initializeApp(firebaseConfig);

export default firebase;