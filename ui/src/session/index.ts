import { Post, User, UserData } from "../types";
import api from "./api";
import sessionData from "./sessionData";

export default {
  async storeImage(file: File): Promise<string> {
    const fileType = file.type.toLowerCase();
    const userId = sessionData.getUser()?.userId;
    if (fileType.includes("png") || (fileType.includes("jpeg") && userId)) {
      const timestamp = new Date().getTime();
      return new Promise<string>((resolve, reject) => {
        const publicId = `${userId}-${timestamp}`;
        api
          .uploadImage(file, publicId)
          .then(imgUrl => {
            sessionData.storeTempFile(publicId);
            resolve(imgUrl);
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
      });
    } else throw new Error("Image is not either PNG or JPEG, or user could not be found.");
  },
  async getAuthor(userId: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      api
        .getAuthor(userId)
        .then(user => resolve(user))
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },
  async getPosts(): Promise<Post[]> {
    return new Promise<Post[]>((resolve, reject) => {
      api
        .getPosts()
        .then(posts => resolve(posts))
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },
  async loadUserData(userData: UserData, platform: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      api
        .getUser(userData, platform)
        .then(user => {
          if (userData && user) {
            sessionData.storeUserData(userData);
            sessionData.storeUser(user);
            window.location.reload();
            resolve(true);
          } else {
            if (userData && platform) {
              sessionData.storeUserData(userData);
              window.location.replace("/sign-in/first-time");
            }
            reject(false);
          }
        })
        .catch(() => reject(false));
    });
  },
  async getUserPosts(): Promise<Post[]> {
    const id = sessionData.getUser()?.userId;
    return new Promise<Post[]>((resolve, reject) => {
      api
        .getUserPosts(id)
        .then(postArray => resolve(postArray))
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },
  async getPost(urlName: string): Promise<Post | undefined> {
    return new Promise<Post>((resolve, reject) => {
      api
        .getPost(urlName)
        .then(post => resolve(post))
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },
  async savePost(post: Post): Promise<Post> {
    const userId = sessionData.getUser()?.userId;
    post.authorId = userId;
    return new Promise<Post>((resolve, reject) => {
      api
        .savePost(post)
        .then(post => resolve(post))
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  },
  async updateUser(user: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const userData = sessionData.getUserData();
      if (userData) {
        api
          .updateUser(userData, user)
          .then(response => resolve(response))
          .catch(error => {
            console.error(error);
            reject(error);
          });
      } else {
        reject("No user data found in session.");
      }
    });
  },
  async createNewUser(user: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const userData = sessionData.getUserData();
      if (userData) {
        api
          .createNewUser(userData, user)
          .then(response => resolve(response))
          .catch(error => {
            console.error(error);
            reject(error);
          });
      } else {
        reject("No user data found in session.");
      }
    });
  },
  createPost(
    postTitle: string,
    postBody: string,
    postTagline: string,
    imgUrl: string,
    url: string
  ): Post {
    const authorId = sessionData.getUser()?.userId;
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
    return new Promise<any>((resolve, reject) => {
      api
        .deletePost(urlName)
        .then(response => resolve(response))
        .catch(error => {
          console.error(error);
          reject(error);
        });
    });
  }
};
