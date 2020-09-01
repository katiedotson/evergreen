<template>
  <div>
    <ErrorCard :show="showError" :message="errorMessage" />
    <Loader :show="isLoading" />
    <div v-if="!isLoading">
      <PostView v-bind:post="post" v-bind:author="undefined" />
      <div class="button-wrapper">
        <button class="unpublish" @click="unpublishPost">unpublish</button>
        <button class="cancel" @click="cancel">Cancel</button>
      </div>
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
        .getPost(this.urlName, true)
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
    unpublishPost() {
      session.post
        .unpublishPost(this.post)
        .then((res) => {
          if (res) {
            router.push("/account#posts");
          } else {
            this.unpublishError();
          }
        })
        .catch(() => {
          this.unpublishError();
        });
    },
    cancel() {
      this.$router.push("/account#posts");
    },
    unpublishError() {
      this.showError = true;
      this.errorMessage = "Could not unpublish post at this time.";
    },
  },
  router,
});
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";

div.button-wrapper {
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: right;
  button.unpublish {
    background-color: $light-blue;
  }
}
</style>
