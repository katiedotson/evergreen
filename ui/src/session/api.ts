import { Post, User, UserData } from "@/types";
import axios from "./axios-instance";
import publitio from "../assets";
import sessionData from "./sessionData";
import session from ".";

export default {
  getUserPosts(id: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`getUserPosts?userId=${id}`, {
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
  getPost(urlName: string, isPublished: boolean | true): Promise<Post> {
    return new Promise((resolve, reject) => {
      axios
        .get(`getPost?urlName=${urlName}&published=${isPublished}`)
        .then((res) => {
          if (res.status == 200) {
            resolve(res.data);
          } else reject(undefined);
        })
        .catch(() => {
          reject(undefined);
        });
    });
  },
  getPostRegardless(urlName: string): Promise<Post> {
    return new Promise((resolve, reject) => {
      axios
        .get(`getPostRegardless?urlName=${urlName}`, {
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
  getAuthor(userId: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      axios
        .get(`getAuthor?authorId=${userId}`)
        .then((res) => {
          if (res.status == 200) {
            return resolve(res.data);
          } else reject(undefined);
        })
        .catch(() => {
          reject(undefined);
        });
    });
  },
  getUser(userData: UserData, platform: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      axios
        .get(`getUser?userId=${userData.id}&platform=${platform}`)
        .then((res) => {
          sessionData.storeUserToken(res.headers["user-token"]);
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
  getPosts(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`getPosts`)
        .then((res) => {
          if (res.status == 200) {
            resolve(res.data);
          } else {
            throw new Error("Non-200 status returned.");
          }
        })
        .catch((err) => {
          console.error(err);
          reject([]);
        });
    });
  },
  savePost(post: Post): Promise<Post | undefined> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "savePost",
          data: post,
          headers: {
            "User-Token": sessionData.getUserToken(),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            resolve(res.data);
          } else {
            throw new Error("Non-200 status returned.");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) session.logoutUserAndRedirect();
          reject(error);
        });
    });
  },
  deletePost(post: Post): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "DELETE",
          url: `deletePost`,
          data: {
            post,
          },
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
  publishPost(post: Post): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: `publishPost`,
          data: {
            post,
          },
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
  unpublishPost(post: Post): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: `unpublishPost`,
          data: {
            post,
          },
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
  updateUser(userData: UserData, user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "updateUser",
          data: { userData, user },
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
  createNewUser(userData: UserData, user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "createNewUser",
          data: { userData, user },
        })
        .then((res) => {
          sessionData.storeUserToken(res.headers["user-token"]);
          resolve(res.data);
        })
        .catch((error) => reject(error));
    });
  },
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
  getBlankPost(userId: string): Promise<Post> {
    return new Promise<Post>((resolve, reject) => {
      axios
        .get(`newPost?authorId=${userId}`)
        .then((res) => resolve(res.data))
        .catch((error) => {
          if (error.response.status === 401) session.logoutUserAndRedirect();
          reject(error);
        });
    });
  },
  updatePostBanner(img: string, postId: string | undefined): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "updatePostBanner",
          data: { img, postId },
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
