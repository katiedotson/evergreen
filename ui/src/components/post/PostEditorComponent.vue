<template>
  <div class="editor-wrapper form">
    <ErrorCard :show="showError" :message="errorMessage" />
    <Loader :isLoading="isLoading" />
    <div
      class="field-wrapper"
      :class="{ 'form-group--error': $v.post.title.$error }"
    >
      <label for="titleData">Title</label>
      <input
        class="edit-title"
        type="text"
        v-model.trim="$v.post.title.$model"
        id="titleData"
        @change="isChangedSinceUpdate = true"
      />
      <div class="error" v-if="!$v.post.title.required">Field is required</div>
      <div class="error" v-if="!$v.post.title.minLength">
        Minimum length: {{ $v.post.title.$params.minLength.min }} characters
      </div>
      <div class="error" v-if="!$v.post.title.maxLength">
        Maximum length: {{ $v.post.title.$params.maxLength.max }} characters
      </div>
    </div>
    <div
      class="field-wrapper"
      :class="{ 'form-group--error': $v.post.tagline.$error }"
    >
      <label for="taglineData">Tagline</label>
      <input
        class="edit-tagline"
        type="text"
        v-model.trim="$v.post.tagline.$model"
        id="taglineData"
        @change="isChangedSinceUpdate = true"
      />
      <div class="error" v-if="!$v.post.tagline.required">
        Field is required
      </div>
      <div class="error" v-if="!$v.post.tagline.minLength">
        Minimum length: {{ $v.post.tagline.$params.minLength.min }} characters
      </div>
      <div class="error" v-if="!$v.post.tagline.maxLength">
        Maximum length: {{ $v.post.tagline.$params.maxLength.min }} characters
      </div>
    </div>
    <div class="field-wrapper">
      <label for="imgUrl">Banner</label>
      <input type="file" class="edit-img" id="imgUrl" @change="processFile" />
      <img
        :src="post.img"
        v-if="post.img && post.img.length"
        :class="{ fade: newImageLoading }"
      />
    </div>
    <editor
      :value="postBody"
      v-on:value-input="inputEvent"
      v-on:img-error="imgErrorEvent"
    ></editor>
    <div class="button-wrapper">
      <button
        type="submit"
        @click="save"
        :class="{ active: isChangedSinceUpdate }"
        :disabled="this.$v.$invalid"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Editor from "./Editor.vue";
import ErrorCard from "../shared/ErrorCard.vue";
import Loader from "../shared/Loader.vue";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { HTMLInputEvent, Post } from "../../types";
import session from "../../session";

export default Vue.extend({
  mixins: [validationMixin],
  validations: {
    post: {
      title: { required, minLength: minLength(4), maxLength: maxLength(40) },
      tagline: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(100),
      },
    },
  },
  data() {
    return {
      post: { title: "", tagline: "", img: "", body: "" } as Post,
      showError: false,
      errorMessage: "",
      isChangedSinceUpdate: false,
      isLoading: true,
      newImageLoading: false,
      postBody: "",
    };
  },
  props: {
    urlName: {
      type: String,
    },
    isNew: {
      type: Boolean,
    },
  },
  mounted(): void {
    if (!this.isNew) {
      this.loadPost();
    } else if (this.isNew && !session.getInitialPost()?._id) {
      this.initialize();
    } else if (session.getInitialPost()?._id) {
      this.loadSessionPost();
    } else {
      this.showError = true;
      this.errorMessage = "Could not load post at this time.";
    }
  },
  methods: {
    storeInitialPost(): void {
      session.storeInitialPost(this.post);
    },
    loadSessionPost(): void {
      this.post = session.getInitialPost();
    },
    save(): void {
      session.post
        .savePost(this.post)
        .then((post) => {
          this.post.urlName = post.urlName;
          this.isChangedSinceUpdate = false;
          this.storeInitialPost();
        })
        .catch(() => {
          this.showError = true;
          this.errorMessage = "Unable to save post.";
        });
    },
    loadPost(): void {
      session.post.getPost(this.urlName).then((post) => {
        if (post) {
          this.post = post;
          this.postBody = post.body;
          this.isLoading = false;
          this.storeInitialPost();
        } else {
          this.isLoading = false;
          this.showError = true;
          this.errorMessage = "Could not load post at this time.";
        }
      });
    },
    processFile(event: HTMLInputEvent): void {
      if (event && event.target && event.target.files) {
        const file = event.target.files[0];
        this.newImageLoading = true;
        session.image
          .storeImage(file, "banner")
          .then((location: string) => {
            session.post.updatePostBanner(location).then(() => {
              this.post.img = location;
              this.newImageLoading = false;
              this.storeInitialPost();
            });
          })
          .catch(() => {
            this.imgErrorEvent();
          });
      } else {
        this.imgErrorEvent();
      }
    },
    imgErrorEvent(): void {
      this.showError = true;
      this.errorMessage = "Problem while uploading new image.";
      this.isChangedSinceUpdate = false;
      this.newImageLoading = false;
    },
    inputEvent(value: string): void {
      this.isChangedSinceUpdate = true;
      this.post.body = value;
    },
    initialize(): void {
      session.post
        .getBlankPost()
        .then((post) => {
          this.post = post;
          this.isLoading = false;
          this.storeInitialPost();
        })
        .catch(() => {
          this.isLoading = false;
          this.showError = true;
          this.errorMessage = "Unable to initialize post.";
        });
    },
  },
  components: {
    Editor,
    ErrorCard,
    Loader,
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

div.editor-wrapper.form {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  div.field-wrapper {
    margin-bottom: 16px;

    img {
      width: 100%;

      &.fade {
        transition: opacity 2s;
        opacity: 40%;
      }
    }

    &.form-group--error {
      input,
      textarea {
        color: $bright-orange;
        border: 1px solid $bright-orange;
      }
    }

    input {
      width: calc(100% - 14px);
      max-width: 786px;
      padding: 6px;
      border: 1px solid $dirty-snow;
      font-family: "Barlow";
      background-color: $smoke;
      &.edit-title {
        font-size: x-large;
      }
      &.edit-tagline {
        font-size: x-small;
      }
    }

    div.error {
      display: block;
      font-family: "Barlow", sans-serif;
      font-size: x-small;
      color: $bright-orange;
    }
  }

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
