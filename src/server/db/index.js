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
  getAll = async (collectionName) => {
    try {
      const db = await this.connect();
      const tableCollection = db.collection(collectionName);
      // const tableCollection = db.collection(tableName);
      const find = await tableCollection.find({}).toArray();
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
      const result = tableCollection.insertOne(data);
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
      const result = tableCollection.updateOne(id, updateDate);
      return result;
    } catch (error) {
      console.error("Error in Update:", error);
      return null;
    }
  };
}

const dbInstance = new DBConnect();
export default DBConnect;
// export const clientPromise = dbInstance.connect().then(db => db.client);
