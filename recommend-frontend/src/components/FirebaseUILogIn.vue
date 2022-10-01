<template>
  <div>
    <div id='firebaseui-auth-container' v-if='!isLogin'>
    </div>
    <span v-else>You already logged in</span>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { firebaseAuth } from "@/conf/firebaseConfig";
import { Common } from "@/utils";
import Cookies from "js-cookie";

export default {
  computed: {
    isLogin() {
      return Common.validString(Cookies.get('access-token'));
    }
  },
  mounted() {
    const firebaseConfigUI = {
      signInSuccessUrl: 'http://localhost:8080',
      signInOptions: [
        firebaseAuth.GithubAuthProvider.PROVIDER_ID,
        firebaseAuth.EmailAuthProvider.PROVIDER_ID,
      ],
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