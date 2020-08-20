<template>
  <div>
    <PostEditor
      :post="post.body"
      :title="post.title"
      :valueChanged="updateValue"
      :titleChanged="updateTitle"
    />
    <button type="submit">Submit</button>
    <button>Preview</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostEditor from "../components/PostEditorComponent.vue";
import session from "../session";

export default Vue.extend({
  props: {
    urlName: {
      type: String
    }
  },
  components: {
    PostEditor
  },
  data() {
    return {
      postValue: "",
      titleValue: "",
      post: {}
    };
  },
  mounted() {
    this.loadPost();
  },
  methods: {
    updateValue(a: string) {
      this.postValue = a;
    },
    updateTitle(title: string) {
      this.titleValue = title;
    },
    loadPost() {
      this.post = session.getPost(this.urlName);
    }
  }
});
</script>

<style lang="scss"></style>
