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
  getGallery(id: string) {
    return new Promise<Gallery>((resolve, reject) => {
      api
        .getGallery(id)
        .then((gallery) => {
          resolve(gallery);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  deleteGallery(gallery: Gallery): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      api
        .deleteGallery(gallery)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  clearGalleryData(): void {
    const gallery = session.getInitialGallery();
    if (!gallery.title) {
      this.deleteGallery(gallery);
    }
    session.clearTempFiles("gallery");
    session.clearInitialGallery();
  },
  getUserGalleries(): Promise<Gallery[]> {
    return new Promise<Gallery[]>((resolve, reject) => {
      const userId = session.getUserData()?.id;
      if (userId) {
        api
          .getGalleriesByUserId()
          .then((galleries) => {
            resolve(galleries);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      } else {
        reject("User is not authenticated");
      }
    });
  },
};
