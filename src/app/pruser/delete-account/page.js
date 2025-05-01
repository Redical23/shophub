"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModelContext } from "../../context/Context";

const DeleteAccount = () => {
  const { email } = useModelContext(); // Get user email from context
  const decodedEmail = email ? decodeURIComponent(email) : null;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!decodedEmail) {
      setError("User email not found.");
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmed) return;

    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: decodedEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete account.");
      }

      alert("Account deleted successfully!");
      router.push("/Login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Delete Account</h2>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleDelete}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  );
};

export default DeleteAccount;
