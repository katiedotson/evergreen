import {
  Post,
  User,
  UserData,
  ExecutableMongoFindCallback,
  ExecutableMongoInsertCallback,
} from "../types";
import { MongoClient } from "mongodb";
import config from "../config/index";
const mongoConfig = config.mongo;

export default {
  async getUserPostsByUserId(userId: string): Promise<Post[]> {
    const findByUserId = (client: MongoClient): Promise<Post[]> => {
      return client
        .db("evergreen")
        .collection("posts")
        .find({ authorId: userId })
        .toArray();
    };
    return this.executeFind(findByUserId);
  },
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
  async getAuthorByUserId(userId: string): Promise<User> {
    const findByUserId = (client: MongoClient): Promise<User> => {
      return client.db("evergreen").collection("users").findOne({ userId });
    };
    return this.executeFind(findByUserId);
  },
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
  async getRelevantPosts(): Promise<Post[]> {
    const getPosts = (client: MongoClient): Promise<Post[]> => {
      return client.db("evergreen").collection("posts").find({}).toArray();
    };
    return this.executeFind(getPosts);
  },
  async saveNewPost(post: Post): Promise<any> {
    const save = async (client: MongoClient, post: Post) => {
      await client.db("evergreen").collection("posts").insertOne(post);
      return post;
    };
    return this.executeInsert(save, post);
  },
  async updatePost(post: Post, wouldBeUrlName: string): Promise<any> {
    const update = async (client: MongoClient, post: Post) => {
      const newValues = {
        $set: {
          title: post.title,
          tagline: post.tagline,
          body: post.body,
          urlName: wouldBeUrlName,
          img: post.img,
          relevance: post.relevance,
        },
      };
      await client
        .db("evergreen")
        .collection("posts")
        .updateOne({ urlName: post.urlName }, newValues);
      post.urlName = wouldBeUrlName;
      return post;
    };
    return this.executeInsert(update, post);
  },
  async deletePost(urlName: string): Promise<any> {
    const deletePost = async (client: MongoClient, post: Post) => {
      await client.db("evergreen").collection("posts").deleteOne({ urlName });
      return post;
    };
    return this.executeInsert(deletePost, urlName);
  },
  async insertNewUser(userData: UserData, user: User): Promise<any> {
    user.platform = userData.platform;
    user.userId = userData.id;
    const insertUser = async (client: MongoClient, user: User) => {
      await client.db("evergreen").collection("users").insertOne(user);
      return user;
    };
    return this.executeInsert(insertUser, user);
  },
  async updateUser(userData: UserData, user: User): Promise<any> {
    user.platform = userData.platform;
    user.userId = userData.id;
    const insertUser = async (client: MongoClient, user: User) => {
      const newValues = {
        $set: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          location: user.location,
          bio: user.bio,
          occupation: user.occupation,
          img: user.img,
        },
      };
      await client
        .db("evergreen")
        .collection("users")
        .updateOne({ userId: user.userId, platform: user.platform }, newValues);
      return user;
    };
    return this.executeInsert(insertUser, user);
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
};
