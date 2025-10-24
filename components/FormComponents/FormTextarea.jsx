"use client";
import React from "react";

export default function FormTextarea({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  rows = 4, 
  cols, 
  placeholder, 
  resize = "vertical", // 'vertical', 'horizontal', 'both', 'none'
  ...rest 
}) {
  const resizeClasses = {
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
    none: "resize-none"
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <label className="text-sm mb-1 w-34">{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          cols={cols}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] ${
            resizeClasses[resize]
          } ${
            error ? "border-red-500" : "border-[var(--border-color)]"
          }`}
          {...rest}
        />
       </div>
       {error && <p className="text-xs text-red-500 mt-1 w-full">{error}</p>}
    </div>
  );
}