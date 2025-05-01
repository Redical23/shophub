"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useModelContext } from "../../context/Context"
import { motion, AnimatePresence } from "framer-motion"
import LAHEAD from "../../slidebar/LAHEAD"
import Footer from "../../slidebar/FOOTER"

export default function BookmarkPage() {
  const { email } = useModelContext()
  const [user, setUser] = useState(null)
  const [bookmarks, setBookmarks] = useState([])
  const [error, setError] = useState(null)
  const decodedEmail = email ? decodeURIComponent(email) : null
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      if (!decodedEmail) return

      try {
        const res = await fetch(`/api/users?email=${decodedEmail}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed to fetch user data")
        setUser(data)
      } catch (error) {
        console.error("Error fetching user:", error.message)
        setError(error.message)
      }
    }

    fetchUserData()
  }, [decodedEmail])

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user?.bookmarks || user.bookmarks.length === 0) return

      try {
        const ids = user.bookmarks.join(",")
        const res = await fetch(`/api/bookmark?ids=${ids}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed to fetch bookmarks")
        const uniqueBookmarks = [...new Map(data.map((item) => [item._id, item])).values()]
        setBookmarks(uniqueBookmarks)
      } catch (error) {
        console.error("Error fetching bookmarks:", error.message)
        setError(error.message)
      }
    }

    fetchBookmarks()
  }, [user])

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#020B2C] to-[#0D1B4A]"
      >
        <div className="text-red-500 p-8 bg-white/10 rounded-lg backdrop-blur-md">{error}</div>
      </motion.div>
    )
  }

  if (!user || bookmarks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#020B2C] to-[#0D1B4A]"
      >
        <div className="text-white/80 p-8 bg-white/10 rounded-lg backdrop-blur-md">
          {!user ? "Loading..." : "No bookmarks found"}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020B2C] to-[#0D1B4A]">
     
      <div className="container flex-col mx-auto px-4 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-white"
        >
          Your Bookmarks
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {bookmarks.map((news, index) => (
              <motion.div
                key={news._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer transform transition-all"
                onClick={() => router.push(`/newsid/${news._id}`)}
              >
                <div className="relative h-[200px] w-full">
                  <Image src={news.image || "/placeholder.svg"} alt={news.headline} layout="fill" objectFit="cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-2">{news.headline}</h2>
                  <p className="text-gray-300 line-clamp-2">{news.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  )
}

