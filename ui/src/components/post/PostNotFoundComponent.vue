<template>
  <div class="not-found">
    <h1>Hmm... We couldn't find what you were looking for.</h1>
    <Search />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Search from "../shared/SearchComponent.vue";
export default Vue.extend({
  components: {
    Search,
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

div.not-found {
  max-width: 800px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  h1 {
    font-family: "Playfair Display";
    border: 1px solid $dirty-snow;
    padding: 24px;
    margin-bottom: 20px;
  }
}
</style>
