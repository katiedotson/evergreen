import { Post, User, UserData } from "@/types";
import axios from "./axios-instance";

export default {
  /**
   * getUserPosts?authorId=${authorId}
   *
   * returns posts for an author
   * @param authorId -> the author for which posts should be found
   */
  getUserPosts(authorId: number): Promise<Post[]> {
    return new Promise(resolve => {
      axios.get(`getUserPosts?authorId=${authorId}`).then(res => {
        if (res.status == 200) {
          console.log(res.data);
          resolve(res.data);
        } else resolve([]);
      });
    });
  },
  /**
   * getPost?urlName=${urlName}
   *
   * @param urlName -> returns a post with the given url name
   */
  getPost(urlName: string): Promise<Post | undefined> {
    return new Promise(resolve => {
      axios.get(`getPost?urlName=${urlName}`).then(res => {
        if (res.status == 200) {
          resolve(res.data);
        } else resolve(undefined);
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
  getAuthor(authorId: number): Promise<User | undefined> {
    return new Promise(resolve => {
      axios.get(`getAuthor?authorId=${authorId}`).then(res => {
        if (res.status == 200) {
          return resolve(res.data);
        } else resolve(undefined);
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
    return new Promise(resolve => {
      axios.get(`getUser?userId=${userData.id}&platform=${platform}`).then(res => {
        if (res.status == 200) {
          resolve(res.data);
        } else resolve(undefined);
      });
    });
  },
  /**
   * getPosts
   *
   * returns currently relevant posts for an unauthenticated user, or an empty array if there is an error
   */
  getPosts(): Promise<Post[]> {
    return new Promise(resolve => {
      axios.get(`getPosts`).then(res => {
        if (res.status == 200) {
          resolve(res.data);
        } else {
          resolve([]);
        }
      });
    });
  },
  savePost(post: Post): Promise<Post | undefined> {
    return new Promise(resolve => {
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
            resolve(undefined);
          }
        });
    });
  },
  deletePost(urlName: string): Promise<any> {
    return new Promise(resolve => {
      axios
        .request({
          method: "DELETE",
          url: `deletePost?urlName=${urlName}`
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          } else {
            resolve(undefined);
          }
        });
    });
  }
};
