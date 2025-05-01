"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navigation from "./Navigation";
import SearchBar from "./SearchBarA";
import { useModelContext } from "../context/Context";
import { Menu, X } from "lucide-react";

const LAHEAD = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isModelOpen, setIsModelOpen, email } = useModelContext();
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users?email=${email}`);
        const data = await res.json();
        if (res.ok) setUser(data);
        else console.error("Error fetching user:", data.error);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    if (email) fetchUserData();
  }, [email]);

  return (
    <header className="bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#1E3A8A] text-white shadow-lg py-3">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <a
  href="/pruser/homepage"
  class="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 ease-in-out shadow-md hover:shadow-lg"
>
  KANOONI KARVAHI
</a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Navigation />
          {pathname !== "/Constitustion" && <SearchBar />}
          {/* Avatar & Buttons */}
          <div className="flex items-center space-x-5">
            <button
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFB400] shadow-md hover:shadow-lg transition-all"
            >
              <img src={user?.avatar || "/default-avatar.png"} alt="User avatar" className="w-full h-full object-cover" />
            </button>
            <button
              onClick={() => router.push("/pruser/setting")}
              className="px-5 py-2 bg-[#FFB400] text-[#1B1F3B] rounded-lg font-semibold shadow-md hover:bg-[#E6A200] transition-all"
            >
              Settings
            </button>
            <button
              onClick={() => router.push("/pruser/profile")}
              className="px-5 py-2 bg-[#E63946] text-white rounded-lg font-semibold shadow-md hover:bg-[#C82D3A] transition-all"
            >
              Profile
            </button>
          </div>
        </div>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-4 md:hidden bg-gradient-to-r from-[#1E293B] via-[#0F172A] to-[#1E3A8A] p-6 rounded-lg shadow-lg">
          <Navigation />
          {pathname !== "/Constitustion" && <SearchBar />}
          <div className="mt-5 flex flex-col space-y-4">
            <button
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFB400] shadow-md"
            >
              <img src={user?.avatar || "/default-avatar.png"} alt="User avatar" className="w-full h-full object-cover" />
            </button>
            <button
              onClick={() => router.push("/pruser/setting")}
              className="px-5 py-2 bg-[#FFB400] text-[#1B1F3B] rounded-lg font-semibold shadow-md hover:bg-[#E6A200] transition-all"
            >
              Settings
            </button>
            <button
              onClick={() => router.push("/pruser/profile")}
              className="px-5 py-2 bg-[#E63946] text-white rounded-lg font-semibold shadow-md hover:bg-[#C82D3A] transition-all"
            >
              Profile
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default LAHEAD;
