<template>
  <transition name="fade">
    <div class="error-card" v-if="show && !closed">
      <p v-html="message"></p>
      <i class="material-icons error-card-close" @click="hide">close</i>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      closed: false
    };
  },
  props: {
    show: {
      type: Boolean
    },
    message: {
      type: String
    }
  },
  methods: {
    hide() {
      this.closed = true;
    }
  }
});
</script>

<style lang="scss">
div.error-card {
  z-index: 2;
  background-color: $firetruck;
  color: $smoke;
  position: fixed;
  bottom: 8px;
  right: 8px;
  padding: 6px;
  font-family: "Barlow", sans-serif;
  width: 200px;
  p {
    display: inline-block;
    max-width: 176px;
    text-transform: uppercase;
    font-size: x-small;
  }
  i.error-card-close {
    float: right;
    cursor: pointer;
  }
}
</style>
