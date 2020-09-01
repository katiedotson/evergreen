import { Router } from "express";

import util from "../util";
import { isAuthorized, getUserDataFromHeader } from "../auth";
import services from "../service";
import { Gallery } from "../types";

const router = Router();

router.get("/new", isAuthorized, (req, res) => {
  const userId = getUserDataFromHeader(req).id;
  const gallery: Gallery = {
    title: "",
    description: "",
    photos: [],
    authorId: userId,
    relevance: 0,
    urlName: "",
    published: false,
  };
  services
    .newGallery(gallery)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => res.status(500).send(error));
});

router.post("/save", isAuthorized, (req, res) => {
  const gallery: Gallery = req.body;
  gallery.urlName = util.createUrlNameFromTitle(gallery.title);
  const userId = getUserDataFromHeader(req).id;
  services
    .updateGallery(gallery, userId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

export default router;
