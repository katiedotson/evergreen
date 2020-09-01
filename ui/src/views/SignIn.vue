<template>
  <div>
    <SearchComponent />
    <LoginComponent />
    <ErrorCard
      :show="timeout"
      :message="'Please sign in again to resume your session.'"
    />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import SearchComponent from "../components/shared/SearchComponent.vue";
import LoginComponent from "../components/account/LoginComponent.vue";
import ErrorCard from "../components/shared/ErrorCard.vue";

export default Vue.extend({
  components: {
    SearchComponent,
    LoginComponent,
    ErrorCard,
  },
  data() {
    return {
      timeout: false,
    };
  },
  mounted() {
    this.timeout = this.$route.query.timeout == "true";
  },
});
</script>
