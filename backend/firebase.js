// backend/firebase.js
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, child } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyDAfZs4ux-02QE5zZhh7R4nRqnbxADHIyg",
  authDomain: "skipli-test-reactjs.firebaseapp.com",
  projectId: "skipli-test-reactjs",
  storageBucket: "skipli-test-reactjs.firebasestorage.app",
  messagingSenderId: "524839558050",
  appId: "1:524839558050:web:d7f80d56c0b4a80e04f0fb",
  measurementId: "G-KZ5XEJ1ZKZ",
  databaseURL: "https://skipli-test-reactjs-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = { db, ref, set, get, child };
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDAfZs4ux-02QE5zZhh7R4nRqnbxADHIyg",
//   authDomain: "skipli-test-reactjs.firebaseapp.com",
//   projectId: "skipli-test-reactjs",
//   storageBucket: "skipli-test-reactjs.firebasestorage.app",
//   messagingSenderId: "524839558050",
//   appId: "1:524839558050:web:d7f80d56c0b4a80e04f0fb",
//   measurementId: "G-KZ5XEJ1ZKZ"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);