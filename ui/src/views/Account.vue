<template>
  <div>
    <AccountComponent />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import AccountComponent from "../components/account/AccountComponent.vue";

export default Vue.extend({
  components: {
    AccountComponent,
  },
});
</script>
