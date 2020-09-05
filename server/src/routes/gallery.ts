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
    photos: [
      {
        img:
          "https://images.unsplash.com/photo-1598722333020-0d3f58cfd47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
        tagline: "Photo 1 tagline.",
      },
    ],
    authorId: userId,
    relevance: 0,
    urlName: "",
    type: "gallery",
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
  const gallery: Gallery = req.body.gallery;
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

router.get("/getOne", isAuthorized, (req, res) => {
  const urlName = String(req.query.urlName);
  const userId = getUserDataFromHeader(req).id;
  services
    .getGalleryByUrlName(urlName, userId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.delete("/delete", isAuthorized, (req, res) => {
  const gallery = req.body.gallery;
  const userId = getUserDataFromHeader(req).id;

  services
    .deleteGallery(gallery, userId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/getAllByUserId", isAuthorized, (req, res) => {
  const userId = getUserDataFromHeader(req).id;
  services
    .getGalleriesByUserId(userId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

export default router;
