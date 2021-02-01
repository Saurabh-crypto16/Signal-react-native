import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvB3IQfSMbyfg2bA6vCTtg09v9P72TRyw",
  authDomain: "signal-clone-2e692.firebaseapp.com",
  projectId: "signal-clone-2e692",
  storageBucket: "signal-clone-2e692.appspot.com",
  messagingSenderId: "685082720120",
  appId: "1:685082720120:web:5c1302a257a08c3579fa8d"
};

let app;

if(firebase.apps.length === 0){
  //this means initialize only once
  app=firebase.initializeApp(firebaseConfig)
}else{
  //if already initialized then use that
  app=firebase.app();
}

//setting up databse access variable
const db=app.firestore();
const auth=firebase.auth();

export {db,auth};