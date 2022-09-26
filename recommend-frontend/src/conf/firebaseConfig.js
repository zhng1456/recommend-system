import firebase from 'firebase/compat/app';

const config = {
}

firebase.initializeApp(config);

export function firebaseListener(func) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // console.log("User log in success", user);
      func(true, user)
    } else {
      // console.log("User log in failed", user);
      func(false)
    }
  }, function(error) {
    console.log(error)
  });
}

export const firebaseAuth = firebase.auth;
