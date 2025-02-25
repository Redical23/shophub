"use client"
import React, { useState, useEffect } from 'react';
import LAHEAD from '../slidebar/LAHEAD';
import NEWSTEMP from '../templates/NEWSTEMP';
import FeaturedArticle from '../slidebar/featured-articale';
import { useModelContext } from '../context/Context';
import { CategoryFilter } from '../slidebar/category-filter';
import Footer from '../slidebar/FOOTER';
import { motion, AnimatePresence } from 'framer-motion';

const Page = () => {
  const [newss, setNewss] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchterm } = useModelContext();

  useEffect(() => {
    fetch('/api/news')
      .then((response) => response.json())
      .then((data) => {
        setNewss(data);
        setFilteredUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchterm.length > 2) {
      const filtered = newss.filter((newsItem) =>
        newsItem.headline.toLowerCase().includes(searchterm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(newss);
    }
    setPage(1);
  }, [searchterm, newss]);

  const usersPerPage = 9;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (page - 1) * usersPerPage;
  const selectedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020B2C] to-[#0D1B4A]">
 

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container flex-col mx-auto px-4 py-8"
      >
        {/* ✅ Ensure FeaturedArticle is inside a div */}
        <div className="relative z-10 w-full h-auto">
          <FeaturedArticle />
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CategoryFilter setFilteredUsers={setFilteredUsers} newss={newss} />
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <NEWSTEMP news={selectedUsers} />
            </motion.div>
          </AnimatePresence>
        )}

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-8 gap-2"
          >
            {[...Array(totalPages)].map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 rounded-lg transition-all ${
                  page === index + 1
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Page;
