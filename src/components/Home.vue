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

export default {
  name: "Home",
  data() {
    return {
      user: null,
    };
  },
}
</script>
