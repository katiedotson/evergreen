import express from "express";
import cors from "cors";
import services from "./service";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();
const app = express();
const port = 5000;

app.use(jsonParser);
app.use(cors());

app.get("/getUserPosts", (req, res) => {
  const authorId = Number(req.query.authorId);
  services
    .getUserPostsByAuthorId(authorId)
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
  const authorId = Number(req.query.authorId);
  services
    .getAuthorByAuthorId(authorId)
    .then((author) => {
      res.json(author);
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

app.post("/savePost", (req, res) => {
  const post = req.body;
  services
    .savePost(post)
    .then((result) => {
      console.log("result in app", result);
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
