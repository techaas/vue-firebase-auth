<!--
    Copyright(c) 2021 TECHaas.com, all rights reserved. 
-->

<template>
  <div class="signup">
    <form @submit.prevent="onSignUp">
      <div class="input-row">
        <label>メールアドレス：</label>
        <input id="email" type="email" v-model="mailaddress" />
      </div>
      <div class="input-row">
        <label>パスワード：</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <button type="button" class="btn" @click.prevent.self="onClear">クリア</button>
      <button type="submit" class="btn">登録</button>
    </form>
    <div class="message">{{ message }}</div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseErrors } from '../fbMessage';

export default {
  name: "SignUp",
  data() {
    return {
      mailaddress: '',
      password: '',
      message: '',
    };
  },
  methods: {
    onClear: function() {
      console.log('onClear');
      this.mailaddress = '';
      this.password = '';
      this.message = '';
    },
    onSignUp: function () {
      this.message = '';
      let auth = firebase.auth();
      auth.useDeviceLanguage();
      auth.createUserWithEmailAndPassword(this.mailaddress, this.password)
        .then(() => {
          // 成功時の処理
          console.log("signup success");
          if (!alert('メールアドレス「' + this.mailaddress + '」を登録しました.')) {
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
  margin-top: 20px;
  margin-left: 10px !important;
  width: 60px;
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
