import { User, UserData } from "../../types";
import api from "../api/api";
import session from "..";

export default {
  async getAuthor(userId: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      api.user
        .getAuthor(userId)
        .then((user) => resolve(user))
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  },
  async loadUserData(userData: UserData, platform: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      api.user
        .getUser(userData, platform)
        .then((user) => {
          if (userData && user) {
            session.storeUserData(userData);
            session.storeUser(user);
            window.location.replace("/");
            resolve(true);
          }
        })
        .catch((err) => {
          if (userData && platform) {
            session.storeUserData(userData);
            window.location.replace("/sign-in/first-time");
            resolve(true);
          }
          console.error(err);
          reject(false);
        });
    });
  },
  async updateUser(user: User): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const userData = session.getUserData();
      if (userData) {
        api.user
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
      const userData = session.getUserData();
      if (userData) {
        api.user
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
  logoutUserAndRedirect(): void {
    session.removeUserData();
    window.location.href = "/sign-in?timeout=true";
  },
};
