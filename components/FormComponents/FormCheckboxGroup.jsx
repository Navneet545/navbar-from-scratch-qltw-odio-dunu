"use client";
import React from "react";
import FormCheckbox from "./FormCheckbox";

export default function FormCheckboxGroup({
  label,
  name,
  options = [],
  value = [],
  onChange,
  error,
  columns = 2 // ✅ customize number of columns
}) {
  return (
    <div className="flex flex-col" style={{ width: "100%" }}>
      
      {/* Label + Inputs in one line */}
      <div 
        className="flex items-start"
        style={{ width: "80%", gap: "20px" }} // ✅ keep your custom 25px gap
      >
        <label className="text-sm font-medium w-34">{label}</label>

        {/* Checkbox list */}
        <div 
          className={`grid w-full gap-2`}
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {options.map((option) => (
            <FormCheckbox
              key={option}
              label={option}
              name={name}
              value={option}
              checked={value.includes(option)}
              onChange={onChange}
            />
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-red-500 mt-1 ml-[80px]">{error}</p>}
    </div>
  );
}
