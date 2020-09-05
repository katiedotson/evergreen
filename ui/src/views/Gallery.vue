<template>
  <div>
    <ErrorCard :show="showError" :message="errorMessage" />
    <Loader :show="isLoading" />
    <GalleryView
      v-bind:gallery="gallery"
      v-bind:author="author"
      v-if="!isLoading"
    />
    <NotFound v-if="galleryNotFound" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "../router";
import GalleryView from "../components/gallery/GalleryView.vue";
import Loader from "../components/shared/Loader.vue";
import ErrorCard from "../components/shared/ErrorCard.vue";
import NotFound from "../components/shared/ContentNotFoundComponent.vue";
import { Gallery, User } from "../types";
import session from "../session";

export default Vue.extend({
  data() {
    return {
      gallery: {} as Gallery,
      author: {} as User,
      isLoading: true,
      showError: false,
      errorMessage: "",
      galleryNotFound: false,
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
    NotFound,
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
            this.loadAuthor();
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
      this.galleryNotFound = true;
    },
    loadAuthor() {
      session.user
        .getAuthor(this.gallery.authorId)
        .then((author) => {
          if (author) {
            this.author = author;
            this.isLoading = false;
          } else {
            this.authorLoadError();
          }
        })
        .catch(() => {
          this.authorLoadError();
        });
    },
    authorLoadError() {
      this.isLoading = false;
      this.showError = true;
      this.errorMessage = "Could not load author.";
    },
  },
  router,
});
</script>
