<template>
  <div id="app">
    <div id="nav">
      <router-link v-show="!this.$route.path.match(/^\/$/)" to="/">ホーム</router-link>
      <router-link v-show="!this.$route.path.match(/^\/(signup|signin)$/)" to="/signup">新規登録</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.logo {
  width: 300px;
}
</style>
