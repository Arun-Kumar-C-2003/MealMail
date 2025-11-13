import { NextResponse } from "next/server";
import { getAllRecipes } from "@/server/services/recipeService";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const userRecipes = await getAllRecipes({ page, limit });
    return NextResponse.json({
      userRecipes: userRecipes,
      hasMore: userRecipes.length === limit,
    });
  } catch (error) {
    console.error("Error Occurred in Gettting All User Recipes:", error);
    return NextResponse.json({ status: 500 });
  }
}
