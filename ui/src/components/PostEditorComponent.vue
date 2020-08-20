<template>
  <div class="editor-wrapper">
    <input class="edit-title" type="text" v-model="titleData" />
    <editor
      v-model="post"
      v-on:value-input="inputEvent"
      v-on:title-change="titleChangeEvent"
    ></editor>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Editor from "./Editor.vue";
export default Vue.extend({
  data() {
    return {
      titleData: ""
    };
  },
  props: {
    urlName: {
      type: String
    },
    valueChanged: {
      type: Function
    },
    titleChanged: {
      type: Function
    },
    post: {
      type: String
    },
    title: {
      type: String
    }
  },
  methods: {
    inputEvent(a: any) {
      this.valueChanged(a);
    },
    titleChangeEvent(a: any) {
      this.titleChanged(a);
    }
  },
  mounted() {
    this.titleData = this.$props.title;
  },
  watch: {
    titleData(newVal) {
      this.titleChangeEvent(newVal);
    }
  },
  components: {
    Editor
  }
});
</script>

<style lang="scss">
div.editor-wrapper {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  input.edit-title {
    width: 100%;
    max-width: 798px;
    padding-top: 6px;
    padding-bottom: 6px;
    margin-bottom: 12px;
    padding-right: 0;
    padding-left: 0;
    border: 1px solid $dirty-snow;
    font-family: "Merriweather";
    background-color: $smoke;
    font-size: x-large;
  }
}
</style>
