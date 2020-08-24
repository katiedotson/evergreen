import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Evergreen",
    component: Home
  },
  {
    path: "/about",
    name: "Evergreen",
    component: () => import("../views/About.vue")
  },
  {
    path: "/posts",
    name: "Evergreen",
    component: () => import("../views/Posts.vue")
  },
  {
    path: "/post/:urlName",
    props: true,
    component: () => import("../views/Post.vue")
  },
  {
    path: "/sign-in",
    name: "Sign in",
    component: () => import("../views/SignIn.vue")
  },
  {
    path: "/sign-in/first-time",
    name: "Create Account",
    component: () => import("../views/NewAccount.vue")
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../views/Account.vue")
  },
  {
    path: "/edit-post/:urlName",
    props: true,
    name: "",
    component: () => import("../views/PostEdit.vue")
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("../views/PostCreate.vue")
  },
  {
    path: "/delete-post/:urlName",
    props: true,
    name: "Delete",
    component: () => import("../views/PostDelete.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
