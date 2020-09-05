<template>
  <div class="account">
    <ErrorCard :show="showError" :message="errorMessage" />
    <ul>
      <li>
        <a
          href="#information"
          :class="{ selected: selectedItem == 'information' }"
          >Information</a
        >
      </li>
      <li>
        <a href="#content" :class="{ selected: selectedItem == 'content' }"
          >Content</a
        >
      </li>
    </ul>
    <div class="account-block">
      <UserInformationComponent v-if="selectedItem == 'information'" />
      <UserContentComponent v-if="selectedItem == 'content'" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "../../types/index";
import UserInformationComponent from "./UserInformationComponent.vue";
import UserContentComponent from "./UserContentComponent.vue";
import ErrorCard from "../shared/ErrorCard.vue";
import session from "../../session";

export default Vue.extend({
  data: function() {
    return {
      userData: {} as User,
      selectedItem: "information",
      errorMessage: "Hmm. Something went wrong.",
      showError: false,
    };
  },
  mounted() {
    this.userData = session.getUser();
    if (!this.userData) {
      this.showError = true;
    }
    this.selectedItem = this.getSelection();
  },
  methods: {
    getSelection() {
      return window.location.hash.replace("#", "") || "information";
    },
  },
  watch: {
    $route() {
      this.selectedItem = this.getSelection();
    },
  },
  components: {
    UserInformationComponent,
    UserContentComponent,
    ErrorCard,
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

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
