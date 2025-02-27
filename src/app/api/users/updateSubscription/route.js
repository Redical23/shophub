import { NextResponse } from "next/server";
import dbconnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export async function PATCH(request) {
  try {
    const { email, subscribe, subscriptionExpiry } = await request.json();
    console.log(email, subscribe, subscriptionExpiry, "eodeod");

    // Decode the email before using it in your query
    const decodedEmail = decodeURIComponent(email);
    if (!decodedEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbconnect();

    const user = await User.findOneAndUpdate(
      { email: decodedEmail },
      { subscribe, subscriptionExpiry },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Subscription updated", user });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
