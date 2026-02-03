"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Zap, 
  Cpu, 
  Activity, 
  GraduationCap, 
  Menu, 
  X, 
  Linkedin, 
  Github, 
  Award, 
  ArrowRight, 
  Mail, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  CloudLightning, 
  MessageSquare, 
  Shield, 
  Layers, 
  Puzzle, 
  Lightbulb,
  TrendingUp, 
  Leaf, 
  Database, 
  Laptop, 
  Users, 
  FileText, 
  Search,
  TrendingDown, 
  Rocket, 
  ExternalLink,
  Code,
  Terminal,
  Server,
  BarChart3,
  Clock,
  Compass,
  Check,
  Star,
  BookOpen,
  Eye,
  Heart
} from 'lucide-react';
import CookieBanner from '../components/CookieBanner';

/**
 * ============================================================================
 * CLIFFORD ONDIEKI - UNIFIED REACT ECOSYSTEM (VER 3.3.0)
 * ============================================================================
 * * ARCHITECTURE:
 * - Single-file React Application.
 * - Client-side state routing.
 * - Full EN/DE dictionary with verbatim reference file wording.
 * - Interactive District Dashboard (EV Case Study).
 * - Animated Milestone System.
 * - Global Typography: Inter (300-900).
 * * BRANDING:
 * - Primary Indigo: #303F9F
 * - Neutral Charcoal: #374151
 * - Accent Fire: #880E4F
 * - Highlight Gold: #F59E0B
 */

// --- DATA: EV DISTRICT ANALYSIS ---
const DISTRICT_DATA = [
  { name: "Mitte", chargers: 495, bevs: 8900, ratio: 18.0, status: "Healthy", score: 85 },
  { name: "Friedrichshain-Kr.", chargers: 370, bevs: 7500, ratio: 20.3, status: "Healthy", score: 82 },
  { name: "Charlottenburg-W.", chargers: 455, bevs: 9800, ratio: 21.5, status: "Moderate", score: 78 },
  { name: "Tempelhof-Sch.", chargers: 330, bevs: 7200, ratio: 21.8, status: "Moderate", score: 76 },
  { name: "Neukölln", chargers: 255, bevs: 5900, ratio: 23.1, status: "Moderate", score: 72 },
  { name: "Spandau", chargers: 165, bevs: 4500, ratio: 27.3, status: "Critical", score: 55 },
  { name: "Lichtenberg", chargers: 183, bevs: 5100, ratio: 27.9, status: "Critical", score: 52 },
  { name: "Reinickendorf", chargers: 190, bevs: 5400, ratio: 28.4, status: "Critical", score: 50 },
  { name: "Marzahn-Hellers.", chargers: 145, bevs: 4200, ratio: 29.0, status: "Critical", score: 48 },
  { name: "Pankow", chargers: 345, bevs: 10500, ratio: 30.4, status: "Critical", score: 45 },
  { name: "Treptow-Köpenick", chargers: 172, bevs: 5500, ratio: 32.0, status: "Critical", score: 35 }
];

const TECH_STACK = [
  { name: "Python", icon: "python.svg", color: "blue" },
  { name: "AWS Cloud", icon: "aws.svg", color: "orange" },
  { name: "PowerFactory", icon: "PowerFactory.svg", color: "indigo" },
  { name: "Pandapower", icon: "pp.svg", color: "green" },
  { name: "GitHub", icon: "github.svg", color: "slate" },
  { name: "Docker", icon: "docker.svg", color: "blue" },
  { name: "MongoDB", icon: "mongodb.svg", color: "green" },
  { name: "TensorFlow", icon: "tensorflow.svg", color: "orange" }
];

// --- TRANSLATION DICTIONARY ---
const TRANSLATIONS = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      philosophy: "Philosophy",
      blog: "Insights",
      contact: "Contact",
      privacy: "Privacy"
    },
    home: {
      hero_title: "Power Systems & Grid Integration Specialist",
      hero_subtitle: "I bridge the gap between Grid Simulation (PowerFactory) and Real-World grid integration. Specializing in Voltage Stability, Renewable Integration, and Automation; to engineer the Target Grid 2045.",
      cta_portfolio: "View Engineering Portfolio",
      cta_contact: "Schedule a Conversation Today",
      ieee_badge: "IEEE Best Paper 2025 Winner (Intelligent Transportation Track)",
      future_title: "Engineering the Future Grid",
      future_desc: "From static load flow analysis to dynamic stability, I deliver solutions that ensure regulatory compliance (VDE 4110) and operational efficiency.",
      card1_title: "Grid Simulation (RMS/EMT)",
      card1_body: "Automating stability studies and Load Flow Analysis using PowerFactory and Python to ensure renewable integration.",
      card2_title: "Optimization & AI",
      card2_body: "Deploying Fuzzy Logic and NSGA-II algorithms to solve multi-objective constraints for EV charging and §14a EnWG.",
      card3_title: "Digital Grid Operations",
      card3_body: "Translating complex engineering requirements into agile digital products and reliable validation workflows.",
      tech_stack_title: "Tech Stack & Platforms",
      tech_stack_sub: "A blend of technical and professional proficiencies",
      research_tag: "Featured Research",
      research_title: "Solving the §14a EnWG Challenge with Math",
      research_main_title: "IEEE Best Paper Award (2025): Robust EV Grid Integration",
      research_desc: "Traditional grid planning fails under uncertainty. My research developed a Fuzzy Multi-Objective Optimization Framework that balances grid constraints with user equity, creating a robust solution for the deployment of EV infrastructure in Berlin.",
      research_stat_val: "+15%",
      research_stat_label: "Cost Reduction vs. Deterministic Planning",
      phil_title: "\"Smart Laziness\" & Systemic Efficiency",
      phil_body: "\"True efficiency isn't about working harder—it's about understanding systems so deeply that you can identify the one change that eliminates ten problems.\"",
      phil_sub: "This principle, learned from debugging transformers in Kenya, now guides how I approach everything from code architecture to team dynamics."
    },
    about: {
      hero_title: "The Journey of a Hybrid Innovator.",
      hero_subtitle: "From Kenya’s power grids to Berlin’s energy transition — blending engineering precision with systemic thinking.",
      bio_title: "Who I Am: The System Builder",
      bio_p1: "I'm Clifford Ondieki, a Power Systems Engineer who believes true innovation springs from a deep understanding of connections whether in high-voltage grids or human teams.",
      bio_p2: "My path from analyzing grid stability in Kenya to optimizing energy systems in Berlin has been defined by one goal: bridging the gap between simulation and reality. Every challenge—from commissioning hardware to modeling renewable integration—shapes my approach to grid resilience and technical architecture.",
      bio_quote: "For me, engineering is not just about efficiency; it's about building robust systems that adapt to the future.",
      edu_title: "Technical Foundation",
      edu_msc: "M.Sc. Engineering Management (Candidate)",
      edu_msc_sub: "Focus: Power Systems & Automation | Arden University, Berlin (2026)",
      edu_bsc: "B.Sc. Electrical & Electronic Engineering",
      edu_bsc_sub: "Major: Power Systems | JKUAT (Anabin H+ Recognized)",
      edu_note: "5-Year Engineering Curriculum (Diplom Equiv)",
      moments_title: "The Spark: Defining Moments",
      m1_t: "The Radio That Changed Everything",
      m1_s: "Kitale, Kenya - Age 12",
      m1_d: "It started with a broken radio. Disassembling it wasn't just play; it was my first lesson in system topology. Understanding how each component contributes to the whole is a principle that now guides my work in commissioning and SCADA systems.",
      m2_t: "Grid Stability & The \"Perfect\" Model",
      m2_s: "JKUAT, Kenya - 2015",
      m2_d: "My bachelor's project on Voltage Stability Analysis (PowerFactory) taught me a critical lesson: models are perfect, but reality is messy. Mitigating voltage collapse in a weak grid required not just calculation, but understanding the operational constraints of the network.",
      m3_t: "The Berlin Energy Transition",
      m3_s: "Nairobi to Berlin - 2025",
      m3_d: "Moving to Berlin was a strategic decision to join the heart of the Energiewende. I bring a unique perspective: the resourcefulness of Kenyan engineering combined with the precision of German standards, focused on the integration of Renewables and EV infrastructure.",
      stars_title: "My Guiding Stars",
      stars_q: "\"Understanding is more important than memorization\"",
      stars_f: "— My Grandfather's Wisdom, shaping my approach to First Principles Engineering",
      aff_title: "Affiliations",
      endorsements_title: "Recommendations"
    },
    projects: {
      hero_title: "Simulation. Optimization. Validation.",
      hero_subtitle: "Bridging PowerFactory models and field reality to drive grid resilience and renewable integration.",
      innovation_tag: "The Innovation",
      why_matters: "Why This Matters",
      challenge_tag: "The Challenge",
      solution_tag: "Our Data-Driven Solution",
      p1_t: "Cloud-Native Grid Automation",
      p1_s: "Serverless pipelines and Digital Twins for Redispatch 3.0.",
      p2_t: "Serverless Grid Compliance Pipeline",
      p2_d: "Traditional grid studies are manual. This pipeline triggers physics-based simulations automatically via AWS S3 & Lambda, enabling \"Cloud-Bursting\" for massive scenario analysis without on-premise hardware.",
      p3_t: "Hybrid Grid Control Engine (CIM)",
      p3_d: "German TSOs rely on the Common Information Model (CIM) for data exchange. This engine demonstrates the ability to parse complex XML grid definitions and apply custom control logic, solving the interoperability challenge.",
      p4_t: "Equitable EV Charger Deployment",
      p4_d: "An ongoing data-driven geospatial optimization pipeline to balance coverage and spatial equity in Berlin's EV charging infrastructure.",
      p5_t: "Kinangop Wind Power Integration",
      p5_d: "A dynamic voltage stability analysis incorporating Kinangop wind power into Kenya's 59-bus national grid.",
      p6_t: "Predictive Maintenance AI",
      p6_d: "A machine learning system for predicting equipment failures in geothermal power generation, reducing operational costs."
    },
    philosophy: {
      hero_title: "Engineering Empathy",
      hero_subtitle: "Bridging technical precision with human purpose to build resilient systems.",
      core_title: "Core Philosophy: Systems & People",
      core_p1: "The most robust grids—whether electrical or organizational—are built with deep understanding and a commitment to stability.",
      core_p2: "This philosophy stems from a belief that true engineering requires more than calculation. It demands the ability to understand the context behind every fault, the operational nuances that shape how systems behave, and the empathy to build solutions that work in the real world, not just in simulation.",
      practice_title: "Philosophy in Practice",
      prac1_t: "Technical Architecture",
      prac1_d: "Designing with empathy for maintainers, ensuring code and grids are accessible.",
      prac2_t: "Team Leadership",
      prac2_d: "Creating psychological safety where failure is treated as valuable data.",
      prac3_t: "Problem Solving",
      prac3_d: "Investing time in the human context behind technical challenges.",
      prac4_t: "Global Perspective",
      prac4_d: "Bridging developed and emerging market engineering mindsets."
    },
    blog: {
      hero_title: "Insights & Reflections",
      hero_subtitle: "Thoughts on engineering empathy, smart laziness, and bridging worlds.",
      post1_t: "Engineering Empathy: Why the Best Systems Are Built with Heart",
      post1_d: "The most robust systems emerge when we approach technical challenges with genuine empathy for the humans who will interact with them.",
      post2_t: "How Kenya's Grid Taught Me to Prioritize SaaS Features",
      post2_d: "Lessons on prioritization and system dependencies learned from Kenya's power grid applied to modern software architecture.",
      post3_t: "Smart Laziness: The Art of Systemic Efficiency",
      post3_d: "Why true innovation often starts with a desire to eliminate repetitive labor through high-leverage strategic shifts.",
      soon: "Coming Soon"
    },
    ev: {
      hero_title: "EV Infrastructure Strategy",
      hero_subtitle: "A Two-Paper Progression from Deterministic Planning to Fuzzy Robustness",
      diagnosis_t: "The Diagnosis: Infrastructure Gaps",
      diagnosis_p: "Central districts are well-supplied, while outer districts face severe BEV-per-charger pressure.",
      opt_t: "Optimization Result",
      opt_p: "Our NSGA-II framework reduces the city-wide Gini coefficient by 13% while maintaining utility standards.",
      equity_stat: "-13% Gini Index"
    },
    contact: {
      hero_title: "Ready to Solve Grid Challenges? ⚡",
      hero_subtitle: "Open for Engineering, Commissioning, and Simulation roles.",
      form_title: "Start a Conversation",
      form_desc: "Whether you have a specific opening in Grid Integration, need simulation expertise (PowerFactory), or want to discuss renewable energy commissioning—I'd love to hear from you.",
      field_name: "Your Name",
      field_email: "Your Email",
      field_subj: "Topic",
      field_msg: "Your Message",
      btn_send: "Send Message"
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "Transparency and data protection are fundamental.",
      comm_t: "Our Commitment",
      comm_p: "As an engineer valuing both technical excellence and human purpose, I am committed to transparency about how data is handled on this site.",
      data_t: "Information We Collect",
      data_p1: "Analytics: Standard usage data via Clarity to improve UX.",
      data_p2: "Contact: Processed securely only to respond to inquiries.",
      rights_t: "Your Rights",
      rights_p: "I respect all rights to access, rectification, and erasure under GDPR."
    }
  },
  de: {
    nav: {
      home: "Start",
      about: "Über mich",
      projects: "Projekte",
      philosophy: "Philosophie",
      blog: "Insights",
      contact: "Kontakt",
      privacy: "Datenschutz"
    },
    home: {
      hero_title: "Spezialist für Energiesysteme & Netzintegration",
      hero_subtitle: "Ich schließe die Lücke zwischen Netzsimulation (PowerFactory) und der realen Netzintegration. Spezialisiert auf Spannungsstabilität, erneuerbare Integration und Automatisierung für das Zielnetz 2045.",
      cta_portfolio: "Engineering-Portfolio ansehen",
      cta_contact: "Heute ein Gespräch vereinbaren",
      ieee_badge: "IEEE Best Paper 2025 Gewinner (Intelligent Transportation Track)",
      future_title: "Das Stromnetz der Zukunft gestalten",
      future_desc: "Vom statischen Lastfluss bis zur dynamischen Stabilität liefere ich Lösungen, die regulatorische Compliance (VDE 4110) und operative Effizienz gewährleisten.",
      card1_title: "Netzsimulation (RMS/EMT)",
      card1_body: "Automatisierung von Stabilitätsstudien und Lastflussanalysen mit PowerFactory und Python.",
      card2_title: "Optimierung & KI",
      card2_body: "Einsatz von Fuzzy Logic und NSGA-II Algorithmen zur Lösung multi-objektiver Constraints.",
      card3_title: "Digitaler Netzbetrieb",
      card3_body: "Agile digitale Produkte für zuverlässige Validierungsworkflows im Netzbetrieb.",
      tech_stack_title: "Tech-Stack & Plattformen",
      tech_stack_sub: "Eine Mischung aus technischen und professionellen Kompetenzen",
      research_tag: "Ausgewählte Forschung",
      research_title: "Die §14a EnWG-Herausforderung mit Mathematik lösen",
      research_main_title: "IEEE Best Paper Award (2025): Robuste EV-Netzintegration",
      research_desc: "Meine Forschung entwickelte ein Framework, das Netzbeschränkungen mit Nutzergerechtigkeit ausbalanciert und robuste Lösungen für Berlin bietet.",
      research_stat_val: "+15%",
      research_stat_label: "Kostensenkung gegenüber deterministischer Planung",
      phil_title: "\"Smart Laziness\" & systemische Effizienz",
      phil_body: "\"Wahre Effizienz bedeutet nicht, härter zu arbeiten – es geht darum, Systeme so tief zu verstehen, dass man die eine Änderung erkennt.\"",
      phil_sub: "Dieses Prinzip leitet heute meine Arbeit von der Code-Architektur bis zur Teamdynamik."
    },
    about: {
      hero_title: "Die Reise eines Hybrid-Innovators.",
      hero_subtitle: "Von Kenias Stromnetzen bis zur Berliner Energiewende — technische Präzision trifft auf systemisches Denken.",
      bio_title: "Wer ich bin: Der Systembauer",
      bio_p1: "Ich bin Clifford Ondieki, ein Systemingenieur für Energietechnik, der an Innovation durch tiefes Systemverständnis glaubt.",
      bio_p2: "Mein Weg von Kenia nach Berlin war geprägt von dem Ziel, die Lücke zwischen Simulation und Realität zu schließen.",
      bio_quote: "Für mich ist Engineering nicht nur Effizienz; es geht um den Aufbau robuster Systeme für die Zukunft.",
      edu_title: "Technisches Fundament",
      edu_msc: "M.Sc. Engineering Management (Kandidat)",
      edu_msc_sub: "Fokus: Power Systems | Arden University, Berlin (2026)",
      edu_bsc: "B.Sc. Electrical & Electronic Engineering",
      edu_bsc_sub: "Schwerpunkt: Power Systems | JKUAT (Anabin H+)",
      edu_note: "5-jähriges Engineering-Studium (Diplom-Äquivalent)",
      moments_title: "Der Funke: Entscheidende Momente",
      m1_t: "Das Radio, das alles veränderte",
      m1_s: "Kitale, Kenia - Alter 12",
      m1_d: "Es begann mit einem kaputten Radio. Das Auseinanderbauen war meine erste Lektion in Systemtopologie.",
      m2_t: "Netzstabilität & das „perfekte“ Modell",
      m2_s: "JKUAT, Kenya - 2015",
      m2_d: "Modelle sind perfekt, die Realität ist chaotisch. Die Bachelorarbeit lehrte mich operative Grenzen zu verstehen.",
      m3_t: "Die Berliner Energiewende",
      m3_s: "Nairobi nach Berlin - 2025",
      m3_d: "Umzug nach Berlin, um Teil der Energiewende zu sein. Ich bringe Agilität und Präzision zusammen.",
      stars_title: "Leitsterne",
      stars_q: "\"Verstehen ist wichtiger als Auswendiglernen\"",
      stars_f: "— Weisheit meines Großvaters",
      aff_title: "Zugehörigkeiten",
      endorsements_title: "Empfehlungen"
    },
    projects: {
      hero_title: "Simulation. Optimierung. Validierung.",
      hero_subtitle: "Überbrückung von PowerFactory-Modellen und Feldrealität.",
      innovation_tag: "Die Innovation",
      why_matters: "Warum das wichtig ist",
      challenge_tag: "Herausforderung",
      solution_tag: "Lösung",
      p1_t: "Netzautomatisierung",
      p1_s: "Serverless-Pipelines für Redispatch 3.0.",
      p2_t: "Serverless Grid Compliance Pipeline",
      p2_d: "Automatisierung von VDE-AR-N 4110 Spannungsstabilitätsprüfungen mittels Cloud-Native Architektur.",
      p3_t: "Hybrid Grid Control Engine (CIM)",
      p3_d: "Engine zum Parsen von CIM-Datenmodellen für deutsche Übertragungsnetzbetreiber.",
      p4_t: "Gerechter EV-Ausbau",
      p4_d: "Optimierungspipeline für die Berliner Ladeinfrastruktur.",
      p5_t: "Kinangop Windkraft",
      p5_d: "Integration von Windkraft in Kenias 59-Bus-Nationalnetz.",
      p6_t: "Predictive Maintenance KI",
      p6_d: "ML-System zur Vorhersage von Geräteausfällen in Geothermieanlagen."
    },
    philosophy: {
      hero_title: "Engineering Empathy",
      hero_subtitle: "Technische Präzision mit menschlichem Zweck verbinden.",
      core_title: "Kernphilosophie: Systeme & Menschen",
      core_p1: "Robuste Netze basieren auf tiefem Verständnis und Stabilität.",
      core_p2: "Wahre Ingenieurskunst erfordert Empathie, um Lösungen zu bauen, die in der realen Welt funktionieren.",
      practice_title: "Philosophie in der Praxis",
      prac1_t: "Technische Architektur",
      prac1_d: "Design mit Empathie für Wartbarkeit und Zugänglichkeit.",
      prac2_t: "Teamführung",
      prac2_d: "Schaffung psychologischer Sicherheit im Team.",
      prac3_t: "Problemlösung",
      prac3_d: "Investition in den menschlichen Kontext hinter der Technik.",
      prac4_t: "Globale Perspektive",
      prac4_d: "Verbindung von Schwellenmärkten mit etablierten Märkten."
    },
    blog: {
      hero_title: "Insights & Reflexionen",
      hero_subtitle: "Gedanken zu Empathie, Effizienz und Innovation.",
      post1_t: "Engineering Empathy: Warum Systeme mit Herz gebaut werden",
      post1_d: "Robuste Systeme entstehen durch Empathie für die Nutzer.",
      post2_t: "Was Kenias Netz mich über SaaS lehrte",
      post2_d: "Lektionen zur Priorisierung aus dem kenianischen Stromnetz.",
      post3_t: "Smart Laziness: Systemische Effizienz",
      post3_d: "Warum Innovation oft bei der Desinteresse an repetitiver Arbeit beginnt.",
      soon: "Demnächst"
    },
    ev: {
      hero_title: "EV-Infrastruktur Strategie",
      hero_subtitle: "Von deterministischer Planung zu robuster Optimierung",
      diagnosis_t: "Die Diagnose: Infrastrukturlücken",
      diagnosis_p: "Zentrale Bezirke sind gut versorgt, Außenbezirke stehen unter Druck.",
      opt_t: "Optimierungsergebnis",
      opt_p: "Unser Framework reduziert den Gini-Koeffizienten um 13%.",
      equity_stat: "-13% Gini Index"
    },
    contact: {
      hero_title: "Bereit für Netz-Herausforderungen? ⚡",
      hero_subtitle: "Offen für Rollen in Engineering und Simulation.",
      form_title: "Gespräch beginnen",
      form_desc: "Ich freue mich darauf, von Ihren Projekten im Bereich Netzintegration zu hören.",
      field_name: "Name",
      field_email: "E-Mail",
      field_subj: "Thema",
      field_msg: "Nachricht",
      btn_send: "Absenden"
    },
    privacy: {
      title: "Datenschutz",
      subtitle: "Transparenz und Schutz sind fundamental.",
      comm_t: "Verpflichtung",
      comm_p: "Ich verpflichte mich zur Transparenz im Umgang mit Ihren Daten.",
      data_t: "Erhebung",
      data_p1: "Analytics via Clarity zur Verbesserung der UX.",
      data_p2: "Kontaktformulardaten zur Bearbeitung von Anfragen.",
      rights_t: "Ihre Rechte",
      rights_p: "Ich respektiere alle Rechte gemäß DSGVO."
    }
  }
};

// --- GLOBAL STYLES COMPONENT ---

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;800;900&display=swap');
    
    :root {
      --primary-indigo: #303F9F;
      --neutral-charcoal: #374151;
      --accent-fire: #880E4F;
      --highlight-gold: #F59E0B;
    }

    * {
      font-family: 'Inter', sans-serif;
    }

    body {
      color: var(--neutral-charcoal);
      background: #FFFFFF;
      overflow-x: hidden;
    }

    .glass-nav {
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }

    .hero-mesh {
      background-image: radial-gradient(at 0% 0%, rgba(48, 63, 159, 0.15) 0px, transparent 50%),
                        radial-gradient(at 100% 0%, rgba(136, 14, 79, 0.1) 0px, transparent 50%),
                        radial-gradient(at 100% 100%, rgba(245, 158, 11, 0.05) 0px, transparent 50%);
    }

    .animate-float {
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }

    .animate-pulse-soft {
      animation: pulse-soft 3s ease-in-out infinite;
    }

    @keyframes pulse-soft {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(0.98); }
    }

    .paper-texture {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      opacity: 0.04;
    }

    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: var(--primary-indigo);
      border-radius: 10px;
    }

    .animate-scroll {
      display: flex;
      width: max-content;
      animation: scroll 30s linear infinite;
    }

    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `}} />
);

// --- UTILITY COMPONENTS ---

const ImageBox = ({ src, alt, className, type = "default" }) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className={`${className} bg-slate-100 flex flex-col items-center justify-center text-indigo-900 font-black p-4 text-center border border-slate-200`}>
        {type === "avatar" ? (
          <Users size={48} className="opacity-20 mb-2" />
        ) : (
          <Layers size={64} className="opacity-10 mb-4" />
        )}
        <span className="text-[10px] uppercase tracking-widest opacity-40">{alt}</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)}
    />
  );
};

const SectionHeader = ({ title, sub, dark = false }) => (
  <header className={`py-20 lg:py-24 text-center ${dark ? 'bg-slate-950 text-white' : 'bg-indigo-900 text-white'} relative overflow-hidden`}>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tighter leading-[0.95]">{title}</h1>
    <p className="text-lg sm:text-xl opacity-70 max-w-4xl mx-auto font-light leading-relaxed">{sub}</p>
  </header>
);

const ProjectCard = ({ title, tag, sub, desc, innovation, whyMatters, tags, sideContent, iTag, wTag }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100 mb-16 hover:shadow-2xl transition-all duration-700 group">
    <div className="grid lg:grid-cols-2">
      <div className="p-8 flex flex-col justify-center">
        <h2 className="text-2xl font-black text-slate-950 tracking-tighter leading-none">{title}</h2>
        <span className="bg-indigo-50 text-indigo-700 text-sm font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">{tag}</span>
        <p className="text-indigo-600 font-extrabold mb-8 text-lg tracking-tight">{sub}</p>
        <div className="mb-8 border-l-4 border-teal-500 pl-6 bg-teal-50/30 p-6 rounded-r-2xl">
          <h4 className="text-sm font-black text-teal-900 mb-2 uppercase tracking-[0.3em]">{iTag}</h4>
          <p className="text-gray-600 text-base italic leading-relaxed font-medium">{innovation}</p>
        </div>
        <div className="mb-8 border-l-4 border-indigo-600 pl-6 bg-indigo-50/30 p-6 rounded-r-2xl">
          <h4 className="text-sm font-black text-indigo-900 mb-2 uppercase tracking-[0.3em]">{wTag}</h4>
          <p className="text-gray-600 text-base italic leading-relaxed font-medium">{whyMatters}</p>
        </div>
        <p className="text-gray-500 mb-12 leading-relaxed text-base font-light">{desc}</p>
        <div className="flex flex-wrap gap-3 mb-10">
          {tags.map(t => <span key={t} className="px-4 py-2 bg-slate-50 text-slate-500 text-sm font-black uppercase tracking-widest rounded-xl border border-slate-100">{t}</span>)}
        </div>
        <button className="inline-flex items-center text-indigo-700 font-black text-sm uppercase tracking-[0.4em] group-hover:translate-x-4 transition-all duration-500">
          Explore Technical Case <ArrowRight className="ml-3" size={18} />
        </button>
      </div>
      <div className="bg-slate-950 p-8 flex items-center justify-center relative overflow-hidden min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
        {sideContent}
      </div>
    </div>
  </div>
);

// --- MAIN VIEWS ---

const Home = ({ setPage, t, language }) => (
  <div className="animate-in fade-in duration-1000">
    {/* HERO */}
    <section className="relative h-screen flex items-center justify-center bg-cover bg-center text-white overflow-hidden" style={{ backgroundImage: "url('/imgs/website.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-indigo-900/70 to-gray-900/80"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-3/5 lg:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center space-x-4 bg-indigo-500/10 border border-indigo-500/20 px-6 py-2.5 rounded-full mb-12 backdrop-blur-xl">
               <span className="w-3 h-3 rounded-full bg-teal-400 animate-pulse shadow-[0_0_20px_rgba(45,212,191,0.6)]"></span>
               <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-200">Berlin Center Active</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
              {t.home.hero_title.split('&').map((part, i) => (
                <React.Fragment key={i}>
                  {part} {i === 0 && <br className="hidden md:block" />}
                  {i === 0 && <span className="text-indigo-600">&</span>}
                </React.Fragment>
              ))}
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              {t.home.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => setPage('projects')} 
                className="py-3 px-8 rounded-full bg-yellow-500 text-gray-900 font-bold shadow-lg transition duration-300 transform hover:scale-105 text-center"
              >
                {t.home.cta_portfolio}
              </button>
              <button 
                onClick={() => setPage('contact')} 
                className="py-3 px-8 rounded-full border-2 border-yellow-400 text-yellow-400 font-bold transition duration-300 transform hover:bg-yellow-50 hover:text-gray-900 hover:scale-105 text-center"
              >
                {t.home.cta_contact}
              </button>
            </div>
          </div>
          <div className="md:w-2/5 lg:w-1/2 flex justify-center mt-12 md:mt-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <img src="/imgs/GOAT.jpg" alt="Clifford Ondieki" className="rounded-full w-full h-full object-cover shadow-2xl border-8 border-white/10" />
              <div className="absolute -bottom-4 -right-4 bg-white text-indigo-900 px-4 py-2 rounded-lg shadow-xl font-bold text-sm flex items-center animate-blink">
                <span className="text-yellow-500 mr-2">🏆</span> {t.home.ieee_badge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* SERVICE AREAS */}
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-white p-10 rounded-xl shadow-2xl border-l-8 border-indigo-800">
          <h2 className="text-3xl font-extrabold text-indigo-800 mb-4 text-center">{t.home.future_title}</h2>
          <p className="text-center text-lg text-gray-700 max-w-4xl mx-auto mb-8">{t.home.future_desc}</p>
          <div className="grid md:grid-cols-3 gap-8 text-center mt-6">
            {[
              { icon: <Zap size={48} />, title: t.home.card1_title, body: t.home.card1_body },
              { icon: <Cpu size={48} />, title: t.home.card2_title, body: t.home.card2_body },
              { icon: <Activity size={48} />, title: t.home.card3_title, body: t.home.card3_body }
            ].map((pillar, i) => (
              <a key={i} href="#projects" onClick={() => setPage('projects')} className="block p-4 rounded-lg border-2 border-transparent transition-all duration-300 hover:shadow-lg hover:border-indigo-600 hover:scale-[1.03] group">
                <div className="w-10 h-10 mx-auto mb-3 text-yellow-400 transition-all duration-300 group-hover:scale-110">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1 transition-all duration-300 group-hover:text-indigo-700">{pillar.title}</h3>
                <p className="text-gray-600 text-sm">{pillar.body}</p>
                <span className="inline-block mt-3 text-sm font-semibold text-indigo-600 opacity-0 transition-all duration-300 group-hover:opacity-100">See Project &rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* BIO SECTION */}
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">From Power Systems to Product and Back to Engineering</h2>
            <p className="text-lg leading-relaxed mb-4">
              Operating as a <strong>Graduate Researcher in Grid Optimization</strong> (M.Sc. Candidate, 2026), I recently received the <strong className="text-indigo-800">🏆 IEEE ETECOM 2025 Best Paper Award</strong> for optimizing EV charging infrastructure by achieving 15% cost reduction while improving grid reliability across 500+ scenarios.
            </p>
            <p className="text-base mb-6">
              Before returning to core engineering, I scaled digital systems with <a href="https://www.elephant.healthcare/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800"><strong>Elephant Healthcare</strong></a> and <a href="https://www.ilarahealth.com/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800"><strong>Ilara Health</strong></a> learning how technical solutions actually get adopted and sustained in the real world.
              <br />
              <br />
              Now focused on <strong>grid integration, renewable energy, and power systems simulation</strong> for Germany's energy transition.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
                <span>M.Sc. Engineering Management (2026)</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-indigo-600" />
                <span>IEEE & VDI Member</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                <span>Berlin, Germany</span>
              </div>
            </div>
            <button onClick={() => setPage('about')} className="inline-block py-3 px-6 rounded-full bg-indigo-800 text-white font-semibold hover:bg-indigo-700 transition duration-300 mt-6">
              Discover My Story
            </button>
          </div>
          <div className="bg-gradient-to-br from-indigo-900 to-gray-700 p-8 rounded-xl text-white shadow-xl">
            <h4 className="text-xl font-semibold mb-3">Simulation Meets Reality</h4>
            <p className="opacity-90">
              "The best engineering works in PowerFactory <em>and</em> in the field. My path from power systems simulation to commercial operations taught me to design solutions that are technically robust and commercially viable—whether modeling grid stability or commissioning renewable installations."
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* RESEARCH */}
    <section className="py-16 lg:py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">{t.home.research_tag}</h2>
          <p className="text-lg text-gray-300">Solving the §14a EnWG Challenge with Math</p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="bg-blue-50 p-8 rounded-xl border-l-4 border-blue-500 text-center shadow-lg">
            <h3 className="text-3xl font-bold text-blue-800 mb-4">
              {t.home.research_main_title}
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              {t.home.research_desc}
            </p>
            <div className="inline-block bg-white p-6 rounded-2xl shadow-xl border-4 border-green-500 mb-8">
              <p className="text-xl font-semibold text-gray-600 mb-2">Optimization Result</p>
              <p className="text-6xl font-black text-green-600">{t.home.research_stat_val}</p>
              <p className="text-lg mt-2 text-gray-700">{t.home.research_stat_label}</p>
            </div>
            <button onClick={() => setPage('ev-study')} className="inline-block py-3 px-8 rounded-full bg-indigo-800 text-white font-bold shadow-xl hover:bg-indigo-700 transition duration-300">
              Read the Full Case Study
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* SKILLS & TECH STACK */}
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Skills, Tools & Platforms</h2>
          <p className="text-lg text-gray-600">A blend of technical and professional proficiencies</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-800">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Engineering Toolkit</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700"><strong>Grid Simulation:</strong> DIgSILENT PowerFactory (Python API), MATLAB/Simulink</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700"><strong>Optimization:</strong> Python (Pandas, SciPy), NSGA-II, Fuzzy Logic Control</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700"><strong>Automation:</strong> SCADA Basics, PLC Programming, Pandapower</span>
              </div>
            </div>
          </div>
          <div className="bg-indigo-50 p-8 rounded-xl shadow-lg border-t-4 border-indigo-600">
            <h3 className="text-2xl font-semibold text-indigo-900 mb-6 text-center">Regulatory Competence</h3>
            <div className="space-y-4">
              <div className="flex items-center bg-white p-3 rounded shadow-sm">
                <div className="bg-indigo-100 p-2 rounded mr-3 text-indigo-700 font-bold">VDE</div>
                <span className="text-gray-800 font-medium">VDE-AR-N 4110 / 4120</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded shadow-sm">
                <div className="bg-indigo-100 p-2 rounded mr-3 text-indigo-700 font-bold">EnWG</div>
                <span className="text-gray-800 font-medium">§14a (Steuerbare Verbrauchseinrichtungen)</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded shadow-sm">
                <div className="bg-indigo-100 p-2 rounded mr-3 text-indigo-700 font-bold">IEC</div>
                <span className="text-gray-800 font-medium">IEC 61850 (Substation Automation)</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-800 md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Technical Leadership & Delivery</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700">Techno-Economic Analysis</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700">Stakeholder Requirement Analysis</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700">Systems Thinking, Cross-Domain Innovation</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700">Agile/Scrum Methodologies</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-800">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Tech Stack & Platforms</h3>
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-8">
              <div className="flex space-x-8 min-w-max">
                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/python.svg" alt="Python" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">Python</span>
                </div>

                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/aws.svg" alt="AWS Cloud" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">AWS / Cloud</span>
                </div>

                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/PowerFactory.svg" alt="PowerFactory" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">PowerFactory</span>
                </div>

                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/pp.svg" alt="Pandapower" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">Pandapower</span>
                </div>

                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/github.svg" alt="GitHub/Git" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">Git / CI/CD</span>
                </div>

                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/docker.svg" alt="Docker" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">Docker</span>
                </div>

                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/mongodb.svg" alt="MongoDB" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">MongoDB</span>
                </div>

                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/tensorflow.svg" alt="TensorFlow" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">TensorFlow</span>
                </div>
              </div>

              <div className="flex space-x-8 min-w-max">
                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/python.svg" alt="Python" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">Python</span>
                </div>
                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/aws.svg" alt="AWS Cloud" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">AWS / Cloud</span>
                </div>
                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/PowerFactory.svg" alt="PowerFactory" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">PowerFactory</span>
                </div>
                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/pp.svg" alt="Pandapower" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">Pandapower</span>
                </div>
                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/github.svg" alt="GitHub/Git" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">Git / CI/CD</span>
                </div>
                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/docker.svg" alt="Docker" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">Docker</span>
                </div>
                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/mongodb.svg" alt="MongoDB" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">MongoDB</span>
                </div>
                <div className="flex flex-col items-center group min-w-[100px]">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 p-2 shadow-sm border border-gray-100">
                    <img src="imgs/tensorflow.svg" alt="TensorFlow" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-sm text-gray-600 text-center font-medium">TensorFlow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* AFFILIATIONS */}
    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Affiliations</h2>
        <div className="flex gap-6 overflow-x-auto py-4 px-2 -mx-2 snap-x snap-mandatory">
          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" title="Visit IEEE Website" className="mb-3">
              <img src="imgs/ieee.png" alt="IEEE Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">Member &amp; Researcher, IEEE 2025</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.vdi.de/" target="_blank" rel="noopener noreferrer" title="Visit VDI Website" className="mb-3">
              <img src="imgs/VDI.svg" alt="VDI Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">Member,  2025</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.vde.com/en" target="_blank" rel="noopener noreferrer" title="Visit VDE Website" className="mb-3">
              <img src="imgs/VDE.svg" alt="VDE Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">Member,  2025</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-blue-100 p-4 rounded-lg shadow-md border border-blue-200">
            <a href="https://www.kiron.ngo" target="_blank" rel="noopener noreferrer" title="Visit Kiron Website" className="mb-3">
              <img src="imgs/kiron.svg" alt="Kiron Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">Kiron Open Higher Education 2025</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.joinimagine.com" target="_blank" rel="noopener noreferrer" title="Visit Imagine Foundation Website" className="mb-3">
              <img src="imgs/imagine.webp" alt="Imagine Foundation Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">Imagine Foundation 2023</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.ashoka.org" target="_blank" rel="noopener noreferrer" title="Visit Ashoka Website" className="mb-3">
              <img src="imgs/ashoka.png" alt="Ashoka Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">Ashoka Network 2024</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.alxafrica.com" target="_blank" rel="noopener noreferrer" title="Visit Alx Website" className="mb-3">
              <img src="imgs/alx.svg" alt="alx Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">Alx Network 2018</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.ebk.go.ke/" target="_blank" rel="noopener noreferrer" title="Visit EBK Website" className="mb-3">
              <img src="imgs/ebk.png" alt="ebk Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">Engineers Board of Kenya 2016</p>
          </div>
        </div>
      </div>
    </section>

    {/* PHILOSOPHY */}
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">My Philosophy</h2>
        <p className="text-lg text-gray-600 mb-8">Core Beliefs</p>
        <div className="bg-gradient-to-br from-indigo-900 to-gray-700 p-8 rounded-xl text-white">
          <h4 className="text-2xl font-semibold mb-4">"Smart Laziness" & Systemic Efficiency</h4>
          <p className="text-lg mb-4">{t.home.phil_body}</p>
          <p className="opacity-90">{t.home.phil_sub}</p>
        </div>
        <button onClick={() => setPage('philosophy')} className="inline-block py-3 px-6 rounded-full border border-indigo-800 text-indigo-800 font-semibold hover:bg-indigo-800 hover:text-white transition duration-300 mt-6">
          Explore My Philosophy
        </button>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 bg-indigo-900 text-white">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Build Something Impactful?</h2>
        <p className="text-lg font-light mb-6">
          Let's combine technical excellence, operational clarity, and business strategy to create solutions that truly matter.
        </p>
        <button onClick={() => setPage('contact')} className="inline-block py-3 px-8 rounded-full bg-white text-indigo-900 font-bold shadow-xl hover:bg-gray-100 transition duration-300">
          Let's Energize Change Together ⚡
        </button>
      </div>
    </section>
  </div>
);

const AboutView = ({ t, language, setPage }) => (
  <div className="animate-in fade-in duration-1000">
    <SectionHeader title={t.about.hero_title} sub={t.about.hero_subtitle} />
    
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-indigo-600 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.about.bio_title}</h2>
              <p className="text-lg leading-relaxed mb-4">{t.about.bio_p1}</p>
              <p className="text-base mb-4">{t.about.bio_p2}</p>
              <p className="text-base font-medium">{t.about.bio_quote}</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-yellow-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <GraduationCap className="w-6 h-6 mr-2 text-indigo-700" /> {t.about.edu_title}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-gray-800">{t.about.edu_msc}</p>
                  <p className="text-sm text-gray-600">{t.about.edu_msc_sub}</p>
                </div>
                <div className="border-t pt-2">
                  <p className="font-bold text-gray-800">{t.about.edu_bsc}</p>
                  <p className="text-sm text-gray-600">{t.about.edu_bsc_sub}<br />
                  <span className="text-indigo-700 font-semibold">{t.about.edu_note}</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-2 lg:order-3 flex justify-center">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md h-full flex flex-col items-center justify-center border-l-4 border-indigo-600 min-h-[520px]">
              <img src="/imgs/GOAT.jpg" alt="Clifford Ondieki" className="w-full h-80 object-cover rounded-lg mb-4" />
              <p className="text-sm font-medium text-indigo-600 text-center">From Kitale to Europe – validating models in the field.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{t.about.moments_title}</h2>
        <div className="journey-timeline">
          <div className="journey-item">
            <h4 className="text-xl font-semibold" style={{ color: "var(--accent-fire)" }}>
              The Radio That Changed Everything
            </h4>
            <p className="text-sm text-gray-500 mb-2">Kitale, Kenya - Age 12</p>
            <p className="text-[--neutral-charcoal]">
              It started with a broken radio. Disassembling it wasn't just play; it was my first lesson in <strong>system topology</strong>. Understanding how each component contributes to the whole is a principle that now guides my work in commissioning and SCADA systems.
            </p>
          </div>

          <div className="journey-item">
            <h4 className="text-xl font-semibold" style={{ color: "var(--accent-fire)" }}>
              Grid Stability & The "Perfect" Model
            </h4>
            <p className="text-sm text-gray-500 mb-2">JKUAT, Kenya - 2015</p>
            <p className="text-[--neutral-charcoal]">
              My bachelor's project on <strong>Voltage Stability Analysis (PowerFactory)</strong> taught me a critical lesson: models are perfect, but reality is messy. Mitigating voltage collapse in a weak grid required not just calculation, but understanding the operational constraints of the network.
            </p>
          </div>

          <div className="journey-item">
            <h4 className="text-xl font-semibold" style={{ color: "var(--accent-fire)" }}>
              The Berlin Energy Transition
            </h4>
            <p className="text-sm text-gray-500 mb-2">Nairobi to Berlin - 2025</p>
            <p className="text-[--neutral-charcoal]">
              Moving to Berlin was a strategic decision to join the heart of the <em>Energiewende</em>. I bring a unique perspective: the resourcefulness of Kenyan engineering combined with the precision of German standards, focused on the integration of Renewables and EV infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Overcoming & Development</h2>
        <div className="space-y-8">
          <div className="p-6 sm:p-8 bg-white rounded-xl shadow-lg" style={{ borderTop: "4px solid var(--accent-fire)" }}>
            <h4 className="text-2xl font-semibold text-gray-800 mb-3">Finding the Balance: Systemic Intelligence</h4>
            <p className="text-[--neutral-charcoal] mb-4">
              One of my biggest challenges was balancing academic rigor with field operations. This led me to develop "Smart Laziness" – the engineering art of deep analysis to find the single, strategic change that solves ten problems. It's about <strong>optimization over brute force</strong>.
            </p>
          </div>
          
          <div className="p-6 sm:p-8 bg-white rounded-xl shadow-lg" style={{ borderTop: "4px solid var(--accent-fire)" }}>
            <h4 className="text-2xl font-semibold text-gray-800 mb-3">Cultural Navigation: The Competitive Advantage</h4>
            <p className="text-[--neutral-charcoal] mb-4">
              Settling in Berlin brought the challenge of adapting my problem-solving style. I've learned that diversity is a technical advantage—my heritage emphasizes <strong>resilience and adaptation</strong>, qualities essential for stabilizing modern power grids.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">My Guiding Stars</h2>
        <div className="max-w-3xl mx-auto p-8 sm:p-10 text-white rounded-2xl shadow-xl mb-12 bg-gray-900">
          <blockquote className="text-center">
            <p className="text-2xl italic mb-4 font-light leading-relaxed">
              "Understanding is more important than memorization"
            </p>
            <footer className="text-sm opacity-80">— My Grandfather's Wisdom, shaping my approach to First Principles Engineering</footer>
          </blockquote>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md" style={{ borderBottom: "4px solid var(--primary-indigo)" }}>
            <div className="flex items-center space-x-3 mb-2">
              <span style={{ color: "var(--highlight-gold)" }}>
                <Cpu className="w-5 h-5" />
              </span>
              <h5 className="text-xl font-semibold text-gray-800">Technical Mentors</h5>
            </div>
            <p className="text-[--neutral-charcoal]">
              Engineers who showed me that true mastery lies in understanding the "why" behind every Grid Code and VDE regulation, not just following the manual.
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md" style={{ borderBottom: "4px solid var(--primary-indigo)" }}>
            <div className="flex items-center space-x-3 mb-2">
              <span style={{ color: "var(--highlight-gold)" }}>
                <Users className="w-5 h-5" />
              </span>
              <h5 className="text-xl font-semibold text-gray-800">Community Leaders</h5>
            </div>
            <p className="text-[--neutral-charcoal]">
              Leaders who taught me that sustainable infrastructure happens when you empower local teams to maintain their own systems.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Skills Forged Through Experience</h2>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">A hybrid skill set combining technical precision with operational strategy.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300" style={{ borderTop: "4px solid var(--primary-indigo)" }}>
            <h5 className="text-xl font-semibold text-gray-800 mb-1">Grid & Systems Architecture</h5>
            <p className="text-[--neutral-charcoal] text-sm">From 11kV power lines to complex data pipelines – mastering system topology.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300" style={{ borderTop: "4px solid var(--primary-indigo)" }}>
            <h5 className="text-xl font-semibold text-gray-800 mb-1">Intercultural Engineering</h5>
            <p className="text-[--neutral-charcoal] text-sm">Bridging German standards (VDE) with adaptable problem-solving from emerging markets.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300" style={{ borderTop: "4px solid var(--primary-indigo)" }}>
            <h5 className="text-xl font-semibold text-gray-800 mb-1">Operational Strategy</h5>
            <p className="text-[--neutral-charcoal] text-sm">Aligning technical capability (Simulation) with deployment reality (Commissioning).</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300" style={{ borderTop: "4px solid var(--primary-indigo)" }}>
            <h5 className="text-xl font-semibold text-gray-800 mb-1">Grid Analytics & Data</h5>
            <p className="text-[--neutral-charcoal] text-sm">Using SCADA data and NSGA-II to predict behaviors and optimize performance.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300" style={{ borderTop: "4px solid var(--primary-indigo)" }}>
            <h5 className="text-xl font-semibold text-gray-800 mb-1">Commissioning & Testing</h5>
            <p className="text-[--neutral-charcoal] text-sm">Experience in validating systems in the field to ensure adoption and success.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300" style={{ borderTop: "4px solid var(--primary-indigo)" }}>
            <h5 className="text-xl font-semibold text-gray-800 mb-1">Technical Communication</h5>
            <p className="text-[--neutral-charcoal] text-sm">Translating complex engineering concepts into clear insights for stakeholders.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">Professional Endorsements</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-xl flex flex-col h-full border-l-4 border-indigo-600">
            <div className="flex items-center mb-4">
              <img src="/imgs/testimonials/Yukabeth.jpg" alt="Yukabeth Kidenda" className="w-16 h-16 rounded-full object-cover border-4 border-indigo-200 mr-4" />
              <div>
                <h5 className="text-lg font-semibold text-gray-900">Yukabeth Kidenda</h5>
                <div className="text-sm font-medium text-indigo-600">CEO at Teach for Kenya</div>
              </div>
            </div>
            <p className="text-gray-700 italic flex-grow">"Clifford is a very focused young professional... eager to learn and willing to go the extra mile to ensure high-quality outcomes."</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-xl flex flex-col h-full border-l-4 border-indigo-600">
            <div className="flex items-center mb-4">
              <img src="/imgs/testimonials/Valarie.jpg" alt="Valerie O." className="w-16 h-16 rounded-full object-cover border-4 border-indigo-200 mr-4" />
              <div>
                <h5 className="text-lg font-semibold text-gray-900">Valerie O.</h5>
                <div className="text-sm font-medium text-indigo-600">Customer Success Manager</div>
              </div>
            </div>
            <p className="text-gray-700 italic flex-grow">"Clifford embodies leadership with his hands-on approach to execute and deliver on set objectives... I strongly recommend him."</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 text-white bg-indigo-900">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Looking Ahead: Grid Transformation</h2>
        <p className="text-xl font-light mb-6">
          I aim to apply my hybrid skills in simulation and operations to the challenges of the German grid. My goal is to create systems that are resilient, efficient, and future-proof.
        </p>
        <p className="mb-8 opacity-90">
          Long-term, I will continue to mentor the next generation of engineers, advance STEM education in Africa, and break barriers – always driven by purpose-oriented problem-solving.
        </p>
        <button onClick={() => setPage('contact')} className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-full shadow-lg bg-white hover:bg-gray-100 transition duration-300 text-indigo-900">
          Discuss Opportunities <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </section>
  </div>
);

const ProjectsView = ({ t, language }) => (
  <div className="animate-in fade-in duration-1000">
    {/* Header */}
    <header className="py-20 lg:py-24 text-white relative overflow-hidden" style={{ backgroundColor: 'var(--primary-indigo)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
          {t.projects.hero_title}
        </h1>
        <p className="text-xl sm:text-2xl font-light max-w-3xl mx-auto">
          {t.projects.hero_subtitle}
        </p>
      </div>
    </header>

    {/* Main */}
    <main className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cloud-Native Grid Automation */}
        <section className="mb-20">
          <div className="flex items-center mb-10">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <CloudLightning className="w-8 h-8 text-indigo-700" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{t.projects.p1_t}</h2>
              <p className="text-gray-600">{t.projects.p1_s}</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-indigo-800 mb-12 transform transition hover:-translate-y-1 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="min-h-[400px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.projects.p2_t}</h2>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded border border-yellow-400">New 2026</span>
                  </div>
                  <p className="text-lg text-indigo-700 mb-6">{t.projects.p2_d}</p>
                  
                  <div className="mb-6 border-l-4 border-teal-700 pl-4 bg-teal-50 p-4 rounded-md">
                    <h4 className="text-sm font-bold text-teal-900 mb-1">{t.projects.innovation_tag}</h4>
                    <p className="text-gray-600 text-sm">Traditional grid studies are manual. This pipeline triggers physics-based simulations automatically via <strong>AWS S3 & Lambda</strong>, enabling "Cloud-Bursting" for massive scenario analysis without on-premise hardware.</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full border">Python</span>
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full border">AWS Lambda</span>
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full border">Pandapower</span>
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full border">DynamoDB</span>
                  </div>
                </div>

                <a href="https://github.com/omari91/serverless-grid-compliance" target="_blank" className="inline-flex items-center text-white bg-gray-900 hover:bg-gray-700 px-6 py-3 rounded-full font-bold transition w-fit shadow-md">
                  <Github className="w-5 h-5 mr-2" />
                  View Architecture & Code
                </a>
              </div>

              <div className="min-h-[400px] flex flex-col gap-6">
                <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700 h-full flex flex-col">
                  <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-gray-700">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-xs text-gray-400 font-mono">aws-lambda-logs</span>
                  </div>
                  <div className="p-4 font-mono text-xs sm:text-sm text-green-400 overflow-y-auto">
                    <p className="opacity-50">$ aws lambda invoke --function vde4110-check</p>
                    <p className="mt-2 text-white">&gt; INIT: Loading Pandapower Engine...</p>
                    <p className="text-white">&gt; INGEST: Downloaded 'berlin_grid_v2.json' from S3</p>
                    <p className="text-yellow-300">&gt; PHYSICS: Running Newton-Raphson Power Flow...</p>
                    <p className="text-white">&gt; CHECK: VDE-AR-N 4110 Compliance</p>
                    <p className="text-red-400 mt-1">[ALERT] Voltage Violation at Bus 42 (0.88 p.u.)</p>
                    <p className="text-blue-300">&gt; ACTION: Violation logged to DynamoDB</p>
                    <p className="mt-2 animate-pulse">_</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-indigo-800 mb-12 transform transition hover:-translate-y-1 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="min-h-[400px] flex flex-col gap-6">
                <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700 h-full flex flex-col">
                  <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2 border-b border-gray-700">
                    <span className="ml-2 text-xs text-gray-400 font-mono">cim_parser.xml</span>
                  </div>
                  <div className="p-4 font-mono text-xs sm:text-sm text-blue-300 overflow-y-auto">
                    <p>&lt;cim:Terminal rdf:ID="Term_45A"&gt;</p>
                    <p className="pl-4">&lt;cim:Terminal.ConductingEquipment</p>
                    <p className="pl-8">rdf:resource="#Trafo_Berlin_1"/&gt;</p>
                    <p className="pl-4">&lt;cim:ACDCTerminal.connected&gt;true&lt;/...&gt;</p>
                    <p>&lt;/cim:Terminal&gt;</p>
                    <p className="mt-2 text-gray-500">&lt;!-- Interoperability Layer --&gt;</p>
                  </div>
                </div>
              </div>
              
              <div className="min-h-[400px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.projects.p3_t}</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded border border-blue-400">Research</span>
                  </div>
                  <p className="text-lg text-indigo-700 mb-6">{t.projects.p3_d}</p>
                  
                  <div className="mb-6 border-l-4 border-teal-700 pl-4 bg-teal-50 p-4 rounded-md">
                    <h4 className="text-sm font-bold text-teal-900 mb-1">{t.projects.why_matters}</h4>
                    <p className="text-gray-600 text-sm">German TSOs rely on the Common Information Model (CIM) for data exchange. This engine demonstrates the ability to parse complex XML grid definitions and apply custom control logic, solving the interoperability challenge.</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full border">IEC 61970 (CIM)</span>
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full border">NetworkX</span>
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full border">Fuzzy Logic</span>
                  </div>
                </div>
                
                <a href="https://github.com/omari91/cim-grid-control-engine" target="_blank" className="inline-flex items-center text-white bg-gray-900 hover:bg-gray-700 px-6 py-3 rounded-full font-bold transition w-fit shadow-md">
                  <Github className="w-5 h-5 mr-2" />
                  View Architecture & Code
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Grid Integration & Power Systems */}
        <section className="mb-20">
          <div className="flex items-center mb-10">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <Zap className="w-8 h-8 text-indigo-700" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Grid Integration & Power Systems</h2>
              <p className="text-gray-600">Dynamic modeling, voltage stability, and grid code compliance.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-indigo-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="min-h-[400px] flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.projects.p4_t}</h2>
                  <p className="text-lg text-indigo-700 mb-6">{t.projects.p4_d}</p>
                  
                  <div className="mb-6 border-l-4 border-rose-800 pl-4 bg-rose-50 p-4 rounded-md">
                    <h4 className="text-lg font-semibold text-rose-900 mb-2">{t.projects.challenge_tag}</h4>
                    <p className="text-gray-600 text-sm">Public Electric Vehicle (EV) charging infrastructure is largely demand-driven, reinforcing spatial inequities. This creates a 'chicken-and-egg' problem, where a lack of infrastructure suppresses EV adoption in underserved areas, justifying continued underinvestment.</p>
                  </div>
                  
                  <div className="mb-6 border-l-4 border-teal-700 pl-4 bg-teal-50 p-4 rounded-md">
                    <h4 className="text-lg font-semibold text-teal-900 mb-2">{t.projects.solution_tag}</h4>
                    <p className="text-gray-600 text-sm">We implemented a multi-objective NSGA-II model in Python to balance coverage and spatial equity, minimizing the Gini coefficient of EVs per charger. This approach provides different Pareto-optimal deployment strategies for urban planners, directly addressing infrastructure placement under complex geospatial and socio-economic constraints.</p>
                  </div>

                  <div className="mb-6 border-l-4 border-blue-800 pl-4 bg-blue-50 p-4 rounded-md">
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">My Role & Timeline</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-blue-800">My Role:</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          <li>Lead Data Scientist & Geospatial Analyst</li>
                          <li>NSGA-II Algorithm Development</li>
                          <li>Equity Metric Design (Gini coefficient)</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-blue-800">Timeline:</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          <li>Research: 6 months (2025)</li>
                          <li>Model Development: 4 months</li>
                          <li>Validation & Analysis: 2 month</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Python</span>
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">NSGA-II</span>
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Geospatial Optimization</span>
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Urban Planning</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-t pt-4 mt-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">13%</div>
                    <p className="text-xs text-gray-500 font-medium">Reduction in Gini Coefficient</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">6x</div>
                    <p className="text-xs text-gray-500 font-medium">Model Projects 6x More Chargers</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">21%</div>
                    <p className="text-xs text-gray-500 font-medium">Boost in Local Access</p>
                  </div>
                </div>
              </div>
              
              <div className="min-h-[400px] flex flex-col gap-6">
                <img src="/imgs/berlin.png" alt="Berlin EV Charger Distribution" className="w-full h-64 object-cover rounded-lg shadow-lg border border-gray-200" />
                
                <div className="bg-gray-50 p-5 rounded-xl shadow-inner border border-gray-200">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">Philosophy in Action</h5>
                  <p className="text-sm text-gray-600 mb-4">The objective is not just to deploy more chargers, but to deploy them strategically to foster equitable access and sustainable urban mobility. My framework empowers municipalities to navigate the efficiency-equity trade-off with data-driven insights.</p>
                  <button onClick={() => window.location.href = '/ev-study'} className="block w-full text-center py-2 px-4 rounded-full bg-indigo-800 text-white font-semibold hover:bg-indigo-700 transition duration-150 mb-4">
                    Explore My Work
                  </button>
                </div>
                
                <img src="/imgs/Cert best.png" alt="IEEE Best Paper Award Certificate" className="w-full h-auto rounded-lg shadow-lg border border-gray-200" />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-indigo-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="min-h-[400px] flex flex-col gap-6">
                <img src="/imgs/wind farm.jpg" alt="Kinangop Wind Integration" className="w-full h-64 object-cover rounded-lg shadow-lg border border-gray-200" />
                <div className="bg-gray-50 p-5 rounded-xl shadow-inner border border-gray-200 flex-1">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">Key Lesson</h5>
                  <p className="text-sm text-gray-600 mb-4">This project taught me that resilience isn't just for power lines—it's for people's access to vital services. The systemic thinking I developed here now informs how I approach SaaS architecture and load balancing.</p>
                  <a href="https://drive.google.com/file/d/1NBIsal051Oqn_8JWls9Lhgr8mEcLpKhq/view" target="_blank" className="block w-full text-center py-2 px-4 rounded-full bg-indigo-800 text-white font-semibold hover:bg-indigo-700 transition duration-150">
                    Read Technical Report
                  </a>
                </div>
              </div>

              <div className="min-h-[400px] flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.projects.p5_t}</h2>
                  <p className="text-lg text-indigo-700 mb-6">{t.projects.p5_d}</p>
                  
                  <div className="mb-6 border-l-4 border-rose-800 pl-4 bg-rose-50 p-4 rounded-md">
                    <h4 className="text-lg font-semibold text-rose-900 mb-2">{t.projects.challenge_tag}</h4>
                    <p className="text-gray-600 text-sm">Kenya's power grid needed to accommodate the intermittent nature of wind power while maintaining system stability. The challenge was ensuring that voltage fluctuations from wind generation wouldn't destabilize the entire network serving millions of Kenyans.</p>
                  </div>
                  
                  <div className="mb-6 border-l-4 border-teal-700 pl-4 bg-teal-50 p-4 rounded-md">
                    <h4 className="text-lg font-semibold text-teal-900 mb-2">{t.projects.solution_tag}</h4>
                    <p className="text-gray-600 text-sm">I developed a comprehensive dynamic voltage stability analysis using DIgSILENT PowerFactory, modeling the entire power system to simulate and mitigate voltage fluctuations. This wasn't just a technical task; it was about ensuring reliable power for healthcare, education, and economic development.</p>
                  </div>

                  <div className="mb-6 border-l-4 border-blue-800 pl-4 bg-blue-50 p-4 rounded-md">
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">My Role & Timeline</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-blue-800">My Role:</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          <li>Power Systems Analyst</li>
                          <li>Grid Stability Modeling Lead</li>
                          <li>Technical Report Author</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-blue-800">Timeline:</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          <li>System Modeling: 4 months (2015)</li>
                          <li>Simulation & Analysis: 3 months</li>
                          <li>Documentation: 1 month</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">DIgSILENT PowerFactory</span>
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Power System Analysis</span>
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Renewable Energy Integration</span>
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Grid Stability Modeling</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-t pt-4 mt-auto">
                  <div className="text-left">
                    <div className="text-3xl font-bold text-indigo-800">25%</div>
                    <p className="text-xs text-gray-500 font-medium">Improved Grid Stability</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">60MW</div>
                    <p className="text-xs text-gray-500 font-medium">Clean Energy Integrated</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-indigo-800">100k+</div>
                    <p className="text-xs text-gray-500 font-medium">Households Benefited</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Digitalization & Automation */}
        <section className="mb-20">
          <div className="flex items-center mb-10">
            <div className="bg-teal-100 p-3 rounded-full mr-4">
              <Cpu className="w-8 h-8 text-teal-700" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Digitalization & Automation</h2>
              <p className="text-gray-600">SCADA integration, predictive maintenance, and IoT telemetry.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-indigo-800">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <img src="/imgs/geothermal-drilling-activities.jpg" alt="Predictive Maintenance AI" className="w-full h-48 object-cover rounded-lg shadow-lg border border-gray-200" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.projects.p6_t}</h3>
                  <p className="text-sm text-indigo-700 mb-4">{t.projects.p6_d}</p>
                  
                  <div className="mb-4 border-l-4 border-rose-800 pl-3 bg-rose-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold text-rose-900 mb-1">{t.projects.challenge_tag}</h4>
                    <p className="text-xs text-gray-600">Geothermal power plants in Kenya's Rift Valley were experiencing unexpected equipment failures, leading to costly downtime and reduced clean energy generation.</p>
                  </div>
                  
                  <div className="mb-4 border-l-4 border-teal-700 pl-3 bg-teal-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold text-teal-900 mb-1">{t.projects.solution_tag}</h4>
                    <p className="text-xs text-gray-600">I developed a predictive maintenance system using machine learning algorithms to analyze sensor data across key equipment and identify failure patterns.</p>
                  </div>
                  
                  <div className="mb-4 border-l-4 border-blue-800 pl-3 bg-blue-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">My Role & Timeline</h4>
                    <div className="space-y-1 text-xs">
                      <p><strong className="text-blue-800">Role:</strong> Machine Learning Engineer & Data Pipeline Architect</p>
                      <p><strong className="text-blue-800">Timeline:</strong> 6 months (2015)</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Python</span>
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">TensorFlow</span>
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Time Series</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 border-t pt-3 mt-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-800">40%</div>
                    <p className="text-xs text-gray-500 font-medium">Downtime ↓</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-800">$2M</div>
                    <p className="text-xs text-gray-500 font-medium">Savings/Year</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-800">95%</div>
                    <p className="text-xs text-gray-500 font-medium">Accuracy</p>
                  </div>
                </div>
                
                <a href="https://drive.google.com/file/d/0B2ovMeevnDjZd195VHN4UjNXak0/view?usp=sharing&resourcekey=0-OM41Swf1myiikab1d5w7LQ" target="_blank" className="mt-4 block w-full text-center py-2 px-4 rounded-full bg-indigo-800 text-white font-semibold hover:bg-indigo-700 transition duration-150 text-sm">
                  View Documentation
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-indigo-800">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <img src="https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Health Tech Load Balancing" className="w-full h-48 object-cover rounded-lg shadow-lg border border-gray-200" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Health Tech Load Balancing System</h3>
                  <p className="text-sm text-indigo-700 mb-4">Applying power grid principles to optimize healthcare service distribution across rural Kenya.</p>
                  
                  <div className="mb-4 border-l-4 border-rose-800 pl-3 bg-rose-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold text-rose-900 mb-1">{t.projects.challenge_tag}</h4>
                    <p className="text-xs text-gray-600">Rural health facilities in Kenya were experiencing uneven patient loads, with some overwhelmed while others remained underutilized.</p>
                  </div>
                  
                  <div className="mb-4 border-l-4 border-teal-700 pl-3 bg-teal-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold text-teal-900 mb-1">{t.projects.solution_tag}</h4>
                    <p className="text-xs text-gray-600">I developed a load balancing algorithm that treats patient flow like electrical current, dynamically redistributing patients to optimize resource utilization.</p>
                  </div>
                  
                  <div className="mb-4 border-l-4 border-blue-800 pl-3 bg-blue-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">My Role & Timeline</h4>
                    <div className="space-y-1 text-xs">
                      <p><strong className="text-blue-800">Role:</strong> Full-Stack Developer & Systems Architect</p>
                      <p><strong className="text-blue-800">Timeline:</strong> 6 months (2023)</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Node.js</span>
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">React</span>
                    <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">MongoDB</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 border-t pt-3 mt-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-800">50%</div>
                    <p className="text-xs text-gray-500 font-medium">Wait Time ↓</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-800">30%</div>
                    <p className="text-xs text-gray-500 font-medium">Resources ↑</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-800">15k+</div>
                    <p className="text-xs text-gray-500 font-medium">Patients/Mo</p>
                  </div>
                </div>
                
                <button onClick={() => window.location.href = '/contact'} className="mt-4 block w-full text-center py-2 px-4 rounded-full bg-indigo-800 text-white font-semibold hover:bg-indigo-700 transition duration-150 text-sm">
                  Learn More
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Climate Tech Investment Consultancy */}
        <section className="mb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-indigo-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="min-h-[400px] flex flex-col gap-6">
                <img src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Climate Tech Advisory" className="w-full h-auto rounded-lg shadow-lg border border-gray-200 object-cover mb-4" />
                <div className="bg-gray-50 p-5 rounded-xl shadow-inner border border-gray-200 flex-1">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">Full-Stack Advantage</h5>
                  <p className="text-sm text-gray-600 mb-4">Most advisors excel in one domain. I bridge investment analysis with operational execution, providing the complete picture that investors need and startups require to succeed.</p>
                  <a href="https://www.linkedin.com/in/clifford-ondieki-tpm/details/volunteering-experiences/" target="_blank" className="block w-full text-center py-2 px-4 rounded-full bg-indigo-800 text-white font-semibold hover:bg-indigo-700 transition duration-150">
                    View Case Study
                  </a>
                </div>
              </div>
              
              <div className="min-h-[400px] flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Climate Tech Investment Consultancy</h2>
                  <p className="text-lg text-indigo-700 mb-6">Bridging venture capital analysis with infrastructure deployment expertise to de-risk climate tech investments.</p>
                  
                  <div className="mb-6 border-l-4 border-rose-800 pl-4 bg-rose-50 p-4 rounded-md">
                    <h4 className="text-lg font-semibold text-rose-900 mb-2">{t.projects.challenge_tag}</h4>
                    <p className="text-gray-600 text-sm">Climate tech faces a critical gap: investors lack deployment expertise while infrastructure experts lack capital market access. This disconnect slows climate progress and wastes promising technologies.</p>
                  </div>
                  
                  <div className="mb-6 border-l-4 border-teal-700 pl-4 bg-teal-50 p-4 rounded-md">
                    <h4 className="text-lg font-semibold text-teal-900 mb-2">My Approach</h4>
                    <p className="text-gray-600 text-sm">Through my Energy Innovation Capital externship, I'm learning to integrated frameworks that evaluates startups through multiple lenses: investment potential, operational viability, and deployment strategy.</p>
                  </div>

                  <div className="mb-6 border-l-4 border-blue-800 pl-4 bg-blue-50 p-4 rounded-md">
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">My Role & Timeline</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-blue-800">My Role:</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          <li>Investment Analyst Extern</li>
                          <li>Technical Due Diligence Lead</li>
                          <li>Deployment Strategy Advisor</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-blue-800">Timeline:</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          <li>Externship: 3 months (2025)</li>
                          <li>Startup Analysis: 5+ companies</li>
                          <li>Investment Thesis Development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Venture Capital Analysis</span>
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Operational Due Diligence</span>
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Deployment Strategy</span>
                    <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Market Research</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-t pt-4 mt-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">5+</div>
                    <p className="text-xs text-gray-500 font-medium">Startups Analyzed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">2</div>
                    <p className="text-xs text-gray-500 font-medium">Investment Theses</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">3x</div>
                    <p className="text-xs text-gray-500 font-medium">Analysis Depth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Case Studies */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">Premium Case Studies</h2>
            <p className="text-lg text-gray-600">Advanced projects and sensitive implementations - full details available on request</p>
          </div>

          <div className="space-y-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border-4 border-amber-400 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gray-900/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl p-8 z-10">
                <div className="text-center text-white">
                  <Shield className="mx-auto mb-4 w-10 h-10 text-amber-400" />
                  <p className="text-xl font-bold">Full case study available on request</p>
                  <small className="block text-gray-300 mb-6">Includes technical architecture, implementation details, and performance analysis</small>
                  <button onClick={() => window.location.href = '/contact'} className="bg-amber-400 text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-amber-300 transition">
                    Request Full Case Study
                  </button>
                </div>
              </div>

              <div className="opacity-50 group-hover:opacity-20 transition-opacity duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Advanced Grid Optimization with AI-Driven Load Forecasting</h2>
                    <p className="text-lg text-gray-500 mb-6">A comprehensive smart grid solution implementing machine learning algorithms for predictive load management across Kenya's national power infrastructure.</p>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">My Role & Engagement</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong className="text-gray-700">My Role:</strong>
                          <p className="text-gray-600 mt-1">Lead AI Engineer & System Architect</p>
                        </div>
                        <div>
                          <strong className="text-gray-700">Timeline:</strong>
                          <p className="text-gray-600 mt-1">6-month enterprise engagement (2023)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">Project Highlights (Teaser)</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                        <li>Reduced grid instability incidents by <strong>32%</strong></li>
                        <li>Improved load forecasting accuracy to <strong>94.7%</strong></li>
                        <li>Deployed across <strong>15 major substations</strong></li>
                        <li>Integrated with existing SCADA systems</li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">Python</span>
                      <span className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">TensorFlow</span>
                      <span className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">LSTM Networks</span>
                      <span className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">SCADA Integration</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative w-full">
                      <img src="/imgs/saas.png" alt="Advanced Grid Optimization Preview" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                        <div className="text-center text-white">
                          <Eye className="mx-auto mb-1 w-8 h-8" />
                          <p className="font-semibold">Preview Available</p>
                          <small>Hover for details</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border-4 border-amber-400 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gray-900/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl p-8 z-10">
                <div className="text-center text-white">
                  <Shield className="mx-auto mb-4 w-10 h-10 text-amber-400" />
                  <p className="text-xl font-bold">Detailed implementation guide available on request</p>
                  <small className="block text-gray-300 mb-6">Includes system architecture, sensor integration, and ROI analysis</small>
                  <button onClick={() => window.location.href = '/contact'} className="bg-amber-400 text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-amber-300 transition">
                    Request Implementation Details
                  </button>
                </div>
              </div>

              <div className="opacity-50 group-hover:opacity-20 transition-opacity duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="relative w-full">
                      <img src="/imgs/iot.png" alt="Industrial IoT Platform Preview" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                        <div className="text-center text-white">
                          <Eye className="mx-auto mb-1 w-8 h-8" />
                          <p className="font-semibold">Preview Available</p>
                          <small>Hover for details</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Industrial IoT Platform for Manufacturing Excellence</h2>
                    <p className="text-lg text-gray-500 mb-6">Enterprise-grade IoT solution for real-time monitoring and optimization of manufacturing processes across multiple facilities.</p>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">My Role & Engagement</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong className="text-gray-700">My Role:</strong>
                          <p className="text-gray-600 mt-1">IoT Platform Architect & Lead Developer</p>
                        </div>
                        <div>
                          <strong className="text-gray-700">Timeline:</strong>
                          <p className="text-gray-600 mt-1">8-month multi-phase implementation (2022-2023)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">Project Highlights (Teaser)</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                        <li>Increased overall equipment effectiveness by <strong>28%</strong></li>
                        <li>Reduced unplanned downtime by <strong>45%</strong></li>
                        <li>Connected <strong>500+ sensors</strong> across 3 facilities</li>
                        <li>Real-time dashboard with predictive alerts</li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">Node.js</span>
                      <span className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">InfluxDB</span>
                      <span className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">MQTT</span>
                      <span className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">Docker</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    {/* CTA */}
    <section className="py-16 text-white" style={{ backgroundColor: 'var(--primary-indigo)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Build Something Impactful?</h2>
        <p className="text-lg font-light mb-6">Let's combine technical excellence with purpose-driven innovation to create solutions that truly matter.</p>
        <button onClick={() => window.location.href = '/contact'} className="inline-block py-3 px-8 rounded-full bg-white text-indigo-900 font-bold text-lg shadow-xl hover:bg-gray-100 transition duration-300">
          Let's Energize Change Together ⚡
        </button>
      </div>
    </section>
  </div>
);

const EVStudyView = ({ t, language }) => {
  const [activeDistrict, setActiveDistrict] = useState(DISTRICT_DATA[11]); // Treptow focus
  const sortedDistricts = useMemo(() => [...DISTRICT_DATA].sort((a, b) => b.ratio - a.ratio), []);
  const [currentStrategy, setCurrentStrategy] = useState('equity');
  const allocChartRef = useRef(null);
  const paretoChartRef = useRef(null);
  const resilienceChartRef = useRef(null);

  // Strategy Allocations (K=100) - From Table III
  const strategies = {
    equity: {
      title: "Max Equity Strategy",
      desc: "Prioritizes 'charging deserts.' It aggressively allocates resources to underserved districts like Treptow and Pankow to lower the Gini coefficient.",
      gini: "0.258 (-13%)",
      focus: "Peripheral Districts",
      data: [4, 4, 0, 0, 0, 0, 5, 5, 8, 9, 8, 12] // Matches districtData order
    },
    balanced: {
      title: "Balanced Strategy",
      desc: "A compromise solution. Achieves moderate equity gains while maintaining reasonable coverage in the center.",
      gini: "0.268",
      focus: "City-Wide",
      data: [8, 7, 5, 5, 5, 3, 5, 6, 6, 7, 6, 8]
    },
    utility: {
      title: "Max Utility Strategy",
      desc: "Market-driven approach. Loads chargers into Mitte and Friedrichshain. Maximizes coverage but worsens inequality.",
      gini: "0.283",
      focus: "City Center",
      data: [18, 13, 10, 8, 7, 2, 4, 4, 3, 3, 3, 2]
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      initCharts();
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initCharts = () => {
    if (!window.Chart) return;

    // Allocation Chart
    const allocCtx = allocChartRef.current.getContext('2d');
    new window.Chart(allocCtx, {
      type: 'bar',
      data: {
        labels: DISTRICT_DATA.map(d => d.name),
        datasets: [{
          label: 'New Chargers Allocated',
          data: strategies.equity.data,
          backgroundColor: '#0d9488',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, grid: { display: false } },
          x: { grid: { display: false }, ticks: { autoSkip: false, maxRotation: 90, minRotation: 90 } }
        },
        plugins: { legend: { display: false } }
      }
    });

    // Pareto Chart
    const paretoCtx = paretoChartRef.current.getContext('2d');
    new window.Chart(paretoCtx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Optimal Solutions',
          data: [
            {x: 0.85, y: 0.92}, {x: 0.90, y: 0.90}, {x: 0.82, y: 0.94},
            {x: 0.75, y: 0.88}, {x: 0.70, y: 0.85}
          ],
          backgroundColor: '#3b82f6'
        }, {
          label: 'Chosen Strategies',
          data: [
            {x: 0.85, y: 0.92}, {x: 0.82, y: 0.94}
          ],
          backgroundColor: '#ef4444',
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          x: { title: {display: true, text: 'Equity (1-Gini)'}, min: 0.6 },
          y: { title: {display: true, text: 'Utility (Coverage)'}, min: 0.8 }
        }
      }
    });

    // Resilience Chart
    const resilienceCtx = resilienceChartRef.current.getContext('2d');
    new window.Chart(resilienceCtx, {
      type: 'bar',
      data: {
        labels: ['Utility Guarantee', 'Equity Guarantee'],
        datasets: [
          { label: 'Deterministic (Fragile)', data: [0.72, 0.61], backgroundColor: '#cbd5e1' },
          { label: 'Fuzzy Robust (Our Model)', data: [0.78, 0.75], backgroundColor: '#0d9488' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: true, max: 1.0 } }
      }
    });
  };

  const updateStrategy = (stratKey) => {
    setCurrentStrategy(stratKey);
    // Note: In a real implementation, update the chart data here
  };

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Header / Abstract */}
      <header className="bg-slate-900 text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <span className="inline-block bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3 shadow-lg">IEEE Best Paper 2025 (Intelligent Transportation Track)</span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                Enabling Equitable EV Charger Deployment
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl">
                A Multi-Objective Geospatial Optimization Framework for Berlin
              </p>
            </div>
            <div className="mt-6 md:mt-0 text-right hidden md:block">
              <p className="text-sm text-slate-400">Authors</p>
              <p className="font-semibold">Clifford Ondieki</p>
              <p className="font-semibold">Tianxiang Lu</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 border-t border-slate-700 pt-8 mt-8">
            <div>
              <h3 className="text-teal-400 font-bold mb-2">The Problem</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Berlin's EV infrastructure is heavily concentrated in central districts (Mitte), leaving outer residential areas (Treptow-Köpenick) with "charging deserts" and high user congestion (32 BEVs/Charger).
              </p>
            </div>
            <div>
              <h3 className="text-teal-400 font-bold mb-2">The Method</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We developed a <strong>Multi-Objective Optimization (NSGA-II)</strong> model. It explicitly trades off <em>Utility</em> (coverage) vs. <em>Equity</em> (Gini coefficient) while accounting for uncertain demand.
              </p>
            </div>
            <div>
              <h3 className="text-teal-400 font-bold mb-2">The Result</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A "Robust Portfolio" of strategies. Our Equitable Strategy reduces the city-wide Gini coefficient by <strong>13%</strong> and boosts access in underserved areas by <strong>21%</strong>.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

        {/* SECTION 1: THE DIAGNOSIS (Interactive District Map) */}
        <section id="diagnosis">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">I. Diagnosis: The State of Berlin (Q2 2025)</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Explore the current infrastructure gap. Central districts are well-supplied, while outer districts face severe congestion.
              <br /><span className="text-sm text-slate-500 italic">Click on a district to view detailed metrics.</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Interactive List */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <span className="font-bold text-slate-700">Select a District</span>
                <span className="text-xs font-semibold bg-red-100 text-red-800 px-2 py-1 rounded">Red = High Congestion</span>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
                {sortedDistricts.map(d => {
                  let colorClass = "bg-green-50 border-green-200 text-green-800";
                  if (d.ratio > 25) colorClass = "bg-orange-50 border-orange-200 text-orange-800";
                  if (d.ratio > 30) colorClass = "bg-red-50 border-red-200 text-red-800";

                  return (
                    <div
                      key={d.name}
                      className={`district-item p-3 border rounded-lg text-center cursor-pointer transition-all ${colorClass} ${activeDistrict.name === d.name ? 'ring-2 ring-indigo-500 bg-indigo-50' : ''}`}
                      onClick={() => setActiveDistrict(d)}
                    >
                      <div className="text-xs font-bold truncate">{d.name}</div>
                      <div className="text-lg font-bold">{d.ratio}</div>
                      <div className="text-[10px] uppercase opacity-70">BEVs/Chrg</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Details Panel */}
            <div className="flex flex-col justify-center">
              <div className="card border-l-4 border-blue-600 h-full flex flex-col justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">{activeDistrict.name}</h3>
                  <p className="text-slate-500 mb-8">
                    {activeDistrict.ratio > 28
                      ? <span className="text-red-600 font-bold">High Congestion Area.</span>
                      : <span className="text-green-600 font-bold">Well Served.</span>
                    } {activeDistrict.ratio > 28 ? 'Requires immediate intervention.' : 'Lower priority for equity funding.'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="metric-value">{activeDistrict.chargers}</p>
                    <p className="metric-label">Total Chargers</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="metric-value">{activeDistrict.bevs.toLocaleString()}</p>
                    <p className="metric-label">Registered BEVs</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg col-span-2">
                    <p className="metric-value text-red-600">{activeDistrict.ratio}</p>
                    <p className="metric-label">Congestion (BEVs / Charger)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE STRATEGY SIMULATOR */}
        <section id="simulation" className="bg-slate-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">II. The Optimization: Choosing a Strategy</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                We modeled the deployment of <strong>100 New Chargers</strong>. Compare how different optimization priorities shift resources across the city.
              </p>
            </div>

            {/* Strategy Controls */}
            <div className="flex justify-center gap-4 mb-8">
              <button onClick={() => updateStrategy('equity')} className={`px-6 py-3 rounded-full font-bold transition ${currentStrategy === 'equity' ? 'text-white bg-teal-600 shadow-lg transform scale-105' : 'text-slate-600 bg-white border border-slate-300 hover:bg-slate-50'}`}>
                Strategy A: Max Equity
              </button>
              <button onClick={() => updateStrategy('balanced')} className={`px-6 py-3 rounded-full font-bold transition ${currentStrategy === 'balanced' ? 'text-white bg-teal-600 shadow-lg transform scale-105' : 'text-slate-600 bg-white border border-slate-300 hover:bg-slate-50'}`}>
                Strategy B: Balanced
              </button>
              <button onClick={() => updateStrategy('utility')} className={`px-6 py-3 rounded-full font-bold transition ${currentStrategy === 'utility' ? 'text-white bg-teal-600 shadow-lg transform scale-105' : 'text-slate-600 bg-white border border-slate-300 hover:bg-slate-50'}`}>
                Strategy C: Max Utility
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Text Context */}
              <div className="lg:col-span-1 space-y-6">
                <div className="card border-t-4 border-teal-500">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{strategies[currentStrategy].title}</h3>
                  <p className="text-slate-600 mb-4">{strategies[currentStrategy].desc}</p>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <h4 className="font-bold text-sm text-slate-500 uppercase mb-2">Key Outcome (K=100)</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Gini Coefficient:</span>
                        <span className="font-bold text-teal-700">{strategies[currentStrategy].gini}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Focus Area:</span>
                        <span className="font-bold text-slate-700">{strategies[currentStrategy].focus}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Visual Chart */}
              <div className="lg:col-span-2 card">
                <h4 className="text-center font-semibold text-slate-500 mb-4">Charger Allocation by District (K=100)</h4>
                <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3 text-green-700">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Optimization Gain</p>
                      <p className="text-xs text-gray-500">vs. Deterministic Planning</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-black text-green-700">+15%</span>
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wide">Resilience</span>
                  </div>
                </div>
                <div className="chart-container">
                  <canvas ref={allocChartRef}></canvas>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ROBUSTNESS & PARETO FRONT */}
        <section id="robustness">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Pareto Front */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">III. The Trade-off (Pareto Front)</h2>
              <p className="text-slate-600 mb-6">
                There is no single "perfect" solution. The chart below shows the optimal trade-offs found by the NSGA-II algorithm. Solutions to the top-left are better (Higher Utility, Higher Equity).
              </p>
              <div className="card">
                <div className="chart-container" style={{ height: '300px' }}>
                  <canvas ref={paretoChartRef}></canvas>
                </div>
                <p className="text-xs text-center text-slate-400 mt-2">X: Equity (1 - Gini) | Y: Utility (Coverage)</p>
              </div>
            </div>

            {/* Resilience Analysis */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">IV. Why "Fuzzy" Matters</h2>
              <p className="text-slate-600 mb-6">
                Standard plans are fragile. Our <strong>Robust (Fuzzy)</strong> model guarantees higher performance even when EV adoption fluctuates unexpectedly (Worst-Case Scenarios).
              </p>
              <div className="card">
                <div className="chart-container" style={{ height: '300px' }}>
                  <canvas ref={resilienceChartRef}></canvas>
                </div>
                <p className="text-xs text-center text-slate-400 mt-2">Comparison of Minimum Satisfaction levels in worst-case scenarios</p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: FUTURE WORK - GRID INTEGRATION */}
        <section id="future-work" className="pt-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">V. Future Work — Grid Integration</h2>
              <p className="mt-2 text-slate-600 max-w-3xl mx-auto">
                Planned extensions to improve robustness, scalability and operational intelligence for large-scale EV integration.
                Focus areas include spatially-aware power flow, dynamic loading scenarios and smart charging control.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Card 1 */}
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-lg transition">
                <div className="flex items-start gap-4 mb-2">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-teal-50 text-teal-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Geospatial Power Flow</h3>
                    <p className="text-sm text-slate-600 mt-2">Couple geospatial locations with grid topology to detect localized voltage constraints and prioritize reinforcement.</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                  <span>Planned Methods</span>
                  <span className="font-semibold text-teal-700">PowerFactory + GIS</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-lg transition">
                <div className="flex items-start gap-4 mb-2">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-amber-50 text-amber-600">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Dynamic Loading & Reinforcement</h3>
                    <p className="text-sm text-slate-600 mt-2">Simulate peak EV penetration events and time-varying dispatch to size reinforcements and control strategies.</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                  <span>Key Deliverable</span>
                  <span className="font-semibold text-amber-700">Scenario Suite & Metrics</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-lg transition">
                <div className="flex items-start gap-4 mb-2">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Smart Charging & V2G</h3>
                    <p className="text-sm text-slate-600 mt-2">Design demand-response and V2G control to flatten peaks and support distribution-level services.</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                  <span>Integration</span>
                  <span className="font-semibold text-indigo-700">Grid Signals & Market</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://www.linkedin.com/in/clifford-ondieki-tpm/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[--highlight-gold] transition duration-300" title="LinkedIn Profile" aria-label="LinkedIn Profile">
              <Linkedin size={28} />
            </a>
          </div>

          <p className="text-gray-400 text-sm mb-4">
            Copyright &copy; {new Date().getFullYear()} Clifford Ondieki | Bridging technology with purpose — energizing change one system at a time.
          </p>
          <p className="text-xs space-x-4">
            <button onClick={() => setPage('privacy')} className="text-gray-500 hover:text-white transition">Privacy Policy</button>
            <span className="text-gray-600">|</span>
            <button onClick={() => setPage('contact')} className="text-gray-500 hover:text-white transition">Contact</button>
          </p>
        </div>
      </footer>
    </div>
  );
}
