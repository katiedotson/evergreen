import publitio from "../../assets";

export default {
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
