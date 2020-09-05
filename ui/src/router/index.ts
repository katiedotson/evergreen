import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Posts from "../views/Posts.vue";
import Gallery from "../views/Gallery.vue";
import Post from "../views/Post.vue";
import SignIn from "../views/SignIn.vue";
import NewAccount from "../views/NewAccount.vue";
import Account from "../views/Account.vue";
import Edit from "../views/Edit.vue";
import Create from "../views/Create.vue";
import Delete from "../views/Delete.vue";
import Publish from "../views/Publish.vue";
import Unpublish from "../views/Unpublish.vue";
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
    path: "/gallery/:urlName",
    props: true,
    component: Gallery,
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
    path: "/edit/:type/:urlName",
    props: true,
    component: Edit,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/create/:type",
    component: Create,
    props: true,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/delete/:type/:urlName",
    props: true,
    component: Delete,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/publish/:type/:urlName",
    props: true,
    component: Publish,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/unpublish/:type/:urlName",
    props: true,
    component: Unpublish,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (baseAuth.userIsAuth()) {
      if (from.path.includes("create") || from.path.includes("edit")) {
        session.post.clearPostData();
        session.gallery.clearGalleryData();
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
