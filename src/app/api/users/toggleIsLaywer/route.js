import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export async function PATCH(req) {
  try {
    await dbConnect();
    // Parse the incoming JSON body
    const { email: rawEmail, islaywer } = await req.json();
    if (!rawEmail) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Decode the email if it's URL-encoded
    const email = decodeURIComponent(rawEmail);

    // Find and update the user document
    const user = await User.findOneAndUpdate(
      { email },
      { islaywer },
      { new: true }
    );

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ message: "User updated", user }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error toggling islaywer:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update user" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
