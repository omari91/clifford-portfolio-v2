'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <div className="flex-shrink-0">
              <Image src="/imgs/man.jpg" width={44} height={44} alt="Clifford Ondieki Icon" className="rounded-full border-4 border-[#303f9f] shadow-md bg-white object-cover" />
            </div>
            <span>
              Clifford Ondieki <span className="text-sm font-normal text-[--primary-indigo] ml-1 hidden sm:inline-block">| Power Systems Engineer</span>
            </span>
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/" className="text-gray-600 hover:text-[--primary-indigo] px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-[--primary-indigo] px-3 py-2 rounded-md text-sm font-medium">About</Link>
            <Link href="/projects" className="text-[--primary-indigo] bg-[--primary-indigo]/10 px-3 py-2 rounded-md text-sm font-bold">Projects</Link>
            <Link href="/philosophy" className="text-gray-600 hover:text-[--primary-indigo] px-3 py-2 rounded-md text-sm font-medium">Philosophy</Link>
            <Link href="/blog" className="text-gray-600 hover:text-[--primary-indigo] px-3 py-2 rounded-md text-sm font-medium">Insights</Link>
            <Link href="/contact" className="text-gray-600 hover:text-[--primary-indigo] px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="text-gray-500 hover:text-[--primary-indigo] p-2 rounded-lg">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">Home</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">About</Link>
            <Link href="/projects" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">Projects</Link>
            <Link href="/philosophy" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">Philosophy</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}