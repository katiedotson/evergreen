<template>
  <div>
    <AccountHeading name="Posts" />
    <Loader :show="isLoading" />
    <ErrorCard :show="showError" :message="errorMessage" />
    <button @click="toggleOptionsMenu" class="options" v-if="!isLoading">
      Options
    </button>
    <div v-if="!isLoading">
      <transition name="left">
        <div v-if="showOptions" class="options-menu">
          <div class="heading left">Filter</div>
          <div class="heading right">Create</div>
          <div class="filter-wrapper">
            <button
              class="filter-btn"
              :class="{ underline: filterType === 'all' }"
              @click="filterPosts('all')"
            >
              All
            </button>
            <button
              class="filter-btn"
              :class="{ underline: filterType === 'unpublished' }"
              @click="filterPosts('unpublished')"
            >
              Unpublished
            </button>
            <button
              class="filter-btn"
              :class="{ underline: filterType === 'published' }"
              @click="filterPosts('published')"
            >
              Published
            </button>
          </div>
          <div class="new-button-wrapper">
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
          </div>
          <button class="close" @click="toggleOptionsMenu">Cancel</button>
        </div>
      </transition>
      <div class="user-post" v-for="post in posts" v-bind:key="post.title">
        <div class="title">{{ post.title }}</div>
        <router-link
          v-if="post.published"
          class="url-name"
          :to="`../post/${post.urlName}`"
          >{{ post.urlName }}</router-link
        >
        <div class="edit-button-wrapper">
          <router-link class="button edit" :to="`../edit-post/${post.urlName}`"
            >Edit</router-link
          >
          <router-link
            v-if="!post.published"
            class="button delete"
            :to="`../delete-post/${post.urlName}`"
            >Delete</router-link
          >
          <router-link
            v-if="!post.published"
            class="button publish"
            :to="`../publish-post/${post.urlName}`"
            >Publish</router-link
          >
          <router-link
            v-if="post.published"
            class="button unpublish"
            :to="`../unpublish-post/${post.urlName}`"
            >Unpublish</router-link
          >
        </div>
      </div>
      <div class="empty" v-if="!posts.length">Nothing here yet.</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import AccountHeading from "./AccountHeading.vue";
import ErrorCard from "../shared/ErrorCard.vue";
import Loader from "../shared/Loader.vue";
import session from "../../session";
import { Post } from "../../types";

export default Vue.extend({
  data() {
    return {
      unfilteredPosts: [] as Post[],
      posts: [] as Post[],
      isLoading: true,
      showError: false,
      errorMessage: "",
      filterType: "",
      showOptions: false,
    };
  },
  mounted() {
    session.post
      .getUserPosts()
      .then((posts) => {
        this.unfilteredPosts = posts.filter((post) => post.title.length);
        this.filterType = "all";
        this.isLoading = false;
      })
      .catch(() => {
        this.isLoading = false;
        this.showError = true;
        this.errorMessage = "Could  not load posts.";
      });
  },
  methods: {
    toggleOptionsMenu(): void {
      this.showOptions = !this.showOptions;
    },
    filterPosts(type: string) {
      this.showOptions = false;
      this.filterType = type;
    },
  },
  components: {
    AccountHeading,
    Loader,
    ErrorCard,
  },
  watch: {
    filterType(newValue: string) {
      switch (newValue) {
        case "all": {
          this.posts = this.unfilteredPosts;
          break;
        }
        case "published": {
          this.posts = this.unfilteredPosts.filter(
            (post: Post) => post.published
          );
          break;
        }
        case "unpublished": {
          this.posts = this.unfilteredPosts.filter(
            (post: Post) => !post.published
          );
          break;
        }
        default: {
          this.posts = this.unfilteredPosts;
          break;
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../styles/_global.scss";

button.options {
  float: right;
  position: relative;
  top: -68px;
  background-color: $dark-blue-grey;
  color: $snow;
}

div.options-menu {
  position: absolute;
  top: 0;
  left: 0;
  height: calc(100vh - 24px);
  background-color: $dark-blue-grey;
  background-image: linear-gradient(
    to top,
    $x-dark-blue-grey 10%,
    $dark-blue-grey 90%
  );
  padding: 6px;

  button.close {
    width: 100%;
    background-color: $burnt-orange;
    color: $snow;
  }

  div.heading {
    width: 50%;
    display: inline-block;
    text-transform: uppercase;
    font-weight: bold;
    color: $snow;
    &.right {
      float: right;
      text-align: right;
    }
  }

  div.new-button-wrapper {
    display: inline-block;
    float: right;
    width: 50%;
    a.button.new {
      display: block;
      font-size: x-small;
      color: $snow;
      text-align: right;
      text-decoration: none;
      padding: 16px;
      font-family: "Barlow", sans-serif;
      text-transform: uppercase;
      border: none;
      margin-bottom: none;
      cursor: pointer;
      transition: 0.5s;
    }
  }

  div.filter-wrapper {
    display: inline-block;
    width: 50%;
    text-align: right;
    button {
      display: block;
      font-size: x-small;
      background-color: transparent;
      color: $snow;
      &.underline {
        text-decoration: underline;
      }
      &:focus {
        outline: none;
      }
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
  margin-top: 36px;
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
