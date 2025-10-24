"use client";
import React from "react";
import FormInput from "./FormInput";

export default function AdditionalDetailsSubForm({ formData, onChange, errors }) {
  const handleSubFormChange = (e) => {
    const { name, value } = e.target;
    
    // Call parent's onChange to update the main formData
    onChange({
      target: {
        name: name,
        value: value
      }
    });
  };

  return (
    <div className="col-span-full border-2 border-gray-200 rounded-lg p-6 bg-gray-50">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Additional Details</h3>
      
      {/* All inputs in one row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <FormInput
          label="Company"
          name="company"
          value={formData.company || ""}
          onChange={handleSubFormChange}
          error={errors.company}
          placeholder="Company name"
        />

        <FormInput
          label="Job Title"
          name="jobTitle"
          value={formData.jobTitle || ""}
          onChange={handleSubFormChange}
          error={errors.jobTitle}
          placeholder="Your position"
        />

        <FormInput
          label="Department"
          name="department"
          value={formData.department || ""}
          onChange={handleSubFormChange}
          error={errors.department}
          placeholder="Department"
        />

        <FormInput
          label="Employee ID"
          name="employeeId"
          value={formData.employeeId || ""}
          onChange={handleSubFormChange}
          error={errors.employeeId}
          placeholder="ID number"
        />

        <FormInput
          label="Work Phone"
          name="workPhone"
          value={formData.workPhone || ""}
          onChange={handleSubFormChange}
          error={errors.workPhone}
          placeholder="Work number"
        />
      </div>
    </div>
  );
}