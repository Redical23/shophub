"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useModelContext } from "../../context/Context";

export default function EmailPage() {
  const router = useRouter();
  const params = useParams(); // useParams hook provides the current route parameters
  const { email, setclientemail } = useModelContext();
  const [user, setUser] = useState(null); // to store fetched user data
  const [error, setError] = useState(null);

  console.log("🚀 EmailPage Mounted");
  console.log("🔍 Params:", params);

  const email2 = params?.email2 ? decodeURIComponent(params.email2) : null;
  console.log("📩 Extracted email2:", email2);

  const fetchUserData = async (email2) => {
    try {
      const res = await fetch(`/api/users?email=${encodeURIComponent(email2)}`);
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        console.log("👤 Fetched user data for email2:", data);
      } else {
        setError(data.error);
        console.error("❌ Error fetching user data:", data.error);
      }
    } catch (error) {
      setError("Failed to fetch user data");
      console.error("❌ Error fetching user data:", error);
    }
  };

  const initializeConversation = async (email, email2, user) => {
    if (!email2 || !user) return;
    console.log("📡 Initializing conversation...", email, email2);

    try {
      const avatar = user.avatar || "/images/default-avatar.png";
      const username = user.username || "Client";
      const messageContent = `Hello, ${username}!`;

      const res = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: email,
          to: email2,
          content: messageContent,
          avatar: avatar,
          username: username,
        }),
      });

      const data = await res.json();
      console.log("📨 Server Response:", data);

      if (!res.ok) {
        console.error("❌ Failed to initialize conversation. Status:", res.status);
      } else {
        console.log("✅ Conversation initialized successfully. Redirecting...");
        router.push("/lawyer/chats");
      }
    } catch (error) {
      console.error("❌ Error initializing conversation:", error);
    }
  };

  useEffect(() => {
    if (!email2) {
      console.warn("⚠️ No email2 provided in params. Skipping...");
      return;
    }
    setclientemail(email2);
    console.log("✅ Client email set in context:", email2);
    fetchUserData(email2);
  }, [email2, setclientemail]);

  useEffect(() => {
    if (user) {
      initializeConversation(email, email2, user);
    }
  }, [user, email, email2]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#001845] p-4 md:p-8">
      <div className="bg-[#001230] p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full">
        <p className="text-white text-lg md:text-xl text-center">
          Setting up your chat...
        </p>
      </div>
    </div>
  );
}
