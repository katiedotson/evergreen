<template>
  <div>
    <ErrorCard :show="showError" :message="errorMessage" />
    <Loader :show="isLoading" />
    <div
      class="field-wrapper title"
      :class="{ 'form-group--error': $v.gallery.title.$error }"
      v-if="!isLoading"
    >
      <label>Title</label>
      <input
        class="title"
        type="text"
        v-model.trim="$v.gallery.title.$model"
        @change="isChangedSinceUpdate = true"
      />
      <div class="error" v-if="!$v.gallery.title.required">
        Field is required
      </div>
      <div class="error" v-if="!$v.gallery.title.minLength">
        Minimum length: {{ $v.gallery.title.$params.minLength.min }} characters
      </div>
      <div class="error" v-if="!$v.gallery.title.maxLength">
        Maximum length: {{ $v.gallery.title.$params.maxLength.max }} characters
      </div>
    </div>
    <div
      class="field-wrapper description"
      :class="{ 'form-group--error': $v.gallery.description.$error }"
      v-if="!isLoading"
    >
      <label>Description</label>
      <textarea
        class="title"
        type="text"
        v-model.trim="$v.gallery.description.$model"
        @change="isChangedSinceUpdate = true"
      />
      <div class="error" v-if="!$v.gallery.description.maxLength">
        Maximum length:
        {{ $v.gallery.description.$params.maxLength.max }} characters
      </div>
      <hr />
    </div>
    <div v-for="(photo, i) in gallery.photos" :key="i" class="photo">
      <div class="img-container" v-if="!isLoading">
        <img
          :src="photo.img"
          v-on:mouseover="showImgEditor(i)"
          v-on:mouseleave="showImgEditor(-1)"
          :class="{ loading: imageLoadingIndex === i }"
        />
        <transition name="fade">
          <div
            class="editor"
            v-if="activeImgEditor === i"
            v-on:mouseover="showImgEditor(i)"
            v-on:mouseleave="showImgEditor(-1)"
          >
            <i
              class="material-icons"
              v-on:mouseover="showImgEditor(i)"
              @click="updateImg(i)"
              >publish</i
            >
            <i
              class="material-icons"
              v-on:mouseover="showImgEditor(i)"
              @click="deleteImg(i)"
              v-if="i !== 0"
              >delete</i
            >
            <i
              class="material-icons"
              v-on:mouseover="showImgEditor(i)"
              @click="addAfter(i)"
              >add</i
            >
          </div>
        </transition>
      </div>
      <div class="field-wrapper" v-if="!isLoading">
        <label>Tagline</label>
        <input class="tagline" type="text" v-model="photo.tagline" />
      </div>
    </div>
    <div class="button-wrapper" v-if="!isLoading">
      <button
        type="submit"
        @click="save"
        :class="{ active: isChangedSinceUpdate }"
        :disabled="!isChangedSinceUpdate || this.$v.$invalid"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ErrorCard from "../shared/ErrorCard.vue";
import Loader from "../shared/Loader.vue";
import session from "../../session";
import { Gallery, GalleryPhoto } from "../../types";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default Vue.extend({
  mixins: [validationMixin],
  validations: {
    gallery: {
      title: { required, minLength: minLength(4), maxLength: maxLength(40) },
      description: {
        maxLength: maxLength(100),
      },
    },
  },
  props: {
    urlName: {
      type: String,
    },
    isNew: {
      type: Boolean,
    },
  },
  data() {
    return {
      isLoading: true,
      errorMessage: "",
      showError: false,
      isChangedSinceUpdate: false,
      imageLoadingIndex: -1,
      gallery: {
        title: "",
        description: "",
        photos: [{} as GalleryPhoto],
      } as Gallery,
      activeImgEditor: -1,
    };
  },
  mounted(): void {
    if (!this.isNew) {
      this.loadGallery();
    } else if (this.isNew && !session.getInitialGallery()?._id) {
      this.initialize();
    } else if (session.getInitialGallery()?._id) {
      this.loadSessionGallery();
    } else {
      this.showError = true;
      this.errorMessage = "Could not load post at this time.";
    }
  },
  methods: {
    storeInitialGallery(): void {
      session.storeInitialGallery(this.gallery);
    },
    loadSessionGallery(): void {
      this.gallery = session.getInitialGallery();
      this.isLoading = false;
    },
    loadGallery(): void {
      session.gallery.getGallery(this.urlName).then((gallery) => {
        if (gallery) {
          this.gallery = gallery;
          this.isLoading = false;
          this.storeInitialGallery();
        } else {
          this.isLoading = false;
          this.showError = true;
          this.errorMessage = "Could not load gallery at this time.";
        }
      });
    },
    initialize(): void {
      session.gallery
        .getBlankGallery()
        .then((gallery) => {
          this.gallery = gallery;
          this.isLoading = false;
          this.storeInitialGallery();
        })
        .catch(() => {
          this.isLoading = false;
          this.showError = true;
          this.errorMessage = "Unable to initialize post.";
        });
    },
    showImgEditor(index: number) {
      this.activeImgEditor = index;
    },
    addAfter(index: number): void {
      const newPhoto = {
        img:
          "https://images.unsplash.com/photo-1598722333020-0d3f58cfd47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
        tagline: "Tagline.",
      };
      this.gallery.photos.splice(index + 1, 0, newPhoto);
      this.isChangedSinceUpdate = true;
    },
    deleteImg(index: number): void {
      this.gallery.photos.splice(index, 1);
      this.isChangedSinceUpdate = true;
    },
    updateImg(index: number): void {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      const handleUpload = async (input: any) => {
        if (input !== null) {
          const file = input.files.item(0);
          if (file) {
            this.activeImgEditor = -1;
            this.imageLoadingIndex = index;
            session.image
              .storeImage(file, "gallery")
              .then((fileLocation) => {
                this.gallery.photos[index].img = fileLocation;
                this.isChangedSinceUpdate = true;
                setTimeout(() => {
                  this.imageLoadingIndex = -1;
                }, 500);
              })
              .catch(() => {
                this.imgErrorEvent();
              });
          }
        }
      };
      handleUpload.bind(this);
      input.onchange = () => {
        handleUpload(input);
      };
    },
    save(): void {
      session.gallery
        .saveGallery(this.gallery)
        .then(() => {
          this.isChangedSinceUpdate = false;
        })
        .catch(() => {
          this.showError = true;
          this.errorMessage = "Unable to save post at this time.";
        });
    },
    imgErrorEvent(): void {
      this.showError = true;
      this.errorMessage = "Problem while uploading new image.";
      this.isChangedSinceUpdate = false;
      this.imageLoadingIndex = -1;
    },
  },
  components: {
    ErrorCard,
    Loader,
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

div.field-wrapper {
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 786px;
  &.title {
    input {
      font-size: x-large;
    }
  }
  &.description {
    textarea {
      height: 100px;
    }
  }

  &.form-group--error {
    input,
    textarea {
      color: $bright-orange;
      border: 1px solid $bright-orange;
    }
  }

  div.error {
    display: block;
    font-family: "Barlow", sans-serif;
    font-size: x-small;
    color: $bright-orange;
  }

  input,
  textarea {
    width: calc(100% - 14px);
    max-width: 786px;
    border: 1px solid $dirty-snow;
    font-family: "Barlow";
    background-color: $smoke;
    padding: 6px;
  }
}

div.photo {
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  margin-top: 18px;

  div.img-container {
    position: relative;

    img {
      width: 100%;
      max-width: 800px;
      background: black;
      transition: opacity 20s;
      &.loading {
        opacity: 0%;
      }
    }

    div.editor {
      position: absolute;
      top: 0;
      right: 0;
      background: $x-dark-blue-grey;
      padding: 16px;
      i {
        color: snow;
        font-size: x-large;
        cursor: pointer;
        opacity: 40%;
        margin: 10px;
        transition: opacity 0.4s;
        &:hover {
          opacity: 100%;
        }
      }
    }
  }
}

div.field-wrapper {
  input {
    width: calc(100% - 14px);
    padding: 6px;
    border: 1px solid $dirty-snow;
    font-family: "Barlow";
    background-color: $smoke;
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
</style>
