<template>
  <div class="account">
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
import session from "../session";

export default Vue.extend({
  data: function() {
    return {
      userData: {} as User,
      selectedItem: "information"
    };
  },
  computed: {},
  mounted() {
    this.userData = session.getUser();
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
    UserPostsComponent
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
        font-family: "Open Sans", sans-serif;
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
