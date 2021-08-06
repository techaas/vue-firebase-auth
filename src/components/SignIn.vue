<!--
    Copyright(c) 2021 TECHaas.com, all rights reserved. 
-->

<template>
  <div class="signin">
    <form @submit.prevent="onSignIn">
      <div class="input-row">
        <label>メールアドレス：</label>
        <input id="email" type="email" v-model="mailaddress" />
      </div>
      <div class="input-row">
        <label>パスワード：</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <button type="button" class="btn" @click.prevent.self="onClear">クリア</button>
      <button type="submit" class="btn">ログイン</button>
    </form>
      <div id="or">--- OR ---</div>
      <div id="other">
        <img class="loginGoogle" src="../assets/btn_google_signin_dark_normal_web.png" @click="onLoginGoogle"/>
        <img class="loginGithub" src="../assets/btn_github_signin.png" @click="onLoginGithub"/>
      </div>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import 'firebase/auth';
import { firebaseErrors } from '../fbMessage';

export default {
  name: "SignIn",
  data() {
    return {
      mailaddress: '',
      password: '',
      message: '',
    };
  },
  methods: {
    onClear: function() {
      this.mailaddress = '';
      this.password = '';
      this.message = '';
    },
    onSignIn: function () {
      this.message = '';
      let auth = firebase.auth();
      auth.useDeviceLanguage();
      auth.signInWithEmailAndPassword(this.mailaddress, this.password)
        .then(() => {
          // 成功時の処理
          console.log("signin success");
          if (!alert('ログインしました')) {
            this.$router.push('/');
          }
        })
        .catch((err) => {
          // エラー時の処理
          console.log(err);
          this.message = firebaseErrors[err.code] || err.message;
        });
    },
    onLoginGoogle: function() {
      console.log("onLoginGoogle");
      var provider = new firebase.auth.GoogleAuthProvider();
      let auth = firebase.auth();
      auth.useDeviceLanguage();
      auth.signInWithPopup(provider)
        .then((result) => {
          console.log("signin with google success", result);
          if (!alert('ログインしました')) {
            this.$router.push('/');
          }
        }).catch((err) => {
          // エラー時の処理
          console.log(err);
          this.message = firebaseErrors[err.code] || err.message;
        });
    },
    onLoginGithub: function() {
      console.log("onLoginGithub");
      var provider = new firebase.auth.GithubAuthProvider();
      let auth = firebase.auth();
      auth.useDeviceLanguage();
      auth.signInWithPopup(provider)
        .then((result) => {
          console.log("signin with github success", result);
          if (!alert('ログインしました')) {
            this.$router.push('/');
          }
        }).catch((err) => {
          // エラー時の処理
          console.log(err);
          this.message = firebaseErrors[err.code] || err.message;
        });
    },
  },
};
</script>

<style scoped>
.btn {
  margin-top: 15px;
  margin-left: 10px !important;
  width: 80px;
}
.message {
  margin-top: 20px;
  color: red;
  font-size: 11pt;
}
.input-row {
    margin-top: 10px;
}
label{
    display: inline-block;
    clear: left;
    width: 150px;
    text-align: right;
}
input {
  display: inline-block;
}

#or {
  margin-top: 20px;
}
#other {
  margin-top: 20px;
}
.loginGoogle:hover {
   background-image: url("../assets/btn_google_signin_dark_focus_web.png");
}
.loginGoogle:active {
   background-image: url("../assets/btn_google_signin_dark_pressed_web.png");
}
.loginGoogle {
  margin-left: auto;
  margin-right: auto;
  width: 220px;
}
.loginGithub {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 220px;
}
</style>
