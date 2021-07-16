<!--
    Copyright(c) 2021 TECHaas.com, all rights reserved. 
-->

<template>
  <div id="app">
    <div id="nav">
      <router-link v-show="!this.$route.path.match(/^\/$/)" to="/">ホーム</router-link>
      <router-link v-show="!this.$route.path.match(/^\/(signup|signin)$/)" to="/signup">新規登録</router-link>
      <a v-show="isUserLogin" href="#" @click.stop.prevent="onLogout" id="logout">ログアウト</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseErrors } from './fbMessage';

export default {
  name: 'App',
  data() {
    return {
      user: null,
    }
  },
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // ログインしていれば中通る
        this.user = user;
      }
    });
  },
  computed: {
    isUserLogin() {
      return (this.user != null);
    }
  },
  methods: {
    onLogout: function() {
      firebase.auth().signOut()
        .then(() => {
          // 成功時の処理
          console.log("logout success");
          if (!alert('ログアウトしました')) {
            this.$router.go();
            // this.$router.push('/');
          }
        })
        .catch((err) => {
          // エラー時の処理
          console.log(err);
          this.message = firebaseErrors[err.code] || err.message;
        });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#logout {
  margin-left: 10px;
}

.logo {
  width: 200px;
}
</style>
