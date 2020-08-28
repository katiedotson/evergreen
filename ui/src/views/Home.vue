<template>
  <div><SearchComponent /> <PostsComponent /></div>
</template>
<script lang="ts">
import Vue from "vue";

import PostsComponent from "../components/PostsComponent.vue";
import SearchComponent from "../components/SearchComponent.vue";

export default Vue.extend({
  components: {
    PostsComponent,
    SearchComponent,
  },
});
</script>

<style lang="scss"></style>
