<template>
  <div>
    <SearchComponent />
    <LoginComponent />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import SearchComponent from "../components/SearchComponent.vue";
import LoginComponent from "../components/LoginComponent.vue";

export default Vue.extend({
  components: {
    SearchComponent,
    LoginComponent,
  },
});
</script>

<style lang="scss"></style>
