<template>
  <div class="title">
    <div id="title-logo"></div>
    <h1 class="title"></h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    title: {
      type: String,
    },
  },
});
</script>

<style lang="scss">
div.title {
  #title-logo {
    float: left;
    margin-right: 20px;
    margin-left: 15px;
    height: 40px;
    width: 40px;
    background: url(/img/_Logo.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }
  h1.title {
    height: 40px;
  }
}
</style>
