import { registerUser } from "@/server/services/authService";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    const result = await registerUser(username, email, password);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Registration API error:", err);

    return new Response(
      JSON.stringify({ success: false, message: "Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
