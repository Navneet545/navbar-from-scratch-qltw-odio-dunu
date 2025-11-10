"use client";
import React, { useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, XAxis, YAxis, Treemap} from "recharts";

// Sample donor data
const donor = {
  name: "John Doe",
  donated: 78000,
  used: 56000,
  remaining: 22000,
  history: [
    { month: "Jan", amount: 5000 },
    { month: "Feb", amount: 9200 },
    { month: "Mar", amount: 8700 },
    { month: "Apr", amount: 6300 },
    { month: "May", amount: 10900 },
    { month: "Jun", amount: 11200 },
  ],
  usage: [
    { name: "Education", value: 22000 },
    { name: "Food", value: 15000 },
    { name: "Medical", value: 12000 },
    { name: "Housing", value: 7000 },
  ],
};

const COLORS = ["#4ADE80", "#60A5FA", "#FACC15", "#FB7185"];

const regionImpact = [
  { name: "Education", value: 42000 },
  { name: "Healthcare", value: 30000 },
  { name: "Food Support", value: 18000 },
  { name: "Women Empowerment", value: 12000 },
  { name: "Child Welfare", value: 25000 },
  { name: "Disaster Relief", value: 15000 },
];

export default function DonorProfileModern() {
  return (
    <div className="p-6 space-y-8 text-[var(--foreground)]">

      {/* Header */}
      <div className="bg-[var(--background)] p-6 rounded-2xl shadow-md border" style={{ borderColor: "var(--border-color)" }}>
        <h1 className="text-2xl font-bold">{donor.name}'s Contribution Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Insight into donation impact & contributions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{
          label: "Total Donated", value: `₹ ${donor.donated.toLocaleString()}`
        }, {
          label: "Funds Utilized", value: `₹ ${donor.used.toLocaleString()}`
        }, {
          label: "Remaining Balance", value: `₹ ${donor.remaining.toLocaleString()}`
        }].map((stat, index) => (
          <div key={index} className="bg-[var(--background)] border rounded-xl p-5 shadow-md" style={{ borderColor: "var(--border-color)" }}>
            <p className="text-xs text-gray-400">{stat.label}</p>
            <h2 className="text-xl font-semibold mt-2">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Line Chart */}
        <div className="bg-[var(--background)] p-6 rounded-xl border shadow-md" style={{ borderColor: "var(--border-color)" }}>
          <h2 className="font-semibold mb-4">Donation Timeline</h2>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={donor.history}>
                <XAxis dataKey="month" />
                <YAxis />
                <Line type="monotone" dataKey="amount" stroke="var(--color-secondary)" strokeWidth={3} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-[var(--background)] p-6 rounded-xl border shadow-md" style={{ borderColor: "var(--border-color)" }}>
          <h2 className="font-semibold mb-4">Fund Allocation</h2>
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={donor.usage} dataKey="value" nameKey="name" outerRadius={80}>
                  {donor.usage.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Table */}
      <div className="bg-[var(--background)] rounded-xl border shadow-md" style={{ borderColor: "var(--border-color)" }}>
        <div className="p-4 border-b" style={{ borderColor: "var(--border-color)" }}>
          <h2 className="font-semibold">Donation Impact Heatmap</h2>
          <p className="text-xs text-gray-400">Intensity of donations by cause</p>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={regionImpact}
              dataKey="value"
              stroke="#fff"
              fill="var(--color-secondary)"
            >
              <Tooltip content={({ payload }) => {
                if (!payload?.length) return null;
                const item = payload[0].payload;
                return (
                  <div className="bg-white border rounded px-2 py-1 text-sm shadow">
                    <strong>{item.name}</strong><br />
                    ₹{item.value.toLocaleString()}
                  </div>
                );
              }} />
            </Treemap>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}