import Vue, { PluginObject } from "vue";
import session from "../session";
import { UserData } from "@/types";

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
        }
      }
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
        version: "v8.0"
      });
    }, 300);
  };

  isAuth = () => {
    return new Promise(resolve => {
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
    return new Promise<boolean>((resolve, reject) => {
      if (this.isAuthorized) {
        reject(true);
        return;
      }
      window.FB.login((res: any) => {
        this.isAuthorized = res.status == "connected";
        if (this.isAuthorized) {
          const userData = this.buildUserData(res);
          session.storeUserData(userData);
          resolve(this.isAuthorized);
          return;
        }
        reject(this.isAuthorized);
      });
    });
  };

  buildUserData = (res: any): UserData => {
    return {
      id: res.authResponse.userID,
      platform: "facebook",
      expiration: res.authResponse.data_access_expiration_time
    };
  };

  /**
   * returns Promise with false value is user is not logged in
   */
  signOut = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!this.isAuthorized) {
        reject(false);
        return;
      }
      window.FB.logout((res: any) => {
        if (res) {
          this.isAuthorized = false;
          session.removeUserData();
          resolve(false);
          return;
        }
        return false;
      });
    });
  };
}

const facebookAuth = new FacebookAuth();

Vue.use(facebookAuth);

export default facebookAuth;
