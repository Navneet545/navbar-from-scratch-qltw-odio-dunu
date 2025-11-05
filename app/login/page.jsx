"use client";

import { useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (formData) => {
    setLoading(true);
    console.log("Login Data:", formData);
    
    try {
      // Your login API call here
      // Example:
      const response = await axios.post(`https://appsailmockdata-10102165915.development.catalystappsail.com/api/userList/login`, formData); 
      if (response.data) {
        console.log("Login successfully", response.data);
        const token = response.data.token;
        console.log(token);
        //decode code -
        if (token) { 
          const decoded = parseJwt(token);
          console.log("Decoded token:", decoded);

          localStorage.setItem('token', token);
          // localStorage.setItem('user', JSON.stringify(decoded));
          router.push('/dashboard');
        }
        
        return true;
      }
      
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (show toast, set form errors, etc.)
    } finally {
      setLoading(false);
    }
  };

  // Simple JWT decoder without any library
  function parseJwt(token) {
    try {
      // Split the token and decode the payload (base64)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  return (
    <div className="flex justify-center items-start mt-0 pt-0 bg-[var(--background)] text-[var(--foreground)] px-4">
      <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />
    </div>
  );
}