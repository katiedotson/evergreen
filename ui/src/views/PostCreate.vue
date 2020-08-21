<template>
  <div>
    <PostEditor
      :valueChanged="updateValue"
      :titleChanged="updateTitle"
      :post="postValue"
      :title="titleValue"
    />
    <button type="submit" @click="save">Submit</button>
    <button>Preview</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostEditor from "../components/PostEditorComponent.vue";
import session from "../session";

export default Vue.extend({
  components: {
    PostEditor
  },
  data() {
    return {
      postValue: "",
      titleValue: ""
    };
  },
  methods: {
    updateValue(a: string) {
      this.postValue = a;
    },
    updateTitle(title: string) {
      this.titleValue = title;
    },
    save() {
      session.savePost(this.titleValue, this.postValue).catch(e => console.error(e));
    }
  }
});
</script>
