<template>
  <div>
    <PostDelete :urlName="urlName" v-if="type === 'post'" />
    <GalleryDelete :urlName="urlName" v-if="type === 'gallery'" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostDelete from "../components/post/PostDelete.vue";
import GalleryDelete from "../components/gallery/GalleryDelete.vue";

export default Vue.extend({
  props: {
    urlName: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  components: { PostDelete, GalleryDelete },
});
</script>
