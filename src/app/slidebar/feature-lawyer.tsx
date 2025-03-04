"use client";
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedLawyer() {
  const [lawyers, setLawyers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/api/laywers", { cache: "no-store" })
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data); // Debugging output
      if (!Array.isArray(data)) {
        console.error("Expected an array but got:", typeof data, data);
        return;
      }
      const subscribedLawyers = data.filter((lawyer) => lawyer.subscribe === true);
      setLawyers(subscribedLawyers);
    })
    .catch((error) => console.error("Error fetching users:", error));
  
  }, []);

  useEffect(() => {
    if (lawyers.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % lawyers.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [lawyers]);

  if (lawyers.length === 0) {
    return <p className="text-center text-white">No subscribed lawyers available.</p>;
  }

  const currentLawyer = lawyers[currentIndex];
console.log(currentLawyer,"sd")
  return (
    <div className="bg-gradient-to-br from-[#1E3A8A] to-[#243B55] rounded-lg shadow-lg overflow-hidden p-6">
      <div className="md:flex items-center">
        <div className="md:flex-shrink-0 relative w-full md:w-72 h-72 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={currentLawyer.avatar || "/fallback.jpg"}
            alt={`${currentLawyer.name}'s profile`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute top-3 right-3 bg-[#FFD700] text-black px-3 py-1 text-sm font-semibold flex items-center rounded-full shadow-md">
            <Star className="w-5 h-5 text-yellow-500 mr-1" />
            {currentLawyer.rating}
          </div>
        </div>

        <div className="p-6 text-white">
          <div className="text-sm text-[#E0E7FF] font-semibold uppercase tracking-wider">
            Featured Lawyer
          </div>
          <h2 className="mt-2 text-4xl font-bold text-[#FFFFFF]">{currentLawyer.username}</h2>
          <p className="mt-4 text-lg text-[#E0E7FF]">
            {currentLawyer.name} is a highly skilled attorney with a strong track record...
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-[#162447] p-4 rounded-lg text-center shadow-md">
              <div className="text-2xl font-bold text-[#FFD700]"> {currentLawyer.location && typeof currentLawyer.location === "string" 
      ? currentLawyer.location 
      : "N/A"}</div>
              <div className="text-sm text-[#E0E7FF]">Location</div>
            </div>
            <div className="bg-[#162447] p-4 rounded-lg text-center shadow-md">
              <div className="text-2xl font-bold text-[#FFD700]">
                {currentLawyer.recentCases ? currentLawyer.recentCases.length : 0}
              </div>
              <div className="text-sm text-[#E0E7FF]">Notable Cases</div>
            </div>
            <div className="bg-[#162447] p-4 rounded-lg text-center shadow-md">
              <div className="text-2xl font-bold text-[#FFD700]">
                {currentLawyer.awards ? currentLawyer.awards.length : 0}
              </div>
              <div className="text-sm text-[#E0E7FF]">Awards</div>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <Link
              href={`/userid/${currentLawyer._id}`}
              className="flex-1 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all"
            >
              View Profile
            </Link>
            <Link
  href={`/lawyer/${currentLawyer.email}`}
  className="flex-1 border border-[#E0E7FF] hover:bg-[#162447] text-white font-bold py-2 px-4 rounded-lg transition-all shadow-md text-center"
>
  Contact
</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
