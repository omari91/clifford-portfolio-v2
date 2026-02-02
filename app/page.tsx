"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    gsap?: any;
    ScrollTrigger?: any;
    lucide?: any;
    clarity?: any;
  }
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lucideReady, setLucideReady] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);
  const [cookieVisible, setCookieVisible] = useState(false);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (!lucideReady) return;
    if (window.lucide?.createIcons) {
      window.lucide.createIcons();
    }
  }, [lucideReady]);

  useEffect(() => {
    if (!gsapReady) return;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#hero-content", {
      duration: 1,
      y: 0,
      opacity: 1,
      ease: "power3.out",
      delay: 0.2,
    });

    gsap.to("#hero-image", {
      duration: 1,
      x: 0,
      opacity: 1,
      ease: "power3.out",
      delay: 0.4,
    });

    gsap.utils.toArray(".gsap-section").forEach((section: any) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    });

    gsap.utils.toArray(".gsap-stagger-container").forEach((container: any) => {
      const cards = container.querySelectorAll(".gsap-card");
      if (cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)",
        });
      }
    });
  }, [gsapReady]);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setCookieVisible(true);
    } else if (consent === "accepted") {
      loadClarityScript();
    }
  }, []);

  const loadClarityScript = () => {
    if (document.getElementById("clarity-script")) return;

    if (typeof window.clarity !== "function") {
      window.clarity = function () {
        (window.clarity.q = window.clarity.q || []).push(arguments);
      };
    }

    const script = document.createElement("script");
    script.id = "clarity-script";
    script.async = true;
    script.src = "https://www.clarity.ms/tag/t41xxbb71x";
    document.head.appendChild(script);
  };

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setCookieVisible(false);
    loadClarityScript();
  };

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "declined");
    setCookieVisible(false);
  };

  return (
    <>
      <Script
        src="https://unpkg.com/lucide@latest"
        strategy="afterInteractive"
        onLoad={() => setLucideReady(true)}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
        strategy="afterInteractive"
        onLoad={() => setGsapReady(true)}
      />

      <div className="bg-gray-50 antialiased">
        <nav className="fixed top-0 z-50 w-full bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <a
                className="flex items-center space-x-2 text-xl font-bold text-gray-800"
                href="/"
              >
                <div className="flex-shrink-0">
                  <img
                    src="/imgs/man.jpg"
                    alt="Clifford Ondieki Icon"
                    className="w-11 h-11 rounded-full border-4 border-[#303f9f] shadow-md bg-white object-cover"
                  />
                </div>
                <span>
                  Clifford Ondieki{" "}
                  <span className="text-sm font-normal text-[--primary-indigo] ml-1 hidden sm:inline-block">
                    | Power Systems Engineer
                  </span>
                </span>
              </a>

              <div className="md:hidden">
                <button
                  id="mobile-menu-button"
                  type="button"
                  className="text-gray-500 hover:text-[--primary-indigo] focus:outline-none focus:ring-2 focus:ring-[--primary-indigo] rounded-lg p-2"
                  aria-controls="mobile-menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      className={menuOpen ? "hidden" : ""}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                    <path
                      className={menuOpen ? "" : "hidden"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="hidden md:flex md:items-center md:space-x-6">
                <a
                  href="/"
                  className="text-gray-600 hover:text-[--primary-indigo] px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-[--primary-indigo] px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                >
                  About
                </a>
                <a
                  href="/projects"
                  className="text-[--primary-indigo] bg-[--primary-indigo]/10 px-3 py-2 rounded-md text-sm font-bold transition duration-150"
                >
                  Projects
                </a>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-[--primary-indigo] px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                >
                  Contact
                </a>

                <div className="flex space-x-1 ml-4 border-l pl-4">
                  <a
                    href="/"
                    className="language-toggle en active text-xs font-semibold py-1 px-3 rounded-full border border-[--primary-indigo] text-white transition"
                  >
                    EN
                  </a>
                  <a
                    href="/index-de"
                    className="language-toggle de text-xs font-semibold py-1 px-3 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700 transition"
                  >
                    DE
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            id="mobile-menu"
            className={`md:hidden ${menuOpen ? "" : "hidden"}`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="/"
                className="text-gray-600 hover:text-[--primary-indigo] block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-gray-600 hover:text-[--primary-indigo] block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </a>
              <a
                href="/projects"
                className="text-[--primary-indigo] bg-[--primary-indigo]/10 block px-3 py-2 rounded-md text-base font-bold"
              >
                Projects
              </a>
              <a
                href="/contact"
                className="text-gray-600 hover:text-[--primary-indigo] block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </a>
              <div className="flex space-x-2 pt-2">
                <a
                  href="/"
                  className="language-toggle en active text-sm font-semibold py-1 px-3 rounded-full bg-[--primary-indigo] text-white"
                >
                  EN
                </a>
                <a
                  href="/index-de"
                  className="language-toggle de text-sm font-semibold py-1 px-3 rounded-full border border-gray-300 hover:bg-gray-100 text-gray-700"
                >
                  DE
                </a>
              </div>
            </div>
          </div>
        </nav>

        <section
          className="relative h-screen flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "url('/imgs/website.png')" }}
          aria-label="Professional background image of Clifford Ondieki"
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-indigo-900/70 to-gray-900/80"
            aria-hidden="true"
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div
                id="hero-content"
                className="md:w-3/5 lg:w-1/2 text-center md:text-left opacity-0 translate-y-8"
              >
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
                  Power Systems &amp; <br /> Grid Integration Specialist
                </h1>
                <p className="text-lg text-gray-200 mb-8">
                  I bridge the gap between{" "}
                  <span className="font-semibold text-yellow-400">
                    Grid Simulation (PowerFactory)
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-yellow-400">
                    Real-World grid integration. Specializing in Voltage
                    Stability, Renewable Integration, and Automation;
                  </span>{" "}
                  to engineer the{" "}
                  <span className="font-semibold text-rose-400">
                    Target Grid 2045
                  </span>
                  .
                </p>
                <div
                  className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                  role="group"
                  aria-label="Call to action buttons"
                >
                  <a
                    href="/projects"
                    className="py-3 px-8 rounded-full bg-yellow-500 text-gray-900 font-bold shadow-lg cta-primary transition duration-300 transform hover:scale-105 text-center focus:outline-none focus:ring-4 focus:ring-yellow-400"
                  >
                    View Engineering Portfolio
                  </a>
                  <a
                    href="/contact"
                    className="py-3 px-8 rounded-full border-2 border-yellow-400 text-yellow-400 font-bold cta-secondary transition duration-300 transform hover:bg-yellow-50 hover:text-gray-900 hover:scale-105 text-center focus:outline-none focus:ring-4 focus:ring-yellow-400"
                  >
                    Schedule a Conversation Today
                  </a>
                </div>
              </div>
              <div
                id="hero-image"
                className="md:w-2/5 lg:w-1/2 flex justify-center mt-12 md:mt-0 opacity-0 translate-x-8"
              >
                <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                  <img
                    src="/imgs/GOAT.jpg"
                    alt="Clifford Ondieki"
                    className="rounded-full w-full h-full object-cover shadow-2xl border-8 border-white/10"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white text-indigo-900 px-4 py-2 rounded-lg shadow-xl font-bold text-sm flex items-center animate-blink">
                    <span className="text-yellow-500 mr-2">🏆</span> IEEE Best
                    Paper 2025 Winner (Intelligent Transportation Track)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="py-4 lg:py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* SERVICE AREAS */}
            <section className="mb-16">
              <div
                className="bg-white p-10 rounded-xl shadow-2xl border-l-8 border-indigo-800"
                role="region"
                aria-labelledby="section-engineering-intelligence"
              >
                <h2
                  id="section-engineering-intelligence"
                  className="text-3xl font-extrabold text-indigo-800 mb-4 text-center"
                >
                  Engineering the Future Grid
                </h2>
                <p className="text-center text-lg text-gray-700 max-w-4xl mx-auto mb-8">
                  From static load flow analysis to dynamic stability, I deliver
                  solutions that ensure regulatory compliance (VDE 4110) and
                  operational efficiency.
                </p>

                <div
                  className="grid md:grid-cols-3 gap-8 text-center mt-6"
                  role="list"
                  aria-label="Key service areas"
                >
                  <a
                    href="/projects#grid-simulation"
                    className="block p-4 rounded-lg border-2 border-transparent transition-all duration-300 hover:shadow-lg hover:border-indigo-600 hover:scale-[1.03] group"
                    role="listitem"
                  >
                    <div className="w-10 h-10 mx-auto mb-3 text-yellow-400 transition-all duration-300 group-hover:scale-110">
                      <i data-lucide="zap" className="w-full h-full"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1 transition-all duration-300 group-hover:text-indigo-700">
                      Grid Simulation (RMS/EMT)
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Automating stability studies and Load Flow Analysis using{" "}
                      <strong>PowerFactory</strong> and Python to ensure
                      renewable integration.
                    </p>
                    <span className="inline-block mt-3 text-sm font-semibold text-indigo-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      See Project &rarr;
                    </span>
                  </a>

                  <a
                    href="/projects#optimization"
                    className="block p-4 rounded-lg border-2 border-transparent transition-all duration-300 hover:shadow-lg hover:border-indigo-600 hover:scale-[1.03] group"
                    role="listitem"
                  >
                    <div className="w-10 h-10 mx-auto mb-3 text-yellow-400 transition-all duration-300 group-hover:scale-110">
                      <i data-lucide="cpu" className="w-full h-full"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1 transition-all duration-300 group-hover:text-indigo-700">
                      Optimization &amp; AI
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Deploying <strong>Fuzzy Logic</strong> and{" "}
                      <strong>NSGA-II</strong> algorithms to solve
                      multi-objective constraints for EV charging and §14a
                      EnWG.
                    </p>
                    <span className="inline-block mt-3 text-sm font-semibold text-indigo-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      See Project &rarr;
                    </span>
                  </a>

                  <a
                    href="/projects#digital-ops"
                    className="block p-4 rounded-lg border-2 border-transparent transition-all duration-300 hover:shadow-lg hover:border-indigo-600 hover:scale-[1.03] group"
                    role="listitem"
                  >
                    <div className="w-10 h-10 mx-auto mb-3 text-yellow-400 transition-all duration-300 group-hover:scale-110">
                      <i data-lucide="activity" className="w-full h-full"></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-1 transition-all duration-300 group-hover:text-indigo-700">
                      Digital Grid Operations
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Translating complex engineering requirements into agile
                      digital products and reliable validation workflows.
                    </p>
                    <span className="inline-block mt-3 text-sm font-semibold text-indigo-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      See Project &rarr;
                    </span>
                  </a>
                </div>
              </div>
            </section>

            <section className="mb-16 gsap-section">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    From Power Systems to Product and Back to Engineering
                  </h2>
                  <p className="text-lg leading-relaxed mb-4">
                    Operating as a{" "}
                    <strong>Graduate Researcher in Grid Optimization</strong>{" "}
                    (M.Sc. Candidate, 2026), I recently received the{" "}
                    <strong className="text-indigo-800">
                      🏆 IEEE ETECOM 2025 Best Paper Award
                    </strong>{" "}
                    for optimizing EV charging infrastructure by achieving 15%
                    cost reduction while improving grid reliability across 500+
                    scenarios.
                  </p>
                  <p className="text-base mb-6">
                    Before returning to core engineering, I scaled digital
                    systems with{" "}
                    <a
                      href="https://www.elephant.healthcare/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="deep-link deep-link-fire"
                    >
                      <strong>Elephant Healthcare</strong>
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://www.ilarahealth.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="deep-link deep-link-fire"
                    >
                      <strong>Ilara Health</strong>
                    </a>{" "}
                    learning how technical solutions actually get adopted and
                    sustained in the real world.
                    <br />
                    <br />
                    Now focused on{" "}
                    <strong>
                      grid integration, renewable energy, and power systems
                      simulation
                    </strong>{" "}
                    for Germany's energy transition.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                      <span>M.Sc. Engineering Management (2026)</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>IEEE &amp; VDI Member</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Berlin, Germany</span>
                    </div>
                  </div>

                  <a
                    href="/about"
                    className="inline-block py-3 px-6 rounded-full bg-indigo-800 text-white font-semibold hover:bg-indigo-700 transition duration-300 mt-6"
                  >
                    Discover My Story
                  </a>
                </div>
                <div className="bg-gradient-to-br from-indigo-900 to-gray-700 p-8 rounded-xl text-white shadow-xl transform transition hover:scale-105 duration-300">
                  <h4 className="text-xl font-semibold mb-3">
                    Simulation Meets Reality
                  </h4>
                  <p className="opacity-90">
                    "The best engineering works in PowerFactory <em>and</em> in
                    the field. My path from power systems simulation to
                    commercial operations taught me to design solutions that are
                    technically robust and commercially viable—whether modeling
                    grid stability or commissioning renewable installations."
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16 gsap-section mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Featured Research
                </h2>
                <p className="text-lg text-gray-600">
                  Solving the §14a EnWG Challenge with Math
                </p>
              </div>
              <div className="max-w-5xl mx-auto">
                <div className="bg-blue-50 p-8 rounded-xl border-l-4 border-blue-500 text-center shadow-lg hover:shadow-2xl transition duration-500">
                  <h3 className="text-3xl font-bold text-blue-800 mb-4">
                    IEEE Best Paper Award (2025): Robust EV Grid Integration
                  </h3>
                  <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
                    Traditional grid planning fails under uncertainty. My
                    research developed a{" "}
                    <span className="font-semibold">
                      Fuzzy Multi-Objective Optimization Framework
                    </span>{" "}
                    that balances grid constraints with user equity, creating a
                    robust solution for the deployment of EV infrastructure in
                    Berlin.
                  </p>
                  <div className="inline-block bg-white p-6 rounded-2xl shadow-xl border-4 border-green-500 mb-8 transform hover:rotate-2 transition duration-300">
                    <p className="text-xl font-semibold text-gray-600 mb-2">
                      Optimization Result
                    </p>
                    <p className="text-6xl font-black text-green-600">+15%</p>
                    <p className="text-lg mt-2 text-gray-700">
                      Cost Reduction vs. Deterministic Planning
                    </p>
                  </div>
                  <br />
                  <a
                    href="/ev"
                    className="inline-block py-3 px-8 rounded-full bg-indigo-800 text-white font-bold text-lg shadow-xl hover:bg-indigo-700 transition duration-300"
                  >
                    Read the Full Case Study
                  </a>
                </div>
              </div>
            </section>

            <section className="mb-16 gsap-section">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Skills, Tools &amp; Platforms
                </h2>
                <p className="text-lg text-gray-600">
                  A blend of technical and professional proficiencies
                </p>
              </div>

              <div className="gsap-stagger-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                <div className="gsap-card bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-800">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Engineering Toolkit
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">
                        <strong>Grid Simulation:</strong> DIgSILENT PowerFactory
                        (Python API), MATLAB/Simulink
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">
                        <strong>Optimization:</strong> Python (Pandas, SciPy),
                        NSGA-II, Fuzzy Logic Control
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">
                        <strong>Automation:</strong> SCADA Basics, PLC
                        Programming, Pandapower
                      </span>
                    </div>
                  </div>
                </div>

                <div className="gsap-card bg-indigo-50 p-8 rounded-xl shadow-lg border-t-4 border-indigo-600">
                  <h3 className="text-2xl font-semibold text-indigo-900 mb-6 text-center">
                    Regulatory Competence
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center bg-white p-3 rounded shadow-sm">
                      <div className="bg-indigo-100 p-2 rounded mr-3 text-indigo-700 font-bold">
                        VDE
                      </div>
                      <span className="text-gray-800 font-medium">
                        VDE-AR-N 4110 / 4120
                      </span>
                    </div>
                    <div className="flex items-center bg-white p-3 rounded shadow-sm">
                      <div className="bg-indigo-100 p-2 rounded mr-3 text-indigo-700 font-bold">
                        EnWG
                      </div>
                      <span className="text-gray-800 font-medium">
                        §14a (Steuerbare Verbrauchseinrichtungen)
                      </span>
                    </div>
                    <div className="flex items-center bg-white p-3 rounded shadow-sm">
                      <div className="bg-indigo-100 p-2 rounded mr-3 text-indigo-700 font-bold">
                        IEC
                      </div>
                      <span className="text-gray-800 font-medium">
                        IEC 61850 (Substation Automation)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="gsap-card bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-800 md:col-span-2 lg:col-span-1">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Technical Leadership &amp; Delivery
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">
                        Techno-Economic Analysis
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">
                        Stakeholder Requirement Analysis
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">
                        Systems Thinking, Cross-Domain Innovation
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">
                        Agile/Scrum Methodologies
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-800">
                <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
                  Tech Stack &amp; Platforms
                </h3>
                <div className="overflow-hidden">
                  <div className="flex animate-scroll space-x-8">
                    <div className="flex space-x-8 min-w-max">
                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/python.svg"
                            alt="Python"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          Python
                        </span>
                      </div>

                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/aws.svg"
                            alt="AWS Cloud"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          AWS / Cloud
                        </span>
                      </div>

                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/PowerFactory.svg"
                            alt="PowerFactory"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          PowerFactory
                        </span>
                      </div>

                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/pp.svg"
                            alt="Pandapower"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          Pandapower
                        </span>
                      </div>

                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/github.svg"
                            alt="GitHub/Git"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          Git / CI/CD
                        </span>
                      </div>

                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/docker.svg"
                            alt="Docker"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          Docker
                        </span>
                      </div>

                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/mongodb.svg"
                            alt="MongoDB"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          MongoDB
                        </span>
                      </div>

                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/tensorflow.svg"
                            alt="TensorFlow"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          TensorFlow
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-8 min-w-max">
                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/python.svg"
                            alt="Python"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          Python
                        </span>
                      </div>
                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/aws.svg"
                            alt="AWS Cloud"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          AWS / Cloud
                        </span>
                      </div>
                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/PowerFactory.svg"
                            alt="PowerFactory"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          PowerFactory
                        </span>
                      </div>
                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/pp.svg"
                            alt="Pandapower"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          Pandapower
                        </span>
                      </div>
                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/github.svg"
                            alt="GitHub/Git"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          Git / CI/CD
                        </span>
                      </div>
                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/docker.svg"
                            alt="Docker"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          Docker
                        </span>
                      </div>
                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/mongodb.svg"
                            alt="MongoDB"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          MongoDB
                        </span>
                      </div>
                      <div className="flex flex-col items-center group min-w-[100px]">
                        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                          <img
                            src="/imgs/tensorflow.svg"
                            alt="TensorFlow"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-600 text-center font-medium">
                          TensorFlow
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-16 mt-12 lg:mt-20 gsap-section">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Affiliations
                </h2>
                <div className="flex gap-6 overflow-x-auto py-4 px-2 -mx-2 snap-x snap-mandatory">
                  <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <a
                      href="https://www.ieee.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit IEEE Website"
                      className="mb-3"
                    >
                      <img
                        src="/imgs/ieee.png"
                        alt="IEEE Logo"
                        className="h-10 w-auto transition duration-300 hover:opacity-80"
                      />
                    </a>
                    <p className="text-xs text-gray-600 text-center">
                      Member &amp; Researcher, IEEE 2025
                    </p>
                  </div>

                  <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <a
                      href="https://www.vdi.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit VDI Website"
                      className="mb-3"
                    >
                      <img
                        src="/imgs/VDI.svg"
                        alt="VDI Logo"
                        className="h-10 w-auto transition duration-300 hover:opacity-80"
                      />
                    </a>
                    <p className="text-xs text-gray-600 text-center">
                      Member, 2025
                    </p>
                  </div>

                  <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <a
                      href="https://www.vde.com/en"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit VDE Website"
                      className="mb-3"
                    >
                      <img
                        src="/imgs/VDE.svg"
                        alt="VDE Logo"
                        className="h-10 w-auto transition duration-300 hover:opacity-80"
                      />
                    </a>
                    <p className="text-xs text-gray-600 text-center">
                      Member, 2025
                    </p>
                  </div>

                  <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-blue-100 p-4 rounded-lg shadow-md border border-blue-200">
                    <a
                      href="https://www.kiron.ngo"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Kiron Website"
                      className="mb-3"
                    >
                      <img
                        src="/imgs/kiron.svg"
                        alt="Kiron Logo"
                        className="h-10 w-auto transition duration-300 hover:opacity-80"
                      />
                    </a>
                    <p className="text-xs text-gray-600 text-center">
                      Kiron Open Higher Education 2025
                    </p>
                  </div>

                  <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <a
                      href="https://www.joinimagine.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Imagine Foundation Website"
                      className="mb-3"
                    >
                      <img
                        src="/imgs/imagine.webp"
                        alt="Imagine Foundation Logo"
                        className="h-10 w-auto transition duration-300 hover:opacity-80"
                      />
                    </a>
                    <p className="text-xs text-gray-600 text-center">
                      Imagine Foundation 2023
                    </p>
                  </div>

                  <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <a
                      href="https://www.ashoka.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Ashoka Website"
                      className="mb-3"
                    >
                      <img
                        src="/imgs/ashoka.png"
                        alt="Ashoka Logo"
                        className="h-10 w-auto transition duration-300 hover:opacity-80"
                      />
                    </a>
                    <p className="text-xs text-gray-600 text-center">
                      Ashoka Network 2024
                    </p>
                  </div>

                  <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <a
                      href="https://www.alxafrica.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Alx Website"
                      className="mb-3"
                    >
                      <img
                        src="/imgs/alx.svg"
                        alt="alx Logo"
                        className="h-10 w-auto transition duration-300 hover:opacity-80"
                      />
                    </a>
                    <p className="text-xs text-gray-600 text-center">
                      Alx Network 2018
                    </p>
                  </div>

                  <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <a
                      href="https://www.ebk.go.ke/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit EBK Website"
                      className="mb-3"
                    >
                      <img
                        src="/imgs/ebk.png"
                        alt="ebk Logo"
                        className="h-10 w-auto transition duration-300 hover:opacity-80"
                      />
                    </a>
                    <p className="text-xs text-gray-600 text-center">
                      Engineers Board of Kenya 2016
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-16 gsap-section">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  My Philosophy
                </h2>
                <p className="text-lg text-gray-600">Core Beliefs</p>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-br from-indigo-900 to-gray-700 p-8 rounded-xl text-white text-center shadow-2xl">
                  <h4 className="text-2xl font-semibold mb-4">
                    "Smart Laziness" &amp; Systemic Efficiency
                  </h4>
                  <p className="text-lg mb-4">
                    "True efficiency isn't about working harder—it's about
                    understanding systems so deeply that you can identify the
                    one change that eliminates ten problems."
                  </p>
                  <p className="opacity-90">
                    This principle, learned from debugging transformers in
                    Kenya, now guides how I approach everything from code
                    architecture to team dynamics.
                  </p>
                </div>
                <div className="text-center mt-6">
                  <a
                    href="/about#guiding-quote-card"
                    className="inline-block py-3 px-6 rounded-full border border-indigo-800 text-indigo-800 font-semibold hover:bg-indigo-800 hover:text-white transition duration-300"
                  >
                    Explore My Philosophy
                  </a>
                </div>
              </div>
            </section>
          </div>
        </main>

        <section
          className="py-16 text-white"
          style={{ backgroundColor: "var(--primary-indigo)" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Ready to Build Something Impactful?
            </h2>
            <p className="text-lg font-light mb-6">
              Let's combine technical excellence, operational clarity, and
              business strategy to create solutions that truly matter.
            </p>
            <a
              href="/contact"
              className="inline-block py-3 px-8 rounded-full bg-white text-indigo-900 font-bold text-lg shadow-xl hover:bg-gray-100 transition duration-300"
            >
              Let's Energize Change Together ⚡
            </a>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center space-x-6 mb-6">
              <a
                href="https://www.linkedin.com/in/clifford-ondieki-tpm/"
                className="text-gray-400 hover:text-[--highlight-gold] transition duration-300"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="lucide lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>

            <p className="text-gray-400 text-sm mb-4">
              Copyright &copy; {currentYear} Clifford Ondieki | Bridging
              technology with purpose — energizing change one system at a time.
            </p>
            <p className="text-xs space-x-4">
              <a
                href="/privacy-policy"
                className="text-gray-500 hover:text-white transition"
              >
                Privacy Policy
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="/contact"
                className="text-gray-500 hover:text-white transition"
              >
                Contact
              </a>
            </p>
          </div>
        </footer>

        {cookieVisible && (
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-6 shadow-2xl z-50 border-t-4 border-indigo-600">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-300">
                <p className="mb-1 font-bold text-white">
                  🍪 Cookie Consent / Cookie-Hinweis
                </p>
                <p>
                  We use cookies (Microsoft Clarity) to analyze traffic and
                  improve user experience.{" "}
                  <span className="italic text-gray-400">
                    (Wir verwenden Cookies, um den Traffic zu analysieren.)
                  </span>
                </p>
                <a
                  href="/privacy-policy"
                  className="underline hover:text-indigo-400 mt-1 inline-block"
                >
                  Read Privacy Policy / Datenschutzerklärung
                </a>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={declineCookies}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 rounded-md hover:bg-gray-800 transition"
                >
                  Decline / Ablehnen
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-lg transition"
                >
                  Accept / Akzeptieren
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
