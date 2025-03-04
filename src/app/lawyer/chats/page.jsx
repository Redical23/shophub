"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../component/Sidebar";
import { useModelContext } from "../../context/Context";
import ChatMessage from "../component/ChatMessage";
import { ChatInput } from "../component/ChatInput";
import LAHEAD from "../../slidebar/LAHEAD";
import { ChatHeader } from "../component/ChatHeader";
import { initializeSocket, joinRoom, sendMessage } from "../../../lib/socket";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";

export default function Page() {
  const { email, currentchat } = useModelContext();
  const Footer = dynamic(() => import("../../slidebar/FOOTER"), { ssr: false });
  const decodedEmail = email ? decodeURIComponent(email) : null;
  const [messages, setMessages] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Use a ref to always have the latest currentchat value
  const currentChatRef = useRef(currentchat);
  useEffect(() => {
    currentChatRef.current = currentchat;
  }, [currentchat]);

  // Initialize the socket connection once decodedEmail is available.
  useEffect(() => {
    if (!decodedEmail) return;
    if (!socketRef.current) {
      socketRef.current = initializeSocket();
      socketRef.current.on("receive_message", (message) => {
        // Only append messages that belong to the current chat
        if (message.to === currentChatRef.current) {
          setMessages((prev) => [...prev, message]);
        }
      });
    }
    // Cleanup on unmount.
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [decodedEmail]);

  // When the room changes, clear messages, join the room, and fetch historical messages.
  useEffect(() => {
    if (!decodedEmail || !currentchat) return;

    // Clear previous messages immediately
    setMessages([]);
    const room = `${decodedEmail}_${currentchat}`;
    joinRoom(room);

    let isMounted = true;
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `/api/message?lawyer=${encodeURIComponent(
            decodedEmail
          )}&client=${encodeURIComponent(currentchat)}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        if (res.ok && isMounted) {
          // Compare messages to avoid unnecessary re-renders
          setMessages(prevMessages => {
            if (prevMessages.length === data.messages?.length && 
                JSON.stringify(prevMessages) === JSON.stringify(data.messages)) {
              return prevMessages;
            }
            return data.messages || [];
          });
        } else if (isMounted) {
          console.error("Error fetching messages:", data.error);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch messages:", err);
        }
      }
    };

    // Initial fetch immediately
    fetchMessages();
    // Set up interval to refresh messages every 3 seconds
    const intervalId = setInterval(fetchMessages, 3000);

    // Cleanup interval when the component unmounts or dependencies change.
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [decodedEmail, currentchat]);

  // Handle sending messages.
  const handleSendMessage = useCallback(
    async (content) => {
      if (!currentchat || !decodedEmail) return;
      const messageData = {
        from: decodedEmail,
        to: currentchat,
        content: content.trim(),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, { ...messageData, isSent: true }]);
      try {
        const res = await fetch("/api/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageData),
        });
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || "Failed to send message");
        }
        sendMessage(messageData, `${decodedEmail}_${currentchat}`);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
    [currentchat, decodedEmail]
  );

  // Maintain scroll position during re-renders
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  // Preserve scroll position during polling updates
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    let prevScrollHeight = chatContainer.scrollHeight;
    let prevScrollTop = chatContainer.scrollTop;
    let prevClientHeight = chatContainer.clientHeight;
    let wasAtBottom = prevScrollTop + prevClientHeight >= prevScrollHeight - 10;

    const observer = new MutationObserver(() => {
      const newScrollHeight = chatContainer.scrollHeight;
      
      if (newScrollHeight !== prevScrollHeight) {
        if (wasAtBottom) {
          // If user was at bottom, keep them at bottom
          chatContainer.scrollTop = newScrollHeight;
        } else {
          // Otherwise maintain relative scroll position
          chatContainer.scrollTop = prevScrollTop + (newScrollHeight - prevScrollHeight);
        }
        
        prevScrollHeight = newScrollHeight;
        prevScrollTop = chatContainer.scrollTop;
        prevClientHeight = chatContainer.clientHeight;
        wasAtBottom = prevScrollTop + prevClientHeight >= prevScrollHeight - 10;
      }
    });

    observer.observe(chatContainer, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [currentchat]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 overflow-hidden px-4 py-6 md:px-8 md:py-8">
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowSidebar((prev) => !prev)}
            className="p-2 bg-green-600 rounded-full text-white shadow-lg"
          >
            {showSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="flex flex-1 rounded-lg overflow-hidden shadow-lg">
          <div className={`${showSidebar ? "block" : "hidden"} md:block w-full md:w-80 border-r`}>
            <Sidebar />
          </div>
          {currentchat ? (
            <div className="flex flex-col flex-1">
              <ChatHeader />
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
                style={{ 
                  maxHeight: "calc(100vh - 250px)",
                  overscrollBehavior: "contain" 
                }}
              >
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p>No messages yet. Start a conversation!</p>
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <ChatMessage
                        key={message.id || message._id || `${message.timestamp}-${index}`}
                        content={message.content}
                        timestamp={message.timestamp}
                        isSent={message.from === decodedEmail}
                      />
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="p-4 text-center">
                <p className="text-xl mb-2">Welcome to your chat</p>
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}