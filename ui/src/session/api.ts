import { Post, User, UserData } from "@/types";
import axios from "./axios-instance";
import publitio from "../assets";

axios.defaults.timeout = 5000;

export default {
  /**
   * getUserPosts?userId=${authorId}
   *
   * returns posts for an author
   * @param authorId -> the author for which posts should be found
   */
  getUserPosts(id: string): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`getUserPosts?userId=${id}`)
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          } else reject([]);
        })
        .catch(() => reject([]));
    });
  },
  /**
   * getPost?urlName=${urlName}
   *
   * @param urlName -> returns a post with the given url name
   */
  getPost(urlName: string): Promise<Post> {
    return new Promise((resolve, reject) => {
      axios
        .get(`getPost?urlName=${urlName}`)
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          } else reject(undefined);
        })
        .catch(() => {
          reject(undefined);
        });
    });
  },
  /**
   * getAuthor?authorId=${authorId}
   *
   * returns the author data for a user
   *
   * @param authorId -> the ID for an author
   */
  getAuthor(userId: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      axios
        .get(`getAuthor?authorId=${userId}`)
        .then(res => {
          if (res.status == 200) {
            return resolve(res.data);
          } else reject(undefined);
        })
        .catch(() => {
          reject(undefined);
        });
    });
  },
  /**
   * getUser?userId=${oAuthRes.id}&platform=${platform}
   *
   * returns relevant user for the authenticated user
   *
   * @param oAuthRes -> response from oAuth
   * @param platform -> which platform was used to authenticate
   */
  getUser(userData: UserData, platform: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      axios
        .get(`getUser?userId=${userData.id}&platform=${platform}`)
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          } else reject(undefined);
        })
        .catch(() => reject(undefined));
    });
  },
  /**
   * getPosts
   *
   * returns currently relevant posts for an unauthenticated user, or an empty array if there is an error
   */
  getPosts(): Promise<Post[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`getPosts`)
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          } else {
            throw new Error("Non-200 status returned.");
          }
        })
        .catch(err => {
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
          data: post
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          } else {
            throw new Error("Non-200 status returned.");
          }
        })
        .catch(() => {
          reject(undefined);
        });
    });
  },
  deletePost(urlName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "DELETE",
          url: `deletePost?urlName=${urlName}`
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          } else {
            reject(undefined);
          }
        })
        .catch(() => reject(undefined));
    });
  },
  updateUser(userData: UserData, user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "updateUser",
          data: { userData, user }
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          } else {
            reject(undefined);
          }
        });
    });
  },
  createNewUser(userData: UserData, user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "createNewUser",
          data: { userData, user }
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          } else {
            reject(undefined);
          }
        });
    });
  },
  uploadImage(file: File, publicId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      publitio
        .uploadFile(file, "file", {
          // eslint-disable-next-line @typescript-eslint/camelcase
          public_id: publicId
        })
        .then(data => {
          resolve(data.url_preview);
        })
        .catch(error => reject(error));
    });
  }
};
