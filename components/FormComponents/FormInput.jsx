"use client";
import React from "react";

export default function FormInput({ label, name, value, onChange, error, type = "text", options = [], showUrlHint = true, ...rest }) {
  if (type === "select") {
    return (
      <div className="flex flex-col"
      style={{
        width: "100%",
      }}>
        <div className="flex justify-center items-center gap-20"
        style={{
        width: "90%",
      }}>
          <label className="text-sm mb-1 w-34">{label}</label>
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full max-w-[250px] px-3 py-1 border rounded-lg bg-[var(--background)] text-[var(--foreground)] 
            focus:outline-none focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] 
            ${error ? "border-red-500" : "border-[var(--border-color)]"}`}
          >

            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="text-xs text-red-500 mt-1 w-full">{error}</p>}
      </div>
    );
  }

  // if (type === "radio") {
  //   return (
  //     <div className="flex">
  //       <label className="text-sm mb-1 w-1/2">{label}</label>
  //       <div className="flex space-x-4 w-full">
  //         {options.map((option) => (
  //           <label key={option.value} className="flex items-start space-x-2">
  //             <input
  //               type="radio"
  //               name={name}
  //               value={option.value}
  //               checked={value === option.value}
  //               onChange={onChange}
  //               className="h-4 w-4 accent-[var(--color-primary)"
  //             />
  //             <span className="text-sm">{option.label}</span>
  //           </label>
  //         ))}
  //       </div>
  //       {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  //     </div>
  //   );
  // }
  // In your FormInput component, update the radio section:
// RADIO INPUT
  if (type === "radio") {
    return (
      <div className="flex flex-col" style={{ width: "100%" }}>
        <div
          className="flex justify-center items-center gap-20"
          style={{ width: "90%" }}
        >
          {/* Label */}
          <label className="text-sm mb-1 w-34">{label}</label>

          {/* Radio Group */}
          <div className="flex flex-wrap gap-4 w-full">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  className="h-4 w-4 accent-[var(--color-secondary)] cursor-pointer
                            hover:scale-110 transition-transform"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-xs text-red-500 mt-1 w-full">{error}</p>}
      </div>
    );
  }


// Handle URL type that accepts simple domains like "google.com"
  if (type === "url") {
    const isValidSimpleUrl = (url) => {
      if (!url) return true;
      
      // Simple domain validation - accepts:
      // google.com, www.google.com, sub.domain.co.uk, localhost:3000
      const domainPattern = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
      const localhostPattern = /^localhost(:\d+)?(\/.*)?$/;
      const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?(\/.*)?$/;
      
      return domainPattern.test(url) || localhostPattern.test(url) || ipPattern.test(url);
    };

    const isUrlValid = value ? isValidSimpleUrl(value) : true;

    return (
      <div className="flex flex-col"
      style={{
        width: "100%",
      }}>
        <div className="flex justify-center items-center gap-20"
        style={{
        width: "90%",
      }}>
          <label className="text-sm mb-1 w-34">{label}</label>
          {/* <div className="relative"> */}
            <input
              type="text" // Use text instead of url to avoid browser validation
              name={name}
              value={value}
              onChange={onChange}
              inputMode="url"
              autoComplete="url"
              placeholder="google.com or example.com"
              className={`w-full px-3 py-1 border rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] ${
                error ? "border-red-500" : 
                !isUrlValid && value ? "border-orange-500" : "border-[var(--border-color)]"
              }`}
              {...rest}
            />
            {value && isUrlValid && !error && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" title="Valid URL">
                ✓
              </div>
            )}
            {value && !isUrlValid && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500" title="Invalid URL format">
                ⚠
              </div>
            )}
          {/* </div> */}
        </div>
        {error && <p className="text-xs text-red-500 mt-1 w-full">{error}</p>}
        {!isUrlValid && value && (
          <p className="text-xs text-orange-500 mt-1">Please enter a valid domain like google.com</p>
        )}
        {showUrlHint && (
          <p className="text-xs text-gray-500 mt-1">Enter domain like: google.com, example.co.uk</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col"
    style={{
        width: "100%",
      }}>
      <div className="flex justify-center items-center gap-20"
      style={{
        width: "90%",
      }}>
        <label className="text-sm mb-1 w-34">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          {...rest}
          className={`w-full px-3 py-1 border rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:border-[var(--color-secondary)] focus:ring-2 focus:ring-[var(--color-secondary)] ${
            error ? "border-red-500" : "border-[var(--border-color)]"
          }`}
        />
        </div>
        {error && <p className="text-xs text-red-500 mt-1 w-full">{error}</p>}
    </div>
  );
}
