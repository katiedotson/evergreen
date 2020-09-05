<template>
  <div>
    <PostPublish :urlName="urlName" v-if="type === 'post'" />
    <GalleryPublish :urlName="urlName" v-if="type === 'gallery'" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostPublish from "../components/post/PostPublish.vue";
import GalleryPublish from "../components/gallery/GalleryPublish.vue";

export default Vue.extend({
  props: {
    urlName: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  components: { PostPublish, GalleryPublish },
});
</script>
