import {
  Post,
  User,
  ExecutableMongoFindCallback,
  ExecutableMongoInsertCallback,
} from "../types";
// import { executeFind } from "./mongoClient";
import { MongoClient } from "mongodb";
import config from "../config/index";
const mongoConfig = config.mongo;

export default {
  /**
   *
   * @param authorId
   */
  async getUserPostsByAuthorId(authorId: number): Promise<Post[]> {
    const findByAuthorId = (client: MongoClient): Promise<Post[]> => {
      return client
        .db("evergreen")
        .collection("posts")
        .find({ authorId })
        .toArray();
    };
    return this.executeFind(findByAuthorId);
  },
  /**
   *
   * @param urlName
   */
  async getPostByUrlName(urlName: string): Promise<Post> {
    const findByUrlName = (client: MongoClient): Promise<Post> => {
      const result = client
        .db("evergreen")
        .collection("posts")
        .findOne({ urlName });
      return result;
    };
    return this.executeFind(findByUrlName);
  },
  /**
   *
   * @param authorId
   */
  async getAuthorByAuthorId(authorId: number): Promise<User> {
    const findByAuthorId = (client: MongoClient): Promise<User> => {
      return client.db("evergreen").collection("users").findOne({ authorId });
    };
    return this.executeFind(findByAuthorId);
  },
  /**
   *
   * @param userId
   * @param platform
   */
  async getUserByIdAndPlatform(
    userId: string,
    platform: string
  ): Promise<User> {
    const findByIdAndPlatform = (client: MongoClient): Promise<User> => {
      return client
        .db("evergreen")
        .collection("users")
        .findOne({ userId, platform });
    };
    return this.executeFind(findByIdAndPlatform);
  },
  /**
   *
   */
  async getRelevantPosts(): Promise<Post[]> {
    const getPosts = (client: MongoClient): Promise<Post[]> => {
      return client.db("evergreen").collection("posts").find({}).toArray();
    };
    return this.executeFind(getPosts);
  },
  async executeFind(cb: ExecutableMongoFindCallback): Promise<any> {
    const client = new MongoClient(mongoConfig.uri);
    let results: Post[] = [];
    try {
      await client.connect();
      results = await cb(client);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
    return results;
  },
  async savePost(post: Post): Promise<any> {
    const save = async (client: MongoClient, post: Post) => {
      await client.db("evergreen").collection("posts").insertOne(post);
      return post;
    };
    return this.executeInsert(save, post);
  },
  async executeInsert(
    cb: ExecutableMongoInsertCallback,
    data: Record<string, unknown>
  ): Promise<any> {
    const client = new MongoClient(mongoConfig.uri);
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
  },
};
