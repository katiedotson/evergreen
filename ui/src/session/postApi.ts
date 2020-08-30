import { Post } from "@/types";
import axios from "./axios-instance";
import sessionData from "./sessionData";
import session from ".";

export default {
  getUserPosts(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`post/getAllByUser`, {
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
        .get(`post/getOne?urlName=${urlName}&published=${isPublished}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  getPostRegardless(urlName: string): Promise<Post> {
    return new Promise((resolve, reject) => {
      axios
        .get(`post/getRegardless?urlName=${urlName}`, {
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
  getPosts(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`post/getAll`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  savePost(post: Post): Promise<Post | undefined> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "post/save",
          data: post,
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
  deletePost(post: Post): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "DELETE",
          url: `post/delete`,
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
          url: `post/publish`,
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
          url: `post/unpublish`,
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
  getBlankPost(): Promise<Post> {
    return new Promise<Post>((resolve, reject) => {
      axios
        .get(`post/new`, {
          headers: {
            "User-Token": sessionData.getUserToken(),
          },
        })
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
          url: "post/updateBanner",
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
