import PublitioAPI from "../../node_modules/publitio_js_sdk/build/publitio-api.min.js";
import config from "../config";
export default new PublitioAPI(config.publitio.key, config.publitio.secret);
