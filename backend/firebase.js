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
