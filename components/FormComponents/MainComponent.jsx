"use client";
import React, { useState } from "react";
import FormInput from "./FormInput";
import FormCheckbox from "./FormCheckbox";
import SignaturePad from "./SignaturePad";
import FormTextarea from "./FormTextarea";
import AudioUpload from "./AudioUpload";
import VideoUpload from "./VideoUpload";
import CompactDocumentUpload from "./FormFileUpload";

// Sample data for dropdowns
const COUNTRIES = [
  { value: "us", label: "United States" },
  { value: "in", label: "India" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
];

const STATES = {
  us: [
    { value: "ny", label: "New York" },
    { value: "ca", label: "California" },
    { value: "tx", label: "Texas" },
  ],
  in: [
    { value: "mh", label: "Maharashtra" },
    { value: "dl", label: "Delhi" },
    { value: "ka", label: "Karnataka" },
  ],
  uk: [
    { value: "lon", label: "London" },
    { value: "man", label: "Manchester" },
    { value: "bir", label: "Birmingham" },
  ],
  ca: [
    { value: "on", label: "Ontario" },
    { value: "bc", label: "British Columbia" },
    { value: "qc", label: "Quebec" },
  ],
};

const CITIES = {
  ny: [
    { value: "newyork", label: "New York City" },
    { value: "buffalo", label: "Buffalo" },
  ],
  ca: [
    { value: "losangeles", label: "Los Angeles" },
    { value: "sanfrancisco", label: "San Francisco" },
  ],
  mh: [
    { value: "mumbai", label: "Mumbai" },
    { value: "pune", label: "Pune" },
  ],
  // Add more cities as needed
};

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export default function DonationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comments: "", // new textarea field
    address: "", // you might want to change address from input to textarea
    country: "",
    state: "",
    city: "",
    pin: "",
    date: "",
    gender: "",
    donationSchemes: [],
    document: [],
    audio: null,        // new
    video: null,
    signature: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        if (type === "file") {
            // For single file inputs (image, audio, video)
            if (files && files.length > 0) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
            }
            // Note: For 'documents', the DocumentUpload component handles the array internally
            // and passes the complete array back via onChange
        } 
        else if (type === "checkbox") {
            if (name === "donationSchemes") {
            const updatedSchemes = formData.donationSchemes.includes(value)
                ? formData.donationSchemes.filter(scheme => scheme !== value)
                : [...formData.donationSchemes, value];
            setFormData(prev => ({ ...prev, donationSchemes: updatedSchemes }));
            } else {
            setFormData(prev => ({ ...prev, [name]: checked }));
            }
        } 
        else {
            // For regular inputs, textareas, selects, and file arrays from DocumentUpload
            setFormData(prev => ({ 
            ...prev, 
            [name]: value 
            }));
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

  const handleSignatureChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation - you can expand this
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (formData.donationSchemes.length === 0) newErrors.donationSchemes = "Select at least one scheme";
    if (!formData.signature) newErrors.signature = "Signature is required";
    if (!formData.terms) newErrors.terms = "You must accept the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Form Data:", formData);
      // Handle form submission here
      alert("Form submitted successfully!");
    }
  };

  const getStateOptions = () => {
    return STATES[formData.country] || [];
  };

  const getCityOptions = () => {
    return CITIES[formData.state] || [];
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-lg shadow-md"
      style={{
        backgroundColor: "var(--hover-bg)",
        borderColor: "var(--border-all)",
      }}
    >
      {/* Basic Info */}
      <FormInput 
        label="Full Name" 
        name="name" 
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
      />
      <FormInput 
        label="Email" 
        name="email" 
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
      />
      <FormInput 
        label="Phone Number" 
        name="phone" 
        value={formData.phone}
        onChange={handleInputChange}
        error={errors.phone}
      />

      {/* Address */}
      <FormTextarea 
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        error={errors.address}
        placeholder="Enter your full address..."
        rows={3}
        resize="vertical"
      />
      
      <FormInput 
        label="Country" 
        name="country" 
        type="select"
        value={formData.country}
        onChange={handleInputChange}
        options={COUNTRIES}
        error={errors.country}
      />
      
      <FormInput 
        label="State" 
        name="state" 
        type="select"
        value={formData.state}
        onChange={handleInputChange}
        options={getStateOptions()}
        error={errors.state}
        disabled={!formData.country}
      />
      
      <FormInput 
        label="City" 
        name="city" 
        type="select"
        value={formData.city}
        onChange={handleInputChange}
        options={getCityOptions()}
        error={errors.city}
        disabled={!formData.state}
      />
      
      <FormInput 
        label="Pin Code" 
        name="pin" 
        value={formData.pin}
        onChange={handleInputChange}
        error={errors.pin}
      />

      {/* Other Details */}
      <FormInput 
        label="Date" 
        name="date" 
        type="date"
        value={formData.date}
        onChange={handleInputChange}
        error={errors.date}
      />
      
      <FormInput 
        label="Gender" 
        name="gender" 
        type="radio"
        value={formData.gender}
        onChange={handleInputChange}
        options={GENDER_OPTIONS}
        error={errors.gender}
      />

      {/* Donation Scheme */}
      <div className="col-span-full">
            <p className="text-sm font-semibold mb-2">Donation Schemes</p>
            <div className="grid grid-cols-2 gap-2">
            {["Education", "Health", "Environment", "Animal Welfare"].map((scheme) => (
                <FormCheckbox
                key={scheme}
                label={scheme}
                name="donationSchemes"
                value={scheme}
                checked={formData.donationSchemes.includes(scheme)}
                onChange={handleInputChange}
                error={errors.donationSchemes}
                />
            ))}
            </div>
            {errors.donationSchemes && (
            <p className="text-xs text-red-500 mt-1">{errors.donationSchemes}</p>
            )}
      </div>

      {/* File Uploads */}
      <div className="flex flex-col">
            <label className="text-sm mb-1">Upload Image</label>
            <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
            />
      </div>

       {/* Document Upload - Multiple Files */}
        <CompactDocumentUpload
            label="Upload Documents"
            name="documents"
            value={formData.documents}
            onChange={handleInputChange}
            error={errors.documents}
            maxFiles={10}
            maxSizeMB={5}
        />

      {/* New Media Uploads */}
        <AudioUpload
            label="Upload Audio"
            name="audio"
            value={formData.audio}
            onChange={handleInputChange}
            error={errors.audio}
        />

        <VideoUpload
            label="Upload Video"
            name="video"
            value={formData.video}
            onChange={handleInputChange}
            error={errors.video}
        />

      {/* Comments/additional info */}
      <FormTextarea 
        label="Additional Information"
        name="comments"
        value={formData.comments}
        onChange={handleInputChange}
        error={errors.comments}
        placeholder=""
        rows={3}
        resize="vertical"
      />

      {/* Signature Pad */}
      <div className="flex flex-col">
            <SignaturePad
            label="Signature"
            name="signature"
            value={formData.signature}
            onChange={handleSignatureChange}
            error={errors.signature}
            />
      </div>

      {/* Terms */}
      <div className="col-span-full flex items-center space-x-2">
        <input 
          type="checkbox" 
          name="terms"
          checked={formData.terms}
          onChange={handleInputChange}
          className="h-4 w-4" 
        />
        <label className="text-sm">I agree to the terms and conditions</label>
      </div>
      {errors.terms && <p className="text-xs text-red-500 col-span-full">{errors.terms}</p>}

      <button
        type="submit"
        className="py-2 mt-4 rounded-lg bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary-hover)] transition col-span w-30"
      >
        Submit
      </button>
    </form>
  );
}