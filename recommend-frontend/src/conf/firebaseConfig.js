import firebase from 'firebase/compat/app';
import Cookies from "js-cookie";

const config = {
  apiKey: "AIzaSyDB-UQIK0q69TrtxDkIrtkuKqFSmrYQAZw",
  authDomain: "crested-polygon-362000.firebaseapp.com",
  projectId: "crested-polygon-362000",
  storageBucket: "crested-polygon-362000.appspot.com",
  messagingSenderId: "571112708701",
  appId: "1:571112708701:web:211d12f21e95029db38bb4",
  measurementId: "G-R9MD21T24E"
}

firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    user.getIdToken().then(idToken => Cookies.set('access-token', idToken, { expires: 2 }));
  }
}, function(error) {
  console.log(error)
});

export const firebaseAuth = firebase.auth;
