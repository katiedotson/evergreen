import { Router } from "express";

import util from "../util";
import { isAuthorized, getUserDataFromHeader } from "../auth";
import services from "../service";
import { Post } from "../types";

const router = Router();

router.get("/getOne", (req, res) => {
  const urlName = String(req.query.urlName);
  services.post
    .getPostByUrlName(urlName)
    .then((post) => {
      res.json(post);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/getRegardless", isAuthorized, (req, res) => {
  const urlName = String(req.query.urlName);
  const userId = getUserDataFromHeader(req).id;
  services.post
    .getPostByUrlName(urlName, userId)
    .then((post) => {
      res.json(post);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.post("/publish", isAuthorized, (req, res) => {
  const post: Post = req.body.post;
  post.published = true;
  const userId = getUserDataFromHeader(req).id;
  services.post
    .updatePost(post, userId)
    .then((post) => {
      res.json(post);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.post("/unpublish", isAuthorized, (req, res) => {
  const post: Post = req.body.post;
  post.published = false;
  const userId = getUserDataFromHeader(req).id;
  services.post
    .updatePost(post, userId)
    .then((post) => {
      res.json(post);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/getAll", (req, res) => {
  services.post
    .getRelevantPosts()
    .then((postArray) => {
      res.json(postArray);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/getAllByUser", isAuthorized, (req, res) => {
  const userId = getUserDataFromHeader(req).id;
  services.post
    .getUserPostsByUserId(userId)
    .then((postArray) => {
      res.json(postArray);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.delete("/delete", isAuthorized, (req, res) => {
  const urlName = String(req.body.post.urlName);
  const userId = getUserDataFromHeader(req).id;
  services.post
    .deletePost(urlName, userId)
    .then(() => {
      res.status(200).send("OK");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/new", isAuthorized, (req, res) => {
  const userId = getUserDataFromHeader(req).id;
  const post: Post = {
    title: "",
    tagline: "",
    img: "",
    body: "",
    authorId: userId,
    relevance: 0,
    urlName: "",
    published: false,
    type: "post",
  };
  services.post
    .newPost(post)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => res.status(500).send(error));
});

router.post("/updateBanner", isAuthorized, (req, res) => {
  const img = String(req.body.img);
  const postId = String(req.body.postId);
  const userId = getUserDataFromHeader(req).id;
  services.post
    .updatePostBanner(img, postId, userId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.post("/save", isAuthorized, (req, res) => {
  const post = req.body;
  post.urlName = util.createUrlNameFromTitle(post.title);
  const userId = getUserDataFromHeader(req).id;
  services.post
    .updatePost(post, userId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

export default router;
