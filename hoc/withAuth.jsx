"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login"); // Redirect if no token
      } else {
        setIsAuthenticated(true);
      }

      setChecked(true); // Finished checking
    }, [router]);

    // Prevent rendering until auth check is complete
    if (!checked) return null;

    // Render only if authenticated
    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    return null; // Will redirect if not authenticated
  };
};

export default withAuth;
