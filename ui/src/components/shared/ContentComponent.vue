<template>
  <div>
    <ErrorCard :show="showError" :message="errorMessage" />
    <Loader :show="isLoading" />
    <div class="posts" v-if="!isLoading">
      <ContentCard v-for="(result, i) in results" v-bind:key="i" v-bind:item="result" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import ContentCard from "../shared/ContentCard.vue";
import ErrorCard from "../shared/ErrorCard.vue";
import Loader from "../shared/Loader.vue";
import session from "../../session";

export default Vue.extend({
  data() {
    return {
      results: {} as any[],
      isLoading: true,
      errorMessage: "",
      showError: false,
    };
  },
  methods: {
    loadPosts() {
      session.post
        .getPosts()
        .then((posts) => {
          this.results = posts.filter((post) => post.title.length);
          session.gallery.getGalleries().then((galleries) => {
            this.results = this.results.concat(galleries);
            this.isLoading = false;
          });
        })
        .catch(() => {
          this.errorMessage = "Hmm. Something went wrong.";
          this.isLoading = false;
          this.showError = true;
        });
    },
  },
  mounted() {
    this.loadPosts();
  },
  components: {
    ContentCard,
    Loader,
    ErrorCard,
  },
});
</script>

<style lang="scss" scoped>
.posts {
  @include xl {
    grid-template-columns: auto auto auto auto auto;
  }
  @include lg {
    grid-template-columns: auto auto auto auto;
  }
  @include md {
    grid-template-columns: auto auto auto;
  }
  @include sm {
    grid-template-columns: auto auto;
  }
  display: grid;
  justify-content: space-between;
  grid-gap: 10px;
}
</style>
