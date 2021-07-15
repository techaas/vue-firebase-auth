<!--
    Copyright(c) 2021 TECHaas.com, all rights reserved. 
-->

<template>
  <div class="signin">
    <form>
      <div class="input-row">
        <label>メールアドレス：</label>
        <input id="email" type="email" v-model="mailaddress" />
      </div>
      <div class="input-row">
        <label>パスワード：</label>
        <input id="password" type="password" v-model="password" />
      </div>
    </form>
    <button class="btn" @click="onClear">クリア</button>
    <button class="btn" @click="onSignIn">ログイン</button>
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
</style>
