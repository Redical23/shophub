import dbConnect from "../../lib/dbConnect"
import Conversation from "../../models/message"
import { NextResponse } from "next/server"

export async function GET(req) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const lawyer = searchParams.get("lawyer")
  const client = searchParams.get("client")

  if (!lawyer) {
    return NextResponse.json({ error: "Lawyer email is required" }, { status: 400 })
  }

  try {
    if (client) {
      // Fetch messages for a specific conversation
      const conversation = await Conversation.findOne({
        participants: { $all: [lawyer, client] },
      }).sort({ "messages.timestamp": 1 })
      return NextResponse.json({ messages: conversation?.messages || [] })
    } else {
      // Fetch all clients for the lawyer
      const conversations = await Conversation.find({
        participants: lawyer,
      })
      const clients = conversations.map((conv) => conv.participants.find((p) => p !== lawyer)).filter(Boolean)
      return NextResponse.json({ clients })
    }
  } catch (error) {
    console.error("❌ Error fetching data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}


export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { from, to, content, avatar, username } = body;

    // Validate input fields
    if (!from || !to || !content) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          received: { from, to, content, avatar, username },
        },
        { status: 400 }
      );
    }

    // Check if a conversation exists between the participants
    let conversation = await Conversation.findOne({
      participants: { $all: [from, to] },
    });
    let conversation2 = await Conversation.findOne({
      participants: { $all: [to, from] },
    });

    // Create a new conversation if none exists
    if (!conversation) {
      conversation = new Conversation({
        participants: [from, to],
        avatar: avatar || "/images/default-avatar.png", // Default avatar if none provided
        username: username || "Client", // Default username if none provided
        messages: [],
      });
    }
    if (!conversation2) {
      conversation = new Conversation({
        participants: [to, from],
        avatar: avatar || "/images/default-avatar.png", // Default avatar if none provided
        username: username || "Client", // Default username if none provided
        messages: [],
      });
    }
    
    // Create a new message object
    const newMessage = {
      from,
      to,
      content,
      avatar: avatar || conversation.avatar, // Use conversation's avatar if not provided
      username: username || conversation.username, // Use conversation's username if not provided
      timestamp: new Date(),
      id: Date.now().toString(),
    };

    // Add the new message to the conversation
    conversation.messages.push(newMessage);

    // Save the conversation
    await conversation.save();

    // Respond with success
    return NextResponse.json(
      {
        message: "Message saved successfully",
        savedMessage: newMessage,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Error saving message:", error);
    return NextResponse.json(
      {
        error: "Failed to save message",
        details: error.message,
      },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  await dbConnect();
  const { lawyer, clientEmail } = await req.json();

  try {
    if (!lawyer || !clientEmail) {
      return new Response(
        JSON.stringify({ error: "Both lawyer and client email are required" }),
        { status: 400 }
      );
    }

    // Delete the conversation between the lawyer and the client
    const result = await Conversation.deleteOne({
      participants: { $all: [lawyer, clientEmail] }
    });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "No conversation found to delete" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Conversation deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error deleting conversation:", error)
    return new Response(
      JSON.stringify({ error: "Failed to delete conversation" }),
      { status: 500 }
    );
  }
}
