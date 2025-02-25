import { MongoClient, ObjectId } from "mongodb"
import LAHEAD from "../../slidebar/LAHEAD"
import Footer from "../../slidebar/FOOTER"
async function getUserData(id) {
  const client = await MongoClient.connect(process.env.MONGODB_URI)
  const db = client.db()

  let user
  try {
    user = await db.collection("constitutions").findOne({ _id: new ObjectId(id) })
  } catch (error) {
    console.error("Invalid ObjectId:", error)
    return null
  } finally {
    await client.close()
  }

  return user
}

export default async function ConstitutionDetailPage({ params }) {
  const { id } = params
  const userData = await getUserData(id)

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
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl font-bold">Application No: {userData.applicationNo}</h1>
              <p className="text-slate-300">Filed on: {userData.fileddate || "N/A"}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Court Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Court Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Court No</p>
                  <p className="text-base font-medium">{userData.courtNo || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Delivered Date</p>
                  <p className="text-base font-medium">{userData.Delivereddate || "N/A"}</p>
                </div>
              </div>
            </section>

            {/* Parties Information */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Parties Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-500">Applicant</p>
                  <p className="text-base font-medium">{userData.applicant || "N/A"}</p>
                  <p className="text-sm text-slate-500 mt-2">Counsel</p>
                  <p className="text-base font-medium">{userData.counselForApplicant || "N/A"}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-500">Opposite Party</p>
                  <p className="text-base font-medium">{userData.oppositeParty || "N/A"}</p>
                  <p className="text-sm text-slate-500 mt-2">Counsel</p>
                  <p className="text-base font-medium">
                    {Array.isArray(userData.counselForOppositeParty)
                      ? userData.counselForOppositeParty.join(", ")
                      : userData.counselForOppositeParty || "N/A"}
                  </p>
                </div>
              </div>
            </section>

            {/* Citations */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Citations</h2>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-500">Equivalent Citations</p>
                <p className="text-base font-medium">
                  {Array.isArray(userData["Equivalent citations"])
                    ? userData["Equivalent citations"].join(", ")
                    : userData["Equivalent citations"] || "N/A"}
                </p>
              </div>
            </section>

            {/* Full Details Section */}
            {userData.fulldetails && Array.isArray(userData.fulldetails) && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">Full Details</h2>
                <div className="space-y-4">
                  {userData.fulldetails.map((detail, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg">
                      <p className="text-base">{detail}</p>
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

