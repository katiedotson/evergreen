import { Router } from "express";

import {
  isAuthorized,
  getUserToken,
  getUserDataFromHeader,
  sendAuthEmail,
  decodeToken,
} from "../auth";
import services from "../service";
import { User } from "../types";
import { validateUser } from "../service/validation";

const router = Router();

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

router.get("/get", (req, res) => {
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

router.post("/new", (req, res) => {
  const userData = req.body.userData;
  const user: User = req.body.user;
  user.active = false;
  const errMessage = validateUser(user);
  if (!errMessage) {
    user.active = false;
    services.isUniqueUser(user.email).then((result) => {
      if (!result) {
        services
          .insertNewUser(userData, user)
          .then((user) => {
            sendAuthEmail(userData, user);
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

router.get("/activate", (req, res) => {
  const token = String(req.query.authToken);
  try {
    const userData = decodeToken(token);
    services.activateUser(userData);
    console.info(`User Activated: ${userData.id} \n \t ${userData.platform}`);
    res.send(200);
  } catch (err) {
    console.error(err);
  }
});

router.post("/update", isAuthorized, (req, res) => {
  const userData = getUserDataFromHeader(req);
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

export default router;
