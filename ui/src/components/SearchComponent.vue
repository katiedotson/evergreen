<template>
  <div class="search">
    <div class="wrapper">
      <input type="text" v-model="search" placeholder="Evergreen" />
      <button type="submit" v-on:click="submit">Search</button>
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
    }
  }
});
</script>

<style lang="scss">
div.search {
  height: 40px;
  margin-bottom: 20px;
  .wrapper {
    float: right;
    input[type="text"] {
      padding: 8px;
      font-family: "Merriweather", serif;
      border: 1px solid $dirty-snow;
      opacity: 70%;
      background-color: $smoke;
    }
    button {
      padding: 8px;
      font-family: "Merriweather", serif;
      border: 1px solid $dirty-snow;
      background-color: $dark-blue-grey;
      color: $smoke;
      opacity: 70%;
    }
  }
}
</style>
