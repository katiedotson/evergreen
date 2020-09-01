import { MongoClient } from "mongodb";

export interface ExecutableMongoInsertCallback {
  (client: MongoClient, data: Record<string, unknown>): Promise<any>;
}

export interface ExecutableMongoFindCallback {
  (client: MongoClient): Promise<any>;
}

export interface Post {
  title: string;
  body: string;
  relevance: number;
  tagline: string;
  img: string;
  urlName: string;
  authorId: string;
  published: boolean;
  _id?: string;
}

export interface Gallery {
  title: string;
  photos: GalleryPhoto[];
  relevance: number;
  description: string;
  urlName: string;
  authorId: string;
  published: boolean;
  _id?: string;
}

export interface GalleryPhoto {
  img: string;
  tagline: string;
}

export interface User {
  userId: string;
  _id: string;
  firstName: string;
  lastName: string;
  interests: string[];
  savedPosts?: Post[];
  authorId?: number;
  location: string;
  bio: string;
  joinDate: Date;
  occupation: string;
  email: string;
  img: string;
  platform: string;
  active?: boolean;
}

export interface UserData {
  id: string;
  platform: string;
  expiration: number;
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
