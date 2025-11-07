"use client";
import React, { useRef } from "react";

export default function CompactDocumentUpload({ 
  label, 
  name, 
  value = [], 
  onChange, 
  error, 
  maxFiles = 10 
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (value.length + newFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }
    const updatedFiles = [...value, ...newFiles];
    onChange({ target: { name, value: updatedFiles } });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index) => {
    const updatedFiles = value.filter((_, i) => i !== index);
    onChange({ target: { name, value: updatedFiles } });
  };

  return (
    <div className="flex flex-col"
    style={{
        width: "90%",
      }}>
      <div className="flex justify-center items-center gap-20"
      style={{
        width: "100%",
      }}>
        <label className="text-sm mb-1 w-34">{label}</label>
      
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.rtf"
          onChange={handleFileChange}
          className={`w-full border rounded-lg p-1 bg-[var(--background)] ${
            error ? "border-red-500" : "border-[var(--border-color)]"
          }`}
        />
      </div>

      {/* Single Line Files List */}
      {value.length > 0 && (
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">
              Selected: {value.length} file(s)
            </span>
            <button
              type="button"
              onClick={() => onChange({ target: { name, value: [] } })}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-1 text-sm bg-[var(--color-tertiary)] p-2 rounded border border-[var(--color-secondary)]">
            {value.map((file, index) => (
              <span key={index} className="flex items-center">
                <span className="text-gray-700 max-w-[100px] truncate text-xs">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="ml-1 text-red-500 hover:text-red-700 text-xs"
                >
                  ×
                </button>
                {index < value.length - 1 && <span className="text-gray-400 mx-1">,</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}