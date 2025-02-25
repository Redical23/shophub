"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import SIGNOUT from "../../signinout/SIGNOUT";
import { useModelContext } from "../../context/Context";

const defaultSettingsOptions = [
  { name: "Edit Profile", href: "/pruser/editprofile" },
  { name: "Bookmarks", href: "/pruser/bookmark" },
  { name: "Posts", href: "/pruser/posts" },
  { name: "Insights", href: "/pruser/insights" },
  { name: "Change Password", href: "/pruser/changepassword" },
  { name: "Subscription", href: "#" },
  { name: "Delete Account", href: "/pruser/delete-account" },
];

export default function SettingsPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const { email } = useModelContext(); // Email available from context
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLaywer, setIsLaywer] = useState(false);

  // Fetch the user data and initialize admin and islaywer state
  useEffect(() => {
    if (email) {
      fetch(`/api/users?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsAdmin(data.admin);
          setIsLaywer(data.islaywer); // Assumes the API returns an "islaywer" field
        })
        .catch((err) => console.error(err));
    }
  }, [email]);

  // Build settings options; add Admin Panel if isAdmin is true.
  const settingsOptions = [...defaultSettingsOptions];
  if (isAdmin) {
    settingsOptions.push({ name: "Admin Panel", href: "/admin" });
  }

  // Load Razorpay script for subscriptions
  useEffect(() => {
    const scriptUrl = "https://checkout.razorpay.com/v1/checkout.js";
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSubscribe = async (plan) => {
    setLoading(true);
    const amount = plan === "pro" ? 49900 : 19900;

    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, email: "user@example.com", plan }),
      });

      const order = await res.json();
      if (!order.id) throw new Error("Payment initiation failed!");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Your App Name",
        description: "Subscription Payment",
        order_id: order.id,
        handler: (response) => {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          setLoading(false);
        },
        prefill: { name: "User Name", email: "user@example.com", contact: "9999999999" },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  // Toggle the user's islaywer status in the database
  const toggleIsLaywer = async () => {
    const newStatus = !isLaywer;
    // Optimistically update UI
    setIsLaywer(newStatus);
    try {
      const res = await fetch("/api/users/toggleIsLaywer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, islaywer: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        setIsLaywer(!newStatus); // revert on error
        alert("Failed to update lawyer status");
      }
    } catch (error) {
      console.error(error);
      setIsLaywer(!newStatus);
      alert("Error updating lawyer status");
    }
  };

  // Create a motion-enhanced version of Link
  const MotionLink = motion(Link);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100"
    >
      <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }} className="text-4xl font-bold mb-8 text-gray-800">
        ⚙️ Settings
      </motion.h1>

      <div className="w-full max-w-2xl space-y-4">
        {settingsOptions.map((option, index) => (
          <motion.div
            key={option.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {option.name === "Subscription" ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubscribe("basic")}
                className="block w-full p-4 rounded-lg bg-blue-600 shadow-md text-center text-lg font-medium transition-colors text-white hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Processing..." : option.name}
              </motion.button>
            ) : (
              <MotionLink
                href={option.href}
                className={`block p-4 rounded-lg shadow-md text-center text-lg font-medium transition-colors ${
                  pathname === option.href ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-blue-50"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.name}
              </MotionLink>
            )}
          </motion.div>
        ))}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: settingsOptions.length * 0.1 }}
        >
          <SIGNOUT />
        </motion.div>
        {/* islaywer Toggle Button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: (settingsOptions.length + 1) * 0.1 }}
        >
          <button
            onClick={toggleIsLaywer}
            className="block w-full p-4 rounded-lg bg-green-600 shadow-md text-center text-lg font-medium transition-colors text-white hover:bg-green-700"
          >
            {isLaywer ? "Deactivate Lawyer Mode" : "Activate Lawyer Mode"}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
