<!--
    Copyright(c) 2021 TECHaas.com, all rights reserved. 
-->

<template>
  <div class="home">
    <img class="logo" alt="logo" src="../assets/TECHaas.jpg" />
    <div v-if="user">
      ようこそ、{{ user.email }} さん
    </div>
    <div v-else>
      <router-link to="signin">ログイン</router-link> してください.
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Home",
  data() {
    return {
      token: null,
      user: null,
    };
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ログインしていれば中通る
        this.user = user;
        console.log("user", user); // ユーザー情報が表示される
        user.getIdToken(true).then((token) => (this.token = token));
      } else {
        this.token = null;
      }
    });
  },
}
</script>
