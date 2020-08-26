<template>
  <div class="author">
    <img :src="author.img" />
    <div v-html="author.firstName + ' ' + author.lastName" class="name"></div>
    <div v-html="author.location" class="location"></div>
    <hr />
    <div v-html="author.bio" class="bio"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    author: {
      type: Object
    }
  }
});
</script>

<style lang="scss">
div.author {
  padding-bottom: 20px;
  img {
    width: 100px !important;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .name {
    font-weight: bold;
    font-size: 14pt;
  }
  .location {
    font-size: 10pt;
    font-style: italic;
    font-family: "Barlow", sans-serif;
  }
  .bio {
    font-size: 10pt;
    font-family: "Barlow", sans-serif;
  }
}
</style>
