<template>
  <div>
    <PostEditor :isNew="false" :urlName="urlName" v-if="type === 'post'" />
    <GalleryEditor
      :isNew="false"
      :urlName="urlName"
      v-if="type === 'gallery'"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostEditor from "../components/post/PostEditorComponent.vue";
import GalleryEditor from "../components/gallery/GalleryEditorComponent.vue";

export default Vue.extend({
  props: {
    urlName: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  components: { PostEditor, GalleryEditor },
});
</script>
