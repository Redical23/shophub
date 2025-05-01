"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useModelContext } from "../../context/Context";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const Page = () => {
  const { isModelOpen, updateAvtarURL, setIsModelOpen, email } = useModelContext();
  const decodedEmail = email ? decodeURIComponent(email) : null;
  const router = useRouter();
  const allAreas = ["Corporate Law", "Immigration Law", "Family Law", "Criminal Law", "Tax Law"]; // Predefined tags

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    title: "",
    avatar: "",
    bio: "",
    firm: "",
    location: "",
    phone: "",
    charge: "", // Added charge
    yearsexp: "", // Added yearsexp
    email: decodedEmail,
    education: [{ degree: "", institution: "", year: "" }],
    barAdmissions: [],
    areasOfPractice: [],
    awards: [],
    recentCases: [{ title: "", year: "", outcome: "" }],
    publications: [{ title: "", journal: "", year: "" }],
  });

  const toggleTag = (area) => {
    setFormData((prevData) => {
      const isSelected = prevData.areasOfPractice.includes(area);
      return {
        ...prevData,
        areasOfPractice: isSelected
          ? prevData.areasOfPractice.filter((a) => a !== area) // Remove if already selected
          : [...prevData.areasOfPractice, area], // Add if not selected
      };
    });
  };

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users?email=${decodedEmail}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data);
          // Pre-populate form with user data
          setFormData((prev) => ({
            ...prev,
            ...data,
          }));
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError("Failed to fetch user data");
      } finally {
        setIsLoading(false);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  useEffect(() => {
    if (updateAvtarURL) {
      setFormData((prev) => ({
        ...prev,
        avatar: updateAvtarURL,
      }));
    }
  }, [updateAvtarURL]);

  const handleAvatarClick = () => {
    setIsModelOpen(!isModelOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, subfield = null) => (e) => {
    const { value } = e.target;
    setFormData((prev) => {
      const newArray = [...prev[field]];
      if (subfield) {
        newArray[index] = { ...newArray[index], [subfield]: value };
      } else {
        newArray[index] = value;
      }
      return { ...prev, [field]: newArray };
    });
  };

  const handleAddArrayItem = (field) => () => {
    setFormData((prev) => {
      const newItem =
        field === "education"
          ? { degree: "", institution: "", year: "" }
          : field === "recentCases"
          ? { title: "", year: "", outcome: "" }
          : field === "publications"
          ? { title: "", journal: "", year: "" }
          : "";
      return { ...prev, [field]: [...prev[field], newItem] };
    });
  };

  const handleRemoveArrayItem = (field, index) => () => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dataToSend = {
        ...formData,
        education: JSON.stringify(formData.education),
        recentCases: JSON.stringify(formData.recentCases),
        publications: JSON.stringify(formData.publications),
        barAdmissions: JSON.stringify(formData.barAdmissions),
        areasOfPractice: JSON.stringify(formData.areasOfPractice),
        awards: JSON.stringify(formData.awards),
      };

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await res.json();

      if (res.ok) {
        router.push("/pruser/profile");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const defaultAvatar = "/placeholder.svg?height=400&width=300";
  const avatarToShow = updateAvtarURL || user?.avatar || defaultAvatar;
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 shadow-lg">
              <Image
                onClick={handleAvatarClick}
                src={avatarToShow}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
                width={120}
                height={120}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{formData.name}</h2>
              <p className="text-blue-100">{formData.title}</p>
            </div>
          </div>
        </div>
        <form className="space-y-6 p-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          {/* New Username field */}
          <div className="space-y-2 mt-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Charge (in INR)</label>
            <input
              type="number"
              name="charge"
              value={formData.charge}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
            <input
              type="number"
              name="yearsexp"
              value={formData.yearsexp}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firm" className="block text-sm font-medium text-gray-700">
                Firm
              </label>
              <input
                id="firm"
                name="firm"
                type="text"
                value={formData.firm}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Education</label>
            {formData.education.map((edu, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={handleArrayChange(index, "education", "degree")}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <input
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={handleArrayChange(index, "education", "institution")}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <input
                  placeholder="Year"
                  value={edu.year}
                  onChange={handleArrayChange(index, "education", "year")}
                  className="w-24 p-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={handleRemoveArrayItem("education", index)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddArrayItem("education")}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Add Education
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Bar Admissions</label>
            {formData.barAdmissions.map((admission, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  value={admission}
                  onChange={handleArrayChange(index, "barAdmissions")}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={handleRemoveArrayItem("barAdmissions", index)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddArrayItem("barAdmissions")}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Add Bar Admission
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Areas of Practice
            </label>
            <div className="flex flex-wrap gap-2">
              {allAreas.map((area, index) => {
                const isSelected = formData.areasOfPractice.includes(area);
                return (
                  <div
                    key={index}
                    className={`cursor-pointer px-3 py-1 rounded-full border ${
                      isSelected
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-gray-200 text-gray-700 border-gray-300"
                    }`}
                    onClick={() => toggleTag(area)}
                  >
                    {area}
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <strong>Selected Areas:</strong>{" "}
              {formData.areasOfPractice.length > 0 ? (
                formData.areasOfPractice.join(", ")
              ) : (
                <span className="text-gray-500">None selected</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Awards</label>
            {formData.awards.map((award, index) => (
              <div key={index} className="flex space-x-2">
                <input
                  value={award}
                  onChange={handleArrayChange(index, "awards")}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={handleRemoveArrayItem("awards", index)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddArrayItem("awards")} className="p-2 bg-blue-500 text-white rounded">
              Add Award
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Recent Notable Cases</label>
            {formData.recentCases.map((caseItem, index) => (
              <div key={index} className="space-y-2 p-4 border border-gray-200 rounded">
                <input
                  placeholder="Case Title"
                  value={caseItem.title}
                  onChange={handleArrayChange(index, "recentCases", "title")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  placeholder="Year"
                  value={caseItem.year}
                  onChange={handleArrayChange(index, "recentCases", "year")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  placeholder="Outcome"
                  value={caseItem.outcome}
                  onChange={handleArrayChange(index, "recentCases", "outcome")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={handleRemoveArrayItem("recentCases", index)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Remove Case
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddArrayItem("recentCases")}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Add Case
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Recent Publications</label>
            {formData.publications.map((publication, index) => (
              <div key={index} className="space-y-2 p-4 border border-gray-200 rounded">
                <input
                  placeholder="Publication Title"
                  value={publication.title}
                  onChange={handleArrayChange(index, "publications", "title")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  placeholder="Journal"
                  value={publication.journal}
                  onChange={handleArrayChange(index, "publications", "journal")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  placeholder="Year"
                  value={publication.year}
                  onChange={handleArrayChange(index, "publications", "year")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="button"
                  onClick={handleRemoveArrayItem("publications", index)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Remove Publication
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddArrayItem("publications")}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Add Publication
            </button>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push("/pruser/profile")}
              className="p-2 border border-gray-300 rounded bg-white text-gray-700"
            >
              Cancel
            </button>
            <button type="submit" className="p-2 border border-gray-300 rounded bg-blue-600 text-white">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
