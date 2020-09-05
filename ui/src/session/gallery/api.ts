import { Gallery } from "@/types";
import axios from "../api/axios-instance";
import session from "..";

export default {
  saveGallery(gallery: Gallery): Promise<Gallery> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "gallery/save",
          data: { gallery },
          headers: {
            "User-Token": session.getUserToken(),
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response.status === 401)
            session.user.logoutUserAndRedirect();
          reject(error);
        });
    });
  },
  getBlankGallery(): Promise<Gallery> {
    return new Promise<Gallery>((resolve, reject) => {
      axios
        .get(`gallery/new`, {
          headers: {
            "User-Token": session.getUserToken(),
          },
        })
        .then((res) => resolve(res.data))
        .catch((error) => {
          if (error.response.status === 401)
            session.user.logoutUserAndRedirect();
          reject(error);
        });
    });
  },
  getGallery(urlName: string): Promise<Gallery> {
    return new Promise((resolve, reject) => {
      axios
        .get(`gallery/getOne?urlName=${urlName}`, {
          headers: {
            "User-Token": session.getUserToken(),
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response.status === 401)
            session.user.logoutUserAndRedirect();
          reject(error);
        });
    });
  },
  deleteGallery(gallery: Gallery): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "DELETE",
          url: `gallery/delete`,
          data: {
            gallery,
          },
          headers: {
            "User-Token": session.getUserToken(),
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response.status === 401)
            session.user.logoutUserAndRedirect();
          reject(error);
        });
    });
  },
  getGalleriesByUserId(): Promise<Gallery[]> {
    return new Promise<Gallery[]>((resolve, reject) => {
      axios
        .request({
          method: "GET",
          url: "gallery/getAllByUserId",
          headers: {
            "User-Token": session.getUserToken(),
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response.status === 401)
            session.user.logoutUserAndRedirect();
          reject(error);
        });
    });
  },
  publishGallery(gallery: Gallery): Promise<any> {
    return new Promise<Gallery[]>((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "gallery/publish",
          data: {
            gallery,
          },
          headers: {
            "User-Token": session.getUserToken(),
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response.status === 401)
            session.user.logoutUserAndRedirect();
          reject(error);
        });
    });
  },
  unpublishGallery(gallery: Gallery): Promise<any> {
    return new Promise<Gallery[]>((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "gallery/unpublish",
          data: {
            gallery,
          },
          headers: {
            "User-Token": session.getUserToken(),
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response.status === 401)
            session.user.logoutUserAndRedirect();
          reject(error);
        });
    });
  },
};
