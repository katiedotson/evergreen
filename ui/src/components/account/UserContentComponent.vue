<template>
  <div>
    <AccountHeading name="Content" />
    <Loader :show="isLoading" />
    <ErrorCard :show="showError" :message="errorMessage" />
    <div class="button-wrapper" v-if="!isLoading">
      <button @click="toggleFilterMenu" class="filter">
        Filter
      </button>
      <button @click="toggleCreateMenu" class="create">
        Create
      </button>
    </div>
    <div v-if="!isLoading">
      <transition name="left">
        <div v-if="showCreate" class="create-menu">
          <div class="wrapper">
            <div class="heading">Create</div>
            <router-link to="/create/post" class="button new">Post</router-link>
            <router-link to="/create/gallery" class="button new"
              >Gallery</router-link
            >
            <router-link to="/create/audio" class="button new"
              >Audio</router-link
            >
            <router-link to="/create/video" class="button new"
              >Video</router-link
            >
            <button class="close" @click="toggleCreateMenu">Cancel</button>
          </div>
        </div>
      </transition>
      <transition name="left">
        <div v-if="showFilter" class="filter-menu">
          <div class="wrapper">
            <div>
              <div class="heading">Type</div>
              <label class="checkmark-container"
                >Posts
                <input type="checkbox" v-model="showPosts" />
                <span class="checkmark"></span>
              </label>
              <label class="checkmark-container"
                >Galleries
                <input type="checkbox" v-model="showGalleries" />
                <span class="checkmark"></span>
              </label>
            </div>
            <div>
              <div class="heading">Status</div>
              <label class="checkmark-container"
                >Unpublished
                <input type="checkbox" v-model="showUnpublished" />
                <span class="checkmark"></span>
              </label>
              <label class="checkmark-container"
                >Published
                <input type="checkbox" v-model="showPublished" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </transition>
      <div
        class="user-post"
        v-for="result in results"
        v-bind:key="result.title"
      >
        <div class="title">{{ result.title }}</div>
        <router-link
          v-if="result.published"
          class="url-name"
          :to="`../${result.type}/${result.urlName}`"
          >{{ result.urlName }}</router-link
        >
        <div class="edit-button-wrapper">
          <router-link
            class="button edit"
            :to="`../edit/${result.type}/${result.urlName}`"
            >Edit</router-link
          >
          <router-link
            v-if="!result.published"
            class="button delete"
            :to="`../delete/${result.type}/${result.urlName}`"
            >Delete</router-link
          >
          <router-link
            v-if="!result.published"
            class="button publish"
            :to="`../publish/${result.type}/${result.urlName}`"
            >Publish</router-link
          >
          <router-link
            v-if="result.published"
            class="button unpublish"
            :to="`../unpublish/${result.type}/${result.urlName}`"
            >Unpublish</router-link
          >
        </div>
      </div>
      <div class="empty" v-if="!results.length">Nothing here yet.</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccountHeading from "./AccountHeading.vue";
import ErrorCard from "../shared/ErrorCard.vue";
import Loader from "../shared/Loader.vue";
import session from "../../session";
import { Post, Gallery } from "../../types";

export default Vue.extend({
  data() {
    return {
      unfilteredPosts: [] as Post[],
      unfilteredGalleries: [] as Gallery[],
      posts: [] as Post[],
      isLoading: true,
      showError: false,
      errorMessage: "",
      filterType: "",
      showCreate: false,
      showFilter: false,
      showPosts: true,
      showGalleries: true,
      showUnpublished: true,
      showPublished: false,
      results: [] as any[],
    };
  },
  mounted() {
    session.post
      .getUserPosts()
      .then((posts) => {
        this.unfilteredPosts = posts;
        session.gallery.getUserGalleries().then((galleries) => {
          this.unfilteredGalleries = galleries;
          this.isLoading = false;
          this.processFilter();
        });
      })
      .catch(() => {
        this.isLoading = false;
        this.showError = true;
        this.errorMessage = "Could  not load posts.";
      });
  },
  methods: {
    toggleCreateMenu(): void {
      this.showCreate = !this.showCreate;
      if (this.showCreate) {
        this.showFilter = false;
      }
    },
    toggleFilterMenu(): void {
      this.showFilter = !this.showFilter;
    },
    processFilter() {
      const allPosts = this.unfilteredPosts;
      const allGalleries = this.unfilteredGalleries;
      let results: any[] = [];
      if (this.showPosts) {
        results = allPosts;
      }
      if (this.showGalleries) {
        results = results.concat(allGalleries);
      }
      if (this.showPublished && !this.showUnpublished) {
        results = results.filter((item) => {
          return item.published;
        });
      } else if (this.showUnpublished && !this.showPublished) {
        results = results.filter((item) => {
          return !item.published;
        });
      }
      this.results = results;
    },
  },
  components: {
    AccountHeading,
    Loader,
    ErrorCard,
  },
  watch: {
    showUnpublished() {
      this.processFilter();
    },
    showPublished() {
      this.processFilter();
    },
    showPosts() {
      this.processFilter();
    },
    showGalleries() {
      this.processFilter();
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

div.button-wrapper {
  height: 48px;

  button.filter {
    width: 50%;
    background-color: $dark-blue-grey;
    color: $snow;
  }

  button.create {
    width: 50%;
    background-color: $forestgreen;
    color: $snow;
  }
}

div.filter-menu {
  .wrapper {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;
    background-color: $dark-blue-grey;
    width: 100%;
    div {
      color: $snow;
      padding: 10px;
      &.heading {
        font-weight: bold;
        margin-bottom: 10px;
        padding: 2px;
      }
    }
  }
}

.checkmark-container {
  display: block;
  position: relative;
  padding-left: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  line-height: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: small;
}

/* Hide the browser's default checkbox */
.checkmark-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 10px;
  width: 10px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.checkmark-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkmark-container input:checked ~ .checkmark {
  background-color: $dark-blue-grey;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkmark-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkmark-container .checkmark:after {
  left: 3px;
  top: -4px;
  width: 5px;
  height: 10px;
  border: solid $snow;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

div.create-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: $dark-blue-grey;
  background-image: linear-gradient(
    to top,
    $x-dark-blue-grey 10%,
    $dark-blue-grey 90%
  );

  div.wrapper {
    margin-top: 30vh;
    button.close {
      margin-left: auto;
      margin-right: auto;
      background-color: $burnt-orange;
      color: $snow;
      display: block;
    }

    div.heading {
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      color: $snow;
      padding: 16px;
      font-size: x-large;
    }
    a.button.new {
      display: block;
      color: $snow;
      text-decoration: none;
      padding: 16px;
      font-family: "Barlow", sans-serif;
      text-transform: uppercase;
      border: none;
      margin-bottom: none;
      cursor: pointer;
      transition: 0.5s;
      width: fit-content;
      margin-left: auto;
      margin-right: auto;
    }
  }
}

div.empty {
  text-align: center;
  margin-top: 36px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid $dirty-snow;
  border-radius: 4px;
  padding: 16px;
}

div.user-post {
  margin-top: 10px;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid $dirty-snow;
  border-radius: 4px;
  div.title {
    font-weight: bold;
  }
  div.tagline {
    font-style: italic;
    font-size: x-small;
  }
  a.url-name {
    font-family: "Barlow", sans-serif;
    color: $dark-blue-grey;
  }
  div.edit-button-wrapper {
    margin-top: 8px;

    a.button {
      display: inline-block;
      &.delete {
        margin-left: 8px;
      }
      &.publish,
      &.unpublish {
        margin-left: 8px;
        background-color: $light-blue;
      }
    }
  }
}
</style>
