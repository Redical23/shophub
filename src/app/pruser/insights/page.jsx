"use client";
export const dynamic = "force-dynamic";
// Remove: export const revalidate = 0;

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useModelContext } from "../../context/Context";
import LAHEAD from "../../slidebar/LAHEAD";
import Footer from "../../slidebar/FOOTER";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function InsightsPage() {
  const { email } = useModelContext();
  const [user, setUser] = useState(null);
  const [visitStats, setVisitStats] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const decodedEmail = email ? decodeURIComponent(email) : null;

  useEffect(() => {
    if (!decodedEmail) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users?email=${decodedEmail}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    const fetchVisitStats = async () => {
      try {
        const res = await fetch(`/api/track-visit?email=${decodedEmail}`);
        const data = await res.json();
        if (res.ok) {
          setVisitStats(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Failed to fetch visit insights");
      }
    };

    fetchUserData();
    fetchVisitStats();
  }, [decodedEmail]);

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-gray-900 text-white"
      >
        Error: {error}
      </motion.div>
    );

  if (!user)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-gray-900 text-white"
      >
        Loading...
      </motion.div>
    );

  const chartData = {
    labels: ["Daily", "Weekly", "Monthly", "Total"],
    datasets: [
      {
        label: "Profile Views",
        data: visitStats
          ? [
              visitStats.dailyVisits / 2,
              visitStats.weeklyVisits / 2,
              visitStats.monthlyVisits / 2,
              visitStats.totalVisits / 2,
            ]
          : [],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Profile View Statistics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <LAHEAD />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container flex-col mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold mb-6">Lawyer Profile</h1>
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <p className="text-xl mb-2">Name: {user.name}</p>
          <p className="text-xl mb-2">Email: {user.email}</p>
        </div>

        <h2 className="text-3xl font-semibold mt-10 mb-6">Profile Insights</h2>
        {visitStats ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-lg p-6"
            >
              <Line data={chartData} options={chartOptions} />
            </motion.div>
          </>
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
