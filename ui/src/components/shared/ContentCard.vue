<template>
  <a class="card" :href="redirectTo(item)" tabindex="200">
    <div v-if="item.type === 'post'">
      <img :src="item.img" v-if="item.img.length" />
      <div v-html="item.title" class="title"></div>
      <div v-html="item.tagline" class="tagline"></div>
      <hr />
      <div class="body" v-html="abbreviate(item.body)"></div>
      <hr />
    </div>
    <div v-if="item.type === 'gallery'">
      <img :src="item.photos[0].img" />
      <div v-html="item.title" class="title"></div>
      <hr />
    </div>
  </a>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    redirectTo(item: any) {
      return `/${item.type}/${item.urlName}`;
    },
    abbreviate(postBody: string) {
      return postBody.substring(0, 200).concat("...");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

a.card {
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
