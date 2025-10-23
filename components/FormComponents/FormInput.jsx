"use client";
import React from "react";

export default function FormInput({ label, name, value, onChange, error, type = "text", options = [], ...rest }) {
  if (type === "select") {
    return (
      <div className="flex flex-col">
        <label className="text-sm mb-1">{label}</label>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] ${
            error ? "border-red-500" : "border-[var(--border-color)]"
          }`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  if (type === "radio") {
    return (
      <div className="flex flex-col">
        <label className="text-sm mb-1">{label}</label>
        <div className="flex space-x-4">
          {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                className="h-4 w-4"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
        className={`w-full px-3 py-2 border rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] ${
          error ? "border-red-500" : "border-[var(--border-color)]"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
