import Vue, { PluginObject } from "vue";
import { UserData } from "@/types";
import session from "../session";
import config from "../config";

declare global {
  interface Window {
    FB: any;
  }
}

class FacebookAuth implements PluginObject<any> {
  isAuthorized = false;

  install = () => {
    Object.defineProperties(Vue.prototype, {
      $fbAuth: {
        get: () => {
          return this;
        },
      },
    });
    this.load();
  };

  load = () => {
    //TODO: this is a cheat
    setTimeout(() => {
      window.FB.init({
        appId: config.facebook.appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v8.0",
      });
    }, 300);
  };

  isAuth = () => {
    return new Promise((resolve) => {
      window.FB.getLoginStatus((response: any) => {
        this.isAuthorized = response.status == "connected";
        resolve(response.status == "connected");
      });
    });
  };

  /**
   * returns Promise with true value if user is authenticated
   */
  signIn = () => {
    return new Promise<UserData | undefined>((resolve, reject) => {
      if (this.isAuthorized) {
        reject();
        return;
      }
      window.FB.login((res: any) => {
        this.isAuthorized = res.status == "connected";
        if (this.isAuthorized) {
          const userData = this.buildUserData(res);
          resolve(userData);
          return;
        }
        reject();
      });
    });
  };

  buildUserData = (res: any): UserData => {
    return {
      id: res.authResponse.userID,
      platform: "facebook",
      expiration: res.authResponse.data_access_expiration_time,
    };
  };

  /**
   * returns Promise with false value is user is not logged in
   */
  signOut = (): Promise<boolean> => {
    return this.isAuth().then((isConnected) => {
      if (isConnected) {
        return new Promise((resolve, reject) => {
          window.FB.logout((res: any) => {
            if (res) {
              this.isAuthorized = false;
              session.removeUserData();
              resolve(false);
              return;
            }
            reject(false);
          });
        });
      } else
        return new Promise((resolve, reject) => {
          this.isAuthorized = false;
          session.removeUserData();
          reject(false);
        });
    });
  };
}

const facebookAuth = new FacebookAuth();

Vue.use(facebookAuth);

export default facebookAuth;
