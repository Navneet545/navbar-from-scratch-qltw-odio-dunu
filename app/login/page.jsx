"use client";

import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData) => {
    setLoading(true);
    console.log("Login Data:", formData);
    
    try {
      // Your login API call here
      // Example:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const result = await response.json();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Login successful!", formData);
      
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (show toast, set form errors, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start mt-0 pt-0 bg-[var(--background)] text-[var(--foreground)] px-4">
      <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />
    </div>
  );
}