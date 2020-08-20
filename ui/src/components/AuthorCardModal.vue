<template>
  <div class="modal" v-if="show">
    <div class="modal-content-wrapper">
      <AuthorInfoCard :author="author" />
      <div class="close" v-on:click="$emit('close-modal')">Close</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AuthorInfoCard from "./AuthorInfoCard.vue";
export default Vue.extend({
  props: {
    author: {
      type: Object
    },
    show: {
      type: Boolean
    }
  },
  components: {
    AuthorInfoCard
  },
  methods: {}
});
</script>

<style lang="scss">
div.modal {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000b0;
  div.modal-content-wrapper {
    max-width: 800px;
    margin-top: 40vh;
    margin-left: 8px;
    margin-right: 8px;
    padding: 16px;
    background-color: $smoke;
    @include md {
      margin-left: auto;
      margin-right: auto;
    }
    @include lg {
      margin-left: auto;
      margin-right: auto;
    }
    @include xl {
      margin-left: auto;
      margin-right: auto;
    }
  }
  div.close {
    clear: both;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    border: 1px solid $dirty-snow;
    border-radius: 4px;
  }
}
</style>
