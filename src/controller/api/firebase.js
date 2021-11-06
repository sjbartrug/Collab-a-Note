import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAaqe7DUZtloUrEasDSdF31X949ZnRn1Gw",
  authDomain: "collab-a-note.firebaseapp.com",
  databaseURL: "https://collab-a-note.firebaseio.com",
  projectId: "collab-a-note",
  storageBucket: "collab-a-note.appspot.com",
  messagingSenderId: "466805377675",
  appId: "1:466805377675:web:ce760d3346f797bbf9628e",
  measurementId: "G-LZCDG5S56Y",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

const apiResponse = (status, message, data) => {
  return {
    status,
    message,
    data,
  };
};

/* Firease service */

//Firebase Authentication
const auth = firebase.auth();

//Firestore
const db = firebase.firestore();

//Storage
var storage = firebase.storage();

export { db, auth, storage, apiResponse };
export default app;
