<template>
  <div class="loader" v-if="show"></div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    show: {
      type: Boolean
    }
  }
});
</script>

<style lang="scss">
div.loader {
  border: 16px solid $light-gray;
  border-top: 16px solid $dark-blue-grey;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40%;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
