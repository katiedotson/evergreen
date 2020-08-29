import express from "express";
import cors from "cors";
import services from "./service";
import bodyParser from "body-parser";
import util from "./util";

import { Post } from "./types";

const jsonParser = bodyParser.json();
const app = express();
const port = 5000;

app.use(jsonParser);
app.use(cors());

app.get("/getUserPosts", (req, res) => {
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

app.get("/getPost", (req, res) => {
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

app.get("/getPostRegardless", (req, res) => {
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

app.post("/publishPost", (req, res) => {
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

app.post("/unpublishPost", (req, res) => {
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

app.get("/getAuthor", (req, res) => {
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

app.get("/getUser", (req, res) => {
  const userId = String(req.query.userId);
  const platform = String(req.query.platform);
  services
    .getUserByIdAndPlatform(userId, platform)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

app.post("/createNewUser", (req, res) => {
  const userData = req.body.userData;
  const user = req.body.user;
  services
    .insertNewUser(userData, user)
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

app.post("/updateUser", (req, res) => {
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

app.get("/getPosts", (req, res) => {
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

app.delete("/deletePost", (req, res) => {
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

app.post("/savePost", (req, res) => {
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

app.get("/newPost", (req, res) => {
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

app.post("/updatePostBanner", (req, res) => {
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

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
