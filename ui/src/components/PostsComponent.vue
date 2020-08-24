<template>
  <div>
    <ErrorCard :show="showError" :message="errorMessage" />
    <Loader :show="isLoading" />
    <div class="posts" v-if="!isLoading">
      <PostCard v-for="(post, i) in posts" v-bind:key="i" v-bind:post="post" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Post } from "../types";
import PostCard from "../components/PostCardComponent.vue";
import ErrorCard from "../components/ErrorCard.vue";
import Loader from "./Loader.vue";
import session from "../session";

export default Vue.extend({
  data() {
    return {
      posts: {} as Post[],
      isLoading: true,
      errorMessage: "",
      showError: false
    };
  },
  methods: {
    loadPosts() {
      session
        .getPosts()
        .then(posts => {
          this.posts = posts;
          this.isLoading = false;
        })
        .catch(() => {
          this.errorMessage = "Hmm. Something went wrong.";
          this.isLoading = false;
          this.showError = true;
        });
    }
  },
  mounted() {
    this.loadPosts();
  },
  components: {
    PostCard,
    Loader,
    ErrorCard
  }
});
</script>

<style lang="scss">
.posts {
  @include xl {
    grid-template-columns: auto auto auto auto auto;
  }
  @include lg {
    grid-template-columns: auto auto auto auto;
  }
  @include md {
    grid-template-columns: auto auto auto;
  }
  @include sm {
    grid-template-columns: auto auto;
  }
  display: grid;
  justify-content: space-between;
  grid-gap: 10px;
}
</style>
