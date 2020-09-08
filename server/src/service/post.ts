import { Post } from "../types";
import { MongoClient, ObjectID } from "mongodb";
import { executeInsert, executeFind } from ".";

export default {
  async getUserPostsByUserId(userId: string): Promise<Post[]> {
    const findByUserId = (client: MongoClient): Promise<Post[]> => {
      return client
        .db("evergreen")
        .collection("posts")
        .find({ authorId: userId })
        .toArray();
    };
    return executeFind(findByUserId);
  },
  async getPostByUrlName(urlName: string, userId?: string): Promise<Post> {
    const findByUrlName = (client: MongoClient): Promise<Post> => {
      const params = userId
        ? { urlName, authorId: userId }
        : { urlName, published: true };
      const result = client.db("evergreen").collection("posts").findOne(params);
      return result;
    };
    return executeFind(findByUrlName);
  },
  async getRelevantPosts(): Promise<Post[]> {
    const getPosts = (client: MongoClient): Promise<Post[]> => {
      return client
        .db("evergreen")
        .collection("posts")
        .find({ published: true })
        .toArray();
    };
    return executeFind(getPosts);
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
    return executeInsert(update, post);
  },
  async deletePost(urlName: string, userId: string): Promise<any> {
    const deletePost = async (client: MongoClient, params: any) => {
      return await client
        .db("evergreen")
        .collection("posts")
        .deleteOne({ urlName: params.urlName, authorId: params.userId });
    };
    return executeInsert(deletePost, { urlName, userId });
  },
  async newPost(post: Post): Promise<any> {
    const newPost = async (client: MongoClient, post: Post) => {
      const _id = await (
        await client.db("evergreen").collection("posts").insertOne(post)
      ).insertedId;
      post._id = _id;
      return post;
    };
    return executeInsert(newPost, post);
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

    return executeInsert(updatePostBanner, { img, postId, userId });
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
    return executeInsert(updatePostPublished, { isPublished, postId });
  },
};
