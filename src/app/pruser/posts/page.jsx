"use client";

import React, { useState, useEffect } from "react";
import { InternshipPost } from "../../slidebar/IntershipPost";
import { motion, AnimatePresence } from "framer-motion";
import LAHEAD from "../../slidebar/LAHEAD";
import { useModelContext } from "../../context/Context";

function InternshipFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { email } = useModelContext();
  const decodedEmail = email ? decodeURIComponent(email) : null;

  useEffect(() => {
    const fetchPosts = async () => {
      if (!decodedEmail) return;
      try {
        const response = await fetch("/api/posts", { cache: "no-store" });
        const data = await response.json();

        console.log("📢 Fetched posts from API:", data);

        if (data.success) {
          const userPosts = data.data.filter(post => post.email === decodedEmail);
          setPosts(userPosts);
        } else {
          console.error("⚠️ API error:", data.message);
        }
      } catch (error) {
        console.error("❌ Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [decodedEmail]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00103a] to-[#001f6c]">
      
      <div className="container flex-col mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-center text-white"
        >
          Internship Opportunities
        </motion.h1>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-blue-300 text-lg"
          >
            Loading posts...
          </motion.div>
        ) : posts.length > 0 ? (
          <AnimatePresence>
            <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <InternshipPost {...post} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 text-lg"
          >
            No posts available
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default InternshipFeed;
