<template>
  <div><SearchComponent /> <PostsComponent /></div>
</template>
<script lang="ts">
import Vue from "vue";

import PostsComponent from "../components/post/PostsComponent.vue";
import SearchComponent from "../components/shared/SearchComponent.vue";

export default Vue.extend({
  components: {
    PostsComponent,
    SearchComponent,
  },
});
</script>
