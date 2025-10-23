"use client";
import React, { useState, useEffect } from 'react';
import withAuth from '@/hoc/withAuth';
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [tokenData, setTokenData] = useState(null);
  const router = useRouter();

   const isLogedin = localStorage.getItem('token');
  console.log(isLogedin);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // If you want to decode JWT:
      const parseJwt = (token) => {
        try {
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
      };

      const decoded = parseJwt(token);
      setTokenData(decoded); // Save decoded payload to state
    }
  }, []);

  if(!isLogedin){
    router.push('/login');
  }

  return (
    <div className="flex-grow w-full overflow-y-auto p-2">
      <main className="flex-grow w-full mx-auto px-0 py-2">
        <div className="bg-background text-foreground">
          {tokenData && (
            <div>
              <p>{`Welcome to the dashboard ${tokenData.firstName} !!`}</p>
              {/* <p>Role ID: {tokenData.ROLEID}</p> */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
