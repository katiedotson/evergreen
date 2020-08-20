<template>
  <div>
    <AccountHeading name="Posts" />
    <a href="../create" class="new-post-button">New Post</a>
    <div class="user-post" v-for="post in posts" v-bind:key="post.title">
      <div class="title">{{ post.title }}</div>
      <a class="url-name" :href="'../post/' + post.urlName">{{ post.urlName }}</a>
      <div class="edit-button-wrapper">
        <a class="button edit" :href="'../edit-post/' + post.urlName">Edit</a>
        <a class="button delete" :href="'../delete-post/' + post.urlName">Delete</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccountHeading from "./AccountHeading.vue";
import session from "../session";
export default Vue.extend({
  data() {
    return {
      posts: {}
    };
  },
  mounted() {
    this.posts = session.getUserPosts();
  },
  components: {
    AccountHeading
  },
  methods: {
    deletePost(urlName: string) {
      console.log(urlName);
    }
  }
});
</script>

<style lang="scss">
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
    font-family: "Open Sans", sans-serif;
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
a.new-post-button {
  width: 100%;
  text-decoration: none;
  text-align: center;
  padding: 16px;
  max-width: 546px;
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
