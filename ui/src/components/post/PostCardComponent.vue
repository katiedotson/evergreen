<template>
  <a class="post-card" :href="redirectToPost(post.urlName)" tabindex="200">
    <img :src="post.img" v-if="post.img.length" />
    <div v-html="post.title" class="title"></div>
    <div v-html="post.tagline" class="tagline"></div>
    <hr />
    <div class="body" v-html="abbreviate(post.body)"></div>
    <hr />
  </a>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    post: {
      type: Object,
    },
  },
  methods: {
    redirectToPost(urlName: string) {
      return `/post/${urlName}`;
    },
    abbreviate(postBody: string) {
      return postBody.substring(0, 200).concat("...");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

a.post-card {
  max-width: 300px;
  margin-bottom: 10px;
  display: block;
  cursor: pointer;
  text-decoration: none;
  color: $dark-blue-grey;
  img {
    width: 100%;
    height: 180px;
  }
  .title {
    margin-top: 5px;
    font-size: 16pt;
    font-weight: bold;
  }
  .tagline {
    margin-top: 5px;
    font-size: 10pt;
    font-style: italic;
    font-family: "Barlow", sans-serif;
  }
  .body {
    font-size: 10pt;
    margin-top: 5px;
    font-family: "Barlow", sans-serif;
    img {
      display: none;
    }
  }
  hr {
    border-top: 1px solid;
    opacity: 30%;
  }
}
</style>
