import { Gallery } from "@/types";
import { Post } from "@/types";
import sessionData from "./sessionData";
import axios from "./axios-instance";
import session from ".";

export default {
  saveGallery(gallery: Gallery): Promise<Gallery> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "gallery/save",
          data: { gallery },
          headers: {
            "User-Token": sessionData.getUserToken(),
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          if (error.response.status === 401) session.logoutUserAndRedirect();
          reject(error);
        });
    });
  },
};
