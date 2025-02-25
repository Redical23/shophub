import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

const jsonHeaders = { "Content-Type": "application/json" };

const jsonResponse = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: jsonHeaders });

export async function GET(req) {
  try {
    await dbConnect();
    const news = await User.find({});
    return jsonResponse(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    return jsonResponse({ error: "Failed to fetch news" }, 500);
  }
}
