<template>
  <nav>
    <i
      v-if="!shown"
      v-on:click="toggleShown"
      v-on:keyup="keyboardEvent"
      class="material-icons menu-icon menu"
      tabindex="200"
      >menu</i
    >
    <div class="nav-links" :class="!shown ? 'hide' : ''" @click="toggleShown">
      <router-link to="/">
        <i class="material-icons menu-icon menu-item">home</i>
      </router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/posts">Posts</router-link>
      <router-link to="/account" v-if="userIsAuth">Account</router-link>
      <router-link to="/sign-in" v-if="!userIsAuth">Sign&nbsp;In</router-link>
      <div v-if="userIsAuth" v-on:click="logOut" tabindex="1">Log&nbsp;Out</div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import EventUtils from "../../utils/EventUtils";
import baseAuth from "../../auth/BaseAuth";

export default Vue.extend({
  data: function() {
    return { shown: false, userIsAuth: false };
  },
  methods: {
    toggleShown(e: any) {
      if (!e.target.href) this.shown = !this.shown;
    },
    keyboardEvent(event: KeyboardEvent) {
      EventUtils.keyboardEvent(event);
    },
    getIsUserAuthenticated() {
      return baseAuth.userIsAuth();
    },
    processLogOut() {
      if (this.$route.path.includes("account")) {
        this.$router.push("/");
        window.location.reload();
      } else {
        window.location.reload();
      }
    },
    logOut() {
      baseAuth
        .signOut()
        .then(() => {
          this.processLogOut();
        })
        .catch((error) => {
          console.error(error);
          this.processLogOut();
        });
    },
  },
  mounted() {
    this.userIsAuth = this.getIsUserAuthenticated();
  },
  watch: {
    $route() {
      this.shown = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";

nav {
  div.nav-links {
    font-family: "Playfair Display", serif;
    text-transform: lowercase;
    position: fixed;
    top: 0px;
    right: 15px;
    padding-bottom: 15px;
    width: 100%;
    font-size: x-large;
    transition: width 0.6s ease-in-out;
    background-color: $dark-blue-grey;
    background-image: linear-gradient(
      to top,
      $x-dark-blue-grey 10%,
      $dark-blue-grey 90%
    );
    overflow: hidden;
    height: 100%;
    z-index: 1;
    box-shadow: 8px 0px;

    &.hide {
      width: 0;
    }

    div,
    a {
      display: block;
      margin-top: 10px;
      text-align: end;
      cursor: pointer;
      transition: background-color 0.3s, width 0.3s;
      background-color: $smoke;
      color: $dark-blue-grey;
      padding: 4px;
      width: 75%;
      text-decoration: none;

      &:hover:not(.router-link-exact-active),
      &:focus:not(.router-link-exact-active) {
        width: 80%;
        outline: none;
      }

      &.router-link-exact-active {
        :not(i) {
          -webkit-text-decoration-line: overline; /* Safari */
          text-decoration-line: overline;
        }
        background-color: transparent;
        color: $smoke;
        cursor: initial;
      }

      a {
        i {
          position: relative;
          top: 5px;
        }
      }
    }
  }

  i {
    cursor: pointer;

    &.menu {
      right: 15px;
      position: fixed;
      top: 25px;
      background-color: $smoke;
      padding: 5px;
    }

    &.menu-item {
      position: relative;
      top: 3px;
    }
  }
}
</style>
