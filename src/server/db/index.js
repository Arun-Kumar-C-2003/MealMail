import { MongoClient } from "mongodb";
// import { ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbname = process.env.MONGODB_DB;
console.log(`MongoDB URI: ${uri}, Database: ${dbname}`);

class DBConnect {
  constructor() {
    this.client = new MongoClient(uri);
    this.connected = false;

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  async connect() {
    try {
      if (!this.connected) {
        await this.client.connect();
        this.connected = true;
      }
      console.log("Connected to MongoDB");
      return this.client.db(dbname);
    } catch (error) {
      console.log("Connection issue:", error.message);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.client) {
        await this.client.close();
        this.connected = false;
        console.log("MongoDB connection closed");
      }
    } catch (error) {
      console.log("Failed to close the MongoDB connection:", error.message);
      throw error;
    }
  }
  getAll = async (collectionName, { skip = 0, limit = 10 } = {}) => {
    try {
      const db = await this.connect();
      const tableCollection = db.collection(collectionName);
      const find = await tableCollection
        .aggregate([
          {
            $lookup: {
              from: "users",
              let: { userIdObj: { $toObjectId: "$userId" } }, // convert string → ObjectId
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$userIdObj"] } } },
                { $project: { username: 1 } },
              ],
              as: "user",
            },
          },
          { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ])
        .toArray();

      return find;
    } catch (error) {
      console.error("Error Getting Data", error);
      return [];
    }
  };

  getOne = async (id, collectionName) => {
    try {
      const db = await this.connect();
      const tableCollection = db.collection(collectionName);
      const find = await tableCollection.findOne(id);
      return find;
    } catch (error) {
      console.error("Error in getOne");
    }
  };

  createOne = async (data, collectionName) => {
    try {
      const db = await this.connect();
      const tableCollection = db.collection(collectionName);
      if (collectionName === "recipes") {
        await tableCollection.createIndex({ userId: 1 });
        const result = tableCollection.insertOne(data);
        return result;
      }
      const result = await tableCollection.insertOne(data);
      return result;
    } catch (error) {
      console.error("Error in CreateOne:", error);
      return null;
    }
  };

  updateOne = async (collectionName, id, updateDate) => {
    try {
      const db = await this.connect();
      const tableCollection = db.collection(collectionName);
      const result = await tableCollection.updateOne(id, updateDate);
      return result;
    } catch (error) {
      console.error("Error in Update:", error);
      return null;
    }
  };
  deleteOne = async (query, collectionName) => {
    try {
      const db = await this.connect();
      const tableCollection = db.collection(collectionName);
      const result = await tableCollection.deleteOne(query);
      return result;
    } catch (error) {
      console.error("Error in deleteOne:", error);
      return null;
    }
  };

  getUserRecipes = async (collectionName, filter = {}) => {
    try {
      const db = await this.connect();
      const tableCollection = db.collection(collectionName);
      const result = await tableCollection.find(filter).toArray();
      return result;
    } catch (error) {
      console.error("Error in Getting user recipes:", error);
      return [];
    }
  };
}

const dbInstance = new DBConnect();
export default DBConnect;

// export const clientPromise = dbInstance.connect().then(db => db.client);
