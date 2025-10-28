import { NextResponse } from "next/server";
import { createRecipe, getUserRecipes } from "@/server/services/recipeservice";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/authoptions";
import { format } from "path";

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
    //Get the userId from the session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse(
        { error: "User is not Authenticated" },
        { status: 401 }
      );
    }
    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const dietary = formData.get("dietary");
    const difficulty = formData.get("difficulty");
    const cookTime = formData.get("cookTime");
    const cuisineType = formData.get("cuisineType");
    const servings = formData.get("servings");
    const ingredients = formData.get("ingredients");
    const instructions = formData.get("instructions");

    const imageFiles = formData.getAll("images"); // array of Blobs or Files

    let images = [];

    for (const [index, file] of imageFiles.entries()) {
      if (file && typeof file.arrayBuffer === "function") {
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = buffer.toString("base64");
        const mimeType = file.type;

        images.push({
          url: `data:${mimeType};base64,${base64}`,
          name: file.name,
          type: file.type,
          // size: file.size,
          isCover: index === 0,
        });
      }
    }

    const recipeData = {
      title,
      description,
      userId: session?.user?.id,
      dietary,
      cuisineType,
      difficulty,
      cookTime,
      servings,
      ingredients,
      instructions,
      images,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await createRecipe(recipeData);
    console.log(recipeData.id);
    if (!result) {
      return NextResponse.json(
        { error: "Failed to create recipe" },
        { status: 500 }
      );
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
