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
  getGallery(urlName: string, published?: boolean) {
    if (published !== null && published !== undefined && published) {
      return new Promise<Gallery>((resolve, reject) => {
        api
          .getGallery(urlName)
          .then((gallery) => {
            resolve(gallery);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    } else {
      return new Promise<Gallery>((resolve, reject) => {
        api
          .getGalleryForEdit(urlName)
          .then((gallery) => {
            resolve(gallery);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    }
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
      api
        .getGalleriesByUserId()
        .then((galleries) => {
          resolve(galleries);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  getGalleries(): Promise<Gallery[]> {
    return new Promise<Gallery[]>((resolve, reject) => {
      api
        .getRelevantGalleries()
        .then((galleries) => {
          resolve(galleries);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  publishGallery(gallery: Gallery): Promise<any> {
    return new Promise((resolve, reject) => {
      api
        .publishGallery(gallery)
        .then((res) => resolve(res))
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  unpublishGallery(gallery: Gallery): Promise<any> {
    return new Promise((resolve, reject) => {
      api
        .unpublishGallery(gallery)
        .then((res) => resolve(res))
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
};
