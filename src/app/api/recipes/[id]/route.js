import {
  updateRecipe,
  deleteRecipe,
  getRecipeById,
} from "@/server/services/recipeService";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Recipe ID is required" },
        { status: 400 }
      );
    }
    console.log("This is the GET method in route.js[id]");
    const recipe = await getRecipeById(id);

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Fetch recipe by ID error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const { params } = await context;
    const id = params.id;

    const deleted = await deleteRecipe(id);

    if (!deleted) {
      return new Response(JSON.stringify({ error: "Recipe not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Recipe deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request, context) {
  try {
    // const params = await context;
    // console.log(params.get('id'))
    const urlParams = request.url.split("/");
    const id = urlParams[urlParams.length - 1];
    const updatedData = await request.json();

    const updated = await updateRecipe(id, updatedData);

    if (!updated) {
      return new Response(JSON.stringify({ error: "Recipe not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Recipe updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Update error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// export async function PATCH(request, { params }) {
//   const { id } = await params;
//   const body = await request.json();

//   try {
//     // Prepare dynamic update operators
//     const operators = {};
//     for (const key in body) {
//       const value = body[key];

//       // If field is array-like (e.g., likedBy) or explicitly an array, use $addToSet
//       if (Array.isArray(value) || key === "likedBy") {
//         operators.$addToSet = operators.$addToSet || {};
//         operators.$addToSet[key] = {
//           $each: Array.isArray(value) ? value : [value],
//         };
//       } else {
//         operators.$set = operators.$set || {};
//         operators.$set[key] = value;
//       }
//     }

//     const result = await updateRecipe(id, operators);

//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { success: false, message: "Recipe not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: "Successfully updated" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error in PATCH (updating data):", error);
//     return NextResponse.json(
//       { success: false, message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  try {
    const result = await updateRecipe(id, body);
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Recipe not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Successfully updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in patch(updating the data)", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}