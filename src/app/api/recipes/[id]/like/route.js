import { NextResponse } from "next/server";
import { toggleLike } from "@/server/services/likerecipe";

export async function PATCH(request, { params }) {
  const { id } = await params; 
  const { userName } = await request.json();

  if (!userName) {
    return NextResponse.json({ error: "User is required" }, { status: 400 });
  }

  try {
    const result = await toggleLike(id, userName);
    if (!result) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: result.liked ? "Liked!" : "Unliked!",
      likedBy: result.likedBy,
    });
  } catch (error) {
    console.error("Toggle like error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
