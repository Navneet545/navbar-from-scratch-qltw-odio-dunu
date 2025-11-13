"use client";
import { createContext, useContext, useState } from "react";
import en from "@/locales/en.json";
import hi from "@/locales/hi.json";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "hi" : "en"));
  };

  const translations = lang === "en" ? en : hi;

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t: translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
