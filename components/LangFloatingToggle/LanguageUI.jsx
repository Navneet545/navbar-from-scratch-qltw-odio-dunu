"use client";
import { useLanguage } from "../Context/languageContext";

export default function LanguageFloatingToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-2 right-45 z-50 px-4 py-2 text-sm bg-[var(--color-secondary)] text-white shadow-md rounded-full hover:scale-105 transition"
    >
      {lang === "en" ? "🌐 हिन्दी" : "🌐 English"}
    </button>
  );
}
