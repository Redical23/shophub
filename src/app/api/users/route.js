import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";


  // Import bcryptjs


export async function POST(req) {
  await dbConnect();
  const bcrypt = (await import("bcryptjs")).default;
  try {
    // Extract data from the request body
    const { email, username, password } = await req.json();

    // Check if all fields are provided
    if (!email || !username || !password) {
      return new Response(
        JSON.stringify({ error: "All fields are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already in use." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with salt rounds (10)

    // Create a new user with the hashed password
    const newUser = new User({
      email,
      username,
      password: hashedPassword, // Store the hashed password
    });
console.log(hashedPassword)
    // Save the new user to the database
    await newUser.save();

    return new Response(
      JSON.stringify({
        message: "User registered successfully.",
        user: newUser,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return new Response(
      JSON.stringify({ error: "Failed to register user" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}


export async function GET(req) {
  const jsonHeaders = { "Content-Type": "application/json" };

  // Helper to create JSON responses
  const jsonResponse = (data, status = 200) =>
    new Response(JSON.stringify(data), { status, headers: jsonHeaders });

  try {
    // Connect to the database
    await dbConnect();

    // Extract email from query parameters
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return jsonResponse({ error: "Email is required" }, 400);
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return jsonResponse({ error: "User not found" }, 404);
    }

    // Return the found user
    return jsonResponse(user, 200);
  } catch (error) {
    console.error("Error fetching user:", error);
    return jsonResponse({ error: "Failed to fetch user" }, 500);
  }
}
