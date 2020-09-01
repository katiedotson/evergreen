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
};
