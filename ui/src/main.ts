import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import gAuth from "./auth/GoogleAuth";
import fbAuth from "./auth/FacebookAuth";
import editor from "./components/Editor.vue";

Vue.config.productionTip = false;
Vue.component("editor", editor);

new Vue({
  router,
  gAuth,
  fbAuth,
  render: (h) => h(App),
}).$mount("#app");
