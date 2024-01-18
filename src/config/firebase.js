import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-uZaRYBZOp_Uw7NKiyceEyhPqoFyOiM4",
  authDomain: "it-todo-list-manager.firebaseapp.com",
  projectId: "it-todo-list-manager",
  storageBucket: "it-todo-list-manager.appspot.com",
  messagingSenderId: "659917381894",
  appId: "1:659917381894:web:d32d519f2384376d25be87",
  measurementId: "G-ER836YB91Y"
};


firebase.initializeApp(firebaseConfig);

export default firebase;