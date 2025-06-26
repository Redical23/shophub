import dbConnect from "../../lib/dbConnect";
import constitution from "../../models/Consitutution";

export async function GET(req) {
  await dbConnect();

  try {
    const news = await  constitution.find({});
    
    return new Response(JSON.stringify(news), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch news' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  await dbConnect()

  try {
    const body = await req.json()

    console.log("POST request body:", body)

    // Validate required fields
    if (!body.name) {
      return new Response(JSON.stringify({ error: "Case name is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Try multiple times with different applicationNo values if there are duplicates
    let attempts = 0
    let newDocument = null
    const maxAttempts = 5

    while (attempts < maxAttempts && !newDocument) {
      try {
        // Generate a unique applicationNo to satisfy the database constraint
        const timestamp = Date.now()
        const randomSuffix = Math.floor(Math.random() * 10000)
        const attemptSuffix = attempts > 0 ? `-${attempts}` : ""
        const uniqueApplicationNo = `CONST-${timestamp}-${randomSuffix}${attemptSuffix}`

        // Ensure arrays are properly formatted and include applicationNo
        const constitutionData = {
          applicationNo: uniqueApplicationNo,
          name: body.name,
          alsoKnownAs: body.alsoKnownAs || "",
          bench: body.bench || "",
          keyIssue: body.keyIssue || "",
          "Equivalent citations": body["Equivalent citations"] || "",
          judgment: Array.isArray(body.judgment) ? body.judgment.filter((item) => item && item.trim() !== "") : [],
          importance: Array.isArray(body.importance)
            ? body.importance.filter((item) => item && item.trim() !== "")
            : [],
          // Add any other fields that might be required by your schema
          fileddate: new Date().toISOString().split("T")[0], // Add current date as default
          courtNo: "N/A", // Add default values for any other required fields
          inWhichCourt: "Supreme Court", // Default court
        }

        console.log(`Attempt ${attempts + 1} - Processed constitution data:`, constitutionData)

        newDocument = await constitution.create(constitutionData)

        console.log("Document created successfully:", newDocument)
        break
      } catch (createError) {
        if (createError.code === 11000 && attempts < maxAttempts - 1) {
          console.log(`Duplicate key error on attempt ${attempts + 1}, retrying...`)
          attempts++
          // Wait a small amount before retrying
          await new Promise((resolve) => setTimeout(resolve, 100))
        } else {
          throw createError
        }
      }
    }

    if (!newDocument) {
      throw new Error("Failed to create document after multiple attempts")
    }

    return new Response(JSON.stringify(newDocument), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("POST error:", error)
    return new Response(JSON.stringify({ error: "Failed to create document", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function DELETE(req) {
  await dbConnect()

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return new Response(JSON.stringify({ error: "Document ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const deletedDocument = await constitution.findByIdAndDelete(id)

    if (!deletedDocument) {
      return new Response(JSON.stringify({ error: "Document not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ message: "Document deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete document", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

export async function PUT(req) {
  await dbConnect()

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    const body = await req.json()

    console.log("PUT request body:", body)

    if (!id) {
      return new Response(JSON.stringify({ error: "Document ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Map the fields to match your schema
    const updateData = {
      name: body.name,
      alsoKnownAs: body.alsoKnownAs,
      bench: body.bench,
      keyIssue: body.keyIssue,
      "Equivalent citations": body.Equivalentcitations, // Map to schema field name
      judgment: body.judgment,
      Importance: Array.isArray(body.importance) ? body.importance : [], // Map to schema field name
      equivalentCitations: body.equivalentCitations
    }

    console.log("Update data being sent to DB:", updateData)

    const updatedDocument = await constitution.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!updatedDocument) {
      return new Response(JSON.stringify({ error: "Document not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("Document updated successfully:", updatedDocument)

    return new Response(JSON.stringify(updatedDocument), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("PUT error:", error)
    return new Response(JSON.stringify({ error: "Failed to update document", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}