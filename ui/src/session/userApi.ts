import { User, UserData } from "@/types";
import axios from "./axios-instance";
import sessionData from "./sessionData";
import session from ".";

export default {
  getAuthor(userId: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      axios
        .get(`user/getAuthor?authorId=${userId}`)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  getUser(userData: UserData, platform: string): Promise<User | undefined> {
    return new Promise((resolve, reject) => {
      axios
        .get(`user/get?userId=${userData.id}&platform=${platform}`)
        .then((res) => {
          sessionData.storeUserToken(res.headers["user-token"]);
          resolve(res.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  updateUser(userData: UserData, user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .request({
          method: "POST",
          url: "user/update",
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
          url: "user/new",
          data: { userData, user },
        })
        .then((res) => {
          sessionData.storeUserToken(res.headers["user-token"]);
          resolve(res.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
};
