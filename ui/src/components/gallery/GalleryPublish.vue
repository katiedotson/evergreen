<template>
  <div>
    <ErrorCard :show="showError" :message="errorMessage" />
    <Loader :show="isLoading" />
    <div v-if="!isLoading">
      <GalleryView v-bind:gallery="gallery" v-bind:author="undefined" />
      <div class="button-wrapper">
        <button class="publish" @click="publishGallery">Publish</button>
        <button class="cancel" @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "../../router";
import GalleryView from "./GalleryView.vue";
import Loader from "../shared/Loader.vue";
import ErrorCard from "../shared/ErrorCard.vue";
import { Gallery } from "../../types";
import session from "../../session";

export default Vue.extend({
  data: function() {
    return {
      gallery: {} as Gallery,
      isLoading: true,
      showError: false,
      errorMessage: "",
    };
  },
  props: {
    urlName: {
      type: String,
    },
  },
  components: {
    GalleryView,
    Loader,
    ErrorCard,
  },
  mounted() {
    this.loadGallery();
  },
  methods: {
    loadGallery() {
      session.gallery
        .getGallery(this.urlName)
        .then((gallery) => {
          if (gallery) {
            this.gallery = gallery;
            this.isLoading = false;
          } else {
            this.galleryLoadError();
          }
        })
        .catch(() => {
          this.galleryLoadError();
        });
    },
    galleryLoadError() {
      this.isLoading = false;
      this.showError = true;
      this.errorMessage = "Could not load gallery.";
    },
    publishGallery() {
      session.gallery
        .publishGallery(this.gallery)
        .then((res) => {
          if (res) {
            router.push("/account#content");
          } else {
            this.publishError();
          }
        })
        .catch(() => {
          this.publishError();
        });
    },
    cancel() {
      this.$router.push("/account#content");
    },
    publishError() {
      this.showError = true;
      this.errorMessage = "Could not publish gallery at this time.";
    },
  },
  router,
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

div.button-wrapper {
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: right;
  button.publish {
    background-color: $light-blue;
  }
}
</style>
