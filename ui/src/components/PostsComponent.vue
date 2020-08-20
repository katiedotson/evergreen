<template>
  <div class="posts">
    <PostCard v-for="(post, i) in posts" v-bind:key="i" v-bind:post="post" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Post } from "../types";
import PostCard from "../components/PostCardComponent.vue";
import session from "../session";

export default Vue.extend({
  data: function() {
    return { posts: {} as Post[] };
  },
  methods: {
    loadPosts() {
      this.posts = session.getPosts();
    }
  },
  mounted() {
    this.loadPosts();
  },
  components: {
    PostCard
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
