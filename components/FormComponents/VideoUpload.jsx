"use client";
import React, { useRef, useState } from "react";

export default function VideoUpload({ label, name, value, onChange, error, accept = "video/*" }) {
  const fileInputRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ target: { name, value: file } });
    }
  };

  const clearFile = () => {
    onChange({ target: { name, value: null } });
    setShowPreview(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <label className="text-sm mb-1 w-34">{label}</label>
      
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className={`w-full border rounded-lg p-2 bg-[var(--background)] ${
            error ? "border-red-500" : "border-[var(--border-color)]"
          }`}
        />
      </div>

      {/* Compact File Info */}
      {value && (
        <div className="mt-2 p-2 border border-[var(--color-secondary)] rounded-lg bg-[var(--color-tertiary)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-green-600 text-sm">✓</span>
              <span className="text-sm text-gray-700 truncate flex-1">
                {value.name}
              </span>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                ({(value.size / (1024 * 1024)).toFixed(1)}MB)
              </span>
            </div>
            
            <div className="flex items-center gap-1 ml-2">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="px-2 py-1 text-xs bg-[var(--color-secondary)] text-white rounded hover:bg-[var(--color-secondary-hover)]"
              >
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
              <button
                type="button"
                onClick={clearFile}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>

          {/* Collapsible Video Preview */}
          {showPreview && (
            <div className="mt-3 pt-3 border-t border-[var(--color-secondary)]">
              <video controls className="w-full max-w-md rounded border mx-auto">
                <source src={URL.createObjectURL(value)} type={value.type} />
                Your browser does not support the video element.
              </video>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}