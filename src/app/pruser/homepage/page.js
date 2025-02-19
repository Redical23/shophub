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
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { searchterm } = useModelContext();
  const [selectedFilter, setSelectedFilter] = useState("");
  const filterFromUrl = searchParams.get("filter") || "";
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure the page is fully hydrated before rendering content
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    fetch("/api/laywers", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    let filtered = users;

    if (searchterm.length > 2) {
      filtered = filtered.filter((user) =>
        user.name?.toLowerCase().includes(searchterm.toLowerCase())
      );
    }

    if (selectedFilter && selectedFilter !== "All") {
      filtered = filtered.filter((user) =>
        user.areasOfPractice && Array.isArray(user.areasOfPractice)
          ? user.areasOfPractice.some(
              (area) => area.toLowerCase() === selectedFilter.toLowerCase()
            )
          : false
      );
    }

    setFilteredUsers(filtered);
  }, [searchterm, users, selectedFilter, isHydrated]);

  useEffect(() => {
    setSelectedFilter(filterFromUrl);
  }, [filterFromUrl]);

  const usersPerPage = 9;
  const startIndex = (page - 1) * usersPerPage;
  const selectedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const filters = ["All", "Corporate Law", "Immigration Law", "Family Law", "Criminal Law"];

  // Prevent rendering until hydration is complete
  if (!isHydrated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020B2C] to-[#0D1B4A]">
      <LAHEAD />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container flex-col mx-auto px-4 py-8"
      >
        <FeaturedLawyer />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {filters.map((filter, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedFilter === filter
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
              onClick={() => setSelectedFilter(filter === "All" ? "" : filter)}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page + selectedFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 w-11/12"
          >
            <LAWYERSSTEMP users={selectedUsers} />
          </motion.div>
        </AnimatePresence>
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
