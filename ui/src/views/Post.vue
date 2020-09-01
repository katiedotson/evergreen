<template>
  <div>
    <ErrorCard :show="showError" :message="errorMessage" />
    <Loader :show="isLoading" />
    <PostView v-bind:post="post" v-bind:author="author" v-if="!isLoading" />
    <PostNotFound v-if="postNotFound" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "../router";
import PostView from "../components/PostViewComponent.vue";
import Loader from "../components/Loader.vue";
import ErrorCard from "../components/ErrorCard.vue";
import PostNotFound from "../components/PostNotFoundComponent.vue";
import { Post, User } from "../types";
import session from "../session";

export default Vue.extend({
  data() {
    return {
      post: {} as Post,
      author: {} as User,
      isLoading: true,
      showError: false,
      errorMessage: "",
      postNotFound: false,
    };
  },
  props: {
    urlName: {
      type: String,
    },
  },
  components: {
    PostView,
    Loader,
    ErrorCard,
    PostNotFound,
  },
  mounted() {
    this.loadPost();
  },
  methods: {
    loadPost() {
      session.post
        .getPost(this.urlName, true)
        .then((post) => {
          if (post) {
            this.post = post;
            this.loadAuthor();
          } else {
            this.postLoadError();
          }
        })
        .catch(() => {
          this.postLoadError();
        });
    },
    postLoadError() {
      this.isLoading = false;
      this.showError = true;
      this.errorMessage = "Could not load post.";
      this.postNotFound = true;
    },
    loadAuthor() {
      session.user
        .getAuthor(this.post.authorId)
        .then((author) => {
          if (author) {
            this.author = author;
            this.isLoading = false;
          } else {
            this.authorLoadError();
          }
        })
        .catch(() => {
          this.authorLoadError();
        });
    },
    authorLoadError() {
      this.isLoading = false;
      this.showError = true;
      this.errorMessage = "Could not load author.";
    },
  },
  router,
});
</script>
