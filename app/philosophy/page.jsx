"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Layers, Lightbulb, Puzzle, Users } from "lucide-react";

const reflections = [
  {
    title: "On Technical Mastery",
    quote:
      "Debugging transformers taught me systemic thinking; raising a daughter taught me patience.",
    text:
      "Technical skills and life wisdom inform each other. Patience in debugging is patience in life.",
  },
  {
    title: "On Innovation",
    quote: "Agile isn't just for software—it's for power grids too.",
    text:
      "The principles of iteration, feedback loops, and continuous improvement apply to any complex infrastructure.",
  },
  {
    title: "On Self-Leadership",
    quote: "Where am I still negotiating with my old self?",
    text:
      "Growth requires honest assessment of where I'm holding onto patterns that no longer serve my evolution.",
  },
];

const insights = [
  {
    title: "Today's Reflection",
    text: "Understanding is more important than memorization - My grandfather's wisdom.",
  },
  {
    title: "On Systems",
    text: "Every complex system has simple principles at its core. Find them.",
  },
  {
    title: "On Growth",
    text: "Where am I still negotiating with my old self? Growth requires release.",
  },
  {
    title: "On Innovation",
    text: "The best solutions come from bridging different worlds—like power grids and data.",
  },
];

export default function Philosophy() {
  const [reflectionIndex, setReflectionIndex] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);

  useEffect(() => {
    const reflectionTimer = setInterval(() => {
      setReflectionIndex((prev) => (prev + 1) % reflections.length);
    }, 8000);
    const insightTimer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % insights.length);
    }, 10000);

    return () => {
      clearInterval(reflectionTimer);
      clearInterval(insightTimer);
    };
  }, []);

  const reflection = reflections[reflectionIndex];
  const insight = insights[insightIndex];

  return (
    <div className="bg-gray-50 antialiased">
      <header
        className="py-20 lg:py-24 text-white"
        style={{ backgroundColor: "var(--primary-indigo)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            Engineering Empathy
          </h1>
          <p className="text-xl sm:text-2xl font-light opacity-90 max-w-3xl mx-auto">
            Bridging technical precision with human purpose to build resilient
            systems.
          </p>
        </div>
      </header>

      <main className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-indigo-800">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Core Philosophy: Systems & People
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  The most robust grids—whether electrical or organizational—are
                  built with deep understanding and a commitment to stability.
                </p>
                <p className="text-gray-600 mb-4">
                  This philosophy stems from a belief that true engineering
                  requires more than calculation. It demands the ability to
                  understand the context behind every fault, the operational
                  nuances that shape how systems behave, and the empathy to build
                  solutions that work in the real world, not just in simulation.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-indigo-800">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  "Smart Laziness" & Efficiency
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg text-center mb-6">
                  <p className="text-xl italic text-indigo-800 font-medium">
                    "True efficiency isn't about working harder—it's about
                    understanding systems so deeply that you can identify the
                    one change that eliminates ten problems."
                  </p>
                </div>
                <p className="text-gray-600 mb-6">
                  This principle, learned from debugging transformers in Kenya,
                  guides how I approach engineering tasks. It's about systemic
                  intelligence.
                </p>

                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  How It Works in Engineering:
                </h4>
                <div className="space-y-4">
                  <div className="border-l-4 border-rose-800 pl-4">
                    <h5 className="font-semibold text-gray-800">
                      Deep System Understanding
                    </h5>
                    <p className="text-gray-600">
                      Before coding or modeling, I invest time in understanding
                      component interactions to prevent cascading failures.
                    </p>
                  </div>
                  <div className="border-l-4 border-rose-800 pl-4">
                    <h5 className="font-semibold text-gray-800">
                      Root Cause Focus
                    </h5>
                    <p className="text-gray-600">
                      Instead of patching symptoms, I use data to identify the
                      underlying anomalies in the grid or workflow.
                    </p>
                  </div>
                  <div className="border-l-4 border-rose-800 pl-4">
                    <h5 className="font-semibold text-gray-800">
                      Automation Philosophy
                    </h5>
                    <p className="text-gray-600">
                      If a task is repetitive (like data cleaning or reporting),
                      I write the script to automate it forever.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Reflections on Tech & Life
              </h2>
              <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-amber-400 transition-all duration-500 min-h-[220px] flex flex-col justify-center">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {reflection.title}
                </h4>
                <p className="text-gray-600 italic mb-3">"{reflection.quote}"</p>
                <p className="text-gray-600">{reflection.text}</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Living Philosophy
              </h2>
              <div className="bg-gradient-to-br from-rose-800 to-indigo-900 p-8 rounded-xl text-white text-center min-h-[180px] flex flex-col justify-center items-center transition-all duration-500">
                <h4 className="text-xl font-semibold mb-3">{insight.title}</h4>
                <p className="opacity-90">{insight.text}</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-indigo-800">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Philosophy in Practice
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  These aren't just abstract concepts—they're the practical
                  frameworks I use daily in technical leadership and innovation.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition">
                    <div className="text-[--primary-indigo] mb-3">
                      <Layers className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      In Technical Architecture
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      I design systems with empathy for the developers who will
                      maintain them, the users who will depend on them, and the
                      business stakeholders who need to understand them.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition">
                    <div className="text-[--highlight-gold] mb-3">
                      <Users className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      In Team Leadership
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      I create psychological safety where failure is treated as
                      valuable data, where diverse perspectives are actively
                      sought, and where individual growth serves collective
                      success.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition">
                    <div className="text-[--accent-fire] mb-3">
                      <Puzzle className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      In Problem Solving
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      I invest time in understanding the human context behind
                      technical challenges, ensuring that solutions address not
                      just the immediate problem but the underlying needs.
                    </p>
                  </div>

                  <div className="p-6 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition">
                    <div className="text-indigo-600 mb-3">
                      <Lightbulb className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      In Innovation
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      I bridge different domains of knowledge—bringing power
                      grid principles to healthcare systems, applying Kenyan
                      community values to Berlin tech teams—because the best
                      innovations happen at the intersection of different
                      worlds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <section
        className="py-20 text-white"
        style={{ backgroundColor: "var(--primary-indigo)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Let's Build Resilient Systems
          </h2>
          <p className="text-lg font-light mb-8 opacity-90">
            If these values—systemic thinking, engineering empathy, and
            innovation—align with your team's mission, let's explore how we can
            collaborate.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-full shadow-lg bg-white text-[--primary-indigo] hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            Start the Conversation
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}
