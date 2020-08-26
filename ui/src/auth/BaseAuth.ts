import facebookAuth from "./FacebookAuth";
import googleAuth from "./GoogleAuth";
import session from "../session";
import sessionData from "../session/sessionData";

export class BaseAuth {
  userIsAuth() {
    return sessionData.getUserData() != null;
  }

  signIn(platform: string): Promise<boolean> {
    switch (platform) {
      case "facebook": {
        return facebookAuth.signIn().then(userData => {
          if (userData) {
            return session.loadUserData(userData, platform);
          } else {
            return new Promise((resolve, reject) => {
              reject(false);
            });
          }
        });
      }
      case "google": {
        return googleAuth.signIn().then((res: any) => {
          if (res) {
            return session.loadUserData(res, platform);
          } else {
            return new Promise((resolve, reject) => {
              reject(false);
            });
          }
        });
      }
      default:
        return new Promise((resolve, reject) => {
          reject(false);
        });
    }
  }

  signOut(): Promise<boolean> {
    const platform = sessionData.getUserData()?.platform;
    switch (platform) {
      case "facebook": {
        return facebookAuth.signOut();
      }
      case "google": {
        return googleAuth.signOut();
      }
      default:
        return new Promise((resolve, reject) => {
          reject(false);
        });
    }
  }
}

export default new BaseAuth();
