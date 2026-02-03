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
    <div className="fixed bottom-6 right-6 z-[60]">
      {open && (
        <div className="w-[340px] sm:w-[380px] rounded-2xl shadow-2xl border border-slate-200 bg-white overflow-hidden mb-3">
          <div className="flex items-center justify-between px-4 py-3 bg-indigo-900 text-white">
            <div className="font-semibold text-sm">Clifford AI</div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-xs"
            >
              Close
            </button>
          </div>
          <div className="px-4 py-6 text-sm text-slate-700 space-y-3">
            <div className="rounded-xl bg-slate-100 px-3 py-2">
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
                className={`rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 ${
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
                className={`rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 ${
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
                className={`rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 ${
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
        className="rounded-full bg-indigo-700 text-white px-4 py-3 shadow-lg hover:bg-indigo-600 transition"
      >
        {open ? "Hide Chat" : "Chat"}
      </button>
    </div>
  );
}
