import { loginUser } from "@/server/services/authservice";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const result = await loginUser(email, password);

    return new Response(JSON.stringify(result), {
      status: result.success ? 200 : 401,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Login API error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
