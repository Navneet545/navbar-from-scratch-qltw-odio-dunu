"use client";

import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (formData) => {
    setLoading(true);
    console.log("Sign Up Data:", formData);
    
    try {
      // Your signup API call here
      // Example:
      // const response = await fetch('https://appsailmockdata-10102165915.development.catalystappsail.com/api/userList/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const result = await response.json();
      // console.log(result);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Sign up successful!", formData);
      
    } catch (error) {
      console.error("Sign-up error:", error);
      // Handle error (show toast, set form errors, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start mt-0 pt-0 bg-[var(--background)] text-[var(--foreground)] px-4">
      <AuthForm mode="signup" onSubmit={handleSignUp} loading={loading} />
    </div>
  );
}