"use client"

import { useState } from "react"

export default function AdminPage() {
  // State for News Data form
  const [newsFormData, setNewsFormData] = useState({
    headline: "",
    description: "",
    content: "",
    date: "",
    image: "",
    category: "",
    readTime: "",
    role: "",
  })
  const [newsResponseMessage, setNewsResponseMessage] = useState("")

  // State for Constitution Data form - Updated to match new structure
  const [constitutionFormData, setConstitutionFormData] = useState({
    name: "",
    alsoKnownAs: "",
    bench: "",
    keyIssue: "",
    "Equivalent citations": "",
    judgment: [""],
    importance: [""],
  })
  const [constitutionMessage, setConstitutionMessage] = useState("")

  // Handlers for News Data form
  const handleNewsChange = (e) => {
    setNewsFormData({ ...newsFormData, [e.target.name]: e.target.value })
  }

  const handleNewsSubmit = async (e) => {
    e.preventDefault()
    setNewsResponseMessage("Submitting...")
    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newsFormData),
    })
    const data = await res.json()
    if (res.ok) {
      setNewsResponseMessage(`Success! Created ID: ${data.createdId}`)
      setNewsFormData({
        headline: "",
        description: "",
        content: "",
        date: "",
        image: "",
        category: "",
        readTime: "",
        role: "",
      })
    } else {
      setNewsResponseMessage(`Error: ${data.message}`)
    }
  }

  // Handlers for Constitution Data form
  const handleConstitutionChange = (e) => {
    setConstitutionFormData({
      ...constitutionFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleJudgmentChange = (index, value) => {
    const updated = [...constitutionFormData.judgment]
    updated[index] = value
    setConstitutionFormData({
      ...constitutionFormData,
      judgment: updated,
    })
  }

  const handleImportanceChange = (index, value) => {
    const updated = [...constitutionFormData.importance]
    updated[index] = value
    setConstitutionFormData({
      ...constitutionFormData,
      importance: updated,
    })
  }

  const addJudgmentField = () => {
    setConstitutionFormData({
      ...constitutionFormData,
      judgment: [...constitutionFormData.judgment, ""],
    })
  }

  const removeJudgmentField = (index) => {
    const updated = constitutionFormData.judgment.filter((_, i) => i !== index)
    setConstitutionFormData({
      ...constitutionFormData,
      judgment: updated,
    })
  }

  const addImportanceField = () => {
    setConstitutionFormData({
      ...constitutionFormData,
      importance: [...constitutionFormData.importance, ""],
    })
  }

  const removeImportanceField = (index) => {
    const updated = constitutionFormData.importance.filter((_, i) => i !== index)
    setConstitutionFormData({
      ...constitutionFormData,
      importance: updated,
    })
  }

  const handleConstitutionSubmit = async (e) => {
    e.preventDefault()
    setConstitutionMessage("Submitting...")

    // Filter out empty judgment and importance entries
    const cleanedData = {
      ...constitutionFormData,
      judgment: constitutionFormData.judgment.filter((item) => item.trim() !== ""),
      importance: constitutionFormData.importance.filter((item) => item.trim() !== ""),
    }

    const res = await fetch("/api/consitution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanedData),
    })
    const result = await res.json()
    if (res.ok) {
      setConstitutionMessage("Constitution case created successfully!")
      setConstitutionFormData({
        name: "",
        alsoKnownAs: "",
        bench: "",
        keyIssue: "",
        "Equivalent citations": "",
        judgment: [""],
        importance: [""],
      })
    } else {
      setConstitutionMessage("Error: " + result.error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* News Data Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create News Data</h2>
            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <div>
                <label htmlFor="headline" className="block text-sm font-medium text-gray-700">
                  Headline:
                </label>
                <input
                  type="text"
                  id="headline"
                  name="headline"
                  value={newsFormData.headline}
                  onChange={handleNewsChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newsFormData.description}
                  onChange={handleNewsChange}
                  required
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content:
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newsFormData.content}
                  onChange={handleNewsChange}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date:
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={newsFormData.date}
                  onChange={handleNewsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL:
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={newsFormData.image}
                  onChange={handleNewsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={newsFormData.category}
                  onChange={handleNewsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="readTime" className="block text-sm font-medium text-gray-700">
                  Read Time:
                </label>
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={newsFormData.readTime}
                  onChange={handleNewsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role:
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={newsFormData.role}
                  onChange={handleNewsChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Create News Data
              </button>
            </form>
            {newsResponseMessage && <p className="mt-4 text-center text-sm text-gray-600">{newsResponseMessage}</p>}
          </div>

          {/* Constitution Data Form - Updated */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Create Constitution Case</h2>
            <form onSubmit={handleConstitutionSubmit} className="space-y-4">
              {/* Case Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Case Name</label>
                <input
                  type="text"
                  name="name"
                  value={constitutionFormData.name}
                  onChange={handleConstitutionChange}
                  placeholder="e.g., Indra Sawhney v. Union of India (1992)"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Also Known As */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Also Known As</label>
                <input
                  type="text"
                  name="alsoKnownAs"
                  value={constitutionFormData.alsoKnownAs}
                  onChange={handleConstitutionChange}
                  placeholder="e.g., Mandal Commission Case"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Bench Composition */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Bench Composition</label>
                <input
                  type="text"
                  name="bench"
                  value={constitutionFormData.bench}
                  onChange={handleConstitutionChange}
                  placeholder="e.g., 13 Judges (largest constitutional bench ever)"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Key Issue */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Key Issue</label>
                <textarea
                  name="keyIssue"
                  value={constitutionFormData.keyIssue}
                  onChange={handleConstitutionChange}
                  placeholder="e.g., Validity of 27% reservation for OBCs in government jobs."
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Equivalent Citations */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Equivalent Citations</label>
                <input
                  type="text"
                  name="Equivalent citations"
                  value={constitutionFormData["Equivalent citations"]}
                  onChange={handleConstitutionChange}
                  placeholder="e.g., AIR 1993 SC 477"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Judgment Array */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Judgment</label>
                  <button
                    type="button"
                    onClick={addJudgmentField}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Add Judgment
                  </button>
                </div>
                {constitutionFormData.judgment.map((judgment, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <textarea
                      value={judgment}
                      onChange={(e) => handleJudgmentChange(index, e.target.value)}
                      placeholder={`Judgment ${index + 1}`}
                      rows={2}
                      className="flex-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    />
                    {constitutionFormData.judgment.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeJudgmentField(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Importance Array */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Legal Importance</label>
                  <button
                    type="button"
                    onClick={addImportanceField}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                  >
                    Add Point
                  </button>
                </div>
                {constitutionFormData.importance.map((importance, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={importance}
                      onChange={(e) => handleImportanceChange(index, e.target.value)}
                      placeholder={`Importance point ${index + 1}`}
                      className="flex-1 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    />
                    {constitutionFormData.importance.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImportanceField(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Create Constitution Case
              </button>
            </form>
            {constitutionMessage && <p className="mt-4 text-center text-sm text-gray-600">{constitutionMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
