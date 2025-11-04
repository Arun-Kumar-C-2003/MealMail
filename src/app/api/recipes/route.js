import { NextResponse } from "next/server";
import { createRecipe, getUserRecipes } from "@/server/services/recipeservice";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/authoptions";
// import { format } from "path";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      console.log("Unauthenticated");
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }
    const recipes = await getUserRecipes(session.user?.id);
    console.log("Found recipes:", recipes.length);
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "User is not Authenticated" }, { status: 401 });
    }

    const body = await request.json();

    const recipeData = {
      title: body.title,
      description: body.description,
      userId: session?.user?.id,
      dietary: body.dietary,
      cuisineType: body.cuisineType,
      difficulty: body.difficulty,
      cookTime: body.cookTime,
      servings: body.servings,
      ingredients: body.ingredients,
      instructions: body.instructions,
      images: body.images,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await createRecipe(recipeData);

    if (!result) {
      return NextResponse.json({ error: "Failed to create recipe" }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: "Recipe created successfully",
        id: result.insertedId || result._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create recipe:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
