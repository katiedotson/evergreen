<template>
  <div>
    <PostView v-bind:post="post" v-bind:author="undefined" />
    <button class="deletePost" @click="deletePost">Delete</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "../router";
import PostView from "../components/PostViewComponent.vue";
import { Post, User } from "../types";
import session from "../session";

export default Vue.extend({
  data: function() {
    return { post: {} as Post };
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
