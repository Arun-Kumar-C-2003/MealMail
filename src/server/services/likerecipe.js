import DBConnect from "@/server/db/index";
import { ObjectId } from "mongodb";

const collectionName = "recipes";

export async function toggleLike(id, userName) {
  const dbInstance = new DBConnect(); // create instance
  const objectId = new ObjectId(id);

  // ✅ Get the actual database object
  const database = await dbInstance.connect();
  const collection = database.collection(collectionName);

  // ✅ Now you can safely query
  const recipe = await collection.findOne({ _id: objectId });
  if (!recipe) return null;

  const likedBy = Array.isArray(recipe.likedBy) ? recipe.likedBy : [];
  const hasLiked = likedBy.includes(userName);

  const updateQuery = hasLiked
    ? { $pull: { likedBy: userName }, $set: { updatedAt: new Date() } }
    : { $addToSet: { likedBy: userName }, $set: { updatedAt: new Date() } };

  await collection.updateOne({ _id: objectId }, updateQuery);

  const updatedRecipe = await collection.findOne({ _id: objectId });

  return {
    liked: !hasLiked,
    likedBy: updatedRecipe.likedBy ?? [],
  };
}
