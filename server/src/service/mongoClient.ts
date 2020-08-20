import config from "../config/index";
import { ExecutableMongoCallback } from "../types";
import { MongoClient } from "mongodb";

const mongoConfig = config.mongo;

async function executeCall(
  cb: ExecutableMongoCallback,
  data: Record<string, unknown>
): Promise<void> {
  const client = new MongoClient(mongoConfig.uri);

  try {
    await client.connect();
    await cb(client, data);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

export default executeCall;
