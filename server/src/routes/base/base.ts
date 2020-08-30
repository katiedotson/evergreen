import util from "../../util";
import { isAuthorized, getUserToken } from "../../auth";
import services from "../../service";

import { Router } from "express";
import { Post, User } from "../../types";

import { validateUser } from "../../service/validation";

const router = Router();

router.get("/getUserPosts", isAuthorized, (req, res) => {
  const userId = String(req.query.userId);
  services
    .getUserPostsByUserId(userId)
    .then((postArray) => {
      res.json(postArray);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/getPost", (req, res) => {
  const urlName = String(req.query.urlName);
  const isPublished = req.query.published === "true";
  services
    .getPostByUrlName(urlName, isPublished)
    .then((post) => {
      res.json(post);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/getPostRegardless", isAuthorized, (req, res) => {
  const urlName = String(req.query.urlName);
  services
    .getPostByUrlNameRegardless(urlName)
    .then((post) => {
      res.json(post);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.post("/publishPost", isAuthorized, (req, res) => {
  const post: Post = req.body.post;
  post.published = true;
  services
    .updatePost(post)
    .then((post) => {
      res.json(post);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.post("/unpublishPost", isAuthorized, (req, res) => {
  const post: Post = req.body.post;
  post.published = false;
  services
    .updatePost(post)
    .then((post) => {
      res.json(post);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/getAuthor", (req, res) => {
  const authorId = String(req.query.authorId);
  services
    .getAuthorByUserId(authorId)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/getUser", (req, res) => {
  const userId = String(req.query.userId);
  const platform = String(req.query.platform);
  services
    .getUserByIdAndPlatform(userId, platform)
    .then((user) => {
      const token = getUserToken(user.userId, platform);
      res.header("User-Token", token);
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.post("/createNewUser", isAuthorized, (req, res) => {
  const userData = req.body.userData;
  const user: User = req.body.user;
  const errMessage = validateUser(user);
  if (!errMessage) {
    services.isUniqueUser(user.email).then((result) => {
      if (!result) {
        services
          .insertNewUser(userData, user)
          .then((user) => {
            const token = getUserToken(user.userId, userData.platform);
            res.header("User-Token", token);
            res.json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send();
          });
      } else res.status(400).send("Email already exists");
    });
  } else {
    res.status(400).send(errMessage);
  }
});

router.post("/updateUser", isAuthorized, (req, res) => {
  const userData = req.body.userData;
  const user = req.body.user;
  services
    .updateUser(userData, user)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

router.get("/getPosts", (req, res) => {
  services
    .getRelevantPosts()
    .then((postArray) => {
      res.json(postArray);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.delete("/deletePost", isAuthorized, (req, res) => {
  const urlName = String(req.body.post.urlName);
  services
    .deletePost(urlName)
    .then(() => {
      res.status(200).send("OK");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.post("/savePost", isAuthorized, (req, res) => {
  const post = req.body;
  post.urlName = util.createUrlNameFromTitle(post.title);
  services
    .updatePost(post)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/newPost", isAuthorized, (req, res) => {
  const authorId = String(req.query.authorId);
  const post: Post = {
    title: "",
    tagline: "",
    img: "",
    body: "",
    authorId,
    relevance: 0,
    urlName: "",
    published: false,
  };
  services
    .newPost(post)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => res.status(500).send(error));
});

router.post("/updatePostBanner", isAuthorized, (req, res) => {
  const img = String(req.body.img);
  const postId = String(req.body.postId);
  services
    .updatePostBanner(img, postId)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

export default router;
