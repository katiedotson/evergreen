<template>
  <div class="search">
    <div class="wrapper">
      <input type="text" v-model="search" placeholder="Evergreen" />
      <button type="submit" class="submit" v-on:click="submit">Search</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: function() {
    return { search: "" };
  },
  methods: {
    submit() {
      console.log(this.search);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/global.scss";

div.search {
  height: 40px;
  margin-bottom: 20px;
  .wrapper {
    float: right;
    height: 20px;
    line-height: 20px;
    input[type="text"] {
      padding: 8px;
      font-family: "Playfair Display", serif;
      border: 1px solid $dirty-snow;
      opacity: 70%;
      background-color: $smoke;
    }
    button {
      padding-top: 10px;
      padding-left: 8px;
      padding-right: 8px;
      padding-bottom: 9px;
      background-color: $dark-blue-grey;
    }
  }
}
</style>
