<template>
  <div class="post">
    <img :src="post.img" v-if="post.img.length" />
    <div class="post-content">
      <div v-html="post.title" class="title"></div>
      <div v-html="post.tagline" class="tagline"></div>
      <hr />
      <div class="body" v-html="post.body"></div>
      <hr />
      <AuthorInfoCard :author="author" v-if="author" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AuthorInfoCard from "./AuthorInfoCard.vue";

export default Vue.extend({
  props: {
    post: {
      type: Object
    },
    author: {
      type: Object
    }
  },
  components: {
    AuthorInfoCard
  }
});
</script>

<style lang="scss">
div.post {
  max-width: 800px;
  margin: 0 auto;
  img {
    width: 100%;
  }
  hr {
    border-top: 1px solid;
    opacity: 30%;
  }
  div.post-content {
    div.title {
      margin-top: 10px;
      font-size: 30pt;
    }
    div.tagline {
      margin-top: 5px;
      font-style: italic;
      font-family: "Barlow", sans-serif;
    }
    div.body {
      font-family: "Barlow", sans-serif;
    }
  }
}
</style>
