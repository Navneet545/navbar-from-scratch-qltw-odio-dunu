"use client";
import React from "react";

export default function FormCheckbox({ label, name, value, checked, onChange, error }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2">
        <input 
        type="checkbox" 
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[var(--color-secondary)]"
      />
      <label className="text-sm">{label}</label>
      </div>
      {/* {error && <p className="text-xs text-red-500 mt-1 w-full">{error}</p>} */}
    </div>
  );
}