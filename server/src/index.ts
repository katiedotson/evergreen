import express from "express";
import cors from "cors";
import services from "./service";
import bodyParser from "body-parser";
import util from "./util";

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
  services
    .getPostByUrlName(urlName)
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
  const urlName = String(req.query.urlName);
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
  const currentUrlName = post.urlName;
  const wouldBeUrlName = util.createUrlNameFromTitle(post.title);

  if (currentUrlName == "" || currentUrlName == undefined) {
    post.urlName = wouldBeUrlName;
    services
      .saveNewPost(post)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error);
      });
  } else {
    services
      .updatePost(post, wouldBeUrlName)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send(error);
      });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
