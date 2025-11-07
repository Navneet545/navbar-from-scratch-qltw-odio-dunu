"use client";

import React, { useState, useRef, useEffect } from "react";
import profile from "../../public/profileImage.png";
import logo from "../../public/truactlogo.png";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  Moon,
  Settings,
  LogOut,
  Book,
  Code,
  Database,
  FileText,
  icons,
  SquareChartGantt,
  ShieldUser,
  BadgeAlert,
  Cable,
  BookUser,
  ShieldHalf,
} from "lucide-react";
import { useTheme } from "next-themes";
import Notifications from "../Header/Notification";
import SearchBar from "../Header/searchbar";
import { motion, AnimatePresence } from "framer-motion";
import SubmenuPortal from "../Menu/Submenu";
import { usePathname } from "next/navigation";
import { useAppSettings } from "../../components/Context/appSettingContext";
import { darkenColor, lightenColor, getContrastText, getBrightness } from "../../utils/color";


const Page = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const [active, setActive] = useState("Dashboard");

  const [openDropdown, setOpenDropdown] = useState(null);
  const { theme, setTheme } = useTheme();

  const [openMoreDropdown, setOpenMoreDropdown] = useState(null);

  const profileRef = useRef(null);
  const settingsRef = useRef(null);
  const navRef = useRef(null);

  const [visibleCount, setVisibleCount] = useState(0); // default

  const [hoveredMoreItem, setHoveredMoreItem] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState("right");
  const [parentRect, setParentRect] = useState(null);
  const closeTimeoutRef = useRef(null);
  const isAdmin = true;
  const { appName, appNameForMobile} = useAppSettings();
  console.log(appName, appNameForMobile);

  const router = useRouter();
  

  const users = [
    { id: "123", role: "admin" },
    { id: "456", role: "donor" },
    { id: "789", role: "user" },
  ];

  const pathname = usePathname(); 
  // e.g. "/123/accountSettings"

  // Extract the first part (id)
  const userId = pathname.split("/")[1];

  // Find the user in your array
  const currentUser = users.find((u) => u.id === userId);

  // Check if admin
  // const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    setIsSettingsOpen(false); // close whenever route changes
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

     document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Responsive visible count
  useEffect(() => {
    if (!navRef.current) return;

    const observer = new ResizeObserver(() => {
      const containerWidth = navRef.current?.offsetWidth || 0;

      // estimate avg width per item (adjust if your design needs)
      const itemWidth = 120;
      const maxVisible = Math.floor(containerWidth / itemWidth) - 1; // leave space for "..."
      setVisibleCount(Math.max(1, Math.min(maxVisible, navItems.length)));
    });

    observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const toggleMoreDropdown = (name) => {
    setOpenMoreDropdown(openMoreDropdown === name ? null : name);
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
  };

  const navItems = [
    {
      name: "Dashboard-Dashboard-Dashboard-Dashboard-Dashboard",
      path: "/dashboard",
      icon: SquareChartGantt,
      headings: [
        {
          title: "Team-Options",
          icon: Book,
          subItems: [
            {
              name: "Marketing-abc abc abc bac bac abc abc abc",
              path: "/dashboard/subModule",
              icon: FileText,
            },
            { name: "Sales", path: "/dashboard/sales", icon: BookUser },
          ],
        },
        {
          title: "Operations",
          subItems: [{ name: "Security", path: "/report/security" }],
        },
      ],
    },
    {
      name: "Reports-Reports-Reports-Reports",
      path: "",
      headings: [
        {
          title: "System Analytics and Integration",
          icon: Database,
          subItems: [
            { name: "Analytics", path: "/report/analytics" },
            { name: "Integration", path: "/report/integration" },
            { name: "Security", path: "/report/security" },
          ],
        },
      ],
    },
    {
      name: "Analytics-Analytics-Analytics-Analytics",
      path: "/analytics",
    },
    {
      name: "Reports",
      path: "/report",
    },
    {
      name: "Forms",
      path: "/form",
    },
    {
      name: "Analytic-Analytic-Analytic-Analytic",
      path: "/analytic",
      headings: [
        {
          title: "parts",
          icon: Database,
          subItems: [
            { name: "About", path: "/analytic/about" },
            { name: "Team", path: "/analytic/team" },
            { name: "Careers", path: "/analytic/career" },
          ],
        },
      ],
    },
    {
      name: "TechTechi",
      path: "/tech",
      headings: [
        {
          title: "Knowledge",
          subItems: [
            { name: "About", path: "/tech/about" },
            { name: "Team", path: "/tech/team" },
            { name: "Careers", path: "/tech/career" },
          ],
        },
      ],
    },
    {
      name: "ReportsRep",
      path: "/report2",
      headings: [
        {
          title: "System Analytics and Integration",
          icon: Database,
          subItems: [
            { name: "Analytics", path: "/report2/analytics", icon: BookUser },
            {
              name: "Integration",
              path: "/report2/integration",
              icon: FileText,
            },
            { name: "Security", path: "/report2/security", icon: ShieldHalf },
          ],
        },
      ],
    },
    {
      name: "AnalyticsAna",
      path: "/analytics2",
      subItems: [
        { name: "Basic", path: "/analytics2/basic" },
        { name: "Pro", path: "/analytics2/pro" },
        { name: "Enterprise", path: "/analytics2/enterprise" },
      ],
    },
    {
      name: "FormsForm",
      path: "/forms2",
    },
    {
      name: "AnalyticAn-AnalyticAn-AnalyticAn",
      path: "/analytic2",
      headings: [
        {
          title: "parts2",
          subItems: [
            { name: "About", path: "/analytic2/about" },
            { name: "Team", path: "/analytic2/team" },
            { name: "Careers", path: "/analytic2/career" },
          ],
        },
      ],
    },
    {
      name: "TechTec",
      path: "/tech2",
      headings: [
        {
          title: "Knowledge",
          subItems: [
            { name: "About", path: "/tech2/about" },
            { name: "Team", path: "/tech2/team" },
            { name: "Careers", path: "/tech2/career" },
          ],
        },
      ],
    },
    {
      name: "ReportsRe",
      path: "/report3",
      headings: [
        {
          title: "System Analytics and Integration",
          icon: Database,
          subItems: [
            { name: "Analytics", path: "/report3/analytics", icon: BookUser },
            {
              name: "Integration",
              path: "/report3/integration",
              icon: FileText,
            },
            { name: "Security", path: "/report3/security", icon: ShieldHalf },
          ],
        },
      ],
    },
    {
      name: "AnalyticsAn",
      path: "/analytics3",
      subItems: [
        { name: "Basic", path: "/analytics3/basic" },
        { name: "Pro", path: "/analytics3/pro" },
        { name: "Enterprise", path: "/analytics3/enterprise" },
      ],
    },
    {
      name: "Form",
      path: "/forms3",
    },
    {
      name: "Analytica",
      path: "/analytic3",
      headings: [
        {
          title: "parts",
          subItems: [
            { name: "About", path: "/analytic3/about" },
            { name: "Team", path: "/analytic3/team" },
            { name: "Careers", path: "/analytic3/career" },
          ],
        },
      ],
    },
    {
      name: "Techi",
      path: "/tech3",
      headings: [
        {
          title: "Knowledge",
          subItems: [
            { name: "About", path: "/tech3/about" },
            { name: "Team", path: "/tech3/team" },
            { name: "Careers", path: "/tech3/career" },
          ],
        },
      ],
    },
    {
      name: "ReportsR",
      path: "/report4",
      headings: [
        {
          title: "System Analytics and Integration",
          icon: Database,
          subItems: [
            { name: "Analytics", path: "/report4/analytics", icon: BookUser },
            {
              name: "Integration",
              path: "/report4/integration",
              icon: FileText,
            },
            { name: "Security", path: "/report4/security", icon: ShieldHalf },
          ],
        },
      ],
    },
    {
      name: "AnalyticsA",
      path: "/analytics4",
      subItems: [
        { name: "Basic", path: "/analytics4/basic" },
        { name: "Pro", path: "/analytics4/pro" },
        { name: "Enterprise", path: "/analytics4/enterprise" },
      ],
    },
    {
      name: "FormsF",
      path: "/forms4",
    },
    {
      name: "AnalyticA",
      path: "/analytic4",
      headings: [
        {
          title: "parts",
          subItems: [
            { name: "About", path: "/analytic4/about" },
            { name: "Team", path: "/analytic4/team" },
            { name: "Careers", path: "/analytic4/career" },
          ],
        },
      ],
    },
    {
      name: "TechT",
      path: "/tech4",
      headings: [
        {
          title: "Knowledge",
          subItems: [
            { name: "About", path: "/tech4/about" },
            { name: "Team", path: "/tech4/team" },
            { name: "Careers", path: "/tech4/career" },
          ],
        },
      ],
    },
  ];

  // const visibleModules = navItems.slice(0, 5);
  // const hiddenModules = navItems.slice(5);

  const handleLogout = async () => {
  try {
    const response = await axios.post(
      "https://appsailmockdata-10102165915.development.catalystappsail.com/api/userList/logout",
      {},
      { withCredentials: true }
    );
    console.log(response);
    // Clear frontend state
    // localStorage.removeItem("userInfo");
    if(response.status === 200 && response.data){
      localStorage.removeItem("token");
      router.replace("/login");
    }
  } catch (err) {
    console.error("Logout failed", err);
  }
};


  return (
    <div className="bg-background text-foreground">
      <nav
        className="w-full fixed top-0 left-0 z-50 bg-background border rounded-xl shadow-sm"
        style={{
          borderColor: "var(--border-color)",
          boxShadow: "0 1px 2px var(--shadow-color)",
        }}
      >
        {/* =============== Header ===============*/}
        <div className="flex items-center justify-between px-6 py-1 bg-[var(--color-primary)] text-[var(--color-on-primary)]">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2">
            <div className="h-10 w-20 flex items-center justify-center">
              <Image src={logo} alt="logo" width={100} height={50} />
            </div>
            <span className="font-normal">
              <span className="block lg:hidden">{appNameForMobile}</span> {/* Mobile */}
              <span className="hidden lg:block">
                {" "}
                {appName}
              </span>{" "}
              {/* Desktop */}
            </span>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <SearchBar />
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-[var(--hover-bg)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Theme toggler */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full hover:bg-[var(--hover-bg)] transition"
            >
              <Moon className="h-6 w-6" />
            </button>

            {/* Notifications */}
            <Notifications />

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center rounded-full"
              >
                 <span className="mr-3 overflow-hidden rounded-full h-10 w-10 border-2 border-gray-200 flex items-center justify-center">
          <Image
            src="data:image/jpeg;base64,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"
            alt="User"
            width={44}
            height={44}
            className="object-cover h-full w-full"
          />
        </span>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="absolute right-0 top-12 mt-2 w-56 bg-background rounded-xl shadow-lg py-1 z-50"
                    style={{ boxShadow: "var(--dropdown-shadow)" }}
                  >
                    <div className="px-4 pb-1 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium py-1 bg-background text-foreground dark:bg-background dark:text-foreground">Sophia Patel</p>
                        <p className="text-xs text-gray-500 py-1">
                          sophia.patel@email.com
                        </p>
                        <p className="text-xs text-gray-500 py-1">
                          User ID: S3546
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="p-2 rounded hover:bg-[var(--hover-bg)]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>

                    <div className="mt-1">
                      <Link
                        href="#"
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-[var(--hover-bg)] border-t rounded-b-md"
                        style={{ borderTopColor: "var(--border-top)" }}
                        onClick={handleLogout} 
                      >
                        <LogOut className="w-4 h-4"/>
                        Logout
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* =============== Menu Bar =============== */}
        <div
          className="hidden md:flex items-center justify-between px-10 py-2 border-t bg-background text-sm font-medium"
          style={{ borderTopColor: "var(--border-top)" }}
        >
          <div className="flex space-x-8 flex-1 min-w-0" ref={navRef}>
            {/* visible modules */}
            {navItems.slice(0, visibleCount).map((item) => {
              const isParentActive =
                item.headings?.some(h =>
                  h.subItems?.some(sub => pathname === sub.path)
                ) || pathname === item.path;
              return (
              <div key={item.path} className="relative">
                {item.headings || item.subItems ? (
                  // === Module with dropdown ===
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md max-w-[120px] ${
                        isParentActive
                          ? "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]"
                          : "hover:bg-[var(--color-tertiary)] hover:text-[var(--color-on-tertiary)]"
                      }`}
                    >
                      {/* Wrapper for scrolling */}
                      <div className="overflow-hidden max-w-[60px]">
                        <span
                          className={`inline-block whitespace-nowrap ${
                            item.name.length > 7 ? "hover:animate-scroll" : ""
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>

                      {/* Dropdown arrow */}
                      <svg
                        className={`ml-1 h-5 w-5 transition-transform ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown with Headings + SubItems */}
                    <AnimatePresence>
                      {openDropdown === item.name && item.headings && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="absolute left-0 mt-2 w-56 rounded-md bg-background z-50"
                          style={{ boxShadow: "var(--dropdown-shadow)" }}
                        >
                          <div className="py-2">
                            {item.headings.map((heading) => (
                              <div key={heading.title} className="px-4 py-2">
                                <p className="flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1 whitespace-break-spaces">
                                  {heading.icon && (
                                    <heading.icon className="h-4 w-4 mr-2" />
                                  )}
                                  {heading.title}
                                </p>
                                <div className="space-y-1">
                                  {heading.subItems.map((sub) => {
                                     const isActiveSub = pathname === sub.path; // current sub path
                                    return (
                                    <Link
                                      key={sub.path}
                                      href={sub.path}
                                      onClick={() => {
                                        setActive(item.name);
                                        setOpenDropdown(null);
                                      }}
                                      className={`flex items-center px-2 py-1 text-sm rounded
                                      ${isActiveSub
                                            ? "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]"
                                            : "hover:bg-[var(--color-tertiary)] hover:text-[var(--color-on-tertiary)]"}
                                      `}
                                      
                                    >
                                      {sub.icon && (
                                        <sub.icon className="h-4 w-4 mr-2 shrink-0 z-50" />
                                      )}
                                      {/* Text wrapper (important) */}
                                      <div className="relative overflow-hidden flex-1">
                                        <span
                                          className={`inline-block whitespace-nowrap ${
                                            sub.name.length > 23
                                              ? "hover:animate-scroll"
                                              : ""
                                          }`}
                                        >
                                          {sub.name}
                                        </span>
                                      </div>
                                    </Link>
                                  )}
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  // === Module with no dropdown (direct link) ===
                  <Link
                    href={item.path}
                    onClick={() => {
                      setActive(item.name);
                      setOpenDropdown(null);
                    }}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md max-w-[120px] ${
                      isParentActive
                        ? "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]"
                        : "hover:bg-[var(--color-tertiary)] hover:text-[var(--color-on-tertiary)]"
                    }`}
                  >
                    <div className="overflow-hidden max-w-[80px]">
                      <span
                        className={`inline-block whitespace-nowrap ${
                          item.name.length > 7 ? "hover:animate-scroll" : ""
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            )})}

            {/* === More (...) Button === */}
            {visibleCount < navItems.length && (
              <div
                className="relative"
                onMouseLeave={() => {
                  if (closeTimeoutRef.current)
                    clearTimeout(closeTimeoutRef.current);
                  closeTimeoutRef.current = setTimeout(
                    () => setHoveredMoreItem(null),
                    150
                  );
                }}
              >
                <button
                  onClick={() => toggleDropdown("more")}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-full hover:bg-[var(--hover-bg)]"
                >
                  ...
                </button>

                <AnimatePresence>
                  {openDropdown === "more" && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={{
                        hidden: { opacity: 0, y: -10 },
                        visible: { opacity: 1, y: 0 },
                        exit: { opacity: 0, y: -10 },
                      }}
                      transition={{ duration: 0.18, ease: "easeInOut" }}
                      className="absolute -right-2 mt-2 w-56 rounded-md bg-background z-50"
                      style={{ boxShadow: "var(--dropdown-shadow)" }}
                    >
                      {/* Scrollable list of items */}
                      <div className="py-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                        {navItems.slice(visibleCount).map((item) => {
                          // Check if any subItem of this module is active
                          const isModuleActive = 
                            pathname === item.path ||
                            item.headings?.some(heading => 
                            heading.subItems?.some(sub => pathname === sub.path)
                          ) || item.subItems?.some(sub => pathname === sub.path);
                          return (
                          <div
                            key={item.path}
                            className="relative group"
                            onMouseEnter={(e) => {
                              if (closeTimeoutRef.current)
                                clearTimeout(closeTimeoutRef.current);
                              setHoveredMoreItem(item.name);
                              const rect =
                                e.currentTarget.getBoundingClientRect();
                              setParentRect(rect);

                              const screenWidth = window.innerWidth;
                              const submenuWidth = 240;
                              const spaceRight = screenWidth - rect.right;
                              const spaceLeft = rect.left;
                              setSubmenuPosition(
                                spaceRight < submenuWidth &&
                                  spaceLeft > submenuWidth
                                  ? "left"
                                  : "right"
                              );
                            }}
                            onMouseLeave={() => {
                              closeTimeoutRef.current = setTimeout(
                                () => setHoveredMoreItem(null),
                                150
                              );
                            }}
                          >
                            {item.headings || item.subItems ? (
                              <>
                              {/* Row */}
                              <div className={`px-2 py-1 flex justify-between items-center cursor-pointer ${
                                  isModuleActive
                                    ? "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]"
                                    : "hover:bg-[var(--color-tertiary)] hover:text-[var(--color-on-tertiary)]"
                                }`}
                              >
                                <div className="overflow-hidden max-w-[120px]">
                                  <span
                                    className={`inline-block whitespace-nowrap ${
                                      item.name.length > 15
                                        ? "hover:animate-scroll"
                                        : ""
                                    }`}
                                  >
                                    {item.name}
                                  </span>
                                </div>
                                {(item.headings || item.subItems) && (
                                  <svg
                                    className="ml-1 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                )}
                              </div>

                              {/* Submenu Portal */}
                              {(item.headings?.length || item.subItems?.length) >
                                0 && (
                                <SubmenuPortal
                                  parentRect={parentRect}
                                  item={item}
                                  submenuPosition={submenuPosition}
                                  isVisible={hoveredMoreItem === item.name}
                                  onClose={() => setHoveredMoreItem(null)}
                                  setActive={setActive}
                                  pathname={pathname} // Pass pathname to SubmenuPortal
                                />
                              )}
                              </>
                            ) : (
                              // === Module with no dropdown (direct link) ===
                              <Link
                                href={item.path}
                                onClick={() => {
                                  setActive(item.name);
                                  setOpenDropdown(null);
                                }}
                                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md max-w-[120px] ${
                                  isModuleActive
                                    ? "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]"
                                    : "hover:bg-[var(--color-tertiary)] hover:text-[var(--color-on-tertiary)]"
                                }`}
                              >
                                <div className="overflow-hidden max-w-[80px]">
                                  <span
                                    className={`inline-block whitespace-nowrap ${
                                      item.name.length > 7 ? "hover:animate-scroll" : ""
                                    }`}
                                  >
                                    {item.name}
                                  </span>
                                </div>
                              </Link>
                            )
                          }
                          </div>
                        )})}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="relative" ref={settingsRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 rounded-full hover:bg-[var(--hover-bg)] transition"
            >
              <Settings className="h-5 w-5" />
            </button>

            <AnimatePresence>
              {isSettingsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }} // 👈 this is the key
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute right-0 mt-2 w-48 bg-background rounded-xl py-2 z-50"
                  style={{ boxShadow: "var(--dropdown-shadow)" }}
                >
                  <Link
                    href="/support"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--hover-bg)]"
                  >
                    <Cable className="h-4 w-4 shrink-0" />
                    <span>Support</span>
                  </Link>
                  <Link
                    href="accountSettings"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--hover-bg)]"
                  >
                    <ShieldUser className="h-4 w-4 shrink-0" />
                    <span>Account Settings</span>
                  </Link>
                  {isAdmin && (
                    <Link
                      href="appSettings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--hover-bg)]"
                    >
                      <BadgeAlert className="h-4 w-4 shrink-0" />
                      <span>App Settings</span>
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* =============== Mobile Menu =============== */}
        {isMobileMenuOpen && (
        <div
          className="md:hidden bg-background px-4 py-4 space-y-4 text-sm font-medium"
          style={{
            borderTopColor: "var(--border-top)",
            height: "calc(100vh - 64px - 40px)",
          }}
        >
          {/* Top Row: Search + Settings */}
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <SearchBar />
            </div>

            {/* Settings Button */}
            <div className="relative shrink-0" ref={settingsRef}>
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="p-2 rounded-full hover:bg-[var(--hover-bg)] transition"
              >
                <Settings className="h-5 w-5" />
              </button>

              {isSettingsOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-background rounded-xl py-2 z-50"
                  style={{ boxShadow: "var(--dropdown-shadow)" }}
                >
                  <Link href="/support" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--hover-bg)]">
                    <Cable className="h-4 w-4 shrink-0" />
                    <span>Support</span>
                  </Link>
                  <Link href="/accountSettings" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--hover-bg)]">
                    <ShieldUser className="h-4 w-4 shrink-0" />
                    <span>Account Settings</span>
                  </Link>
                  {isAdmin && (
                    <Link href="/appSettings" className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--hover-bg)]">
                      <BadgeAlert className="h-4 w-4 shrink-0" />
                      <span>App Settings</span>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Modules */}
          <div
            className="overflow-y-auto max-h-[calc(100vh-64px-38px)] px-4 py-4 space-y-4"
            onWheel={(e) => {
              const el = e.currentTarget;
              const atTop = el.scrollTop === 0 && e.deltaY < 0;
              const atBottom =
                el.scrollHeight - el.scrollTop === el.clientHeight &&
                e.deltaY > 0;
              if (atTop || atBottom) e.preventDefault();
            }}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              const isModuleActive =
                item.headings?.some((heading) =>
                  heading.subItems?.some((sub) => pathname === sub.path)
                ) || item.subItems?.some((sub) => pathname === sub.path);

              const hasChildren = item.headings || item.subItems;

              return (
                <div key={item.path} className="space-y-1">
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        setOpenMobileDropdown(
                          openMobileDropdown === item.name ? null : item.name
                        );
                      } else {
                        setIsMobileMenuOpen(false);
                        router.push(item.path);
                      }
                    }}
                    className={`flex justify-between w-full text-left px-3 py-2 rounded-md items-center max-w-full
                      ${
                        isModuleActive
                          ? "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]"
                          : "hover:bg-[var(--color-tertiary)] hover:text-[var(--color-on-tertiary)]"
                      }`}
                  >
                    {/* Name */}
                    <div
                      className="overflow-hidden max-w-[230px]"
                      onClick={() => {
                        if (!hasChildren) {
                          setIsMobileMenuOpen(false);
                          router.push(item.path);
                        }
                      }}
                    >
                      <span className={`inline-block whitespace-nowrap ${item.name.length > 42 ? "auto-scroll" : ""}`}>
                        {item.name}
                      </span>
                    </div>

                    {hasChildren && (
                      <svg
                        className={`ml-2 h-4 w-4 transition-transform ${
                          openMobileDropdown === item.name ? "rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>

                  {/* Dropdown */}
                  {openMobileDropdown === item.name && hasChildren && (
                    <div className="pl-4 space-y-2">
                      {item.headings &&
                        item.headings.map((heading) => (
                          <div key={heading.title} className="space-y-1">
                            <p className="flex items-center text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1 whitespace-break-spaces max-w-full">
                              {heading.icon && <heading.icon className="h-4 w-4 mr-2" />}
                              {heading.title}
                            </p>

                            <div className="space-y-1 max-w-full">
                              {heading.subItems.map((sub) => {
                                const isActiveSub = pathname === sub.path;
                                return (
                                  <Link
                                    key={sub.path}
                                    href={sub.path}
                                    onClick={() => {
                                      setActive(item.name);
                                      setIsMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center px-2 py-1 rounded overflow-hidden
                                      ${
                                        isActiveSub
                                          ? "bg-[var(--color-secondary)] text-[var(--color-on-secondary)]"
                                          : "hover:bg-[var(--color-tertiary)] hover:text-[var(--color-on-tertiary)]"
                                      }`}
                                  >
                                    {sub.icon && <sub.icon className="h-4 w-4 mr-2 shrink-0" />}
                                    <span className={`inline-block whitespace-nowrap ${sub.name.length > 35 ? "auto-scroll" : ""}`}>
                                      {sub.name}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))}

                      {item.subItems &&
                        item.subItems.map((sub) => {
                          const isActiveSub = pathname === sub.path;
                          return (
                            <Link
                              key={sub.path}
                              href={sub.path}
                              onClick={() => {
                                setActive(item.name);
                                setIsMobileMenuOpen(false);
                              }}
                              className={`flex items-center px-2 py-1 text-sm rounded overflow-hidden
                                ${
                                  isActiveSub
                                    ? "text-[var(--color-secondary)]"
                                    : "hover:bg-[var(--color-tertiary)] hover:text-[var(--color-on-tertiary)]"
                                }`}
                            >
                              {sub.icon && <sub.icon className="h-4 w-4 mr-2 shrink-0" />}
                              <span className={`inline-block whitespace-nowrap ${sub.name.length > 12 ? "auto-scroll" : ""}`}>
                                {sub.name}
                              </span>
                            </Link>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
)}

      </nav>
    </div>
  );
};

export default Page;
