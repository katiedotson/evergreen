<template>
  <div>
    <user-information-component :firstTime="true" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UserInformationComponent from "../components/UserInformationComponent.vue";

export default Vue.extend({
  components: {
    UserInformationComponent
  }
});
</script>
