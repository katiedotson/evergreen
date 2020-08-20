import config from "../config/index";
import {
  ExecutableMongoFindCallback,
  ExecutableMongoInsertCallback,
} from "../types";
import { MongoClient } from "mongodb";

const mongoConfig = config.mongo;

export async function executeInsert(
  cb: ExecutableMongoInsertCallback,
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
export async function executeFind(
  cb: ExecutableMongoFindCallback
): Promise<any> {
  const client = new MongoClient(mongoConfig.uri);

  try {
    await client.connect();
    return cb(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
