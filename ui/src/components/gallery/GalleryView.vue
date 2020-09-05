<template>
  <div class="gallery">
    <div class="gallery-content">
      <div v-html="gallery.title" class="title"></div>
      <div v-html="gallery.tagline" class="description"></div>
      <hr />
      <div class="gallery-photo" v-for="(photo, i) in gallery.photos" :key="i">
        <img :src="photo.img" v-if="photo.img.length" />
        <div class="tagline">
          {{ photo.tagline }}
        </div>
      </div>
      <hr />
      <AuthorInfoCard :author="author" v-if="author" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AuthorInfoCard from "../shared/AuthorInfoCard.vue";

export default Vue.extend({
  props: {
    gallery: {
      type: Object,
    },
    author: {
      type: Object,
    },
  },
  components: {
    AuthorInfoCard,
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

div.gallery {
  max-width: 800px;
  margin: 0 auto;
  img {
    width: 100%;
  }
  hr {
    border-top: 1px solid;
    opacity: 30%;
  }
  div.gallery-content {
    div.title {
      margin-top: 10px;
      font-size: 30pt;
    }
    div.description {
      margin-top: 5px;
      font-style: italic;
      font-family: "Barlow", sans-serif;
    }
    div.gallery-photo {
      img {
        width: 100%;
      }
      div.tagline {
        margin-top: 5px;
        font-size: small;
        font-style: italic;
        font-family: "Barlow", sans-serif;
      }
    }
  }
}
</style>
