"use client";

import { useEffect, useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "de">("en");
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("site-language");
    if (stored === "de" || stored === "en") {
      setLanguage(stored);
    }

    const handleLanguageChange = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === "de" || detail === "en") {
        setLanguage(detail);
      }
    };

    window.addEventListener("language-change", handleLanguageChange);
    return () =>
      window.removeEventListener("language-change", handleLanguageChange);
  }, []);

  useEffect(() => {
    const syncHash = () => {
      setActiveHash(window.location.hash || "");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[60]">
      {open && (
        <div className="w-[calc(100vw-1.5rem)] max-w-[340px] sm:max-w-[380px] liquid-card rounded-2xl shadow-2xl overflow-hidden mb-3">
          <div className="flex items-center justify-between px-4 py-3 liquid-pill">
            <div className="font-semibold text-sm">Clifford AI</div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-slate-600 hover:text-slate-900 text-xs transition duration-300"
            >
              Close
            </button>
          </div>
          <div className="px-4 py-6 text-sm text-slate-700 space-y-3">
            <div className="rounded-xl liquid-pill px-3 py-2">
              {language === "de"
                ? "Chat ist in Entwicklung."
                : "Chat is under development."}
            </div>
            <p className="text-xs text-slate-500">
              {language === "de"
                ? "Bitte nutzen Sie vorerst diese Bereiche:"
                : "For now, please explore these sections:"}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="#projects"
                aria-disabled={activeHash === "#projects"}
                onClick={(event) => {
                  if (activeHash === "#projects") {
                    event.preventDefault();
                  }
                }}
                className={`rounded-full liquid-pill px-3 py-1 text-xs font-semibold text-slate-700 transition duration-300 ${
                  activeHash === "#projects"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {language === "de" ? "Projekte" : "Projects"}
              </a>
              <a
                href="#about"
                aria-disabled={activeHash === "#about"}
                onClick={(event) => {
                  if (activeHash === "#about") {
                    event.preventDefault();
                  }
                }}
                className={`rounded-full liquid-pill px-3 py-1 text-xs font-semibold text-slate-700 transition duration-300 ${
                  activeHash === "#about" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {language === "de" ? "Über mich" : "About"}
              </a>
              <a
                href="#contact"
                aria-disabled={activeHash === "#contact"}
                onClick={(event) => {
                  if (activeHash === "#contact") {
                    event.preventDefault();
                  }
                }}
                className={`rounded-full liquid-pill px-3 py-1 text-xs font-semibold text-slate-700 transition duration-300 ${
                  activeHash === "#contact"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {language === "de" ? "Kontakt" : "Contact"}
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full liquid-pill-active px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base shadow-lg transition duration-300"
      >
        {open ? "Hide Chat" : "Chat"}
      </button>
    </div>
  );
}
