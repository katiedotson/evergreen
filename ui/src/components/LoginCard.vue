<template>
  <a v-if="isLoggedOut && !isLoginPage" class="login-card" href="../sign-in">Sign in</a>
</template>

<script lang="ts">
import Vue from "vue";
import baseAuth from "../auth/BaseAuth";

export default Vue.extend({
  data: function() {
    return {
      isLoggedOut: true
    };
  },
  computed: {
    isLoginPage() {
      return window.location.pathname == "/sign-in" || window.location.pathname == "/account";
    }
  },
  mounted() {
    this.isLoggedOut = !baseAuth.userIsAuth();
  }
});
</script>

<style lang="scss">
a.login-card {
  position: fixed;
  bottom: 15px;
  right: 15px;
  background-color: $light-gray;
  height: 30px;
  width: 100px;
  color: $dark-blue-grey;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  line-height: 30px;
  font-family: "Open Sans", sans-serif;
}
</style>
