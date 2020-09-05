<template>
  <div><SearchComponent /> <ContentComponent /></div>
</template>
<script lang="ts">
import Vue from "vue";

import ContentComponent from "../components/shared/ContentComponent.vue";
import SearchComponent from "../components/shared/SearchComponent.vue";

export default Vue.extend({
  components: {
    ContentComponent,
    SearchComponent,
  },
});
</script>
