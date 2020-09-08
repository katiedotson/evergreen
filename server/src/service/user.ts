import { User, UserData } from "../types";
import { MongoClient } from "mongodb";
import { executeInsert, executeFind } from ".";

export default {
  async getAuthorByUserId(userId: string): Promise<User> {
    const findByUserId = (client: MongoClient): Promise<User> => {
      return client.db("evergreen").collection("users").findOne({ userId });
    };
    return executeFind(findByUserId);
  },
  async isUniqueUser(email: string): Promise<any> {
    const findByUserEmail = (client: MongoClient): Promise<User> => {
      return client.db("evergreen").collection("users").findOne({ email });
    };
    return executeFind(findByUserEmail);
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
    return executeFind(findByIdAndPlatform);
  },
  async insertNewUser(userData: UserData, user: User): Promise<any> {
    user.platform = userData.platform;
    user.userId = userData.id;
    const insertUser = async (client: MongoClient, user: User) => {
      await client.db("evergreen").collection("users").insertOne(user);
      return user;
    };
    return executeInsert(insertUser, user);
  },
  async activateUser(userData: UserData): Promise<any> {
    const insertUser = async (client: MongoClient, userData: UserData) => {
      const newValues = {
        $set: {
          active: true,
        },
      };
      await client
        .db("evergreen")
        .collection("users")
        .updateOne(
          { userId: userData.id, platform: userData.platform },
          newValues
        );
    };
    return executeInsert(insertUser, userData);
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
        .updateOne(
          { userId: userData.id, platform: userData.platform },
          newValues
        );
      return user;
    };
    return executeInsert(insertUser, user);
  },
};
