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
  services.gallery
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
  services.gallery
    .updateGallery(gallery, userId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/getOne", (req, res) => {
  const urlName = String(req.query.urlName);
  services.gallery
    .getGalleryByUrlName(urlName)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/getRegardless", isAuthorized, (req, res) => {
  const urlName = String(req.query.urlName);
  const userId = getUserDataFromHeader(req).id;
  services.gallery
    .getGalleryByUrlName(urlName, userId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.get("/getPublished", (req, res) => {
  services.gallery
    .getPublishedGalleries()
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

  services.gallery
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
  services.gallery
    .getGalleriesByUserId(userId)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.post("/publish", isAuthorized, (req, res) => {
  const gallery = req.body.gallery;
  const userId = getUserDataFromHeader(req).id;
  services.gallery
    .updateGalleryPublished(gallery, userId, true)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

router.post("/unpublish", isAuthorized, (req, res) => {
  const gallery = req.body.gallery;
  const userId = getUserDataFromHeader(req).id;
  services.gallery
    .updateGalleryPublished(gallery, userId, false)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

export default router;
