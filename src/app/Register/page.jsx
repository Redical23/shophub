"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
     const loge2 = "/c1.png"
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    // Send POST request for registration
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await res.json();
    setIsLoading(false);

    if (res.ok) {
      setMessage("User registered successfully! Redirecting...");
      setTimeout(() => {
        router.push("/auth/success");
      }, 2000);
    } else {
      setMessage(data.message || "Something went wrong.");
    }
  };

  if (status === "authenticated") {
    router.push("/");
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-blue-500/10">
          <Image
            src={loge2}  // Update with your image path
            alt="Adventure awaits"
            layout="fill"
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 p-8">
        <h1 className="text-2xl font-semibold text-white">Kanoonikarwayahi</h1>
        {/* <p className="mt-2 text-sm text-white/90">coming soon.</p> */}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full flex-col justify-center px-4 lg:w-1/2 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#00A3FF]">Create Account</h2>
            <p className="text-sm text-gray-500">Join our community of travelers</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#00A3FF] focus:outline-none focus:ring-1 focus:ring-[#00A3FF]"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#00A3FF] focus:outline-none focus:ring-1 focus:ring-[#00A3FF]"
                placeholder="johndoe"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#00A3FF] focus:outline-none focus:ring-1 focus:ring-[#00A3FF]"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#00A3FF] focus:outline-none focus:ring-1 focus:ring-[#00A3FF]"
                placeholder="••••••••"
              />
            </div>

            {message && <p className="text-sm text-red-500">{message}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-[#00A3FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0088DD] focus:outline-none focus:ring-2 focus:ring-[#00A3FF] focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/Login")}
              className="text-[#00A3FF] hover:underline"
            >
              Sign in
            </button>
            By clicking Register, you agree to the Terms and Conditions & Privacy Policy of Naukri.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
