<template>
  <PostsComponent />
</template>
<script lang="ts">
import Vue from "vue";

import PostsComponent from "../components/post/PostsComponent.vue";

export default Vue.extend({
  components: {
    PostsComponent,
  },
});
</script>
