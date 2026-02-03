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

  function decline() {
    localStorage.setItem('cookie-consent', '0');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      id="cookie-banner"
      className="cookie-banner fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-6 shadow-2xl z-50 border-t-4 border-indigo-600"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        <h2 className="text-lg font-bold">Cookie Settings</h2>
        <p className="text-sm text-gray-300">
          This website uses cookies to enhance your experience, analyze our traffic, and for marketing purposes.
        </p>
        <p className="text-sm text-gray-300">
          By clicking &quot;Accept&quot;, you consent to our use of cookies in accordance with our Privacy Policy.
        </p>
        <p className="text-sm text-gray-300">
          You can change your cookie settings at any time. For more information on how we use cookies and protect your data, please see our Privacy Policy. This helps us comply with GDPR regulations.
        </p>
        <div className="buttons flex gap-3 pt-2">
          <button
            id="cookie-accept"
            onClick={accept}
            className="accept button primary px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Accept
          </button>
          <button
            id="cookie-decline"
            onClick={decline}
            className="decline button secondary px-4 py-2 rounded border border-gray-600 text-gray-200 hover:bg-gray-800"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
