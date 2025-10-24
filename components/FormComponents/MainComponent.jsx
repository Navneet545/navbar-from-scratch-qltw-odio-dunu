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
};

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

// CORRECTED Validation functions - return error messages as strings
const validateEmail = (email) => {
  if (!email || email.trim() === '') return "Please enter your email address";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') return "Please enter your phone number";
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) return "Please enter a valid phone number";
  return null;
};

const validatePinCode = (pin) => {
  if (!pin || pin.trim() === '') return "Please enter your PIN code";
  const pinRegex = /^[0-9]{4,10}$/;
  if (!pinRegex.test(pin)) return "Please enter a valid PIN code (4-10 digits)";
  return null;
};

const validateUrl = (url) => {
  if (!url || url.trim() === '') return null;
  
  const urlValue = url.trim().toLowerCase();
  const cleanUrl = urlValue.replace(/^https?:\/\//, '');
  
  const domainPattern = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
  const localhostPattern = /^localhost(:\d+)?(\/.*)?$/;
  const ipPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?(\/.*)?$/;
  
  if (!domainPattern.test(cleanUrl) && !localhostPattern.test(cleanUrl) && !ipPattern.test(cleanUrl)) {
    return "Please enter a valid website URL (e.g., google.com)";
  }
  return null;
};

const validateFile = (file, fieldName) => {
  if (!file) return `Please upload ${fieldName}`;
  
  // Image validation
  if (fieldName === "an image" && file.size > 2 * 1024 * 1024) {
    return "Image size should be less than 2MB";
  }
  
  // Audio validation
  if (fieldName === "an audio file" && file.size > 10 * 1024 * 1024) {
    return "Audio file size should be less than 10MB";
  }
  
  // Video validation
  if (fieldName === "a video file" && file.size > 50 * 1024 * 1024) {
    return "Video file size should be less than 50MB";
  }
  
  return null;
};

export default function DonationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comments: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pin: "",
    date: "",
    gender: "",
    donationSchemes: [],
    image: null,
    documents: [],
    audio: null,
    video: null,
    signature: "",
    terms: false,
    website: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "file") {
      if (files && files.length > 0) {
        setFormData(prev => ({ ...prev, [name]: files[0] }));
      }
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
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // CORRECTED validateForm function
  const validateForm = () => {
    const newErrors = {};

    // Required field validations - CORRECTED LOGIC
    if (!formData.name.trim()) newErrors.name = "Please enter your full name";
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    if (!formData.address.trim()) newErrors.address = "Please enter your address";
    if (!formData.country) newErrors.country = "Please select your country";
    if (!formData.state) newErrors.state = "Please select your state";
    if (!formData.city) newErrors.city = "Please select your city";
    
    const pinError = validatePinCode(formData.pin);
    if (pinError) newErrors.pin = pinError;
    
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.gender) newErrors.gender = "Please select your gender";
    
    if (formData.donationSchemes.length === 0) {
      newErrors.donationSchemes = "Please select at least one donation scheme";
    }
    
    // File validations - CORRECTED
    const imageError = validateFile(formData.image, "an image");
    if (imageError) newErrors.image = imageError;
    
    const audioError = validateFile(formData.audio, "an audio file");
    if (audioError) newErrors.audio = audioError;
    
    const videoError = validateFile(formData.video, "a video file");
    if (videoError) newErrors.video = videoError;
    
    // Documents validation - CORRECTED
    if (formData.documents.length === 0) {
      newErrors.documents = "Please upload at least one document";
    } else if (formData.documents.length > 10) {
      newErrors.documents = "Maximum 10 documents allowed";
    }

    // Website validation - CORRECTED
    const websiteError = validateUrl(formData.website);
    if (websiteError) newErrors.website = websiteError;

    // Comments validation
    if (!formData.comments.trim()) newErrors.comments = "Please enter additional information";

    // Signature validation
    if (!formData.signature) newErrors.signature = "Please provide your signature";
    
    // Terms validation
    if (!formData.terms) newErrors.terms = "Please accept the terms and conditions to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Form Data:", formData);
      
      // Prepare form data for submission
      const submissionData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === 'documents') {
          formData.documents.forEach((file, index) => {
            submissionData.append(`documents[${index}]`, file);
          });
        } else if (formData[key] instanceof File) {
          submissionData.append(key, formData[key]);
        } else if (key === 'signature' && formData[key]) {
          const blob = dataURLtoBlob(formData[key]);
          submissionData.append(key, blob, 'signature.png');
        } else if (Array.isArray(formData[key])) {
          submissionData.append(key, JSON.stringify(formData[key]));
        } else {
          submissionData.append(key, formData[key]);
        }
      });

      alert("Form submitted successfully!");
      console.log("Submission Data:", Object.fromEntries(submissionData));
    }
  };

  const dataURLtoBlob = (dataURL) => {
    if (!dataURL) return null;
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-6 rounded-lg shadow-md"
      style={{
        backgroundColor: "var(--hover-bg)",
        borderColor: "var(--border-all)",
      }}
    >
      {/* Basic Info */}
      <FormInput 
        label="Full Name *" 
        name="name" 
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
        placeholder="Enter your full name"
      />
      <FormInput 
        label="Email *" 
        name="email" 
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        placeholder="your@email.com"
      />
      <FormInput 
        label="Phone Number *" 
        name="phone" 
        value={formData.phone}
        onChange={handleInputChange}
        error={errors.phone}
        placeholder="+1234567890"
      />

      {/* Address */}
      <FormTextarea 
        label="Address *"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        error={errors.address}
        placeholder="Enter your full address..."
        rows={3}
        resize="vertical"
      />
      
      <FormInput 
        label="Country *" 
        name="country" 
        type="select"
        value={formData.country}
        onChange={handleInputChange}
        options={COUNTRIES}
        error={errors.country}
      />
      
      <FormInput 
        label="State *" 
        name="state" 
        type="select"
        value={formData.state}
        onChange={handleInputChange}
        options={getStateOptions()}
        error={errors.state}
        disabled={!formData.country}
      />
      
      <FormInput 
        label="City *" 
        name="city" 
        type="select"
        value={formData.city}
        onChange={handleInputChange}
        options={getCityOptions()}
        error={errors.city}
        disabled={!formData.state}
      />
      
      <FormInput 
        label="PIN Code *" 
        name="pin" 
        value={formData.pin}
        onChange={handleInputChange}
        error={errors.pin}
        placeholder="123456"
      />

      {/* Other Details */}
      <FormInput 
        label="Date *" 
        name="date" 
        type="date"
        value={formData.date}
        onChange={handleInputChange}
        error={errors.date}
      />
      
      <FormInput 
        label="Gender *" 
        name="gender" 
        type="radio"
        value={formData.gender}
        onChange={handleInputChange}
        options={GENDER_OPTIONS}
        error={errors.gender}
      />

      {/* Donation Scheme */}
      <div className="flex flex-col">
        <p className="text-sm font-semibold mb-2">Donation Schemes *</p>
        <div className="grid grid-cols-2 gap-2">
          {["Education", "Health", "Environment", "Animal Welfare"].map((scheme) => (
            <FormCheckbox
              key={scheme}
              label={scheme}
              name="donationSchemes"
              value={scheme}
              checked={formData.donationSchemes.includes(scheme)}
              onChange={handleInputChange}
            />
          ))}
        </div>
        {errors.donationSchemes && (
          <p className="text-xs text-red-500 mt-1">{errors.donationSchemes}</p>
        )}
      </div>

      {/* File Uploads */}
      <div className="flex flex-col">
        <label className="text-sm mb-1">Upload Image *</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleInputChange}
          className={`w-full border rounded-lg p-2 ${
            errors.image ? "border-red-500" : "border-[var(--border-color)]"
          }`}
        />
        {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
        {formData.image && !errors.image && (
          <p className="text-xs text-green-600 mt-1">✓ {formData.image.name}</p>
        )}
      </div>

      {/* Document Upload */}
      <CompactDocumentUpload
        label="Upload Documents *"
        name="documents"
        value={formData.documents}
        onChange={handleInputChange}
        error={errors.documents}
        maxFiles={10}
        maxSizeMB={5}
      />

      {/* Media Uploads */}
      <AudioUpload
        label="Upload Audio *"
        name="audio"
        value={formData.audio}
        onChange={handleInputChange}
        error={errors.audio}
      />

      <VideoUpload
        label="Upload Video *"
        name="video"
        value={formData.video}
        onChange={handleInputChange}
        error={errors.video}
      />

      {/* Website */}
      <FormInput 
        label="Website *" 
        name="website" 
        type="url"
        value={formData.website}
        onChange={handleInputChange}
        placeholder="google.com"
        error={errors.website}
      />

      {/* Comments */}
      <FormTextarea 
        label="Additional Information *"
        name="comments"
        value={formData.comments}
        onChange={handleInputChange}
        error={errors.comments}
        placeholder="Any additional comments or information..."
        rows={3}
        resize="vertical"
      />

      {/* Signature Pad */}
      <div className="flex flex-col">
        <SignaturePad
          label="Signature *"
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
          className={`h-4 w-4 accent-[var(--color-primary)] ${
            errors.terms ? "border-red-500" : ""
          }`}
        />
        <label className="text-sm">I agree to the terms and conditions *</label>
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