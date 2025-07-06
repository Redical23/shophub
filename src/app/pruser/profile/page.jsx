"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useModelContext } from "../../context/Context";

export default function LawyerProfilePage() {
  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Profile link copied! You can now share this link with others.")
    })
  }

  const { email } = useModelContext(); // Get email from Context
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const decodedEmail = email ? decodeURIComponent(email) : null;
  const router = useRouter();

  const [showFullBio, setShowFullBio] = useState(false);
  const maxBioLength = 300;

  const getDisplayedBio = (bio) => {
    if (!bio) return "No bio available.";
    return showFullBio || bio.length <= maxBioLength
      ? bio
      : `${bio.substring(0, maxBioLength)}...`;
  };

  useEffect(() => {
    // Fetch user data by email
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/users?email=${decodedEmail}`);
        const data = await res.json();

        if (res.ok) {
          setUser(data); // Store the user data in the state
        } else {
          setError(data.error); // Handle errors
        }
      } catch (error) {
        setError("Failed to fetch user data");
      }
    };

    if (email) {
      fetchUserData(); // Fetch user data when email is available
    }
  }, [email]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00103a] to-[#001f5c]">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-[#001f5c] to-[#003366] text-white p-6">
            <div className="flex justify-end space-x-2 mb-4">
              <button
                onClick={() => router.push("/pruser/editprofile")}
                className="p-2 border rounded bg-white text-[#001f5c] hover:bg-[#f0f4f8] transition duration-300"
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={() => handleShareProfile()}
                className="p-2 border rounded bg-white text-[#001f5c] hover:bg-[#f0f4f8] transition duration-300"
              >
                📤 Share Profile
              </button>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-[200px] h-[200px] border-4 border-white shadow-lg rounded-full overflow-hidden flex-shrink-0">
  <Image
    src={user.avatar || "/placeholder.svg"}
    alt={user.name}
    width={200}
    height={200}
    className="w-full h-full object-cover"
  />
</div>

              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">{user.name || "Name Not Provided"}</h2>
                <p className="text-xl text-[#a0c8ff]">{user.title || "Title Not Provided"}</p>
                <p className="mt-2 text-sm text-[#d0e0ff]">
                  {getDisplayedBio(user.bio)}
                  {user.bio && user.bio.length > maxBioLength && (
                    <button
                      onClick={() => setShowFullBio(!showFullBio)}
                      className="text-blue-300 hover:underline ml-2"
                    >
                      {showFullBio ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4">📍</span>
                    <span>{user.location || "Location Not Provided"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4">📞</span>
                    <span>{user.phone || "Phone Not Provided"}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-4 h-4">✉️</span>
                    <a href={`mailto:${user.email}`} className="hover:underline">
                      {user.email || "Email Not Provided"}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center text-[#001f5c]">
                  <span className="w-6 h-6 mr-2">📚</span>
                  Education
                </h2>
                
                <ul className="space-y-2">
                  {user.education.map((edu, index) => (
                    <li key={index}>
                      <p className="font-semibold">{edu.degree || "Degree Not Provided"}</p>
                      <p className="text-sm text-gray-600">
                        {edu.institution || "Institution Not Provided"}, {edu.year || "Year Not Provided"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center text-[#001f5c]">
                  <span className="w-6 h-6 mr-2">⚖️</span>
                  Bar Admissions
                </h2>
                <ul className="list-disc list-inside">
                  {user.barAdmissions.length > 0 ? (
                    user.barAdmissions.map((admission, index) => (
                      <li key={index}>{admission || "Not Provided"}</li>
                    ))
                  ) : (
                    <li>No bar admissions listed</li>
                  )}
                </ul>
                <ul className="space-y-2">
  <li>
    <p className="font-semibold">Firm</p>
    <p className="text-sm text-gray-600">
      {user.firm || "Firm Not Provided"}
    </p>
  </li>
</ul>

              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4 text-[#001f5c]">Areas of Practice</h2>
              <div className="flex flex-wrap gap-2">
                {user.areasOfPractice.length > 0 ? (
                  user.areasOfPractice.map((area, index) => (
                    <span key={index} className="bg-[#001f5c] text-white px-3 py-1 rounded-full text-sm">
                      {area || "Area Not Provided"}
                    </span>
                  ))
                ) : (
                  <span>No areas of practice listed</span>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-[#001f5c]">
                <span className="w-6 h-6 mr-2">🏆</span>
                Awards and Recognitions
              </h2>
              <ul className="list-disc list-inside">
                {user.awards.length > 0 ? (
                  user.awards.map((award, index) => (
                    <li key={index}>{award || "Award Not Provided"}</li>
                  ))
                ) : (
                  <li>No awards listed</li>
                )}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4 text-[#001f5c]">Recent Notable Cases</h2>
              <div className="space-y-4">
                {user.recentCases.length > 0 ? (
                  user.recentCases.map((caseItem, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                      <h3 className="font-semibold text-[#001f5c]">{caseItem.title || "Title Not Provided"}</h3>
                      <p className="text-sm text-gray-600">
                        {caseItem.year || "Year Not Provided"}
                      </p>
                      <p className="mt-1">{caseItem.outcome || "Outcome Not Provided"}</p>
                    </div>
                  ))
                ) : (
                  <p>No recent cases listed</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4 text-[#001f5c]">Recent Publications</h2>
              <ul className="space-y-2">
                {user.publications.length > 0 ? (
                  user.publications.map((pub, index) => (
                    <li key={index} className="border-b border-gray-200 pb-2">
                      <p className="font-semibold text-[#001f5c]">{pub.title || "Title Not Provided"}</p>
                      <p className="text-sm text-gray-600">
                        {pub.journal || "Journal Not Provided"}, {pub.year || "Year Not Provided"}
                      </p>
                    </li>
                  ))
                ) : (
                  <p>No publications listed</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
