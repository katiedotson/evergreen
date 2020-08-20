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
        }
      });
    }
  },
  router
});
</script>
