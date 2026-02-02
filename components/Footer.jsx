export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://www.linkedin.com/in/clifford-ondieki-tpm/" className="text-gray-400 hover:text-[--highlight-gold] transition duration-300" aria-label="LinkedIn Profile">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>

        <p className="text-gray-400 text-sm mb-4">
          Copyright © {new Date().getFullYear()} Clifford Ondieki | Bridging technology with purpose — energizing change one system at a time.
        </p>
        <p className="text-xs space-x-4">
          <a href="/privacy-policy" className="text-gray-500 hover:text-white transition">Privacy Policy</a>
        </p>
      </div>
    </footer>
  );
}