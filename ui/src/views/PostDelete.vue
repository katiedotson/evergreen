<template>
  <div>
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
import { Post } from "../types";
import session from "../session";

export default Vue.extend({
  data: function() {
    return { post: {} as Post, isLoading: true };
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
          this.isLoading = false;
        }
      });
    },
    deletePost() {
      session.deletePost(this.urlName).then(res => {
        if (res) {
          router.push("/account#posts");
        }
      });
    }
  },
  router
});
</script>

<style lang="scss">
button.deletePost {
  position: sticky;
  bottom: 8px;
  right: 0;
  background-color: $light-gray;
}
</style>
