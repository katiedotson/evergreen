<template>
  <div>
    <ErrorCard :show="showError" :message="errorMessage" />
    <Loader :show="isLoading" />
    <div v-if="!isLoading">
      <PostView v-bind:post="post" v-bind:author="undefined" />
      <button class="deletePost" @click="deletePost">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "../router";
import PostView from "../components/PostViewComponent.vue";
import Loader from "../components/Loader.vue";
import ErrorCard from "../components/ErrorCard.vue";
import { Post } from "../types";
import session from "../session";

export default Vue.extend({
  data: function() {
    return {
      post: {} as Post,
      isLoading: true,
      showError: false,
      errorMessage: "",
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
  },
  mounted() {
    this.loadPost();
  },
  methods: {
    loadPost() {
      session
        .getPost(this.urlName)
        .then((post) => {
          if (post) {
            this.post = post;
            this.isLoading = false;
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
    },
    deletePost() {
      session
        .deletePost(this.post)
        .then((res) => {
          if (res) {
            router.push("/account#posts");
          } else {
            this.deleteError();
          }
        })
        .catch(() => {
          this.deleteError();
        });
    },
    deleteError() {
      this.showError = true;
      this.errorMessage = "Could not delete post at this time.";
    },
  },
  router,
});
</script>

<style lang="scss" scoped>
button.deletePost {
  position: sticky;
  bottom: 8px;
  right: 0;
  background-color: $light-gray;
}
</style>
