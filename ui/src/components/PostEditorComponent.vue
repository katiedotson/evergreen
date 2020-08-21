<template>
  <div class="editor-wrapper">
    <input class="edit-title" type="text" v-model="titleData" />
    <input class="edit-tagline" type="text" v-model="taglineData" />
    <input class="edit-img" type="text" v-model="imgUrl" />
    <editor
      :value="postBody"
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
      titleData: "",
      taglineData: "",
      postBody: "",
      imgUrl: ""
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
    taglineChanged: {
      type: Function
    },
    imgChanged: {
      type: Function
    },
    post: {
      type: String
    },
    title: {
      type: String
    },
    tagline: {
      type: String
    },
    img: {
      type: String
    }
  },
  methods: {
    inputEvent(a: any) {
      this.valueChanged(a);
    },
    titleChangeEvent(a: any) {
      this.titleChanged(a);
    },
    taglineChangeEvent(a: any) {
      this.taglineChanged(a);
    },
    imgChangeEvent(a: any) {
      this.imgChanged(a);
    }
  },
  mounted() {
    this.titleData = this.$props.title;
    this.taglineData = this.$props.tagline;
    this.postBody = this.$props.post;
    this.imgUrl = this.$props.img;
  },
  watch: {
    titleData(newVal) {
      this.titleChangeEvent(newVal);
    },
    postBody(newVal) {
      this.inputEvent(newVal);
    },
    taglineData(newVal) {
      this.taglineChangeEvent(newVal);
    },
    imgUrl(newVal) {
      this.imgChangeEvent(newVal);
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
  input {
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
    &.edit-title {
      font-size: x-large;
    }
    &.edit-tagline {
      font-size: x-small;
    }
  }
}
</style>
