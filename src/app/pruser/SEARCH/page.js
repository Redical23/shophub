"use client"
import { useState, useEffect } from "react"
import { useModelContext } from "../../context/Context"
import Footer from "../../slidebar/FOOTER"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function SearchPage() {
  const [lawyers, setLawyers] = useState([])
  const [news, setNews] = useState([])
  const [constitution, setConstitution] = useState([])
  const [cases, setCases] = useState([]) // <-- added
  const [isLoading, setIsLoading] = useState(true)
  const { searchterm } = useModelContext()
  const [filteredLawyers, setFilteredLawyers] = useState([])
  const [filteredNews, setFilteredNews] = useState([])
  const [filteredConstitution, setFilteredConstitution] = useState([])
  const [filteredCases, setFilteredCases] = useState([]) // <-- added

  // Fetch all data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        // Fetch lawyers data
        const lawyersResponse = await fetch("/api/laywers", { cache: "no-store" })
        const lawyersData = await lawyersResponse.json()
        const allLawyers = lawyersData.users || lawyersData
        setLawyers(allLawyers.filter((user) => user.islaywer === true))

        // Fetch news data
        const newsResponse = await fetch("/api/news")
        const newsData = await newsResponse.json()
        setNews(newsData)

        // Fetch constitution data
        const constitutionResponse = await fetch("/api/consitution")
        const constitutionData = await constitutionResponse.json()
        setConstitution(constitutionData)

        // Fetch cases data
        const casesResponse = await fetch("/api/cases") // <-- added
        const casesData = await casesResponse.json()
        setCases(casesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter data based on search term
  useEffect(() => {
    if (searchterm && searchterm.length > 1) {
      // Filter lawyers
      const matchedLawyers = lawyers.filter((lawyer) => lawyer.name?.toLowerCase().includes(searchterm.toLowerCase()))
      setFilteredLawyers(matchedLawyers)

      // Filter news
      const matchedNews = news.filter(
        (newsItem) =>
          newsItem.headline?.toLowerCase().includes(searchterm.toLowerCase()) ||
          newsItem.content?.toLowerCase().includes(searchterm.toLowerCase()),
      )
      setFilteredNews(matchedNews)

      // Filter constitution
      const matchedConstitution = constitution.filter(
        (item) =>
         item.name?.toLowerCase().includes(searchterm.toLowerCase()) ||
item.bench?.toLowerCase().includes(searchterm.toLowerCase()) ||
item.alsoKnownAs?.toLowerCase().includes(searchterm.toLowerCase()) ||
item.keyIssue?.toLowerCase().includes(searchterm.toLowerCase()) ||
item.judgment?.some(j => j?.toLowerCase().includes(searchterm.toLowerCase())) ||
item.Importance?.some(i => i?.toLowerCase().includes(searchterm.toLowerCase())) ||
item["Equivalent citations"]?.toLowerCase().includes(searchterm.toLowerCase()) ||
item.filedate?.toLowerCase().includes(searchterm.toLowerCase()) ||
item.courtNo?.toLowerCase().includes(searchterm.toLowerCase()) ||
item.inWhichCourt?.toLowerCase().includes(searchterm.toLowerCase()) ||
item.caseType?.toLowerCase().includes(searchterm.toLowerCase())

      )
      setFilteredConstitution(matchedConstitution)

      // Filter cases
      const matchedCases = cases.filter(
        (item) =>
          item.applicationNo?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.applicant?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.oppositeParty?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.counselForApplicant?.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.Delivereddate?.toLowerCase().includes(searchterm.toLowerCase()),
      )
      setFilteredCases(matchedCases)
    } else {
      setFilteredLawyers([])
      setFilteredNews([])
      setFilteredConstitution([])
      setFilteredCases([])
    }
  }, [searchterm, lawyers, news, constitution, cases])

  return (
 <div className="text-center text-lg font-semibold text-blue-600 bg-gray-100 p-4 rounded-lg shadow-md">
  searching
</div>

  )
}
