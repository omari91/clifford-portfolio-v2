'use client';
import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent');
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('cookie-consent', '1');
    setVisible(false);
    // TODO: dynamically load analytics (Clarity) if desired
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-6 shadow-2xl z-50 border-t-4 border-indigo-600">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-300">
          <p className="mb-1 font-bold text-white">🍪 Cookie Consent</p>
          <p>We use cookies (Microsoft Clarity) to analyze traffic and improve user experience.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={accept} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700">Accept</button>
        </div>
      </div>
    </div>
  );
}