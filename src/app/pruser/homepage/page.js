"use client";
export const dynamic = "force-dynamic"; // This forces dynamic rendering

import React, { Suspense, useState, useEffect } from "react";
import { useModelContext } from "../../context/Context";
import LAHEAD from "../../slidebar/LAHEAD";
import LAWYERSSTEMP from "../../templates/LAWYERSTEMP";
import FeaturedLawyer from "../../slidebar/feature-lawyer";
import { useSearchParams } from "next/navigation";
import Footer from "../../slidebar/FOOTER";
import { motion, AnimatePresence } from "framer-motion";

function HomepageContent() {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const { searchterm } = useModelContext();
  const [selectedFilter, setSelectedFilter] = useState("");
  const filterFromUrl = searchParams.get("filter") || "";
  const [isHydrated, setIsHydrated] = useState(false);
  const usersPerPage = 9;

  // Ensure the page is fully hydrated before rendering content
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Set filter from URL
  useEffect(() => {
    setSelectedFilter(filterFromUrl);
  }, [filterFromUrl]);

  // Fetch only the current page with search/filter parameters
  useEffect(() => {
    if (!isHydrated) return;
    const queryParams = new URLSearchParams();
    queryParams.append("page", page);
    queryParams.append("limit", usersPerPage);
    if (searchterm && searchterm.length > 2) {
      queryParams.append("search", searchterm);
    }
    if (selectedFilter && selectedFilter !== "All") {
      queryParams.append("filter", selectedFilter);
    }
    fetch(`/api/laywers?${queryParams.toString()}`, { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        // Handle different API response structures:
        const allUsers = data.users || data;
        // Filter on the client side to include only users with islaywer set to true
        const lawyers = allUsers.filter((user) => user.islaywer === true);
        // Sort so that users with subscribe true come first
        const sortedLawyers = [...lawyers].sort((a, b) => {
          return (b.subscribe ? 1 : 0) - (a.subscribe ? 1 : 0);
        });
        setUsers(sortedLawyers);
        const totalCount = data.total || sortedLawyers.length;
        setTotalPages(Math.ceil(totalCount / usersPerPage));
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [isHydrated, page, searchterm, selectedFilter]);

  if (!isHydrated) return null;
  console.log(users, "home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020B2C] to-[#0D1B4A]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto flex-col px-4 py-8"
      >
        <FeaturedLawyer />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {["All", "Corporate Law", "Immigration Law", "Family Law", "Criminal Law"].map(
            (filter, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedFilter === filter
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
                onClick={() => {
                  setSelectedFilter(filter === "All" ? "" : filter);
                  setPage(1); // Reset to first page on filter change
                }}
              >
                {filter}
              </motion.button>
            )
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page + selectedFilter + searchterm}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 w-11/12"
          >
            <LAWYERSSTEMP users={users} />
          </motion.div>
        </AnimatePresence>

        {/* Pagination Controls */}
        <div className="flex justify-center space-x-4 mt-8">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading homepage...</div>}>
      <HomepageContent />
    </Suspense>
  );
}
