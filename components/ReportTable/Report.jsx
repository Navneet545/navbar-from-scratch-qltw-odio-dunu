"use client";
import React from "react";

export default function ReportTable() {
  // ✅ Dummy Data (10 rows)
  const data = [
    { name: "John Doe", email: "john@example.com", profile: "Athlete", image: "https://via.placeholder.com/50" },
    { name: "Sarah Smith", email: "sarah@example.com", profile: "Coach", image: "https://via.placeholder.com/50" },
    { name: "Michael Johnson", email: "michael@example.com", profile: "Volunteer", image: "https://via.placeholder.com/50" },
    { name: "Jessica Brown", email: "jessica@example.com", profile: "Donor", image: "https://via.placeholder.com/50" },
    { name: "David Williams", email: "david@example.com", profile: "Athlete", image: "https://via.placeholder.com/50" },
    { name: "Emily Davis", email: "emily@example.com", profile: "Coach", image: "https://via.placeholder.com/50" },
    { name: "Chris Miller", email: "chris@example.com", profile: "Volunteer", image: "https://via.placeholder.com/50" },
    { name: "Sophia Wilson", email: "sophia@example.com", profile: "Donor", image: "https://via.placeholder.com/50" },
    { name: "Daniel Martin", email: "daniel@example.com", profile: "Athlete", image: "https://via.placeholder.com/50" },
    { name: "Olivia Taylor", email: "olivia@example.com", profile: "Coach", image: "https://via.placeholder.com/50" },
  ];

  return (
    <div
      className="w-full p-4 overflow-x-auto rounded-lg shadow-md"
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
        border: "1px solid var(--border-color)",
        boxShadow: "0 0 8px 2px var(--shadow-color)",
      }}
    >
      <h2 className="text-lg font-semibold mb-3">User Report</h2>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr
            style={{ background: "var(--color-secondary)", color: "var(--color-on-secondary)" }}
          >
            <th className="border border-[var(--border-color)] p-2 text-left">Name</th>
            <th className="border border-[var(--border-color)] p-2 text-left">Email</th>
            <th className="border border-[var(--border-color)] p-2 text-left">Profile</th>
            <th className="border border-[var(--border-color)] p-2 text-left">Image</th>
            <th className="border border-[var(--border-color)] p-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user, index) => (
            <tr key={index} className="hover:bg-[var(--hover-color)] transition">
              <td className="border border-[var(--border-color)] p-2">{user.name}</td>
              <td className="border border-[var(--border-color)] p-2">{user.email}</td>
              <td className="border border-[var(--border-color)] p-2">{user.profile}</td>
              <td className="border border-[var(--border-color)] p-2">
                <img
                  src={user.image}
                  alt="User"
                  className="h-10 w-10 rounded object-cover border border-[var(--border-color)]"
                />
              </td>
              <td className="border border-[var(--border-color)] p-2 text-center">
                <button
                  className="px-3 py-1 rounded bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary-hover)] transition"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
