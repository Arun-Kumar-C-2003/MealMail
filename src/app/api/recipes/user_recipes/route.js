import { NextResponse } from "next/server";
import { getAllRecipes } from "@/server/services/recipeService";

export async function GET() {
  try {
    const userRecipes = await getAllRecipes();
    // console.log("This is from user_recipes/route.js",userRecipes)
    return NextResponse.json(userRecipes);
  } catch (error) {
    console.error("Error Occurred in Gettting All User Recipes:", error);
    return NextResponse.json({ status: 500 });
  }
}
