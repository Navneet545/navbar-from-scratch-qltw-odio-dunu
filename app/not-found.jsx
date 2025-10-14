"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-6"
      >
        <AlertTriangle
          className="w-16 h-16 text-[var(--color-secondary)]"
          strokeWidth={1.5}
        />
      </motion.div>

      {/* 404 Text */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-6xl font-bold text-[var(--color-secondary)]"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="mt-3 text-lg text-[var(--text-muted)] max-w-md"
      >
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      {/* Back to Dashboard / Home */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6"
      >
        <Link
          href="/"
          className="inline-flex items-center px-6 py-2 rounded-md bg-[var(--color-secondary)] text-white font-medium hover:opacity-90 transition-all"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}
