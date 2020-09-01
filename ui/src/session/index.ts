import post from "./post/postSession";
import user from "./user/userSession";
import gallery from "./gallery/gallerySession";
import image from "./image/imageSession";
import { User, UserData, Post, Gallery } from "../types";

export default {
  post,
  user,
  gallery,
  image,
  userDataKey: "user_data",
  userKey: "user",
  tempImgFileKey: "temp_img_file",
  initialPostKey: "initial_post",
  initialGalleryKey: "initial_gallery",
  userTokenKey: "CgQIq5AB",
  saveFileLocally(key: string, file: File): void {
    const reader = new FileReader();
    reader.onload = function() {
      const thisImage = reader.result;
      if (typeof thisImage == "string") {
        localStorage.setItem(key, thisImage);
      }
    };
    reader.readAsDataURL(file);
  },
  getSessionItem(key: string): any {
    const item = sessionStorage.getItem(key);
    if (item != null && item != "") {
      return JSON.parse(item);
    }
    return null;
  },
  storeUserData(userData: UserData) {
    sessionStorage.setItem(this.userDataKey, JSON.stringify(userData));
  },
  storeUser(user: User) {
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
  },
  removeUserData() {
    sessionStorage.removeItem(this.userDataKey);
    sessionStorage.removeItem(this.userKey);
    sessionStorage.removeItem(this.userTokenKey);
    sessionStorage.removeItem(this.tempImgFileKey);
    sessionStorage.removeItem(this.initialPostKey);
  },
  getUserData(): UserData | null {
    return this.getSessionItem(this.userDataKey);
  },
  getUser(): User {
    return this.getSessionItem(this.userKey);
  },
  storeTempFile(publicId: string, type: string) {
    const storedFiles: string[] = sessionStorage.getItem(
      `${this.tempImgFileKey}_${type}`
    )
      ? JSON.parse(
          String(sessionStorage.getItem(`${this.tempImgFileKey}_${type}`))
        )
      : [];
    storedFiles.push(publicId);
    sessionStorage.setItem(
      `${this.tempImgFileKey}_${type}`,
      JSON.stringify(storedFiles)
    );
  },
  getTempFiles(type: string) {
    return JSON.parse(
      String(sessionStorage.getItem(`${this.tempImgFileKey}_${type}`))
    );
  },
  clearTempFiles(type: string) {
    sessionStorage.removeItem(`${this.tempImgFileKey}_${type}`);
  },
  storeInitialPost(post: Post) {
    sessionStorage.setItem(this.initialPostKey, JSON.stringify(post));
  },
  storeInitialGallery(gallery: Gallery): void {
    sessionStorage.setItem(this.initialGalleryKey, JSON.stringify(gallery));
  },
  getInitialPost(): Post {
    return sessionStorage.getItem(this.initialPostKey)
      ? JSON.parse(String(sessionStorage.getItem(this.initialPostKey)))
      : ({} as Post);
  },
  getInitialGallery(): Gallery {
    return sessionStorage.getItem(this.initialGalleryKey)
      ? JSON.parse(String(sessionStorage.getItem(this.initialGalleryKey)))
      : ({} as Gallery);
  },
  clearInitialPost(): void {
    sessionStorage.removeItem(this.initialPostKey);
  },
  clearInitialGallery(): void {
    sessionStorage.removeItem(this.initialGalleryKey);
  },
  storeUserToken(token: string): void {
    sessionStorage.setItem(this.userTokenKey, token);
  },
  getUserToken(): string {
    const token = sessionStorage.getItem(this.userTokenKey);
    return token !== "" && token !== undefined && token !== null
      ? String(sessionStorage.getItem(this.userTokenKey))
      : "";
  },
};
