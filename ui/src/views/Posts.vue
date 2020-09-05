<template>
  <ContentComponent />
</template>
<script lang="ts">
import Vue from "vue";

import ContentComponent from "../components/shared/ContentComponent.vue";

export default Vue.extend({
  components: {
    ContentComponent,
  },
});
</script>
