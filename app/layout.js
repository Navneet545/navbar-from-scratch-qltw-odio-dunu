"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import { AppSettingsProvider } from "@/components/Context/appSettingContext";
import { ThemeProvider as CustomThemeProvider } from "@/components/Context/themeContext";
import ThemeAwareLoader from "@/components/Layout/Toploader";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../public/truactlogo.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogedin, setIsLogedin] = useState(null); // Start with null to indicate loading

  // Routes where Navbar and Footer should be hidden
  const excludedRoutes = [
    "/admin",
    "/login",
    "/signUp",
    "/get-started",
    "/forgot",
    "/verify-email",
    "/restro",
  ];

  const shouldHideLayout = excludedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  useEffect(() => {
    // This code only runs on the client side
    const token = localStorage.getItem('token');
    setIsLogedin(!!token); // Convert to boolean
    console.log('Token found:', !!token);

    // Redirect logic - only run on client side
    if (!token && !excludedRoutes.some(route => pathname.startsWith(route))) {
      router.push('/login');
    }
  }, [pathname, router]);

  // Show loading state while checking authentication
  if (isLogedin === null) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="light">
            <AppSettingsProvider>
              <CustomThemeProvider>
                <div className="flex items-center justify-center min-h-screen">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto"></div>
                    <p className="mt-4 text-[var(--foreground)]">Loading...</p>
                  </div>
                </div>
              </CustomThemeProvider>
            </AppSettingsProvider>
          </ThemeProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AppSettingsProvider>
            <CustomThemeProvider>
              <ThemeAwareLoader />
              <div className="flex flex-col min-h-screen">
                
                {/* Show full Navbar on regular pages */}
                {!shouldHideLayout && <Navbar />}

                {/* Show only logo on excluded pages */}
                {shouldHideLayout && (
                  <div className="flex justify-items-start border rounded-sm bg-[var(--color-primary)] text-[var(--color-on-primary)]">
                    <Image className="pt-1 pl-1.5 pb-1.5" src={logo} alt="Logo" width={100} height={100} />
                  </div>
                )}

                <main className="flex-grow w-full pb-16 pt-[50px] md:pt-[120px]">
                  {children}
                </main>

                {!shouldHideLayout && <Footer />}
              </div>
            </CustomThemeProvider>
          </AppSettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}