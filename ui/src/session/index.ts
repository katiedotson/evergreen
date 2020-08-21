import { Post, User, UserData } from "../types";
import api from "./api";

interface Data {
  posts: Post[];
  users: User[];
}

export default {
  userDataKey: "userData",
  userKey: "user",
  saveAvatarImageLocal(file: File): void {
    this.saveFileLocally("avatar", file);
  },
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
  getAuthor(authorId: number) {
    return api.getAuthor(authorId);
  },
  getSessionItem(key: string): any {
    const item = sessionStorage.getItem(key);
    if (item != null && item != "") {
      return JSON.parse(item);
    }
    return null;
  },
  async getPosts(): Promise<Post[]> {
    return api.getPosts();
  },
  async loadUserData(userData: UserData, platform: string): Promise<boolean> {
    return new Promise(resolve => {
      api.getUser(userData, platform).then(user => {
        if (userData && user) {
          this.storeUserData(userData);
          this.storeUser(user);
          window.location.reload();
          resolve(true);
          return;
        } else {
          throw new Error("");
        }
      });
    });
  },
  async getUserPosts(): Promise<Post[]> {
    const authorId = this.getUser()?.authorId;
    if (authorId === undefined) return [];
    return api.getUserPosts(authorId);
  },
  async getPost(urlName: string): Promise<Post | undefined> {
    return api.getPost(urlName);
  },
  async savePost(
    postTitle: string,
    postBody: string,
    postTagline: string,
    imgUrl: string,
    urlName: string
  ): Promise<Post | undefined> {
    const post = this.createPost(postTitle, postBody, postTagline, imgUrl, urlName);
    return api.savePost(post);
  },
  createPost(
    postTitle: string,
    postBody: string,
    postTagline: string,
    imgUrl: string,
    url: string
  ): Post {
    const authorId = this.getUser()?.authorId;
    if (authorId !== undefined) {
      return {
        title: postTitle,
        body: postBody,
        relevance: 0,
        tagline: postTagline,
        img: imgUrl,
        urlName: url,
        authorId
      };
    }
    throw new Error("No author could be found in the session");
  },
  async deletePost(urlName: string): Promise<any> {
    return api.deletePost(urlName);
  }
};
