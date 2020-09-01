<template>
  <GalleryEditor :isNew="true" :urlName="''" />
</template>

<script lang="ts">
import Vue from "vue";
import GalleryEditor from "../components/gallery/GalleryEditorComponent.vue";

export default Vue.extend({
  props: {
    urlName: {
      type: String,
    },
  },
  components: { GalleryEditor },
});
</script>
