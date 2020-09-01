<template>
  <div>
    <ErrorCard :show="showError" :message="errorMessage" />
    <Loader :show="isLoading" />
    <div v-if="!isLoading">
      <PostView v-bind:post="post" v-bind:author="undefined" />
      <button class="delete" @click="deletePost">Delete</button>
      <button class="cancel" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "../router";
import PostView from "../components/post/PostViewComponent.vue";
import Loader from "../components/shared/Loader.vue";
import ErrorCard from "../components/shared/ErrorCard.vue";
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
      session.post
        .getPost(this.urlName, false)
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
      session.post
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
    cancel() {
      this.$router.push("/account#posts");
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
@import "../styles/global.scss";

div.button-wrapper {
  position: sticky;
  bottom: 8px;
  right: 0;
}
</style>
