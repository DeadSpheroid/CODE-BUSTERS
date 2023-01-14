const http = require('http');
const formidable = require('formidable');
const mg = require("mongodb");
const fs = require("fs");
let email;
let pass;
// Import the functions you need from the SDKs you need

const fbapp = require("firebase/app")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqAq9n8Jis-W2fyO5JgfH610zFubmY-AU",
  authDomain: "scholarship-portal-5bd6b.firebaseapp.com",
  databaseURL: "https://scholarship-portal-5bd6b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "scholarship-portal-5bd6b",
  storageBucket: "scholarship-portal-5bd6b.appspot.com",
  messagingSenderId: "491056912929",
  appId: "1:491056912929:web:c7fa5ba183c1ec5928e160",
  measurementId: "G-L7SZBMMN0Y"
};


// Initialize Firebase
const app = fbapp.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const fbdb = require("firebase/database");
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Realtime Database and get a reference to the service
const database = fbdb.getDatabase(app);
const dbref = fbdb.ref(database);

const express = require('express');
const bodyParser = require("body-parser");
const expapp = express();
const multer = require('multer');
expapp.use(express.static('public'));
//const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const upload = multer();
const port = 3000;
const fbau = require("firebase/auth");
const { Console } = require('console');
//expapp.use(express.static('public'));
expapp.use(bodyParser.urlencoded({ extended: true }));
expapp.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
})

expapp.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const auth = fbau.getAuth(app);
// for parsing multipart/form-data
expapp.use(upload.array());
expapp.post("/", (req, res) => {
  email = req.body.Email;
  pass = req.body.Password;
  console.log(email + " " + pass);
  expapp.route("/processing/");
  console.log("Routed");
})

expapp.get("/processing/", (req, res) => {
  console.log("Processing");
  res.sendFile(__dirname + "/processing.html");
  fbau.signInWithEmailAndPassword(auth, email, pass)
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("THENED");
      expapp.route("/home/");
    })
    .catch((error) => {
      if (error) Console.log(error);
      expapp.route("/")
    })
  //if successfull login route to /home, if not route to /
})

expapp.get("/home/", (req, res) => {
  res.sendFile(__dirname + "/mainpage.html");
})
//http://localhost:3000/