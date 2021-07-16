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
    <div>
      <p /><a href="#" @click.stop.prevent="onVerifyID">サーバで ID を検証</a>
    </div>
    <div v-show="verifyResult">
      <p />{{ verifyResult }}
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
const base64url = require('base64url');

const API_URL = "http://localhost:8030/";

export default {
  name: "Home",
  data() {
    return {
      token: null,
      user: null,
      verifyResult: null,
    };
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ログインしていれば中通る
        this.user = user;
        user.getIdToken(true).then((token) => {
          this.token = token;
          let tokens = token.split('.');
          console.log(base64url.decode(tokens[0]));
          console.log(base64url.decode(tokens[1]));
        });
      } else {
        this.token = null;
      }
    });
  },
  methods: {
    onVerifyID: function () {
      console.log("onVerifyID");
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };
      this.verifyResult = null;
      const api_client = axios.create();
      api_client
        .get(API_URL, config)
        .then((result) => {
          console.log(result);
          this.verifyResult = result.data;
          })
        .catch((err) => {
          console.log(err);
          this.verifyResult = 'エラー';
        });
    },
  },
}
</script>
