import { Gallery } from "../../types";
import api from "./api";
import session from "..";

export default {
  async saveGallery(gallery: Gallery): Promise<Gallery> {
    const userId = session.getUser()?.userId;
    gallery.authorId = userId;
    return new Promise<Gallery>((resolve, reject) => {
      api
        .saveGallery(gallery)
        .then((gallery) => {
          session.image.deleteUnusedImageFilesForGallery(gallery);
          session.clearTempFiles("gallery");
          session.storeInitialGallery(gallery);
          resolve(gallery);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  getBlankGallery(): Promise<Gallery> {
    return new Promise<Gallery>((resolve, reject) => {
      api
        .getBlankGallery()
        .then((gallery) => {
          resolve(gallery);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  getGallery(urlName: string) {
    return new Promise<Gallery>((resolve, reject) => {
      api
        .getGalleryByUrlName(urlName)
        .then((gallery) => {
          resolve(gallery);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
};
