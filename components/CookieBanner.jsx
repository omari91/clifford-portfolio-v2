'use client';
import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [isAnimatedIn, setIsAnimatedIn] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent');
    if (!accepted) setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setIsAnimatedIn(true), 20);
    return () => window.clearTimeout(timer);
  }, [visible]);

  function hideBanner() {
    setIsAnimatedIn(false);
    window.setTimeout(() => setVisible(false), 180);
  }

  function accept() {
    localStorage.setItem('cookie-consent', '1');
    hideBanner();
    if (typeof window !== 'undefined' && !window.clarity) {
      window.clarity =
        window.clarity ||
        function (...args) {
          (window.clarity.q = window.clarity.q || []).push(args);
        };

      const existingScript = document.querySelector(
        'script[src="https://www.clarity.ms/tag/t41xxbb71x"]'
      );
      if (!existingScript) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.clarity.ms/tag/t41xxbb71x';
        document.head.appendChild(script);
      }
    }
  }

  function decline() {
    localStorage.setItem('cookie-consent', '0');
    hideBanner();
  }

  if (!visible) return null;

  return (
    <div
      id="cookie-banner"
      className={`cookie-banner fixed bottom-3 left-3 right-3 md:left-6 md:right-auto md:bottom-6 md:max-w-md liquid-card text-slate-800 p-4 rounded-xl shadow-2xl z-50 transform transition-all duration-300 ease-out ${
        isAnimatedIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-semibold text-slate-900">Cookie Settings</h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          This website uses cookies to enhance your experience and analyze traffic.
          By clicking "Accept", you consent to use of cookies in accordance with the Privacy Policy.
          You can change your cookie settings at any time. For more information on how we use cookies and protect your data, please see Privacy Policy. This helps comply with GDPR regulations.
        </p>
        <div className="buttons flex gap-2 pt-1">
          <button
            id="cookie-accept"
            onClick={accept}
            className="accept button primary px-3 py-1.5 text-sm rounded-full liquid-pill-active transition-colors duration-300"
          >
            Accept
          </button>
          <button
            id="cookie-decline"
            onClick={decline}
            className="decline button secondary px-3 py-1.5 text-sm rounded-full liquid-pill text-slate-700 transition-colors duration-300"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
