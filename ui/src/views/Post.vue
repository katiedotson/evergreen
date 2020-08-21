<template>
  <div>
    <Loader :show="isLoading" />
    <PostView v-bind:post="post" v-bind:author="author" v-if="!isLoading" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "../router";
import PostView from "../components/PostViewComponent.vue";
import Loader from "../components/Loader.vue";
import { Post, User } from "../types";
import session from "../session";

export default Vue.extend({
  data() {
    return {
      post: {} as Post,
      author: {} as User | undefined,
      isLoading: true
    };
  },
  props: {
    urlName: {
      type: String
    }
  },
  components: {
    PostView,
    Loader
  },
  mounted() {
    this.loadPost();
  },
  methods: {
    loadPost() {
      session.getPost(this.urlName).then(post => {
        if (post) {
          this.post = post;
          this.loadAuthor();
        }
      });
    },
    loadAuthor() {
      session.getAuthor(this.post.authorId).then(author => {
        if (author) {
          this.author = author;
          this.isLoading = false;
        }
      });
    }
  },
  router
});
</script>
