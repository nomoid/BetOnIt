import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
	//Initializing database
    apiKey: "AIzaSyCCfjrt3r7EQ1CdPmLfCABHQ52d5m7i5gM",
    authDomain: "bett-4bb2b.firebaseapp.com",
    databaseURL: "https://bett-4bb2b.firebaseio.com",
    projectId: "bett-4bb2b",
    storageBucket: "bett-4bb2b.appspot.com",
    messagingSenderId: "514427112490"
  
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();
export {
    auth,
    db,
};