import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Passwordchange() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`/api/users/${id}/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to change password");

      setSuccess("Password updated successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Change Password
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Current Password</label>
          <input
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            type="password"
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter current password"
          />

          <label className="block mb-2 font-medium">New Password</label>
          <input
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            type="password"
            className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
          />

          {error && <div className="text-red-500 mb-3">{error}</div>}
          {success && <div className="text-green-600 mb-3">{success}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
