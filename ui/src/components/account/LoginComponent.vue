<template>
  <div>
    <ErrorCard :show="showError" :message="errorMessage" />
    <div class="account-creation">
      <div class="wrapper" v-if="!isAuth">
        <div id="login-logo"></div>
        <div id="google" class="login-button" v-on:click="authenticateGmail">
          <div class="login-icon g-icon"></div>
          Sign in with Google
        </div>
        <div
          id="facebook"
          class="login-button"
          v-on:click="authenticateFacebook"
        >
          <div class="login-icon fb-icon"></div>
          Sign in with Facebook
        </div>
      </div>
      <br />
      <div class="wrapper" v-if="isAuth">
        <div id="login-logo"></div>
        <div class="login-button logout" v-on:click="logOut">Logout</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import baseAuth from "../../auth/BaseAuth";
import ErrorCard from "./ErrorCard.vue";

export default Vue.extend({
  data: function() {
    return {
      isAuth: false,
      baseAuth: baseAuth,
      showError: false,
      errorMessage: "",
      platform: "",
    };
  },
  mounted() {
    this.isAuth = this.baseAuth.userIsAuth();
  },
  methods: {
    authenticateGmail() {
      this.signIn("google");
    },
    authenticateFacebook() {
      this.signIn("facebook");
    },
    signIn(platform: string) {
      this.platform = platform;
      this.baseAuth
        .signIn(platform)
        .then((isAuth: boolean) => {
          this.isAuth = isAuth;
          if (!isAuth) throw new Error();
        })
        .catch(() => {
          this.showError = true;
          this.errorMessage =
            "Could not sign in. Please be sure you are signed into your chosen platform. ";
        });
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
  components: {
    ErrorCard,
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";

div.account-creation {
  max-width: 800px;
  margin: 0 auto;
  height: calc(100vh - 200px);
  div.wrapper {
    padding: 20px;
    border-radius: 4px;
    height: 100%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    #login-logo {
      height: 100px;
      width: 100px;
      margin: 40px auto 140px auto;
      background: url(/img/_Logo.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
      background-color: white;
      border-radius: 100px;
    }

    .login-button {
      margin-left: auto;
      margin-right: auto;
      height: 50px;
      width: 240px;
      font-family: sans-serif;
      border-radius: 4px;
      font-weight: bold;
      line-height: 50px;
      box-shadow: 0px 4px 4px 2px rgba(0, 0, 0, 0.178);
      cursor: pointer;

      &.logout {
        background: $snow;
        font-family: "Playfair Display";
        text-align: center;
      }

      &#google {
        background-color: white;
        color: #333;
      }
      &#facebook {
        background-color: #1877f2;
        color: white;
      }
      .login-icon {
        float: left;
        margin-right: 10px;
        &.g-icon {
          height: 40px;
          width: 40px;
          margin-top: 5px;
          margin-left: 5px;
          background: url("/img/btn_google_dark_normal_ios.svg");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center center;
        }
        &.fb-icon {
          height: 30px;
          width: 30px;
          margin-top: 10px;
          margin-left: 10px;
          background: url("/img/f_logo_RGB-White_250.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center center;
        }
      }
    }

    :not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>
