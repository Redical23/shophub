"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import LAHEAD from "../../slidebar/LAHEAD";
import { ArrowLeft, Star, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import TrackVisit from "../../slidebar/TrackVisit";
import Footer from "../../slidebar/FOOTER";

export default function LawyerProfilePage() {
  const { user } = useParams(); // dynamic route parameter (expected to be the user's _id)
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Call the API endpoint using the id query parameter
        const res = await fetch(`/api/pto?id=${user}`, {
          headers: { Accept: "application/json" }
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        // The response is expected to be a single user object
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020B2C] text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#020B2C] text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  const {
    name,
    email,
    yearsexp,
    charge,
    rating,
    avatar,
    recentCases,
    bio,
    areasOfPractice,
    location,
    phone
  } = userData;

  return (
    <div>
      <TrackVisit userId={user} />
      
      <div className="min-h-screen bg-[#020B2C] text-white p-8 flex flex-col items-center">
        <Link
          href="/pruser/homepage"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Profiles
        </Link>
        <div className="w-full max-w-4xl grid md:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="md:col-span-1 bg-white/10 backdrop-blur p-6 rounded-lg shadow-lg">
            <div className="flex flex-col items-center text-center">
              <img
                src={avatar}
                alt="User avatar"
                className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500 shadow-lg"
              />
              <h1 className="text-2xl font-bold">{name}</h1>
              <div className="flex items-center gap-2 mt-2 text-yellow-400">
                <Star className="h-5 w-5" /> <span>{rating}</span>
              </div>
              <div className="text-sm text-gray-300 mt-3 space-y-1">
                <p>{yearsexp} Years Experience</p>
                <p className="font-semibold">${charge}/hour</p>
              </div>
              <Link
                href={`/lawyer/${email}`}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-semibold text-center"
              >
                Schedule Consultation
              </Link>
              <div className="space-y-3 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-400" /> <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-blue-400" /> <span>{phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-400" /> <span>{location}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column - Details */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">About Me</h2>
              <p className="text-gray-300">{bio}</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">Specializations</h2>
              {areasOfPractice && areasOfPractice.length > 0 ? (
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {areasOfPractice.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No areas of practice available.</p>
              )}
            </div>
            <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">Work Experience</h2>
              {recentCases && recentCases.length > 0 ? (
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {recentCases.map((caseItem, index) => (
                    <li key={index}>
                      {caseItem.title} ({caseItem.year}) - {caseItem.outcome}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300">No recent cases available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
