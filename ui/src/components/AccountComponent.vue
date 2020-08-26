<template>
  <div class="account">
    <ErrorCard :show="showError" :message="errorMessage" />
    <ul>
      <li>
        <a href="#information" :class="{ selected: selectedItem == 'information' }">Information</a>
      </li>
      <li><a href="#posts" :class="{ selected: selectedItem == 'posts' }">Posts</a></li>
    </ul>
    <div class="account-block">
      <UserInformationComponent v-if="selectedItem == 'information'" />
      <UserPostsComponent v-if="selectedItem == 'posts'" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "../types/index";
import UserInformationComponent from "./UserInformationComponent.vue";
import UserPostsComponent from "./UserPostsComponent.vue";
import ErrorCard from "./ErrorCard.vue";
import sessionData from "../session/sessionData";

export default Vue.extend({
  data: function() {
    return {
      userData: {} as User,
      selectedItem: "information",
      errorMessage: "Hmm. Something went wrong.",
      showError: false
    };
  },
  mounted() {
    this.userData = sessionData.getUser();
    if (!this.userData) {
      this.showError = true;
    }
    this.selectedItem = this.getSelection();
  },
  methods: {
    getSelection() {
      return window.location.hash.replace("#", "") || "information";
    }
  },
  watch: {
    $route() {
      this.selectedItem = this.getSelection();
    }
  },
  components: {
    UserInformationComponent,
    UserPostsComponent,
    ErrorCard
  }
});
</script>

<style lang="scss">
div.account {
  ul {
    background-color: $dark-blue-grey;
    height: 38px;
    line-height: 38px;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    width: 100vw;
    margin-left: -20px;
    li {
      line-height: 38px;
      display: inline;
      a {
        text-decoration: none;
        font-family: "Barlow", sans-serif;
        text-transform: uppercase;
        font-size: small;
        color: $snow;
        padding: 12px;
        margin-right: 8px;
        font-weight: bold;
        font-stretch: extra-condensed;
        &.selected {
          background-color: $smoke;
          color: $dark-blue-grey;
        }
      }
    }
  }
  .account-block {
    max-width: 800px;
    margin: 0 auto;
    margin-top: 20px;
  }
}
</style>
