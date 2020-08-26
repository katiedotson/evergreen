import Vue, { PluginObject } from "vue";
import sessionData from "../session/sessionData";
import { UserData } from "@/types";

import config from "../config";

declare global {
  interface Window {
    gapi: any;
  }
}

class GoogleAuth implements PluginObject<any> {
  private isAuthorized = false;
  private authInstance: any;

  gauthOption = {
    clientId: config.google.client_id,
    scope: "email",
    prompt: "select_account"
  };

  install = () => {
    Object.defineProperties(Vue.prototype, {
      $gAuth: {
        get: () => {
          return this;
        }
      }
    });
    this.load();
  };

  initClient = () => {
    return new Promise((resolve, reject) => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2
          .init(this.gauthOption)
          .then(() => {
            resolve(window.gapi);
          })
          .catch((error: Error) => {
            reject(error);
          });
      });
    });
  };

  load = () => {
    this.initClient()
      .then((gapi: any) => {
        this.authInstance = gapi.auth2.getAuthInstance();
        this.isAuthorized = this.authInstance.isSignedIn.get();
      })
      .catch((error: Error) => {
        console.error(error);
      });
  };

  /**
   * returns Promise with true value if user is authenticated
   */
  signIn = () => {
    return new Promise<UserData | undefined>((resolve, reject) => {
      if (!this.authInstance) {
        reject(this.isAuthorized);
        return;
      }
      if (this.isAuthorized) {
        this.getAuthCode();
      }
      this.authInstance
        .signIn()
        .then((googleUser: any) => {
          this.isAuthorized = this.authInstance.isSignedIn.get();
          const userData = this.buildUserData(googleUser);
          resolve(userData);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  };

  buildUserData = (googleUser: any): UserData => {
    return {
      id: googleUser.Da,
      platform: "google",
      expiration: googleUser.wc.expires_at
    };
  };

  getAuthCode = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!this.authInstance) {
        reject();
        return;
      }
      this.authInstance
        .grantOfflineAccess({ prompt: this.gauthOption.prompt })
        .then((resp: any) => {
          resolve(resp);
        })
        .catch((error: Error) => {
          reject(error);
        });
    });
  };

  /**
   * returns Promise with false value is user is not logged in
   */
  signOut = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (!this.authInstance) {
        reject(false);
        return;
      }
      this.authInstance.signOut().then(() => {
        this.isAuthorized = false;
        sessionData.removeUserData();
        resolve(false);
      });
    });
  };
}

const googleAuth = new GoogleAuth();

Vue.use(googleAuth);

export default googleAuth;
