<template>
  <div>
    <h3 v-html="name"></h3>
    <hr />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    name: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";
h3 {
  padding-top: 10px;
}
</style>
