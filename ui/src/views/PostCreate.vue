<template>
  <div>
    <ErrorCard :show="showError" :message="errorMessage" />
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
import ErrorCard from "../components/ErrorCard.vue";
import session from "../session";

export default Vue.extend({
  components: {
    PostEditor,
    ErrorCard
  },
  data() {
    return {
      postValue: "",
      titleValue: "",
      taglineValue: "",
      imgUrlValue: "",
      urlName: "",
      isChangedSinceUpdate: false,
      showError: false,
      errorMessage: ""
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
          if (!res) throw new Error("No response body.");
          this.urlName = res.urlName;
          this.isChangedSinceUpdate = false;
          this.showError = false;
        })
        .catch(e => {
          this.showError = true;
          this.errorMessage = "Unable to save post at this time.";
        });
    }
  }
});
</script>

<style lang="scss">
div.post-create {
  div.button-wrapper {
    margin-top: 20px;
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    text-align: right;
    button.active {
      background-color: $forestgreen;
      color: $smoke;
    }
  }
}
</style>
