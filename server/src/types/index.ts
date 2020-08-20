import { MongoClient } from "mongodb";

export interface ExecutableMongoCallback {
  (client: MongoClient, data: Record<string, unknown>): Promise<void>;
}
