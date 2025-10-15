// import dbInstance from '@/server/db/index';
import DBConnect from "@/server/db/index";
import { ObjectId } from "mongodb";

const collectionName = "recipes";
const db = new DBConnect();
// const db = await dbInstance.connect();

export async function getAllRecipes() {
  try {
    const recipes = await db.getAll(collectionName);
    // console.log('This is form recipeServic.js',recipes);
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

export async function getUserRecipes(userId) {
  try {
    const recipes = await db.getUserRecipes(collectionName, { userId });
    return recipes;
  } catch (error) {
    console.error("Error in Getting User Recipes(Service):", error);
  }
}

export async function getRecipeById(id) {
  try {
    // Validate ID format first
    if (!ObjectId.isValid(id)) {
      console.error("Invalid Id");
      return null; // Return null instead of throwing
    }
    const recipes = db.getOne({ _id: new ObjectId(id) }, collectionName);
    return recipes;
    // const db = await dbInstance.connect();
    // const recipesCollection = db.collection('recipes');
    // const recipe = await recipesCollection.findOne({ _id: new ObjectId(id) });

    // return recipe;
  } catch (error) {
    console.error("Error in getRecipeById:", error);
    return null;
  }
}

export async function createRecipe(recipeData) {
  try {
    if (typeof recipeData.ingredients === "string") {
      recipeData.ingredients = recipeData.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    if (typeof recipeData.instructions === "string") {
      recipeData.instructions = recipeData.instructions
        .split("\n")
        .map((step) => step.trim())
        .filter(Boolean);
    }

    if (
      Array.isArray(recipeData.ingredients) &&
      typeof recipeData.ingredients[0] === "string"
    ) {
      recipeData.ingredients = recipeData.ingredients.map((item) => {
        const [quantity, ...nameParts] = item.split(" ");
        return {
          quantity,
          name: nameParts.join(" "),
        };
      });
    }

    recipeData.createdAt = new Date();
    recipeData.updatedAt = new Date();

    const result = await db.createOne(recipeData, collectionName);
    // result = await db.collection('recipes').createIndex({ userId: 1 });
    return result; // result should include insertedId from MongoDB
  } catch (error) {
    console.error("Error creating recipe:", error);
    return false;
  }
}

export async function updateRecipe(id, updatedData) {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid recipe ID");
  }

  // Ensure id is treated as string
  const objectId = new ObjectId(id.toString());

  // const db = await dbInstance.connect();
  // const recipesCollection = db.collection('recipes');

  updatedData.updatedAt = new Date();

  const result = await db.updateOne(
    collectionName,
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );

  if (result.matchedCount === 0) {
    return false;
  }

  return true;
}

export async function deleteRecipe(id) {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid recipe ID");
  }

  const objectId = new ObjectId(id);
  const db = await dbInstance.connect();
  const recipesCollection = db.collection("recipes");

  const result = await recipesCollection.deleteOne({ _id: objectId });

  if (result.deletedCount === 0) {
    return false;
  }

  return true;
}
