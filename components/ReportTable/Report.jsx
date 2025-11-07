"use client";
import React from "react";
import Image from "next/image";

// Import local image assets
import profile1 from "@/public/profileImage.png";
import profile2 from "@/public/profile.png";

export default function ReportTable() {
  // ✅ Dummy Data WITH unique IDs
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", profile: "Athlete", image: profile1 },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", profile: "Coach", image: profile2 },
    { id: 3, name: "Michael Johnson", email: "michael@example.com", profile: "Volunteer", image: profile1 },
    { id: 4, name: "Jessica Brown", email: "jessica@example.com", profile: "Donor", image: profile1 },
    { id: 5, name: "David Williams", email: "david@example.com", profile: "Athlete", image: profile2 },
    { id: 6, name: "Emily Davis", email: "emily@example.com", profile: "Coach", image: profile1 },
    { id: 7, name: "Chris Miller", email: "chris@example.com", profile: "Volunteer", image: profile2 },
    { id: 8, name: "Sophia Wilson", email: "sophia@example.com", profile: "Donor", image: profile2 },
    { id: 9, name: "Daniel Martin", email: "daniel@example.com", profile: "Athlete", image: profile1 },
    { id: 10, name: "Olivia Taylor", email: "olivia@example.com", profile: "Coach", image: profile2 },
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
            <th className="border border-[var(--border-color)] p-2 text-center">Name</th>
            <th className="border border-[var(--border-color)] p-2 text-center">Email</th>
            <th className="border border-[var(--border-color)] p-2 text-center">Profile</th>
            <th className="border border-[var(--border-color)] p-2 text-center">Image</th>
            <th className="border border-[var(--border-color)] p-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="hover:bg-[var(--hover-color)] transition">
              <td className="border border-[var(--border-color)] p-2 text-center">{user.name}</td>
              <td className="border border-[var(--border-color)] p-2 text-center">{user.email}</td>
              <td className="border border-[var(--border-color)] p-2 text-center">{user.profile}</td>

              <td className="border border-[var(--border-color)] p-2 flex justify-center items-center">
                <div className="h-10 w-10 rounded overflow-hidden border border-[var(--border-color)]">
                  {typeof user.image === "string" ? (
                    <Image src={user.image} alt="User" width={40} height={40} />
                  ) : (
                    <Image
                      src={user.image}
                      alt="User"
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded border border-[var(--border-color)]"
                    />
                  )}
                </div>
              </td>

              <td className="border border-[var(--border-color)] p-2 text-center">
                <button className="px-3 py-1 rounded bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary-hover)] transition">
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
