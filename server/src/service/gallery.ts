import { Gallery } from "../types";
import { MongoClient, ObjectID } from "mongodb";
import { executeFind, executeInsert } from ".";

export default {
  async getGalleriesByUserId(userId: string): Promise<Gallery[]> {
    const findByUserId = (client: MongoClient): Promise<Gallery[]> => {
      return client
        .db("evergreen")
        .collection("galleries")
        .find({ authorId: userId })
        .toArray();
    };
    return executeFind(findByUserId);
  },
  async getPublishedGalleries(): Promise<Gallery[]> {
    const findByUserId = (client: MongoClient): Promise<Gallery[]> => {
      return client
        .db("evergreen")
        .collection("galleries")
        .find({ published: true })
        .toArray();
    };
    return executeFind(findByUserId);
  },
  async getGalleryByUrlName(
    urlName: string,
    userId?: string
  ): Promise<Gallery> {
    const findById = (client: MongoClient): Promise<Gallery> => {
      const params = userId
        ? { urlName, authorId: userId }
        : { urlName, published: true };

      const result = client
        .db("evergreen")
        .collection("galleries")
        .findOne(params);
      return result;
    };
    return executeFind(findById);
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
    return executeInsert(update, gallery);
  },
  async newGallery(gallery: Gallery): Promise<any> {
    const newGallery = async (client: MongoClient, gallery: Gallery) => {
      const _id = await (
        await client.db("evergreen").collection("galleries").insertOne(gallery)
      ).insertedId;
      gallery._id = _id;
      return gallery;
    };
    return executeInsert(newGallery, gallery);
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
    return executeInsert(updateGalleryPublished, {
      id: gallery._id,
      isPublished,
      userId,
    });
  },
  async deleteGallery(gallery: Gallery, userId: string): Promise<any> {
    const deleteGallery = async (client: MongoClient, params: any) => {
      return await client.db("evergreen").collection("galleries").deleteOne({
        urlName: params.gallery.urlName,
        authorId: params.userId,
      });
    };
    return executeInsert(deleteGallery, { gallery, userId });
  },
};
