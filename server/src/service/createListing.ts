import executeCall from "./mongoClient";
import { MongoClient } from "mongodb";

async function createListing(
  client: MongoClient,
  data: Record<string, unknown>
) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertOne(data);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}

async function c_createListing(data: Record<string, unknown>): Promise<void> {
  executeCall(createListing, data);
}

export default c_createListing;
