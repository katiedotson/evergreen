<template>
  <div class="post-create">
    <PostEditor
      :valueChanged="updateValue"
      :titleChanged="updateTitle"
      :taglineChanged="updateTagline"
      :imgChanged="updateImg"
      :post="postValue"
      :title="titleValue"
      :img="imgUrlValue"
    />
    <button type="submit" @click="save" :class="{ active: isChangedSinceUpdate }">Submit</button>
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
      titleValue: "",
      taglineValue: "",
      imgUrlValue: "",
      urlName: "",
      isChangedSinceUpdate: false
    };
  },
  methods: {
    updateValue(a: string) {
      this.postValue = a;
      this.updateIsValueChanged();
    },
    updateTitle(title: string) {
      this.titleValue = title;
      this.updateIsValueChanged();
    },
    updateTagline(tagline: string) {
      this.taglineValue = tagline;
      this.updateIsValueChanged();
    },
    updateImg(url: string) {
      this.imgUrlValue = url;
      this.updateIsValueChanged();
    },
    updateIsValueChanged() {
      this.isChangedSinceUpdate = true;
    },
    save() {
      session
        .savePost(
          this.titleValue,
          this.postValue,
          this.taglineValue,
          this.imgUrlValue,
          this.urlName
        )
        .then(res => {
          if (!res) throw new Error("No response ");
          console.log(res);
          this.urlName = res.urlName;
          this.isChangedSinceUpdate = false;
        })
        .catch(e => console.error(e));
    }
  }
});
</script>

<style lang="scss">
div.post-create {
  button.active {
    background-color: green;
  }
}
</style>
