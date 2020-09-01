import publitio from "../assets";
import post from "./postApi";
import user from "./userApi";
import gallery from "./galleryApi";

export default {
  post,
  user,
  gallery,
  uploadImage(file: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      publitio
        .uploadFile(file, "file")
        .then((data) => {
          resolve(data);
        })
        .catch((error) => reject(error));
    });
  },
  deleteImages(ids: string[]) {
    ids.forEach((id) => {
      publitio.call(`/files/delete/${id}`, "DELETE");
    });
  },
};
