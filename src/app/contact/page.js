"use client"

import { useActionState } from "react"
import { sendEmailAction } from "../slidebar/send-email"
import Link from "next/link"

export default function ContactPage() {
  const [state, action, isPending] = useActionState(sendEmailAction, null)

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Dark */}
      <div className="flex-1 bg-gray-900 relative flex items-center justify-center p-8 lg:p-16">
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-48 h-48 border border-gray-700 rounded-full border-dashed transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 border border-gray-700 rounded-full border-dashed transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-3/4 w-48 h-48 border border-gray-700 rounded-full border-dashed transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Main text */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight">
            We'd love to hear from you
          </h1>
        </div>
      </div>

      {/* Right Section - Light */}
      <div className="flex-1 bg-gray-100 p-8 lg:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
          <h2 className="text-3xl lg:text-4xl font-light text-gray-800 mb-12">Contact us</h2>

          <form action={action} className="space-y-8">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  First Name *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your First name"
                  required
                  className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-gray-800 placeholder-gray-400 focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Last Name *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  required
                  className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-gray-800 placeholder-gray-400 focus:border-gray-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-gray-800 placeholder-gray-400 focus:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-gray-800 placeholder-gray-400 focus:border-gray-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-600 uppercase tracking-wide">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                rows={4}
                required
                className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-gray-800 placeholder-gray-400 resize-none focus:border-gray-600 focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center text-gray-800 hover:text-gray-600 font-normal text-base group transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Submit"}
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </form>

          {/* Success/Error Message */}
          {state && (
            <div
              className={`mt-6 p-4 rounded-md ${
                state.success
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {state.message}
            </div>
          )}

          {/* Email Contact */}
          <div className="mt-16 pt-8 border-t border-gray-300">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-2">Email Us</p>
            <a href="mailto:kanoonikarwayahi@gmail.com" className="text-gray-800 hover:text-gray-600 transition-colors">
              kanoonikarwayahi@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
