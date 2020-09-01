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
import { Post } from "../../types";
import PostCard from "./PostCardComponent.vue";
import ErrorCard from "../shared/ErrorCard.vue";
import Loader from "../shared/Loader.vue";
import session from "../../session";

export default Vue.extend({
  data() {
    return {
      posts: {} as Post[],
      isLoading: true,
      errorMessage: "",
      showError: false,
    };
  },
  methods: {
    loadPosts() {
      session.post
        .getPosts()
        .then((posts) => {
          this.posts = posts.filter((post) => post.title.length);
          this.isLoading = false;
        })
        .catch(() => {
          this.errorMessage = "Hmm. Something went wrong.";
          this.isLoading = false;
          this.showError = true;
        });
    },
  },
  mounted() {
    this.loadPosts();
  },
  components: {
    PostCard,
    Loader,
    ErrorCard,
  },
});
</script>

<style lang="scss" scoped>
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
