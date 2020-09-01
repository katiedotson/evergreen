import { Post, Gallery } from "../../types";
import api from "./api";
import session from "..";

export default {
  async storeImage(file: File, type: string): Promise<string> {
    const fileType = file.type.toLowerCase();
    if (fileType.includes("png") || fileType.includes("jpeg")) {
      return new Promise<string>((resolve, reject) => {
        api
          .uploadImage(file)
          .then((response) => {
            session.storeTempFile(response.id, type);
            if (type == "banner" || type == "profile") {
              const prevPostBanner = session.getInitialPost()?.img;
              const prevPostBannerId = this.cleanImgSrc(prevPostBanner);
              if (prevPostBannerId.length)
                this.deleteUnusedImageFile(prevPostBannerId);
            }
            resolve(`https://media.publit.io/file/${response.id}.jpg`);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    } else
      throw new Error(
        "Image is not either PNG or JPEG, or user could not be found."
      );
  },
  deleteAllImageFiles(post: Post) {
    const imgsInPost = this.findImagesInPost(post.body);
    const imgBanner = this.cleanImgSrc(post.img);

    imgsInPost.push(imgBanner);

    api.deleteImages(imgsInPost);
  },
  deleteUnusedImageFile(imgId: string) {
    api.deleteImages([imgId]);
  },
  deleteUnusedImageFiles(post: Post) {
    const imgsInPost: string[] = this.findImagesInPost(post.body);

    const imagesUploaded: string[] = session.getTempFiles("post");

    //always check if images were deleted
    const initialPost = session.getInitialPost();
    if (initialPost && initialPost.body !== "") {
      const imagesInInitialPost = this.findImagesInPost(initialPost.body);
      if (imagesInInitialPost.length) {
        const imagesNotUsed = imagesInInitialPost.filter(
          (src) => !imgsInPost.includes(src)
        );
        api.deleteImages(imagesNotUsed);
      }
    }

    if (imagesUploaded) {
      const imagesNotUsed = imagesUploaded.filter(
        (src) => !imgsInPost.includes(src)
      );
      api.deleteImages(imagesNotUsed);
    }
  },
  deleteUnusedImageFilesForGallery(gallery: Gallery) {
    const imagesUploaded: string[] = session.getTempFiles("gallery");
    const imgsInGallery = gallery.photos.map((photo) =>
      this.cleanImgSrc(photo.img)
    );
    const imgsToDelete = imagesUploaded.filter(
      (img) => !imgsInGallery.includes(img)
    );
    api.deleteImages(imgsToDelete);
  },
  findImagesInPost(postBody: string): string[] {
    const elem = document.createElement("div");
    elem.innerHTML = postBody;

    const images: any = elem.getElementsByTagName("img");

    const srcs: string[] = [];
    images.forEach((img: HTMLImageElement) => {
      const imgSrc = this.cleanImgSrc(img.src);
      srcs.push(imgSrc);
    });

    return srcs;
  },
  cleanImgSrc(imgSrc: string): string {
    if (imgSrc.includes("http")) {
      const lastSlash = imgSrc.lastIndexOf("/");
      const lastDot = imgSrc.lastIndexOf(".");
      return imgSrc.substr(lastSlash + 1, lastDot - lastSlash - 1);
    }
    return imgSrc;
  },
};
