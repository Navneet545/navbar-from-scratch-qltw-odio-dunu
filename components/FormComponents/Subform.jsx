"use client";
import React from "react";
import FormInput from "./FormInput";

export default function AdditionalDetailsSubForm({ rows, onFieldChange, onAddRow, onDeleteRow, errors }) {
  return (
    <div className="col-span-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-foreground">Additional Details</h3>
        <button
          type="button"
          onClick={onAddRow}
          className="text-sm bg-[var(--color-secondary)] text-white px-3 py-1 rounded-md shadow"
        >
          + Add Row
        </button>
      </div>

      {rows.map((row, index) => (
        <div
          key={index}
          className="relative border-2 border-gray-200 rounded-lg p-2 mb-4"
          style={{
            borderColor: "var(--border-color)",
            color: "var(--foreground)",
            backgroundColor: "var(--background)",
            boxShadow: "0px 0px 8px 2px var(--shadow-color)",
          }}
        >

          {/* ❌ Delete Button */}
          <button
            type="button"
            onClick={() => onDeleteRow(index)}
            className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            ✕
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.keys(row).map((field) => (
              <FormInput
                key={field}
                label={field.replace(/([A-Z])/g, " $1")}
                name={field}
                value={row[field] || ""}
                onChange={(e) => onFieldChange(index, field, e.target.value)}
                error={errors?.additionalDetails?.[index]?.[field]}
                placeholder={field}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
