<template>
  <div>
    <AccountHeading name="Posts" />
    <Loader :show="isLoading" />
    <ErrorCard :show="showError" :message="errorMessage" />
    <div v-if="!isLoading">
      <div class="filter-wrapper">
        <button
          class="filter-btn"
          :class="{ underline: filterTypeAll() }"
          @click="filterPosts('all')"
        >
          All
        </button>
        <button
          class="filter-btn"
          :class="{ underline: filterTypeUnpublished() }"
          @click="filterPosts('unpublished')"
        >
          Unpublished
        </button>
        <button
          class="filter-btn"
          :class="{ underline: filterTypePublished() }"
          @click="filterPosts('published')"
        >
          Published
        </button>
      </div>
      <router-link to="/create" class="new-post-button button"
        >New Post</router-link
      >
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
import ErrorCard from "./ErrorCard.vue";
import Loader from "./Loader.vue";
import session from "../session";
import { Post } from "../types";

export default Vue.extend({
  data() {
    return {
      unfilteredPosts: [] as Post[],
      posts: [] as Post[],
      isLoading: true,
      showError: false,
      errorMessage: "",
      filterType: "",
    };
  },
  mounted() {
    session
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
    filterTypeAll(): boolean {
      return this.filterType === "all";
    },
    filterTypeUnpublished(): boolean {
      return this.filterType === "unpublished";
    },
    filterTypePublished(): boolean {
      return this.filterType === "published";
    },
    filterPosts(type: string) {
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
@import "../styles/global.scss";

div.filter-wrapper {
  button {
    font-size: x-small;
    background-color: $smoke;
    &.underline {
      text-decoration: underline;
    }
    &:focus {
      outline: none;
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
a.new-post-button.button {
  width: 100%;
  text-decoration: none;
  text-align: center;
  padding: 16px;
  max-width: 334px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 36px;
  background-color: $dark-blue-grey;
  color: $snow;
  position: sticky;
  top: 20px;
}
</style>
