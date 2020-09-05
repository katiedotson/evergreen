<template>
  <div>
    <ErrorCard :show="showError" :message="errorMessage" />
    <Loader :show="isLoading" />
    <div v-if="!isLoading">
      <PostView v-bind:post="post" v-bind:author="undefined" />
      <div class="button-wrapper">
        <button class="publish" @click="publishPost">Publish</button>
        <button class="cancel" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "../../router";
import PostView from "./PostViewComponent.vue";
import Loader from "../shared/Loader.vue";
import ErrorCard from "../shared/ErrorCard.vue";
import { Post } from "../../types";
import session from "../../session";

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
    publishPost() {
      session.post
        .publishPost(this.post)
        .then((res) => {
          if (res) {
            router.push("/account#content");
          } else {
            this.publishError();
          }
        })
        .catch(() => {
          this.publishError();
        });
    },
    cancel() {
      this.$router.push("/account#content");
    },
    publishError() {
      this.showError = true;
      this.errorMessage = "Could not publish post at this time.";
    },
  },
  router,
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

div.button-wrapper {
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: right;
  button.publish {
    background-color: $light-blue;
  }
}
</style>
