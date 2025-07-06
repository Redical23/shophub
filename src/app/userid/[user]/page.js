"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Star, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import TrackVisit from "../../slidebar/TrackVisit";
import Footer from "../../slidebar/FOOTER";

export default function LawyerProfilePage() {
  const { user } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("About");

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await fetch(`/api/pto?id=${user}`);
        if (!res.ok) throw new Error("Failed to fetch data");
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

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (!userData) return <div className="min-h-screen flex items-center justify-center text-white">User not found</div>;

  const {
    name,
    email,
    yearsexp,
    charge,
    rating,
    avatar,
    recentCases = [],
    bio,
    areasOfPractice = [],
    location,
    phone,
    education = [],
    barAdmissions = [],
    firm,
    awards = [],
    publications = [],
  } = userData;

  const tabs = [
    "About",
    "Specializations",
    "Experience",
    "Education",
    "Bar Admissions",
    "Awards",
    "Publications",
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "About":
        return <p className="text-gray-300">{bio || "No bio provided."}</p>;
      case "Specializations":
        return areasOfPractice.length > 0 ? (
          <ul className="list-disc pl-4 text-gray-300 space-y-1">
            {areasOfPractice.map((area, i) => <li key={i}>{area}</li>)}
          </ul>
        ) : <p className="text-gray-300">No specializations listed.</p>;
      case "Experience":
        return recentCases.length > 0 ? (
          <ul className="list-disc pl-4 text-gray-300 space-y-1">
            {recentCases.map((item, i) => (
              <li key={i}>
                <strong>{item.title}</strong> ({item.year}) - {item.outcome}
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-300">No recent cases available.</p>;
      case "Education":
        return education.length > 0 ? (
          <ul className="list-disc pl-4 text-gray-300 space-y-1">
            {education.map((edu, i) => (
              <li key={i}><strong>{edu.degree}</strong> — {edu.institution}, {edu.year}</li>
            ))}
          </ul>
        ) : <p className="text-gray-300">No education details.</p>;
      case "Bar Admissions":
        return barAdmissions.length > 0 || firm ? (
          <div className="text-gray-300 space-y-2">
            {barAdmissions.length > 0 && (
              <ul className="list-disc pl-4">
                {barAdmissions.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            )}
            {firm && <p><strong>Firm:</strong> {firm}</p>}
          </div>
        ) : <p className="text-gray-300">No bar admissions listed.</p>;
      case "Awards":
        return awards.length > 0 ? (
          <ul className="list-disc pl-4 text-gray-300 space-y-1">
            {awards.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        ) : <p className="text-gray-300">No awards available.</p>;
      case "Publications":
        return publications.length > 0 ? (
          <ul className="list-disc pl-4 text-gray-300 space-y-1">
            {publications.map((item, i) => (
              <li key={i}>
                <strong>{item.title}</strong> — {item.journal}, {item.year}
              </li>
            ))}
          </ul>
        ) : <p className="text-gray-300">No publications available.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#020B2C] text-white">
      <TrackVisit userId={user} />
      <div className="p-6 max-w-6xl mx-auto">
        <Link
          href="/pruser/homepage"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to Profiles
        </Link>

        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT: Profile Info */}
          <div className="bg-white/10 p-6 rounded-lg shadow-lg text-center">
            <img
              src={avatar}
              alt="avatar"
              className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500 shadow mb-4"
            />
            <h1 className="text-2xl font-bold">{name}</h1>
            <div className="text-yellow-400 mt-1 flex justify-center items-center gap-1">
              <Star className="h-5 w-5" /> <span>{rating}</span>
            </div>
            <p className="mt-2 text-gray-300">{yearsexp} Years Experience</p>
            <p className="text-sm font-semibold">₹{charge}/hour</p>
            <Link
              href={`/lawyer/${email}`}
              className="block mt-4 bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-white"
            >
              Schedule Consultation
            </Link>
            <div className="mt-6 text-sm space-y-2">
              {email && (
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>{email}</span>
                </div>
              )}
              {phone && (
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>{phone}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Tabs */}
          <div className="md:col-span-2 flex flex-col">
            <div className="flex flex-wrap border-b border-gray-600 mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
                    activeTab === tab
                      ? "border-blue-400 text-blue-300"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white/10 p-6 rounded-lg shadow-lg backdrop-blur">
              <h2 className="text-xl font-semibold mb-4">{activeTab}</h2>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
