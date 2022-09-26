<template>
  <div id="firebaseui-auth-container">
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { firebaseAuth } from "@/conf/firebaseConfig";
export default {
  mounted() {
    const firebaseConfigUI = {
      signInSuccessUrl: 'http://localhost:8080',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        // These need to be independently enabled through the web console.
        firebaseAuth.GoogleAuthProvider.PROVIDER_ID,
        firebaseAuth.FacebookAuthProvider.PROVIDER_ID,
        firebaseAuth.TwitterAuthProvider.PROVIDER_ID,
        firebaseAuth.GithubAuthProvider.PROVIDER_ID,
        firebaseAuth.EmailAuthProvider.PROVIDER_ID,
        firebaseAuth.PhoneAuthProvider.PROVIDER_ID
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: '<your-tos-url>',
      // Privacy policy url/callback.
      privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
      }
    };
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', firebaseConfigUI);
  }
}
</script>

<style scoped>

</style>