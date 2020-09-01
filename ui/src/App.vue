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
    LoginCard,
  },
  methods: {
    getTitle() {
      return this.$route.name;
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: $smoke;
  color: $dark-blue-grey;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Barlow";
  overflow-x: hidden;
}

div.content {
  padding-left: 15px;
  padding-right: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.left-enter-active,
.left-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.left-enter /* .fade-leave-active in <2.1.8 */ {
  transform: translateX(50vw);
  opacity: 0;
}
.left-leave-to {
  transform: translateX(-50vw);
  opacity: 0;
}
</style>
