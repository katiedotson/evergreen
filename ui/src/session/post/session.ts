import { Post } from "../../types";
import api from "./api";
import session from "..";

export default {
  getBlankPost(): Promise<Post> {
    return new Promise<Post>((resolve, reject) => {
      api
        .getBlankPost()
        .then((post) => {
          resolve(post);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async getPosts(): Promise<Post[]> {
    return new Promise<Post[]>((resolve, reject) => {
      api
        .getPosts()
        .then((posts) => resolve(posts))
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  async getUserPosts(): Promise<Post[]> {
    return new Promise<Post[]>((resolve, reject) => {
      api
        .getUserPosts()
        .then((postArray) => resolve(postArray))
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  async getPost(
    urlName: string,
    published?: boolean
  ): Promise<Post | undefined> {
    if (published !== null && published !== undefined && published) {
      return new Promise<Post>((resolve, reject) => {
        api
          .getPost(urlName)
          .then((post) => resolve(post))
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    } else {
      return new Promise<Post>((resolve, reject) => {
        api
          .getPostForEdit(urlName)
          .then((post) => resolve(post))
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    }
  },
  async savePost(post: Post): Promise<Post> {
    const userId = session.getUser()?.userId;
    post.authorId = userId;
    return new Promise<Post>((resolve, reject) => {
      api
        .savePost(post)
        .then((post) => {
          if (post) {
            session.image.deleteUnusedImageFiles(post);
            session.clearTempFiles("post");
            session.storeInitialPost(post);
            resolve(post);
          }
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  async updatePostBanner(img: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const postId = session.getInitialPost()?._id;
      if (postId === undefined) reject("No Post id");
      api
        .updatePostBanner(img, postId)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async deletePost(post: Post): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      api
        .deletePost(post)
        .then((response) => {
          session.image.deleteAllImageFiles(post);
          resolve(response);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  async publishPost(post: Post): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      api
        .publishPost(post)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  async unpublishPost(post: Post): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      api
        .unpublishPost(post)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  clearPostData() {
    const post = session.getInitialPost();
    if (!post.title) {
      api.deletePost(post);
    }
    session.clearTempFiles("post");
    session.clearTempFiles("banner");
    session.clearInitialPost();
  },
};
