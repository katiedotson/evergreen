<template>
  <div>
    <AccountHeading name="Posts" />
    <Loader :show="isLoading" />
    <ErrorCard :show="showError" :message="errorMessage" />
    <div v-if="!isLoading">
      <router-link to="/create" class="new-post-button button"
        >New Post</router-link
      >
      <div class="user-post" v-for="post in posts" v-bind:key="post.title">
        <div class="title">{{ post.title }}</div>
        <a class="url-name" :href="'../post/' + post.urlName">{{
          post.urlName
        }}</a>
        <div class="edit-button-wrapper">
          <router-link
            class="button edit  "
            :to="`../edit-post/${post.urlName}`"
            >Edit</router-link
          >
          <router-link
            class="button delete"
            :to="`../delete-post/${post.urlName}`"
            >Delete</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccountHeading from "./AccountHeading.vue";
import ErrorCard from "./ErrorCard.vue";
import Loader from "./Loader.vue";
import session from "../session";

export default Vue.extend({
  data() {
    return {
      posts: {},
      isLoading: true,
      showError: false,
      errorMessage: "",
    };
  },
  mounted() {
    session
      .getUserPosts()
      .then((posts) => {
        this.posts = posts.filter((post) => post.title.length);
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.showError = true;
        this.errorMessage = "Could  not load posts.";
      });
  },
  components: {
    AccountHeading,
    Loader,
    ErrorCard,
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";

div.user-post {
  margin-top: 36px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid $dirty-snow;
  border-radius: 4px;
  div.title {
    font-weight: bold;
  }
  div.tagline {
    font-style: italic;
    font-size: x-small;
  }
  a.url-name {
    font-family: "Barlow", sans-serif;
    color: $dark-blue-grey;
  }
  div.edit-button-wrapper {
    margin-top: 8px;

    a.button {
      display: inline-block;
      &.delete {
        margin-left: 8px;
      }
    }
  }
}
a.new-post-button.button {
  width: 100%;
  text-decoration: none;
  text-align: center;
  padding: 16px;
  max-width: 334px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 36px;
  background-color: #2c3e50;
  color: $snow;
  position: sticky;
  top: 20px;
}
</style>
