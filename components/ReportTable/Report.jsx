"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";

import profile1 from "@/public/profileImage.png";
import profile2 from "@/public/profile.png";

export default function AdvancedReportTable() {
  const [search, setSearch] = useState("");

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

  const profileColors = {
    Athlete: "bg-blue-500/20 text-blue-600",
    Coach: "bg-green-500/20 text-green-600",
    Donor: "bg-purple-500/20 text-purple-600",
    Volunteer: "bg-orange-500/20 text-orange-600",
  };

  const filteredData = data.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="w-full p-5 rounded-xl backdrop-blur-md"
      style={{
        background: "var(--background)",
        border: "1px solid var(--border-color)",
        boxShadow: "0px 4px 18px var(--shadow-color)",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold tracking-wide">Donor Report</h2>

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--background)] focus:ring-2 focus:ring-[var(--color-secondary)] focus:outline-none transition-all shadow-sm"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-[var(--border-color)]">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr
              className="text-xs"
              style={{
                background: "linear-gradient(90deg, var(--color-secondary), var(--color-secondary-hover))",
                color: "var(--color-on-secondary)",
              }}
            >
              <th className="p-3 text-left text-[15px]">Name</th>
              <th className="p-3 text-left text-[15px]">Email</th>
              <th className="p-3 text-center text-[15px]">Profile</th>
              <th className="p-3 text-center text-[15px]">Amount</th>
              <th className="p-3 text-center text-[15px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((user) => (
              <tr
                key={user.id}
                className="group transition rounded-lg hover:bg-[var(--hover-bg)]
                hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                hover:translate-y-[1px] duration-200"
                style={{ boxShadow: "inset 0 -0.2px 0 var(--border-color)" }}
              >
                {/* ✅ IMAGE + NAME */}
                <td className="p-3 text-left flex items-left gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden border border-[var(--border-color)] shadow-sm transition group-hover:ring-2 group-hover:ring-[var(--color-secondary)] group-hover:scale-110">
                    <Image 
                      src={user.image}
                      alt="User"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="font-medium group-hover:text-[var(--color-secondary)] hover:scale-[1.03] transition cursor-pointer">
                    {user.name}
                  </span>
                </td>

                {/* EMAIL */}
                <td className="p-3 text-left opacity-80 group-hover:text-[var(--color-secondary)] hover:opacity-100 hover:scale-[1.03] cursor-pointer transition">
                  {user.email}
                </td>

                {/* PROFILE */}
                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium transition group-hover:shadow ${profileColors[user.profile]}`}
                  >
                    {user.profile}
                  </span>
                </td>

                {/* ✅ DONATION AMOUNT COLUMN */}
                <td className="p-3 text-center font-semibold text-green-600 group-hover:text-green-700">
                  ₹{(Math.random() * 5000 + 500).toFixed(0)} {/* fake random donation */}
                </td>

                {/* VIEW BUTTON */}
                <td className="p-3 flex justify-center items-center">
                  <button className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg transition shadow-sm border border-transparent
                    bg-[var(--color-secondary)] text-[var(--color-on-secondary)]
                    hover:bg-[var(--color-secondary-hover)] hover:shadow-md hover:scale-105 active:scale-95">
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 opacity-70">
                  No users found ❌
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
