const http = require('http');
const formidable = require('formidable');
const mg= require("mongodb");
const fs= require("fs");

// Import the functions you need from the SDKs you need

const fbapp=require("firebase/app")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYRufixyjzqxXxEjguwMI-6GmLt05s7x0",
  authDomain: "codebusters-190dd.firebaseapp.com",
  projectId: "codebusters-190dd",
  storageBucket: "codebusters-190dd.appspot.com",
  messagingSenderId: "771971235354",
  appId: "1:771971235354:web:bea25b3d3cdf20b96adba3",
  measurementId: "G-MHQ5V5C2W3",
  databaseURL: "https://codebusters-190dd-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = fbapp.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const fbdb = require("firebase/database");
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Realtime Database and get a reference to the service
const database = fbdb.getDatabase(app);
const dbref =fbdb.ref(database);
http.createServer((req,res)=>{


    console.log("Server Running");
    
    if (req.url="/loginpage")
    {   
        console.log("Here");
        res.writeHead(200, {'Content-Type':'text/html'});
        fs.readFile("webapp\\login.html", (err,data)=>{
            if(err) throw err;
            res.write(data);
            return res.end();
        })
        fbdb.get(fbdb.child(dbref, `Users`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
        let form= new formidable.IncomingForm();

    }
}).listen(5500)
//http://localhost:5500/loginpage/