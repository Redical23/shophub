"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Footer from "../../../slidebar/FOOTER"
import { useModelContext } from "../../../context/Context"

export default function ConstitutionDetailClient({ userData }) {
  const { email } = useModelContext()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(userData || {})
  const [loading, setLoading] = useState(false)

  console.log(userData, "userData details")

  // Check admin status
  useEffect(() => {
    if (email) {
      fetch(`/api/users?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("User data:", data)
          setIsAdmin(data.admin)
        })
        .catch((err) => console.error(err))
    }
  }, [email])

  // Update editData when userData changes
  useEffect(() => {
    if (userData) {
      console.log("Setting editData from userData:", userData)
      setEditData({ ...userData })
    }
  }, [userData])

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/consitution?id=${userData._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        alert("Document deleted successfully!")
        router.push("/constitution")
      } else {
        const error = await response.json()
        alert(`Failed to delete document: ${error.error}`)
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("An error occurred while deleting the document.")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    console.log("Saving editData:", editData)
    setLoading(true)
    try {
      const response = await fetch(`/api/consitution?id=${userData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      })

      console.log("Response status:", response.status)

      if (response.ok) {
        const result = await response.json()
        console.log("Save successful:", result)
        alert("Document updated successfully!")
        setIsEditing(false)
        // Instead of reloading, update the userData prop or refetch
        window.location.reload()
      } else {
        const error = await response.json()
        console.error("Save failed:", error)
        alert(`Failed to update document: ${error.error}`)
      }
    } catch (error) {
      console.error("Update error:", error)
      alert("An error occurred while updating the document.")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    console.log("Canceling edit, resetting to:", userData)
    setEditData({ ...userData })
    setIsEditing(false)
  }

  const handleInputChange = (field, value) => {
    console.log(`Updating field: ${field} with value:`, value)
    setEditData((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      }
      console.log("Updated editData:", updated)
      return updated
    })
  }

  const handleImportanceChange = (index, value) => {
    const updated = [...(editData.importance || [])]
    updated[index] = value
    handleInputChange("importance", updated)
  }

  const addJudgmentItem = () => {
    const updated = [...(editData.judgment || []), ""]
    handleInputChange("judgment", updated)
  }

  const removeJudgmentItem = (index) => {
    const updated = (editData.judgment || []).filter((_, i) => i !== index)
    handleInputChange("judgment", updated)
  }

  const addImportanceItem = () => {
    const updated = [...(editData.importance || []), ""]
    handleInputChange("importance", updated)
  }

  const removeImportanceItem = (index) => {
    const updated = (editData.importance || []).filter((_, i) => i !== index)
    handleInputChange("importance", updated)
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Document Not Found</h1>
          <p className="text-lg text-slate-300">The legal document you're looking for does not exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-slate-800 text-white p-6 sm:p-8">
              <div className="flex justify-between items-start">
                <div className="space-y-4">
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-slate-700 text-white px-2 py-1 rounded border border-slate-600 w-full"
                        placeholder="Case Name"
                      />
                    ) : (
                      userData.name || "Case Name"
                    )}
                  </h1>
                  {userData.alsoKnownAs && (
                    <p className="text-slate-300 text-lg">
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.alsoKnownAs || ""}
                          onChange={(e) => handleInputChange("alsoKnownAs", e.target.value)}
                          className="bg-slate-700 text-white px-2 py-1 rounded border border-slate-600"
                          placeholder="Also Known As"
                        />
                      ) : (
                        userData.alsoKnownAs
                      )}
                    </p>
                  )}
                 {(userData["Equivalent citations"] || editData["Equivalent citations"] || isEditing) && (
                    <p className="text-slate-300 text-lg">
                      <span className="font-semibold">Equivalent Citations: </span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData["Equivalent citations"] || ""}
                          onChange={(e) => handleInputChange("Equivalent citations", e.target.value)}
                          className="bg-slate-700 text-white px-2 py-1 rounded border border-slate-600 ml-2"
                          placeholder="e.g., AIR 1993 SC 477"
                        />
                      ) : (
                        editData["Equivalent citations"] || userData["Equivalent citations"]
                      )}
                    </p>
                  )}
                </div>

                {/* Admin Action Buttons */}
                {isAdmin && (
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={handleCancel}
                          disabled={loading}
                          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleEdit}
                          disabled={loading}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDelete}
                          disabled={loading}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                          {loading ? "Deleting..." : "Delete"}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Case Details Section */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Case Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-700 mb-2">Bench Composition</h3>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.bench || ""}
                        onChange={(e) => handleInputChange("bench", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-slate-600">{userData.bench || "N/A"}</p>
                    )}
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-slate-700 mb-2">Key Issue</h3>
                    {isEditing ? (
                      <textarea
                        value={editData.keyIssue || ""}
                        onChange={(e) => handleInputChange("keyIssue", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    ) : (
                      <p className="text-slate-600">{userData.keyIssue || "N/A"}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Judgment Section */}
              {userData.judgment && Array.isArray(userData.judgment) && (
                <section className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Judgment</h2>
                    {isEditing && (
                      <button
                        onClick={addJudgmentItem}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Add Judgment
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {(isEditing ? editData.judgment || [] : userData.judgment).map((item, index) => (
                      <div key={index} className="bg-slate-50 p-4 rounded-lg relative">
                        {isEditing && (
                          <button
                            onClick={() => removeJudgmentItem(index)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                          >
                            ×
                          </button>
                        )}
                        {isEditing ? (
                          <textarea
                            value={item || ""}
                            onChange={(e) => {
                              const updated = [...(editData.judgment || [])]
                              updated[index] = e.target.value
                              handleInputChange("judgment", updated)
                            }}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            placeholder="Enter judgment text"
                          />
                        ) : (
                          <p className="text-base text-slate-700">{item}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Importance Section */}
              {userData.Importance && Array.isArray(userData. Importance) && (
                  <section className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Legal Importance</h2>
                      {isEditing && (
                        <button
                          onClick={addImportanceItem}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Add Point
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      {(isEditing ? editData.Importance || [] : userData. Importance).map((item, index) => (
                          <div key={index} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 relative">
                            {isEditing && (
                              <button
                                onClick={() => removeImportanceItem(index)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                              >
                                ×
                              </button>
                            )}
                            {isEditing ? (
                              <input
                                type="text"
                                value={item || ""}
                                onChange={(e) => handleImportanceChange(index, e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            ) : (
                              <p className="text-slate-700">{item}</p>
                            )}
                          </div>
                        ))}
                    </div>
                  </section>
                )}

              {/* Equivalent Citations Section */}
              {userData.equivalentCitations && Array.isArray(userData.equivalentCitations) && (
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Equivalent Citations</h2>
                  <div className="space-y-4">
                    {userData.equivalentCitations.map((citation, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                        <div className="space-y-2">
                          <p>
                            <span className="font-semibold">Also Known As:</span> {citation.alsoKnownAs}
                          </p>
                          <p>
                            <span className="font-semibold">Bench:</span> {citation.bench}
                          </p>
                          {citation.judgment &&
                            citation.judgment.map((judgment, jIndex) => (
                              <div key={jIndex} className="ml-4 p-2 bg-white rounded border-l-2 border-gray-300">
                                <p>
                                  <span className="font-semibold">Key Issue:</span> {judgment.keyIssue}
                                </p>
                                <p>
                                  <span className="font-semibold">Case Name:</span> {judgment.name}
                                </p>
                              </div>
                            ))}
                          {citation.Importance && (
                            <div className="ml-4">
                              <p className="font-semibold">Importance:</p>
                              <ul className="list-disc list-inside ml-2">
                                {citation.Importance.map((imp, iIndex) => (
                                  <li key={iIndex} className="text-slate-600">
                                    {imp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
