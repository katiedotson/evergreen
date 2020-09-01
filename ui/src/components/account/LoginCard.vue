<template>
  <a v-if="isLoggedOut && !isLoginPage" class="login-card" href="../sign-in"
    >Sign in</a
  >
</template>

<script lang="ts">
import Vue from "vue";
import baseAuth from "../../auth/BaseAuth";

export default Vue.extend({
  data: function() {
    return {
      isLoggedOut: true,
    };
  },
  computed: {
    isLoginPage() {
      return (
        window.location.pathname == "/sign-in" ||
        window.location.pathname == "/account"
      );
    },
  },
  mounted() {
    this.isLoggedOut = !baseAuth.userIsAuth();
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

a.login-card {
  position: fixed;
  bottom: 15px;
  right: 15px;
  height: 30px;
  line-height: 30px;
  width: 100px;
  color: $snow;
  background-color: $dark-blue-grey;
  text-align: center;
  text-decoration: none;
  font-family: "Barlow", sans-serif;
  text-transform: uppercase;
  font-size: large;
  font-weight: bold;
}
</style>
