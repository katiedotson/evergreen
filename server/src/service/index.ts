import {
  ExecutableMongoFindCallback,
  ExecutableMongoInsertCallback,
} from "../types";
import { MongoClient } from "mongodb";
import gallery from "./gallery";
import user from "./user";
import post from "./post";

export default {
  gallery,
  user,
  post,
};

async function executeInsert(
  cb: ExecutableMongoInsertCallback,
  data: any
): Promise<any> {
  const client = new MongoClient(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 60000,
  });
  let result = {};
  try {
    await client.connect();
    result = await cb(client, data);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  return result;
}
async function executeFind(cb: ExecutableMongoFindCallback): Promise<any> {
  const client = new MongoClient(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 60000,
  });
  let results: any[] = [];
  try {
    await client.connect();
    results = await cb(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  return results;
}

export { executeFind, executeInsert };
