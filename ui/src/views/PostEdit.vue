<template>
  <div>
    <Loader :show="isLoading" />
    <div class="post-edit" v-if="!isLoading">
      <PostEditor
        :valueChanged="updateValue"
        :titleChanged="updateTitle"
        :taglineChanged="updateTagline"
        :imgChanged="updateImg"
        :post="postValue"
        :title="titleValue"
        :tagline="taglineValue"
        :img="imgUrlValue"
      />
      <div class="button-wrapper">
        <button type="submit" @click="save" :class="{ active: isChangedSinceUpdate }">
          Submit
        </button>
        <button>Preview</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PostEditor from "../components/PostEditorComponent.vue";
import Loader from "../components/Loader.vue";
import session from "../session";

export default Vue.extend({
  props: {
    urlName: {
      type: String
    }
  },
  components: {
    PostEditor,
    Loader
  },
  data() {
    return {
      postValue: "",
      titleValue: "",
      taglineValue: "",
      imgUrlValue: "",
      isChangedSinceUpdate: false,
      isLoading: true
    };
  },
  mounted() {
    this.loadPost();
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
          this.isChangedSinceUpdate = false;
        })
        .catch(e => console.error(e));
    },
    loadPost() {
      session.getPost(this.urlName).then(post => {
        if (post) {
          this.postValue = post.body;
          this.titleValue = post.title;
          this.taglineValue = post.tagline;
          this.imgUrlValue = post.img;
          this.isLoading = false;
        } else {
          throw new Error("No post was found");
        }
      });
    }
  }
});
</script>

<style lang="scss">
div.post-edit {
  div.button-wrapper {
    float: right;
    margin-top: 20px;
    button.active {
      background-color: green;
    }
  }
}
</style>
