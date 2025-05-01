"use client";

import React, { useState, useEffect } from "react";
import { InternshipPost } from "../../slidebar/IntershipPost";
import { CreatePost } from "../../slidebar/Createpost";
import { Plus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LAHEAD from "../../slidebar/LAHEAD";
import Footer from "../../slidebar/FOOTER";
import { useModelContext } from "../../context/Context";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

function InternshipFeed() {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);
  const { searchterm } = useModelContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
        } else {
          console.error("Error fetching posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
  };

  const filteredPosts = posts.filter((post) =>
    searchterm?.length > 2
      ? post?.title?.toLowerCase().includes(searchterm.toLowerCase()) ||
        post?.description?.toLowerCase().includes(searchterm.toLowerCase())
      : true
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00103a] to-[#001a5e]">
   
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="py-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl font-bold text-center text-white mb-2"
          >
            Internship Opportunities
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-center text-blue-200 mb-12"
          >
            Discover and apply for exciting internship positions
          </motion.p>
          
          <AnimatePresence mode="wait">
            {showCreatePost && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="mb-8"
              >
                <CreatePost
                  onPost={handleNewPost}
                  onClose={() => setShowCreatePost(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-4" />
                <p className="text-blue-200">Loading opportunities...</p>
              </motion.div>
            ) : filteredPosts.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id || index}
                    variants={itemVariants}
                    layout
                    className="transform hover:-translate-y-1 transition-transform duration-200"
                  >
                    <InternshipPost {...post} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white/5 rounded-lg backdrop-blur-sm"
              >
                <p className="text-gray-300 text-lg">No internship posts available</p>
                <p className="text-gray-400 mt-2">Be the first to create one!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg backdrop-blur-sm"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          onClick={() => setShowCreatePost(true)}
        >
          <Plus size={24} />
        </motion.button>
      </motion.div>
     
    </div>
  );
}

export default InternshipFeed;
