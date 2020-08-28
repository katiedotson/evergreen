<template>
  <PostEditor :isNew="true" :urlName="''" />
</template>

<script lang="ts">
import Vue from "vue";
import PostEditor from "../components/PostEditorComponent.vue";

export default Vue.extend({
  props: {
    urlName: {
      type: String,
    },
  },
  components: { PostEditor },
});
</script>
