<template>
  <div id="app">
    <PageTitle :title="getTitle()" />
    <Navigation />
    <div class="content">
      <router-view />
    </div>
    <LoginCard />
  </div>
</template>

<script>
import Navigation from "./components/NavigationComponent.vue";
import PageTitle from "./components/PageTitleComponent.vue";
import LoginCard from "./components/LoginCard.vue";

export default {
  name: "app",
  components: {
    Navigation,
    PageTitle,
    LoginCard
  },
  methods: {
    getTitle() {
      return this.$route.name;
    }
  }
};
</script>

<style lang="scss">
body {
  background-color: $smoke;
  color: $dark-blue-grey;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Merriweather";
}

div.content {
  padding-left: 15px;
  padding-right: 15px;
}
</style>
