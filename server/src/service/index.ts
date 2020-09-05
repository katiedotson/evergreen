import {
  Post,
  User,
  UserData,
  ExecutableMongoFindCallback,
  ExecutableMongoInsertCallback,
  Gallery,
} from "../types";
import { MongoClient, ObjectID } from "mongodb";

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
  async getGalleriesByUserId(userId: string): Promise<Post[]> {
    const findByUserId = (client: MongoClient): Promise<Post[]> => {
      return client
        .db("evergreen")
        .collection("galleries")
        .find({ authorId: userId })
        .toArray();
    };
    return this.executeFind(findByUserId);
  },
  async getPostByUrlName(urlName: string, published: boolean): Promise<Post> {
    const findByUrlName = (client: MongoClient): Promise<Post> => {
      const result = client
        .db("evergreen")
        .collection("posts")
        .findOne({ urlName, published: published });
      return result;
    };
    return this.executeFind(findByUrlName);
  },
  async getGalleryByUrlName(urlName: string, userId: string): Promise<Post> {
    const findById = (client: MongoClient): Promise<Post> => {
      const result = client
        .db("evergreen")
        .collection("galleries")
        .findOne({ authorId: userId, urlName });
      return result;
    };
    return this.executeFind(findById);
  },
  async getPostByUrlNameRegardless(
    urlName: string,
    userId: string
  ): Promise<Post> {
    const findByUrlName = (client: MongoClient): Promise<Post> => {
      const result = client
        .db("evergreen")
        .collection("posts")
        .findOne({ urlName, authorId: userId });
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
  async isUniqueUser(email: string): Promise<any> {
    const findByUserEmail = (client: MongoClient): Promise<User> => {
      return client.db("evergreen").collection("users").findOne({ email });
    };
    return this.executeFind(findByUserEmail);
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
      return client
        .db("evergreen")
        .collection("posts")
        .find({ published: true })
        .toArray();
    };
    return this.executeFind(getPosts);
  },
  async updatePost(post: Post, userId: string): Promise<any> {
    const update = async (client: MongoClient, post: Post) => {
      const newValues = {
        $set: {
          title: post.title,
          tagline: post.tagline,
          body: post.body,
          urlName: post.urlName,
          img: post.img,
          relevance: post.relevance,
          published: post.published,
        },
      };
      await client
        .db("evergreen")
        .collection("posts")
        .updateOne(
          { _id: new ObjectID(post._id), authorId: userId },
          newValues
        );
      return post;
    };
    return this.executeInsert(update, post);
  },
  async updateGallery(gallery: Gallery, userId: string): Promise<any> {
    const update = async (client: MongoClient, gallery: Gallery) => {
      const newValues = {
        $set: {
          title: gallery.title,
          description: gallery.description,
          urlName: gallery.urlName,
          photos: gallery.photos,
          relevance: gallery.relevance,
          published: gallery.published,
        },
      };
      await client
        .db("evergreen")
        .collection("galleries")
        .updateOne(
          { _id: new ObjectID(gallery._id), authorId: userId },
          newValues
        );
      return gallery;
    };
    return this.executeInsert(update, gallery);
  },
  async deletePost(urlName: string, userId: string): Promise<any> {
    const deletePost = async (client: MongoClient, params: any) => {
      return await client
        .db("evergreen")
        .collection("posts")
        .deleteOne({ urlName: params.urlName, authorId: params.userId });
    };
    return this.executeInsert(deletePost, { urlName, userId });
  },
  async deleteGallery(gallery: Gallery, userId: string): Promise<any> {
    const deleteGallery = async (client: MongoClient, params: any) => {
      return await client.db("evergreen").collection("galleries").deleteOne({
        urlName: params.gallery.urlName,
        authorId: params.userId,
      });
    };
    return this.executeInsert(deleteGallery, { gallery, userId });
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
    return this.executeInsert(insertUser, userData);
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
    return this.executeInsert(insertUser, user);
  },
  async newPost(post: Post): Promise<any> {
    const newPost = async (client: MongoClient, post: Post) => {
      const _id = await (
        await client.db("evergreen").collection("posts").insertOne(post)
      ).insertedId;
      post._id = _id;
      return post;
    };
    return this.executeInsert(newPost, post);
  },
  async newGallery(gallery: Gallery): Promise<any> {
    const newGallery = async (client: MongoClient, gallery: Gallery) => {
      const _id = await (
        await client.db("evergreen").collection("galleries").insertOne(gallery)
      ).insertedId;
      gallery._id = _id;
      return gallery;
    };
    return this.executeInsert(newGallery, gallery);
  },
  async updatePostBanner(
    img: string,
    postId: string,
    userId: string
  ): Promise<any> {
    const updatePostBanner = async (
      client: MongoClient,
      params: Record<string, string>
    ) => {
      const newValues = {
        $set: {
          img: params.img,
        },
      };
      return await client
        .db("evergreen")
        .collection("posts")
        .updateOne(
          { _id: new ObjectID(params.postId), authorId: params.userId },
          newValues
        );
    };

    return this.executeInsert(updatePostBanner, { img, postId, userId });
  },
  async updatePostPublished(
    isPublished: boolean,
    postId: string
  ): Promise<any> {
    const updatePostPublished = async (
      client: MongoClient,
      params: Record<string, string>
    ) => {
      const newValues = {
        $set: {
          published: params.isPublished,
        },
      };
      return await client
        .db("evergreen")
        .collection("posts")
        .updateOne({ _id: new ObjectID(params.postId) }, newValues);
    };
    return this.executeInsert(updatePostPublished, { isPublished, postId });
  },
  async updateGalleryPublished(
    gallery: Gallery,
    userId: string,
    isPublished: boolean
  ): Promise<any> {
    const updateGalleryPublished = async (
      client: MongoClient,
      params: Record<string, string>
    ) => {
      const newValues = {
        $set: {
          published: params.isPublished,
        },
      };
      return await client
        .db("evergreen")
        .collection("galleries")
        .updateOne(
          { _id: new ObjectID(params.id), authorId: params.userId },
          newValues
        );
    };
    return this.executeInsert(updateGalleryPublished, {
      id: gallery._id,
      isPublished,
      userId,
    });
  },
  async executeInsert(
    cb: ExecutableMongoInsertCallback,
    data: Record<string, unknown>
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
  },
  async executeFind(
    cb: ExecutableMongoFindCallback
  ): Promise<User | Post | Post[]> {
    const client = new MongoClient(process.env.DB_CONNECT, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      connectTimeoutMS: 60000,
    });
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
