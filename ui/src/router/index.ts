import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Posts from "../views/Posts.vue";
import Post from "../views/Post.vue";
import SignIn from "../views/SignIn.vue";
import NewAccount from "../views/NewAccount.vue";
import Account from "../views/Account.vue";
import PostEdit from "../views/PostEdit.vue";
import PostCreate from "../views/PostCreate.vue";
import PostDelete from "../views/PostDelete.vue";
import PostPublish from "../views/PostPublish.vue";
import PostUnpublish from "../views/PostUnpublish.vue";
import session from "../session";
import baseAuth from "../auth/BaseAuth";

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/posts",
    component: Posts,
  },
  {
    path: "/post/:urlName",
    props: true,
    component: Post,
  },
  {
    path: "/sign-in",
    component: SignIn,
  },
  {
    path: "/sign-in/first-time",
    component: NewAccount,
  },
  {
    path: "/account",
    component: Account,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit-post/:urlName",
    props: true,
    component: PostEdit,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/create",
    component: PostCreate,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/delete-post/:urlName",
    props: true,
    component: PostDelete,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/publish-post/:urlName",
    props: true,
    component: PostPublish,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/unpublish-post/:urlName",
    props: true,
    component: PostUnpublish,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (baseAuth.userIsAuth()) {
      if (from.path.includes("create") || from.path.includes("edit")) {
        session.clearPostData();
        next();
      } else next();
    } else {
      next({ path: "/sign-in" });
    }
  } else {
    next();
  }
});

router.onError((err) => console.error(err));

Vue.use(VueRouter);

export default router;
