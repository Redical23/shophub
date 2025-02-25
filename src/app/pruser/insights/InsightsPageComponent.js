"use client";

// Force dynamic rendering and disable pre-rendering/caching for this client component
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useModelContext } from "../../context/Context";
import LAHEAD from "../../slidebar/LAHEAD";
import Footer from "../../slidebar/FOOTER";
import { motion } from "framer-motion";

// Guard: if window is undefined, we're on the server or during build—return nothing.
export default function InsightsPageComponent() {
  if (typeof window === "undefined") return null;

  const { email } = useModelContext();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [visitStats, setVisitStats] = useState(null);
  const [error, setError] = useState(null);

  const decodedEmail = email ? decodeURIComponent(email) : null;

  useEffect(() => {
    if (!decodedEmail) return;

    async function fetchData() {
      try {
        const resUser = await fetch(`/api/users?email=${decodedEmail}`);
        const dataUser = await resUser.json();
        if (resUser.ok) {
          setUser(dataUser);
        } else {
          setError(dataUser.error || "Unable to load user data.");
        }
      } catch (err) {
        setError("Failed to fetch user data.");
      }

      try {
        const resStats = await fetch(`/api/track-visit?email=${decodedEmail}`);
        const dataStats = await resStats.json();
        if (resStats.ok) {
          setVisitStats(dataStats);
        } else {
          setError(dataStats.error || "Unable to load visit statistics.");
        }
      } catch (err) {
        setError("Failed to fetch visit insights.");
      }
    }

    fetchData();
  }, [decodedEmail]);

  if (error)
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen bg-gray-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p>Error: {error}</p>
      </motion.div>
    );

  if (!user)
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen bg-gray-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p>Loading...</p>
      </motion.div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
    
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6">Lawyer Profile</h1>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <p className="text-xl mb-2">Name: {user.name}</p>
          <p className="text-xl mb-2">Email: {user.email}</p>
        </div>

        <h2 className="text-3xl font-semibold mt-10 mb-6">Profile Insights</h2>
        {visitStats ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <InsightCard title="Total Visits" value={visitStats.totalVisits / 2} />
            <InsightCard title="Monthly Visits" value={visitStats.monthlyVisits / 2} />
            <InsightCard title="Weekly Visits" value={visitStats.weeklyVisits / 2} />
            <InsightCard title="Daily Visits" value={visitStats.dailyVisits / 2} />
            <InsightCard
              title="Last Visit"
              value={new Date(visitStats.lastVisit).toLocaleString()}
              fullWidth
            />
          </motion.div>
        ) : (
          <p className="text-xl text-gray-400">Loading insights...</p>
        )}
      </motion.div>
      <Footer />
    </div>
  );
}

function InsightCard({ title, value, fullWidth = false }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`bg-gray-800 rounded-lg p-6 ${fullWidth ? "col-span-full" : ""}`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  );
}
