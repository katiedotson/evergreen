<template>
  <PostView v-bind:post="post" v-bind:author="author" />
</template>

<script lang="ts">
import Vue from "vue";
import router from "../router";
import PostView from "../components/PostViewComponent.vue";
import { Post, User } from "../types";
import session from "../session";

export default Vue.extend({
  data: function() {
    return { post: {} as Post, author: {} as User | undefined };
  },
  props: {
    urlName: {
      type: String
    }
  },
  components: {
    PostView
  },
  mounted() {
    this.loadPost();
    this.loadAuthor();
  },
  methods: {
    loadPost() {
      this.post = session.getPost(this.urlName);
    },
    loadAuthor() {
      this.author = session.getAuthor(this.post.authorId);
    }
  },
  router
});
</script>
