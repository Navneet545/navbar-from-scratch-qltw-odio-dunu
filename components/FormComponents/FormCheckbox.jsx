"use client";
import React from "react";

export default function FormCheckbox({ label, name, value, checked, onChange }) {
  return (
    <label className="flex items-center space-x-2 gap-2 text-sm cursor-pointer">
      <input 
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-[var(--color-secondary)] cursor-pointer"
      />
      {label}
    </label>
  );
}
