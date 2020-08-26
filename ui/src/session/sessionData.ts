import { User, UserData } from "../types";

export default {
  userDataKey: "userData",
  userKey: "user",
  tempImgFileKey: "temp_img_file",
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
  },
  getUserData(): UserData | null {
    return this.getSessionItem(this.userDataKey);
  },
  getUser(): User {
    return this.getSessionItem(this.userKey);
  },
  storeTempFile(publicId: string) {
    const storedFiles: string[] = sessionStorage.getItem(this.tempImgFileKey)
      ? JSON.parse(String(sessionStorage.getItem(this.tempImgFileKey)))
      : [];
    storedFiles.push(publicId);
    sessionStorage.setItem(this.tempImgFileKey, JSON.stringify(storedFiles));
  }
};
