import { Post, User, UserData } from "../types";
import api from "./api";
import sessionData from "./sessionData";

export default {
  async storeImage(file: File, type: string): Promise<string> {
    const fileType = file.type.toLowerCase();
    if (fileType.includes("png") || fileType.includes("jpeg")) {
      return new Promise<string>((resolve, reject) => {
        api
          .uploadImage(file)
          .then((response) => {
            sessionData.storeTempFile(response.id, type);
            if (type == "banner" || type == "profile") {
              const prevPostBanner = sessionData.getInitialPost()?.img;
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
  async getAuthor(userId: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      api
        .getAuthor(userId)
        .then((user) => resolve(user))
        .catch((error) => {
          console.error(error);
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
  async loadUserData(userData: UserData, platform: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      api
        .getUser(userData, platform)
        .then((user) => {
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
    if (published !== null && published !== undefined) {
      return new Promise<Post>((resolve, reject) => {
        api
          .getPost(urlName, published)
          .then((post) => resolve(post))
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    } else {
      return new Promise<Post>((resolve, reject) => {
        api
          .getPostRegardless(urlName)
          .then((post) => resolve(post))
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    }
  },
  async savePost(post: Post): Promise<Post> {
    const userId = sessionData.getUser()?.userId;
    post.authorId = userId;
    return new Promise<Post>((resolve, reject) => {
      api
        .savePost(post)
        .then((post) => {
          if (post) {
            this.deleteUnusedImageFiles(post);
            sessionData.clearTempFiles("post");
            sessionData.storeInitialPost(post);
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
      const postId = sessionData.getInitialPost()?._id;
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
  async updateUser(user: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const userData = sessionData.getUserData();
      if (userData) {
        api
          .updateUser(userData, user)
          .then((response) => resolve(response))
          .catch((error) => {
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
          .then((response) => resolve(response))
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      } else {
        reject("No user data found in session.");
      }
    });
  },
  async deletePost(post: Post): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      api
        .deletePost(post)
        .then((response) => {
          this.deleteAllImageFiles(post);
          resolve(response);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  logoutUserAndRedirect(): void {
    sessionData.removeUserData();
    window.location.href = "/sign-in?timeout=true";
  },
  publishPost(post: Post): Promise<any> {
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
  unpublishPost(post: Post): Promise<any> {
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

    const imagesUploaded: string[] = sessionData.getTempFiles("post");

    //always check if images were deleted
    const initialPost = sessionData.getInitialPost();
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
  getBlankPost(): Promise<Post> {
    return new Promise<Post>((resolve, reject) => {
      const userId = sessionData.getUser()?.userId;
      api
        .getBlankPost(userId)
        .then((post) => {
          resolve(post);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  clearPostData() {
    const post = sessionData.getInitialPost();
    if (!post.title) {
      api.deletePost(post);
    }
    sessionData.clearTempFiles("post");
    sessionData.clearTempFiles("banner");
    sessionData.clearInitialPost();
  },
};

/**
 * Test paths for image deletion
 *
 * 1. new & old post - add, delete, save
 * 2. new & old post - add, save, delete
 * 3. new & old post - banner, change banner, save
 * 4. new & old post - banner, save, change banner
 * 5. user - add new avatar & save
 * 6. user - add new avatar without saving
 */
