<template>
  <div>
    <PostUnpublish :urlName="urlName" v-if="type === 'post'" />
    <GalleryUnpublish :urlName="urlName" v-if="type === 'gallery'" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostUnpublish from "../components/post/PostUnpublish.vue";
import GalleryUnpublish from "../components/gallery/GalleryUnpublish.vue";

export default Vue.extend({
  props: {
    urlName: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  components: { PostUnpublish, GalleryUnpublish },
});
</script>
