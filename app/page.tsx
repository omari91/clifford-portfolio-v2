"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Zap, 
  Cpu, 
  Activity, 
  GraduationCap, 
  Linkedin, 
  Github, 
  Award, 
  ArrowRight, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  CloudLightning, 
  Shield, 
  Layers, 
  Puzzle, 
  Lightbulb,
  TrendingUp, 
  Leaf, 
  Wind,
  Users, 
  Eye,
} from 'lucide-react';
import CookieBanner from '../components/CookieBanner';

declare global {
  interface Window {
    Chart?: any;
    clarity?: any;
  }
}

// --- DATA: EV DISTRICT ANALYSIS ---
type District = {
  name: string;
  chargers: number;
  bevs: number;
  ratio: number;
  status: string;
  score: number;
};

const DISTRICT_DATA: District[] = [
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

type TechStackKey =
  | "python"
  | "aws"
  | "powerfactory"
  | "pandapower"
  | "github"
  | "docker"
  | "mongodb"
  | "tensorflow";

const TECH_STACK: { key: TechStackKey; name: string; icon: string; color: string }[] = [
  { key: "python", name: "Python", icon: "python.svg", color: "blue" },
  { key: "aws", name: "AWS Cloud", icon: "aws.svg", color: "orange" },
  { key: "powerfactory", name: "PowerFactory", icon: "PowerFactory.svg", color: "indigo" },
  { key: "pandapower", name: "Pandapower", icon: "pp.svg", color: "green" },
  { key: "github", name: "GitHub", icon: "github.svg", color: "slate" },
  { key: "docker", name: "Docker", icon: "docker.svg", color: "blue" },
  { key: "mongodb", name: "MongoDB", icon: "mongodb.svg", color: "green" },
  { key: "tensorflow", name: "TensorFlow", icon: "tensorflow.svg", color: "orange" }
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
      privacy: "Privacy",
      brand: "Clifford Ondieki",
      role: "Power Systems Engineer"
    },
    home: {
      hero_title: "Power Systems & Grid Integration Specialist",
      hero_subtitle_pre: "I bridge the gap between",
      hero_subtitle_grid: "Grid Simulation (PowerFactory)",
      hero_subtitle_mid: "and",
      hero_subtitle_real: "Real-World grid integration. Specializing in Voltage Stability, Renewable Integration, and Automation;",
      hero_subtitle_tail: "to engineer the",
      hero_subtitle_target: "Target Grid 2045",
      cta_portfolio: "View Engineering Portfolio",
      cta_contact: "Schedule a Conversation Today",
      ieee_badge: "IEEE Best Paper 2025 Winner (Intelligent Transportation Track)",
      status_badge: "Active",
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
      article_tag: "Featured Article",
      research_title: "Solving the §14a EnWG Challenge with Math",
      research_main_title: "IEEE Best Paper Award (2025): Robust EV Grid Integration",
      research_desc: "Traditional grid planning fails under uncertainty. My research developed a Fuzzy Multi-Objective Optimization Framework that balances grid constraints with user equity, creating a robust solution for the deployment of EV infrastructure in Berlin.",
      research_stat_title: "Optimization Result",
      research_stat_val: "+15%",
      research_stat_label: "Cost Reduction vs. Deterministic Planning",
      research_button: "Read the Full Case Study",
      phil_title: "\"Smart Laziness\" & Systemic Efficiency",
      phil_body: "\"True efficiency isn't about working harder—it's about understanding systems so deeply that you can identify the one change that eliminates ten problems.\"",
      phil_sub: "This principle, learned from debugging transformers in Kenya, now guides how I approach everything from code architecture to team dynamics.",
      bio_title: "From Power Systems to Product and Back to Engineering",
      bio_p1: "Operating as a Graduate Researcher in Grid Optimization (M.Sc. Candidate, 2026), I recently received the IEEE ETECOM 2025 Best Paper Award for optimizing EV charging infrastructure by achieving 15% cost reduction while improving grid reliability across 500+ scenarios.",
      bio_p2_pre: "Before returning to core engineering, I scaled digital systems with",
      bio_p2_mid: "and",
      bio_p2_post: "learning how technical solutions actually get adopted and sustained in the real world. Now focused on grid integration, renewable energy, and power systems simulation for Germany's energy transition.",
      bio_button: "Discover My Story",
      stat_msc: "M.Sc. Engineering Management (2026)",
      stat_member: "IEEE & VDI Member",
      stat_location: "Berlin, Germany",
      sim_title: "Simulation Meets Reality",
      sim_quote: "\"The best engineering works in PowerFactory and in the field. My path from power systems simulation to commercial operations taught me to design solutions that are technically robust and commercially viable—whether modeling grid stability or commissioning renewable installations.\"",
      skills_title: "Skills, Tools & Platforms",
      skills_sub: "A blend of technical and professional proficiencies",
      toolkit_title: "Engineering Toolkit",
      toolkit_1_label: "Grid Simulation",
      toolkit_1_body: "DIgSILENT PowerFactory (Python API), MATLAB/Simulink",
      toolkit_2_label: "Optimization",
      toolkit_2_body: "Python (Pandas, SciPy), NSGA-II, Fuzzy Logic Control",
      toolkit_3_label: "Automation",
      toolkit_3_body: "SCADA Basics, PLC Programming, Pandapower",
      regulatory_title: "Regulatory Competence",
      regulatory_vde: "VDE-AR-N 4110 / 4120",
      regulatory_enwg: "§14a (Steuerbare Verbrauchseinrichtungen)",
      regulatory_iec: "IEC 61850 (Substation Automation)",
      leadership_title: "Technical Leadership & Delivery",
      leadership_1: "Techno-Economic Analysis",
      leadership_2: "Stakeholder Requirement Analysis",
      leadership_3: "Systems Thinking, Cross-Domain Innovation",
      leadership_4: "Agile/Scrum Methodologies",
      tech_stack_labels: {
        python: "Python",
        aws: "AWS / Cloud",
        powerfactory: "PowerFactory",
        pandapower: "Pandapower",
        github: "Git / CI/CD",
        docker: "Docker",
        mongodb: "MongoDB",
        tensorflow: "TensorFlow"
      },
      affiliations_title: "Affiliations",
      aff_ieee: "Member & Researcher, IEEE 2025",
      aff_vdi: "Member, 2025",
      aff_vde: "Member, 2025",
      aff_kiron: "Kiron Open Higher Education 2025",
      aff_imagine: "Imagine Foundation 2023",
      aff_ashoka: "Ashoka Network 2024",
      aff_alx: "Alx Network 2018",
      aff_ebk: "Engineers Board of Kenya 2016",
      philosophy_section_title: "My Philosophy",
      philosophy_section_sub: "Core Beliefs",
      philosophy_button: "Explore My Philosophy",
      cta_title2: "Ready to Build Something Impactful?",
      cta_body2: "Let's combine technical excellence with purpose-driven innovation to create solutions that truly matter.",
      cta_button2: "Let's Energize Change Together ⚡",
      card_cta: "See Project →"
    },
    about: {
      hero_title: "The Journey of a Hybrid Innovator.",
      hero_subtitle: "From Kenya’s power grids to Berlin’s energy transition — blending engineering precision with systemic thinking.",
      bio_title: "Who I Am: The System Builder",
      bio_p1: "I'm Clifford Ondieki, a Power Systems Engineer who believes true innovation springs from a deep understanding of connections whether in high-voltage grids or human teams.",
      bio_p2: "My path from analyzing grid stability in Kenya to optimizing energy systems in Berlin has been defined by one goal: bridging the gap between simulation and reality. Every challenge from commissioning hardware to modeling renewable integration shapes my approach to grid resilience and technical architecture.",
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
      photo_caption: "From Kitale to Europe – validating models in the field. Where cliffs become stairs, each step carved with quiet strength. 🐐",
      overcome_title: "Overcoming & Development",
      overcome_1_t: "Finding the Balance: Systemic Intelligence",
      overcome_1_p: "One of my biggest challenges was balancing academic rigor with field operations. This led me to develop \"Smart Laziness\" - the engineering art of deep analysis to find the single, strategic change that solves ten problems. It's about optimization over brute force.",
      overcome_2_t: "Cultural Navigation: The Competitive Advantage",
      overcome_2_p: "Settling in Berlin brought the challenge of adapting my problem solving style. I've learned that diversity is a technical advantage and my heritage emphasizes resilience and adaptation, qualities essential for stabilizing modern power grids.",
      stars_card1_t: "Technical Mentors",
      stars_card1_p: "Engineers who showed me that true mastery lies in understanding the \"why\" behind every Grid Code and VDE regulation, not just following the manual.",
      stars_card2_t: "Community Leaders",
      stars_card2_p: "Leaders who taught me that sustainable infrastructure happens when you empower local teams to maintain their own systems.",
      skills_title: "Skills Forged Through Experience",
      skills_sub: "A hybrid skill set combining technical precision with operational strategy.",
      skills_1_t: "Grid & Systems Architecture",
      skills_1_p: "From 11kV power lines to complex data pipelines by mastering system topology.",
      skills_2_t: "Intercultural Engineering",
      skills_2_p: "Bridging German standards (VDE) with adaptable problem-solving from emerging markets.",
      skills_3_t: "Operational Strategy",
      skills_3_p: "Aligning technical capability (Simulation) with deployment reality (Commissioning).",
      skills_4_t: "Grid Analytics & Data",
      skills_4_p: "Using SCADA data and NSGA-II to predict behaviors and optimize performance.",
      skills_5_t: "Commissioning & Testing",
      skills_5_p: "Experience in validating systems in the field to ensure adoption and success.",
      skills_6_t: "Technical Communication",
      skills_6_p: "Translating complex engineering concepts into clear insights for stakeholders.",
      endorsements_title: "Professional Endorsements",
      endorse_1_name: "Yukabeth Kidenda",
      endorse_1_role: "CEO at Teach for Kenya",
      endorse_1_quote: "\"Clifford is a very focused young professional... eager to learn and willing to go the extra mile to ensure high-quality outcomes.\"",
      endorse_2_name: "Valerie O.",
      endorse_2_role: "Customer Success Manager",
      endorse_2_quote: "\"Clifford embodies leadership with his hands-on approach to execute and deliver on set objectives... I strongly recommend him.\"",
      endorse_3_name: "Abdul Idris",
      endorse_3_role: "Key Account Manager - Contractor Consulting (Mentor)",
      endorse_3_quote: "\"Clifford impressed me with his motivation, openness, and genuine commitment to integrating into the German job market. He consistently sought feedback on how to improve, actively implemented it, and showed a strong drive to grow both professionally and personally. His enthusiasm and proactive mindset made working with him a real pleasure.\"",
      outlook_title: "Looking Ahead: Grid Transformation",
      outlook_p1: "I aim to apply my hybrid skills in simulation and operations to the challenges of the German grid. My goal is to create systems that are resilient, efficient, and future-proof.",
      outlook_p2: "Long-term, I will continue to mentor the next generation of engineers, advance STEM education in Africa, and break barriers – always driven by purpose-oriented problem-solving.",
      outlook_button: "Discuss Opportunities"
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
      p6_d: "A machine learning system for predicting equipment failures in geothermal power generation, reducing operational costs.",
      p2_badge: "New 2026",
      p2_button: "View Architecture & Code",
      p3_badge: "Research",
      section_grid_title: "Grid Integration & Power Systems",
      section_grid_sub: "Dynamic modeling, voltage stability, and grid code compliance.",
      p4_challenge_p: "Public Electric Vehicle (EV) charging infrastructure is largely demand-driven, reinforcing spatial inequities. This creates a \"chicken-and-egg\" problem, where a lack of infrastructure suppresses EV adoption in underserved areas, justifying continued underinvestment.",
      p4_solution_p: "We implemented a multi-objective NSGA-II model in Python to balance coverage and spatial equity, minimizing the Gini coefficient of EVs per charger. This approach provides different Pareto-optimal deployment strategies for urban planners, directly addressing infrastructure placement under complex geospatial and socio-economic constraints.",
      role_timeline_title: "My Role & Timeline",
      role_label: "My Role:",
      timeline_label: "Timeline:",
      p4_role_items: [
        "Lead Data Scientist & Geospatial Analyst",
        "NSGA-II Algorithm Development",
        "Equity Metric Design (Gini coefficient)"
      ],
      p4_timeline_items: [
        "Research: 6 months (2025)",
        "Model Development: 4 months",
        "Validation & Analysis: 2 months"
      ],
      p4_stat_1_label: "Reduction in Gini Coefficient",
      p4_stat_2_label: "Model Projects 6x More Chargers",
      p4_stat_3_label: "Boost in Local Access",
      p4_side_title: "Philosophy in Action",
      p4_side_p: "The objective is not just to deploy more chargers, but to deploy them strategically to foster equitable access and sustainable urban mobility. My framework empowers municipalities to navigate the efficiency-equity trade-off with data-driven insights.",
      p4_side_button: "Explore My Work",
      p5_key_lesson_title: "Key Lesson",
      p5_key_lesson_p: "This project taught me that resilience isn't just for power lines—it's for people's access to vital services. The systemic thinking I developed here now informs how I approach SaaS architecture and load balancing.",
      p5_report_button: "Read Technical Report",
      p5_badge: "Critical",
      p5_challenge_p: "Kenya's power grid needed to accommodate the intermittent nature of wind power while maintaining system stability. The challenge was ensuring that voltage fluctuations from wind generation wouldn't destabilize the entire network serving millions of Kenyans.",
      p5_solution_p: "I developed a comprehensive dynamic voltage stability analysis using DIgSILENT PowerFactory, modeling the entire power system to simulate and mitigate voltage fluctuations. This wasn't just a technical task; it was about ensuring reliable power for healthcare, education, and economic development.",
      p5_role_items: [
        "Power Systems Analyst",
        "Grid Stability Modeling Lead",
        "Technical Report Author"
      ],
      p5_timeline_items: [
        "System Modeling: 4 months (2015)",
        "Simulation & Analysis: 3 months",
        "Documentation: 1 month"
      ],
      p5_stat_1_label: "Improved Grid Stability",
      p5_stat_2_label: "Clean Energy Integrated",
      p5_stat_3_label: "Households Benefited",
      section_digital_title: "Digitalization & Automation",
      section_digital_sub: "SCADA integration, predictive maintenance, and IoT telemetry.",
      p6_challenge_p: "Geothermal power plants in Kenya's Rift Valley were experiencing unexpected equipment failures, leading to costly downtime and reduced clean energy generation.",
      p6_solution_p: "I developed a predictive maintenance system using machine learning algorithms to analyze sensor data across key equipment and identify failure patterns.",
      p6_role_line: "Machine Learning Engineer & Data Pipeline Architect",
      p6_timeline_line: "6 months (2015)",
      p6_stat_1_label: "Downtime ↓",
      p6_stat_2_label: "Savings/Year",
      p6_stat_3_label: "Accuracy",
      p6_button: "View Documentation",
      health_title: "Health Tech Load Balancing System",
      health_sub: "Applying power grid principles to optimize healthcare service distribution across rural Kenya.",
      health_challenge_p: "Rural health facilities in Kenya were experiencing uneven patient loads, with some overwhelmed while others remained underutilized.",
      health_solution_p: "I developed a load balancing algorithm that treats patient flow like electrical current, dynamically redistributing patients to optimize resource utilization.",
      health_role_line: "Full-Stack Developer & Systems Architect",
      health_timeline_line: "6 months (2023)",
      health_stat_1_label: "Wait Time ↓",
      health_stat_2_label: "Resources ↑",
      health_stat_3_label: "Patients/Mo",
      health_button: "Learn More",
      climate_left_title: "Full-Stack Advantage",
      climate_left_p: "Most advisors excel in one domain. I bridge investment analysis with operational execution, providing the complete picture that investors need and startups require to succeed.",
      climate_left_button: "View Case Study",
      climate_title: "Climate Tech Investment Consultancy",
      climate_sub: "Bridging venture capital analysis with infrastructure deployment expertise to de-risk climate tech investments.",
      climate_challenge_p: "Climate tech faces a critical gap: investors lack deployment expertise while infrastructure experts lack capital market access. This disconnect slows climate progress and wastes promising technologies.",
      climate_approach_title: "My Approach",
      climate_approach_p: "Through my Energy Innovation Capital externship, I'm learning to integrated frameworks that evaluates startups through multiple lenses: investment potential, operational viability, and deployment strategy.",
      climate_role_items: [
        "Investment Analyst Extern",
        "Technical Due Diligence Lead",
        "Deployment Strategy Advisor"
      ],
      climate_timeline_items: [
        "Externship: 3 months (2025)",
        "Startup Analysis: 5+ companies",
        "Investment Thesis Development"
      ],
      climate_stat_1_label: "Startups Analyzed",
      climate_stat_2_label: "Investment Theses",
      climate_stat_3_label: "Analysis Depth",
      climate_tag_market: "Market Research",
      premium_title: "Premium Case Studies",
      premium_sub: "Advanced projects and sensitive implementations - full details available on request",
      premium_overlay1_title: "Full case study available on request",
      premium_overlay1_sub: "Includes technical architecture, implementation details, and performance analysis",
      premium_overlay1_button: "Request Full Case Study",
      premium_case1_title: "Advanced Grid Optimization with AI-Driven Load Forecasting",
      premium_case1_desc: "A comprehensive smart grid solution implementing machine learning algorithms for predictive load management across Kenya's national power infrastructure.",
      premium_role_title: "My Role & Engagement",
      premium_role_label: "My Role:",
      premium_timeline_label: "Timeline:",
      premium_role_1: "Lead AI Engineer & System Architect",
      premium_timeline_1: "6-month enterprise engagement (2023)",
      premium_highlights_title: "Project Highlights (Teaser)",
      premium_highlights_items: [
        "Reduced grid instability incidents by 32%",
        "Improved load forecasting accuracy to 94.7%",
        "Deployed across 15 major substations",
        "Integrated with existing SCADA systems"
      ],
      premium_preview_label: "Preview Available",
      premium_preview_hint: "Hover for details",
      premium_overlay2_title: "Detailed implementation guide available on request",
      premium_overlay2_sub: "Includes system architecture, sensor integration, and ROI analysis",
      premium_overlay2_button: "Request Implementation Details",
      premium_case2_title: "Industrial IoT Platform for Manufacturing Excellence",
      premium_case2_desc: "Enterprise-grade IoT solution for real-time monitoring and optimization of manufacturing processes across multiple facilities.",
      premium_role_2: "IoT Platform Architect & Lead Developer",
      premium_timeline_2: "8-month multi-phase implementation (2022-2023)",
      premium_highlights2_title: "Project Highlights (Teaser)",
      premium_highlights2_items: [
        "Increased overall equipment effectiveness by 28%",
        "Reduced unplanned downtime by 45%",
        "Connected 500+ sensors across 3 facilities",
        "Real-time dashboard with predictive alerts"
      ],
      cta_title: "Ready to Build Something Impactful?",
      cta_body: "Let's combine technical excellence with purpose-driven innovation to create solutions that truly matter.",
      cta_button: "Let's Energize Change Together ⚡"
    },
    philosophy: {
      hero_title: "Engineering Empathy",
      hero_subtitle: "Bridging technical precision with human purpose to build resilient systems.",
      core_title: "Core Philosophy: Systems & People",
      core_p1: "The most robust grids—whether electrical or organizational—are built with deep understanding and a commitment to stability.",
      core_p2: "This philosophy stems from a belief that true engineering requires more than calculation. It demands the ability to understand the context behind every fault, the operational nuances that shape how systems behave, and the empathy to build solutions that work in the real world, not just in simulation.",
      smart_title: "\"Smart Laziness\" & Efficiency",
      smart_how_title: "How It Works in Engineering:",
      reflections_title: "Reflections on Tech & Life",
      living_title: "Living Philosophy",
      practice_title: "Philosophy in Practice",
      practice_intro:
        "These aren't just abstract concepts—they're the practical frameworks I use daily in technical leadership and innovation.",
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
      hero_subtitle: "Thoughts on engineering empathy, smart laziness, and bridging worlds through innovation.",
      featured_label: "Featured • Engineering Philosophy",
      featured_title: "Engineering Empathy: Why the Best Systems Are Built with Heart",
      featured_lede: "The most robust systems—whether technical or human—are built with deep understanding and a commitment to shared purpose.",
      featured_body: "After years of debugging everything from 11kV transformers in Kenya to SaaS architectures in Berlin, I've learned that the most elegant solutions emerge when we approach technical challenges with genuine empathy for the humans who will interact with our systems.",
      featured_tags: ["Engineering Philosophy", "Leadership", "Systems Thinking"],
      post_a_label: "Coming Soon • Cross-Domain Innovation",
      post_a_title: "How Kenya's Grid Taught Me to Prioritize SaaS Features",
      post_a_body: "What I learned about load balancing from Kenya's power infrastructure and how those principles now guide my approach to product prioritization and system architecture.",
      post_a_tags: ["Systems Thinking", "Product Strategy", "Cultural Impact"],
      post_b_label: "Coming Soon • Life & Technology",
      post_b_title: "Parenting & Python: Debugging Life's Algorithms",
      post_b_body: "Reflections on how raising a daughter has taught me patience, presence, and the profound simplicity that often underlies the most complex systems.",
      post_b_tags: ["Personal Growth", "Engineering Empathy", "Life Lessons"],
      post_c_label: "Coming Soon • Career Journey",
      post_c_title: "From 11kV Lines to SaaS Pipelines: A Systems Thinker's Journey",
      post_c_body: "A detailed case study of how electrical engineering principles translate to software architecture, and why understanding power grids makes you a better product manager.",
      post_c_tags: ["Career Journey", "Technical Leadership", "Cross-Domain Learning"],
      post_d_label: "Coming Soon • Innovation Philosophy",
      post_d_title: "Smart Laziness: The Art of Systemic Efficiency",
      post_d_body: "Why the best engineers are strategically lazy, and how understanding systems deeply enough to make one change that eliminates ten problems is the ultimate productivity hack.",
      post_d_tags: ["Productivity", "Systems Optimization", "Engineering Philosophy"],
      linkedin_title: "Follow My Journey on LinkedIn",
      linkedin_body: "While I'm developing this blog, I regularly share insights, reflections, and behind-the-scenes thoughts on my LinkedIn. Join me there for real-time updates on engineering empathy, smart laziness, and the intersection of technology and purpose.",
      linkedin_button: "Connect on LinkedIn",
      newsletter_title: "Stay Updated",
      newsletter_body: "Be the first to know when new insights are published. I'll share thoughts on engineering empathy, cross-domain innovation, and building systems that serve both technical excellence and human purpose.",
      newsletter_placeholder: "Enter your email",
      newsletter_button: "Notify Me",
      newsletter_note: "No spam, just meaningful insights. Unsubscribe anytime.",
      cta_title: "Ready to Build Something Impactful?",
      cta_body: "Let's combine technical excellence with purpose-driven innovation to create solutions that truly matter.",
      cta_button: "Let's Energize Change Together ⚡"
    },
    ev: {
      hero_title: "EV Infrastructure Strategy",
      hero_subtitle: "A Two-Paper Progression from Deterministic Planning to Fuzzy Robustness",
      diagnosis_t: "The Diagnosis: Infrastructure Gaps",
      diagnosis_p: "Central districts are well-supplied, while outer districts face severe BEV-per-charger pressure.",
      opt_t: "Optimization Result",
      opt_p: "Our NSGA-II framework reduces the city-wide Gini coefficient by 13% while maintaining utility standards.",
      equity_stat: "-13% Gini Index",
      header_badge: "IEEE Best Paper 2025 (Intelligent Transportation Track)",
      header_title: "Enabling Equitable EV Charger Deployment",
      header_subtitle: "A Multi-Objective Geospatial Optimization Framework for Berlin",
      header_authors_label: "Authors",
      header_author_1: "Clifford Ondieki",
      header_author_2: "Tianxiang Lu",
      header_problem_t: "The Problem",
      header_problem_p: "Berlin's EV infrastructure is heavily concentrated in central districts (Mitte), leaving outer residential areas (Treptow-Köpenick) with \"charging deserts\" and high user congestion (32 BEVs/Charger).",
      header_method_t: "The Method",
      header_method_p: "We developed a Multi-Objective Optimization (NSGA-II) model. It explicitly trades off Utility (coverage) vs. Equity (Gini coefficient) while accounting for uncertain demand.",
      header_result_t: "The Result",
      header_result_p: "A \"Robust Portfolio\" of strategies. Our Equitable Strategy reduces the city-wide Gini coefficient by 13% and boosts access in underserved areas by 21%.",
      diagnosis_title: "I. Diagnosis: The State of Berlin (Q2 2025)",
      diagnosis_intro: "Explore the current infrastructure gap. Central districts are well-supplied, while outer districts face severe congestion.",
      diagnosis_hint: "Click on a district to view detailed metrics.",
      district_select_label: "Select a District",
      district_congestion_label: "Red = High Congestion",
      district_high: "High Congestion Area.",
      district_well: "Well Served.",
      district_high_note: "Requires immediate intervention.",
      district_low_note: "Lower priority for equity funding.",
      metric_chargers: "Total Chargers",
      metric_bevs: "Registered BEVs",
      metric_ratio: "Congestion (BEVs / Charger)",
      optimization_title: "II. The Optimization: Choosing a Strategy",
      optimization_intro: "We modeled the deployment of 100 New Chargers. Compare how different optimization priorities shift resources across the city.",
      strategy_a: "Strategy A: Max Equity",
      strategy_b: "Strategy B: Balanced",
      strategy_c: "Strategy C: Max Utility",
      key_outcome_label: "Key Outcome (K=100)",
      gini_label: "Gini Coefficient:",
      focus_label: "Focus Area:",
      chart_title: "Charger Allocation by District (K=100)",
      gain_label: "Optimization Gain",
      gain_sub: "vs. Deterministic Planning",
      gain_metric: "+15%",
      gain_tag: "Resilience",
      pareto_title: "III. The Trade-off (Pareto Front)",
      pareto_intro: "There is no single \"perfect\" solution. The chart below shows the optimal trade-offs found by the NSGA-II algorithm. Solutions to the top-left are better (Higher Utility, Higher Equity).",
      pareto_caption: "X: Equity (1 - Gini) | Y: Utility (Coverage)",
      fuzzy_title: "IV. Why \"Fuzzy\" Matters",
      fuzzy_intro: "Standard plans are fragile. Our Robust (Fuzzy) model guarantees higher performance even when EV adoption fluctuates unexpectedly (Worst-Case Scenarios).",
      fuzzy_caption: "Comparison of Minimum Satisfaction levels in worst-case scenarios",
      future_title: "V. Future Work — Grid Integration",
      future_intro: "Planned extensions to improve robustness, scalability and operational intelligence for large-scale EV integration. Focus areas include spatially-aware power flow, dynamic loading scenarios and smart charging control.",
      future_card1_t: "Geospatial Power Flow",
      future_card1_p: "Couple geospatial locations with grid topology to detect localized voltage constraints and prioritize reinforcement.",
      future_card1_meta_l: "Planned Methods",
      future_card1_meta_v: "PowerFactory + GIS",
      future_card2_t: "Dynamic Loading & Reinforcement",
      future_card2_p: "Simulate peak EV penetration events and time-varying dispatch to size reinforcements and control strategies.",
      future_card2_meta_l: "Key Deliverable",
      future_card2_meta_v: "Scenario Suite & Metrics",
      future_card3_t: "Smart Charging & V2G",
      future_card3_p: "Design demand-response and V2G control to flatten peaks and support distribution-level services.",
      future_card3_meta_l: "Integration",
      future_card3_meta_v: "Grid Signals & Market"
    },
    contact: {
      hero_title: "Ready to Solve Grid Challenges? ⚡",
      hero_subtitle: "Open for Engineering, Commissioning, and Simulation roles.",
      form_title: "Start a Conversation",
      form_desc: "Whether you have a specific opening in Grid Integration, need simulation expertise (PowerFactory), or want to discuss renewable energy commissioning—I'd love to hear from you.",
      form_name_label: "Your Name",
      form_email_label: "Your Email",
      form_topic_label: "Topic",
      form_topic_placeholder: "Select a topic",
      form_message_label: "Your Message",
      form_message_placeholder: "How can my engineering skills support your team?",
      form_option_grid: "Grid Integration / Power Systems Role",
      form_option_commissioning: "Commissioning Opportunity",
      form_option_simulation: "Simulation (PowerFactory/Python) Project",
      form_option_werkstudent: "Werkstudent Position",
      form_option_consulting: "Consulting Opportunity",
      form_option_speaking: "Speaking Engagement",
      form_option_mentorship: "Mentorship",
      form_option_general: "General Inquiry",
      contact_email_title: "Email",
      contact_phone_title: "Phone",
      contact_linkedin_title: "LinkedIn",
      contact_linkedin_cta: "View Engineering Profile",
      contact_base_title: "Base",
      contact_base_desc: "Berlin, Germany (Open to travel within Germany)",
      focus_title: "Current Focus: German Energy Sector",
      focus_body: "I am actively seeking Werkstudent or Junior Engineer roles where I can apply my Anabin H+ recognized degree and simulation skills to the German energy transition.",
      focus_roles_label: "Target Roles",
      focus_roles_desc: "Grid Integration Engineer, Commissioning Engineer (Inbetriebnahme), Power Systems Analyst.",
      focus_sectors_label: "Key Sectors",
      focus_sectors_desc: "TSOs (Transmission), DSOs (Distribution), Wind/Solar OEMs, and Energy Consulting.",
      value_title: "How I Can Add Value",
      value_sim_title: "Simulation",
      value_sim_desc: "PowerFactory & Python modeling for grid stability",
      value_integ_title: "Integration",
      value_integ_desc: "Connecting Renewables & EVs to the grid",
      value_comm_title: "Commissioning",
      value_comm_desc: "Field validation and rigorous testing",
      value_digi_title: "Digitalization",
      value_digi_desc: "SCADA data analysis and process automation",
      value_mentor_title: "Mentorship & Education",
      value_mentor_desc: "Fostering STEM education and technical leadership development",
      commitment_title: "My Commitment to You",
      commitment_body: "I personally read and respond to every message within 24-48 hours. If your project or opportunity aligns with building systems that serve both technical excellence and human purpose, let's explore how we can create something meaningful together.",
      commitment_quote: "\"The best innovations happen when diverse perspectives combine toward a shared purpose.\"",
      cta_title: "Ready to Build Something Impactful?",
      cta_body: "Let's combine technical excellence with purpose-driven innovation to create solutions that truly matter.",
      cta_button: "Start the Conversation",
      field_name: "Your Name",
      field_email: "Your Email",
      field_subj: "Topic",
      field_msg: "Your Message",
      btn_send: "Send Message"
    },
    privacy: {
      title: "Privacy Policy",
      subtitle: "Your privacy and data protection are fundamental to how I operate",
      commitment_title: "Our Commitment to Your Privacy",
      commitment_p1: "As an engineer who values both technical excellence and human purpose, I am committed to protecting your privacy and being transparent about how data is collected and used on this website.",
      commitment_p2: "This privacy policy explains what information is collected, how it's used, and your rights regarding your personal data when you visit my portfolio website.",
      info_title: "Information We Collect",
      analytics_title: "Analytics Data (Microsoft Clarity)",
      analytics_what: "User interactions, page views, scroll behavior, click patterns, session recordings",
      analytics_purpose: "To understand how visitors engage with content and improve user experience",
      analytics_controller: "Microsoft Corporation",
      analytics_retention: "Data is retained according to Microsoft's privacy policy",
      analytics_link: "",
      analytics_link_text: "",
      analytics_p: "",
      contact_form_title: "Contact Form Data",
      contact_what: "Name, email address, subject, message content",
      contact_purpose: "To respond to your inquiries and potential collaboration requests",
      contact_controller: "Clifford Ondieki",
      contact_retention: "Stored securely for up to 2 years or until you request deletion",
      contact_link: "",
      contact_link_text: "",
      technical_title: "Technical Data",
      technical_what: "IP address, browser type, device information, referring website",
      technical_purpose: "Website functionality, security, and basic analytics",
      technical_basis: "Legitimate interest in website operation and security",
      use_title: "How We Use Your Information",
      use_list: [
        "Website Improvement: Understanding user behavior to enhance content and navigation",
        "Communication: Responding to contact form submissions and collaboration inquiries",
        "Security: Protecting against spam, abuse, and security threats",
        "Analytics: Measuring website performance and user engagement"
      ],
      rights_title: "Your Rights (GDPR Compliance)",
      rights_p: "If you are located in the European Union, you have the following rights regarding your personal data:",
      rights_list1: [
        "Right to Access: Request a copy of the personal data we hold about you",
        "Right to Rectification: Request correction of inaccurate or incomplete data",
        "Right to Erasure: Request deletion of your personal data",
        "Right to Restrict Processing: Request limitation of how we process your data"
      ],
      rights_list2: [
        "Right to Data Portability: Request transfer of your data to another service",
        "Right to Object: Object to processing of your personal data",
        "Right to Withdraw Consent: Withdraw consent for data processing at any time"
      ],
      rights_contact: "To exercise any of these rights, please contact me using the information provided below.",
      contact_info_title: "Contact Information",
      contact_info_p: "If you have questions about this privacy policy or wish to exercise your data protection rights, please contact me:",
      contact_p: "If you have questions about this privacy policy or wish to exercise your data protection rights, please contact me:",
      email: "engomari6@gmail.com",
      phone: "+49 1575 5653967 (Germany) | +254 110 548 473 (Kenya)",
      location: "Berlin, Germany",
      response_time: "I will respond to privacy-related inquiries within 72 hours",
      last_updated: "Last Updated",
      effective_date: "Effective Date",
      questions_title: "Questions About Privacy?",
      questions_p: "I'm committed to transparency and protecting your data. Reach out if you have any concerns.",
      contact_cta: "Contact Me"
    },
    footer: {
      tagline: "Bridging technology with purpose — energizing change one system at a time.",
      privacy: "Privacy Policy",
      home: "Home"
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
      privacy: "Datenschutz",
      brand: "Clifford Ondieki",
      role: "Power Systems Engineer"
    },
    home: {
      hero_title: "Spezialist für Energiesysteme & Netzintegration",
      hero_subtitle_pre: "Ich schließe die Lücke zwischen",
      hero_subtitle_grid: "Netzsimulation (PowerFactory)",
      hero_subtitle_mid: "und",
      hero_subtitle_real: "der realen Netzintegration. Spezialisiert auf Spannungsstabilität, erneuerbare Integration und Automatisierung;",
      hero_subtitle_tail: "für das",
      hero_subtitle_target: "Zielnetz 2045",
      cta_portfolio: "Engineering-Portfolio ansehen",
      cta_contact: "Heute ein Gespräch vereinbaren",
      ieee_badge: "IEEE Best Paper 2025 Gewinner (Intelligent Transportation Track)",
      status_badge: "Aktive ",
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
      article_tag: "Ausgewählter Artikel",
      research_title: "Die §14a EnWG-Herausforderung mit Mathematik lösen",
      research_main_title: "IEEE Best Paper Award (2025): Robuste EV-Netzintegration",
      research_desc: "Meine Forschung entwickelte ein Framework, das Netzbeschränkungen mit Nutzergerechtigkeit ausbalanciert und robuste Lösungen für Berlin bietet.",
      research_stat_title: "Optimierungsergebnis",
      research_stat_val: "+15%",
      research_stat_label: "Kostensenkung gegenüber deterministischer Planung",
      research_button: "Vollständige Fallstudie lesen",
      phil_title: "\"Smart Laziness\" & systemische Effizienz",
      phil_body: "\"Wahre Effizienz bedeutet nicht, härter zu arbeiten – es geht darum, Systeme so tief zu verstehen, dass man die eine Änderung erkennt.\"",
      phil_sub: "Dieses Prinzip leitet heute meine Arbeit von der Code-Architektur bis zur Teamdynamik.",
      bio_title: "Von Energiesystemen zu Produkten und zurück zur Ingenieurarbeit",
      bio_p1: "Als Graduate Researcher in Grid Optimization (M.Sc. Kandidat, 2026) erhielt ich den IEEE ETECOM 2025 Best Paper Award für die Optimierung von EV‑Ladeinfrastruktur mit 15% Kostensenkung bei verbesserter Netzzuverlässigkeit über 500+ Szenarien.",
      bio_p2_pre: "Bevor ich zur Kerntechnik zurückkehrte, skalierte ich digitale Systeme mit",
      bio_p2_mid: "und",
      bio_p2_post: "und lernte, wie technische Lösungen in der Praxis angenommen und nachhaltig betrieben werden. Aktuell fokusiert auf Netzintegration, erneuerbare Energien und Simulation für die deutsche Energiewende.",
      bio_button: "Meine Geschichte entdecken",
      stat_msc: "M.Sc. Engineering Management (2026)",
      stat_member: "IEEE & VDI Mitglied",
      stat_location: "Berlin, Deutschland",
      sim_title: "Simulation trifft Realität",
      sim_quote: "\"Die beste Ingenieurarbeit funktioniert in PowerFactory und im Feld. Mein Weg von der Netzsimulation in den Betrieb lehrte mich, Lösungen zu gestalten, die technisch robust und kommerziell tragfähig sind.\"",
      skills_title: "Fähigkeiten, Tools & Plattformen",
      skills_sub: "Eine Mischung aus technischen und professionellen Kompetenzen",
      toolkit_title: "Engineering Toolkit",
      toolkit_1_label: "Netzsimulation",
      toolkit_1_body: "DIgSILENT PowerFactory (Python API), MATLAB/Simulink",
      toolkit_2_label: "Optimierung",
      toolkit_2_body: "Python (Pandas, SciPy), NSGA-II, Fuzzy Logic Control",
      toolkit_3_label: "Automatisierung",
      toolkit_3_body: "SCADA-Grundlagen, PLC-Programmierung, Pandapower",
      regulatory_title: "Regulatorische Kompetenz",
      regulatory_vde: "VDE-AR-N 4110 / 4120",
      regulatory_enwg: "§14a (Steuerbare Verbrauchseinrichtungen)",
      regulatory_iec: "IEC 61850 (Umspannwerksautomation)",
      leadership_title: "Technische Führung & Delivery",
      leadership_1: "Techno-ökonomische Analyse",
      leadership_2: "Stakeholder-Anforderungsanalyse",
      leadership_3: "Systems Thinking, Cross-Domain Innovation",
      leadership_4: "Agile/Scrum-Methoden",
      tech_stack_labels: {
        python: "Python",
        aws: "AWS / Cloud",
        powerfactory: "PowerFactory",
        pandapower: "Pandapower",
        github: "Git / CI/CD",
        docker: "Docker",
        mongodb: "MongoDB",
        tensorflow: "TensorFlow"
      },
      affiliations_title: "Zugehörigkeiten",
      aff_ieee: "Mitglied & Researcher, IEEE 2025",
      aff_vdi: "Mitglied, 2025",
      aff_vde: "Mitglied, 2025",
      aff_kiron: "Kiron Open Higher Education 2025",
      aff_imagine: "Imagine Foundation 2023",
      aff_ashoka: "Ashoka Network 2024",
      aff_alx: "Alx Network 2018",
      aff_ebk: "Engineers Board of Kenya 2016",
      philosophy_section_title: "Meine Philosophie",
      philosophy_section_sub: "Grundüberzeugungen",
      philosophy_button: "Meine Philosophie erkunden",
      cta_title2: "Bereit, etwas Wirkungsvoller aufzubauen?",
      cta_body2: "Lassen Sie uns technische Exzellenz mit zielgerichteter Innovation verbinden.",
      cta_button2: "Lass uns starten ⚡",
      card_cta: "Projekt ansehen →"
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
      photo_caption: "Von Kitale nach Europa – Modelle im Feld validieren.",
      overcome_title: "Wachstum & Entwicklung",
      overcome_1_t: "Die Balance finden: Systemische Intelligenz",
      overcome_1_p: "Eine meiner größten Herausforderungen war, akademische Strenge mit Feldbetrieb auszubalancieren. Daraus entstand „Smart Laziness“ – die Kunst, durch tiefe Analyse die eine strategische Änderung zu finden, die zehn Probleme löst. Es geht um Optimierung statt brute force.",
      overcome_2_t: "Kulturelle Navigation: Der Wettbewerbsvorteil",
      overcome_2_p: "Das Ankommen in Berlin brachte die Herausforderung, meinen Lösungsstil anzupassen. Ich habe gelernt, dass Vielfalt ein technischer Vorteil ist – meine Herkunft betont Resilienz und Anpassung, entscheidend für die Stabilisierung moderner Stromnetze.",
      stars_card1_t: "Technische Mentoren",
      stars_card1_p: "Ingenieure, die mir gezeigt haben, dass wahre Meisterschaft im Verständnis des „Warum“ hinter jeder Netzregel und VDE‑Norm liegt.",
      stars_card2_t: "Community‑Leaders",
      stars_card2_p: "Leaders, die mich gelehrt haben, dass nachhaltige Infrastruktur entsteht, wenn lokale Teams befähigt werden, ihre Systeme selbst zu betreiben.",
      skills_title: "Skills aus Erfahrung",
      skills_sub: "Ein hybrides Skill‑Set, das technische Präzision mit operativer Strategie verbindet.",
      skills_1_t: "Netz- & Systemarchitektur",
      skills_1_p: "Von 11‑kV‑Leitungen bis zu komplexen Datenpipelines – Systemtopologie meistern.",
      skills_2_t: "Interkulturelles Engineering",
      skills_2_p: "Deutsche Standards (VDE) mit anpassungsfähigem Problemlösen aus Schwellenmärkten verbinden.",
      skills_3_t: "Operative Strategie",
      skills_3_p: "Technische Fähigkeit (Simulation) mit Einsatzrealität (Inbetriebnahme) ausrichten.",
      skills_4_t: "Grid Analytics & Daten",
      skills_4_p: "SCADA‑Daten und NSGA‑II nutzen, um Verhalten zu prognostizieren und Performance zu optimieren.",
      skills_5_t: "Inbetriebnahme & Tests",
      skills_5_p: "Erfahrung in der Feldvalidierung, damit Systeme angenommen und nachhaltig betrieben werden.",
      skills_6_t: "Technische Kommunikation",
      skills_6_p: "Komplexe Engineering‑Konzepte in klare Stakeholder‑Insights übersetzen.",
      endorsements_title: "Empfehlungen",
      endorse_1_name: "Yukabeth Kidenda",
      endorse_1_role: "CEO bei Teach for Kenya",
      endorse_1_quote: "\"Clifford ist ein sehr fokussierter Profi... lernwillig und bereit, die Extrameile für Qualität zu gehen.\"",
      endorse_2_name: "Valerie O.",
      endorse_2_role: "Customer Success Managerin",
      endorse_2_quote: "\"Clifford verkörpert Leadership mit praxisnaher Umsetzung... ich empfehle ihn ausdrücklich.\"",
      endorse_3_name: "Abdul Idris",
      endorse_3_role: "Key Account Manager - Contractor Consulting (Mentor)",
      endorse_3_quote: "\"Clifford hat mich mit seiner Motivation, Offenheit und seinem echten Einsatz für die Integration in den deutschen Arbeitsmarkt beeindruckt. Er hat aktiv Feedback gesucht, es konsequent umgesetzt und großen Willen zur fachlichen wie persönlichen Weiterentwicklung gezeigt. Seine positive, proaktive Art machte die Zusammenarbeit besonders angenehm.\"",
      outlook_title: "Ausblick: Netztransformation",
      outlook_p1: "Ich möchte meine hybriden Skills in Simulation und Betrieb auf die Herausforderungen des deutschen Netzes anwenden. Mein Ziel: Systeme, die resilient, effizient und zukunftssicher sind.",
      outlook_p2: "Langfristig werde ich die nächste Generation von Ingenieurinnen und Ingenieuren fördern, STEM‑Bildung in Afrika voranbringen und Barrieren abbauen – immer getrieben von sinnorientiertem Problemlösen.",
      outlook_button: "Chancen besprechen"
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
      p6_d: "ML-System zur Vorhersage von Geräteausfällen in Geothermieanlagen.",
      p2_badge: "Neu 2026",
      p2_button: "Architektur & Code ansehen",
      p3_badge: "Forschung",
      section_grid_title: "Netzintegration & Energiesysteme",
      section_grid_sub: "Dynamische Modellierung, Spannungsstabilität und Grid-Code-Compliance.",
      p4_challenge_p: "Die öffentliche Ladeinfrastruktur ist stark nachfragegetrieben und verstärkt räumliche Ungleichheiten. Es entsteht ein \"Henne‑Ei‑Problem\": fehlende Infrastruktur senkt EV‑Adoption in unterversorgten Gebieten und rechtfertigt weitere Unterinvestition.",
      p4_solution_p: "Wir implementierten ein multi‑objektives NSGA‑II‑Modell in Python, das Abdeckung und räumliche Gerechtigkeit ausbalanciert und den Gini‑Koeffizienten der EVs pro Ladepunkt minimiert. So entstehen Pareto‑optimale Strategien für Stadtplaner.",
      role_timeline_title: "Meine Rolle & Zeitplan",
      role_label: "Meine Rolle:",
      timeline_label: "Zeitplan:",
      p4_role_items: [
        "Lead Data Scientist & Geospatial Analyst",
        "NSGA‑II‑Algorithmusentwicklung",
        "Equity‑Metrik‑Design (Gini‑Koeffizient)"
      ],
      p4_timeline_items: [
        "Forschung: 6 Monate (2025)",
        "Modellentwicklung: 4 Monate",
        "Validierung & Analyse: 2 Monate"
      ],
      p4_stat_1_label: "Reduktion des Gini‑Koeffizienten",
      p4_stat_2_label: "Modell plant 6x mehr Ladepunkte",
      p4_stat_3_label: "Plus an lokalem Zugang",
      p4_side_title: "Philosophie in der Praxis",
      p4_side_p: "Ziel ist nicht nur mehr Ladepunkte, sondern eine strategische Platzierung für gerechten Zugang und nachhaltige Mobilität. Mein Framework hilft Kommunen, den Effizienz‑Gerechtigkeits‑Trade‑off datenbasiert zu steuern.",
      p4_side_button: "Meine Arbeit entdecken",
      p5_key_lesson_title: "Wichtigste Erkenntnis",
      p5_key_lesson_p: "Dieses Projekt lehrte mich, dass Resilienz nicht nur Leitungen betrifft, sondern den Zugang zu wichtigen Services. Dieses Systemdenken prägt heute meinen Ansatz für SaaS‑Architektur und Lastverteilung.",
      p5_report_button: "Technischen Bericht lesen",
      p5_badge: "Kritisch",
      p5_challenge_p: "Kenias Stromnetz musste die volatile Windenergie integrieren und dabei stabil bleiben. Die Herausforderung: Spannungsschwankungen durften nicht das gesamte Netz destabilisieren.",
      p5_solution_p: "Ich entwickelte eine umfassende dynamische Spannungsstabilitätsanalyse in DIgSILENT PowerFactory, um Fluktuationen zu simulieren und zu mitigieren – für verlässliche Energie in Gesundheit, Bildung und Wirtschaft.",
      p5_role_items: [
        "Power‑Systems‑Analyst",
        "Lead für Netzstabilitätsmodellierung",
        "Autor des technischen Berichts"
      ],
      p5_timeline_items: [
        "Systemmodellierung: 4 Monate (2015)",
        "Simulation & Analyse: 3 Monate",
        "Dokumentation: 1 Monat"
      ],
      p5_stat_1_label: "Verbesserte Netzstabilität",
      p5_stat_2_label: "Saubere Energie integriert",
      p5_stat_3_label: "Haushalte versorgt",
      section_digital_title: "Digitalisierung & Automatisierung",
      section_digital_sub: "SCADA‑Integration, Predictive Maintenance und IoT‑Telemetrie.",
      p6_challenge_p: "Geothermiekraftwerke im Rift Valley hatten unerwartete Ausfälle – mit kostspieligen Stillständen und weniger sauberer Energie.",
      p6_solution_p: "Ich entwickelte ein Predictive‑Maintenance‑System, das Sensordaten auswertet und Ausfallmuster frühzeitig erkennt.",
      p6_role_line: "Machine‑Learning‑Engineer & Data‑Pipeline‑Architekt",
      p6_timeline_line: "6 Monate (2015)",
      p6_stat_1_label: "Ausfallzeit ↓",
      p6_stat_2_label: "Ersparnis/Jahr",
      p6_stat_3_label: "Genauigkeit",
      p6_button: "Dokumentation ansehen",
      health_title: "Health‑Tech Load Balancing System",
      health_sub: "Prinzipien der Stromnetze auf Gesundheitsversorgung in ländlichen Regionen übertragen.",
      health_challenge_p: "Ländliche Einrichtungen in Kenia hatten ungleich verteilte Patientenlasten – einige überlastet, andere unterausgelastet.",
      health_solution_p: "Ich entwickelte einen Load‑Balancing‑Algorithmus, der Patientenfluss wie elektrischen Strom behandelt und Ressourcen dynamisch verteilt.",
      health_role_line: "Full‑Stack‑Developer & Systems Architect",
      health_timeline_line: "6 Monate (2023)",
      health_stat_1_label: "Wartezeit ↓",
      health_stat_2_label: "Ressourcen ↑",
      health_stat_3_label: "Patienten/Monat",
      health_button: "Mehr erfahren",
      climate_left_title: "Full‑Stack‑Vorteil",
      climate_left_p: "Viele Berater sind in nur einem Bereich stark. Ich verbinde Investmentanalyse mit operativer Umsetzung – das Gesamtbild, das Investoren brauchen.",
      climate_left_button: "Case Study ansehen",
      climate_title: "Climate‑Tech Investment Consultancy",
      climate_sub: "Venture‑Capital‑Analyse mit Deployment‑Expertise verbinden, um Climate‑Tech‑Investments zu de‑risken.",
      climate_challenge_p: "Climate‑Tech hat eine Lücke: Investoren fehlt Deployment‑Know‑how, Infrastruktur‑Experten der Kapitalzugang. Das bremst Fortschritt.",
      climate_approach_title: "Mein Ansatz",
      climate_approach_p: "Im Energy Innovation Capital Externship lerne ich Frameworks, die Startups entlang Investment‑Potenzial, operativer Machbarkeit und Deployment‑Strategie bewerten.",
      climate_role_items: [
        "Investment‑Analyst (Extern)",
        "Lead Technical Due Diligence",
        "Advisor für Deployment‑Strategie"
      ],
      climate_timeline_items: [
        "Externship: 3 Monate (2025)",
        "Startup‑Analysen: 5+ Unternehmen",
        "Investment‑Thesenentwicklung"
      ],
      climate_stat_1_label: "Startups analysiert",
      climate_stat_2_label: "Investment‑Thesen",
      climate_stat_3_label: "Analysetiefe",
      climate_tag_market: "Marktforschung",
      premium_title: "Premium‑Fallstudien",
      premium_sub: "Fortgeschrittene Projekte und sensible Implementierungen – Details auf Anfrage",
      premium_overlay1_title: "Vollständige Fallstudie auf Anfrage",
      premium_overlay1_sub: "Enthält Architektur, Implementierungsdetails und Performance‑Analyse",
      premium_overlay1_button: "Fallstudie anfragen",
      premium_case1_title: "Advanced Grid Optimization mit KI‑gestützter Lastprognose",
      premium_case1_desc: "Umfassende Smart‑Grid‑Lösung mit ML‑Algorithmen für prädiktives Lastmanagement in Kenias nationaler Infrastruktur.",
      premium_role_title: "Meine Rolle & Engagement",
      premium_role_label: "Meine Rolle:",
      premium_timeline_label: "Zeitplan:",
      premium_role_1: "Lead AI Engineer & System Architect",
      premium_timeline_1: "6‑Monats‑Enterprise‑Engagement (2023)",
      premium_highlights_title: "Projekt‑Highlights (Teaser)",
      premium_highlights_items: [
        "Netzinstabilitäten um 32% reduziert",
        "Prognosegenauigkeit auf 94,7% verbessert",
        "Rollout auf 15 großen Umspannwerken",
        "Integration in bestehende SCADA‑Systeme"
      ],
      premium_preview_label: "Vorschau verfügbar",
      premium_preview_hint: "Für Details hover",
      premium_overlay2_title: "Detaillierter Implementierungsleitfaden auf Anfrage",
      premium_overlay2_sub: "Enthält Systemarchitektur, Sensorintegration und ROI‑Analyse",
      premium_overlay2_button: "Implementierungsdetails anfragen",
      premium_case2_title: "Industrial IoT Platform für Manufacturing Excellence",
      premium_case2_desc: "Enterprise‑IoT‑Lösung für Echtzeit‑Monitoring und Optimierung von Fertigungsprozessen über mehrere Werke.",
      premium_role_2: "IoT‑Plattform‑Architekt & Lead Developer",
      premium_timeline_2: "8‑monatige Multi‑Phasen‑Implementierung (2022‑2023)",
      premium_highlights2_title: "Projekt‑Highlights (Teaser)",
      premium_highlights2_items: [
        "Overall Equipment Effectiveness um 28% erhöht",
        "Ungeplante Ausfälle um 45% reduziert",
        "500+ Sensoren an 3 Standorten verbunden",
        "Echtzeit‑Dashboard mit Predictive Alerts"
      ],
      cta_title: "Bereit, etwas Wirksames zu bauen?",
      cta_body: "Lassen Sie uns technische Exzellenz mit sinnstiftender Innovation verbinden.",
      cta_button: "Lass uns Veränderung Energie geben ⚡"
    },
    philosophy: {
      hero_title: "Engineering Empathy",
      hero_subtitle: "Technische Präzision mit menschlichem Zweck verbinden.",
      core_title: "Kernphilosophie: Systeme & Menschen",
      core_p1: "Robuste Netze basieren auf tiefem Verständnis und Stabilität.",
      core_p2: "Wahre Ingenieurskunst erfordert Empathie, um Lösungen zu bauen, die in der realen Welt funktionieren.",
      smart_title: "\"Smart Laziness\" & Effizienz",
      smart_how_title: "So funktioniert es in der Praxis:",
      reflections_title: "Reflexionen über Tech & Leben",
      living_title: "Gelebte Philosophie",
      practice_title: "Philosophie in der Praxis",
      practice_intro:
        "Das sind keine abstrakten Ideen — sondern praktische Rahmen, die ich täglich nutze.",
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
      hero_subtitle: "Gedanken zu Engineering Empathy, Smart Laziness und Innovation.",
      featured_label: "Featured • Engineering‑Philosophie",
      featured_title: "Engineering Empathy: Warum die besten Systeme mit Herz gebaut werden",
      featured_lede: "Die robustesten Systeme – technisch wie menschlich – entstehen aus tiefem Verständnis und einem gemeinsamen Purpose.",
      featured_body: "Nach Jahren des Debuggings – von 11‑kV‑Transformatoren in Kenia bis zu SaaS‑Architekturen in Berlin – habe ich gelernt, dass die elegantesten Lösungen entstehen, wenn wir echte Empathie für die Menschen mitbringen, die unsere Systeme nutzen.",
      featured_tags: ["Engineering‑Philosophie", "Leadership", "Systems Thinking"],
      post_a_label: "Demnächst • Cross‑Domain Innovation",
      post_a_title: "Was Kenias Netz mich über SaaS‑Priorisierung lehrte",
      post_a_body: "Was ich über Load Balancing aus Kenias Stromnetz gelernt habe und wie diese Prinzipien heute meine Produkt‑Priorisierung und Systemarchitektur prägen.",
      post_a_tags: ["Systems Thinking", "Produktstrategie", "Cultural Impact"],
      post_b_label: "Demnächst • Leben & Technologie",
      post_b_title: "Parenting & Python: Das Debuggen von Lebens‑Algorithmen",
      post_b_body: "Reflexionen darüber, wie das Aufziehen einer Tochter mich Geduld, Präsenz und die einfache Logik hinter komplexen Systemen gelehrt hat.",
      post_b_tags: ["Persönliches Wachstum", "Engineering Empathy", "Life Lessons"],
      post_c_label: "Demnächst • Karriereweg",
      post_c_title: "Von 11‑kV‑Leitungen zu SaaS‑Pipelines: Eine Systemdenker‑Reise",
      post_c_body: "Eine Fallstudie, wie Elektrotechnik‑Prinzipien auf Software‑Architektur übertragen werden – und warum Stromnetze bessere Produktmanager formen.",
      post_c_tags: ["Karriereweg", "Technische Führung", "Cross‑Domain Learning"],
      post_d_label: "Demnächst • Innovations‑Philosophie",
      post_d_title: "Smart Laziness: Die Kunst systemischer Effizienz",
      post_d_body: "Warum die besten Ingenieure strategisch „faul“ sind – und wie ein tieferes Systemverständnis eine Änderung möglich macht, die zehn Probleme löst.",
      post_d_tags: ["Produktivität", "Systems Optimization", "Engineering‑Philosophie"],
      linkedin_title: "Folge meiner Reise auf LinkedIn",
      linkedin_body: "Während ich diesen Blog entwickle, teile ich regelmäßig Insights und Reflexionen auf LinkedIn. Folge mir für Updates zu Engineering Empathy, Smart Laziness und der Verbindung von Technologie und Purpose.",
      linkedin_button: "Auf LinkedIn vernetzen",
      newsletter_title: "Bleib auf dem Laufenden",
      newsletter_body: "Erfahre als Erste:r, wenn neue Insights erscheinen. Ich teile Gedanken zu Engineering Empathy, Cross‑Domain Innovation und Systemen mit Sinn.",
      newsletter_placeholder: "E‑Mail eingeben",
      newsletter_button: "Benachrichtige mich",
      newsletter_note: "Kein Spam, nur relevante Insights. Jederzeit abmelden.",
      cta_title: "Bereit, etwas Wirksames zu bauen?",
      cta_body: "Lass uns technische Exzellenz mit sinnstiftender Innovation verbinden.",
      cta_button: "Lass uns Veränderung Energie geben ⚡"
    },
    ev: {
      hero_title: "EV-Infrastruktur Strategie",
      hero_subtitle: "Von deterministischer Planung zu robuster Optimierung",
      diagnosis_t: "Die Diagnose: Infrastrukturlücken",
      diagnosis_p: "Zentrale Bezirke sind gut versorgt, Außenbezirke stehen unter Druck.",
      opt_t: "Optimierungsergebnis",
      opt_p: "Unser Framework reduziert den Gini-Koeffizienten um 13%.",
      equity_stat: "-13% Gini Index",
      header_badge: "IEEE Best Paper 2025 (Intelligent Transportation Track)",
      header_title: "Ermöglichung einer gerechten EV-Ladeinfrastruktur",
      header_subtitle: "Ein multi‑objektives geospatiales Optimierungsframework für Berlin",
      header_authors_label: "Autoren",
      header_author_1: "Clifford Ondieki",
      header_author_2: "Tianxiang Lu",
      header_problem_t: "Das Problem",
      header_problem_p: "Berlins EV‑Infrastruktur ist stark in zentralen Bezirken (Mitte) konzentriert, während äußere Wohnbezirke (Treptow‑Köpenick) \"Ladewüsten\" und hohe Auslastung (32 BEVs/Lader) aufweisen.",
      header_method_t: "Die Methode",
      header_method_p: "Wir entwickelten ein Multi‑Objective‑Optimierungsmodell (NSGA‑II), das den Zielkonflikt zwischen Nutzen (Abdeckung) und Gerechtigkeit (Gini‑Koeffizient) unter unsicherer Nachfrage explizit abbildet.",
      header_result_t: "Das Ergebnis",
      header_result_p: "Ein \"robustes Portfolio\" von Strategien. Unsere Equity‑Strategie senkt den stadtweiten Gini‑Koeffizienten um 13% und erhöht den Zugang in unterversorgten Gebieten um 21%.",
      diagnosis_title: "I. Diagnose: Der Zustand Berlins (Q2 2025)",
      diagnosis_intro: "Erkunden Sie die aktuelle Infrastrukturlücke. Zentrale Bezirke sind gut versorgt, während Außenbezirke unter starker Überlastung leiden.",
      diagnosis_hint: "Klicken Sie auf einen Bezirk, um Detailmetriken zu sehen.",
      district_select_label: "Bezirk auswählen",
      district_congestion_label: "Rot = Hohe Überlastung",
      district_high: "Bereich mit hoher Überlastung.",
      district_well: "Gut versorgt.",
      district_high_note: "Erfordert sofortige Intervention.",
      district_low_note: "Geringere Priorität für Equity‑Mittel.",
      metric_chargers: "Ladepunkte gesamt",
      metric_bevs: "Registrierte BEVs",
      metric_ratio: "Überlastung (BEVs / Ladepunkt)",
      optimization_title: "II. Die Optimierung: Strategie auswählen",
      optimization_intro: "Wir modellierten die Verteilung von 100 neuen Ladepunkten. Vergleichen Sie, wie unterschiedliche Prioritäten die Ressourcenverteilung verändern.",
      strategy_a: "Strategie A: Maximale Gerechtigkeit",
      strategy_b: "Strategie B: Ausgewogen",
      strategy_c: "Strategie C: Maximaler Nutzen",
      key_outcome_label: "Schlüssel‑Ergebnis (K=100)",
      gini_label: "Gini‑Koeffizient:",
      focus_label: "Fokusbereich:",
      chart_title: "Ladepunkt‑Allokation nach Bezirk (K=100)",
      gain_label: "Optimierungsgewinn",
      gain_sub: "gegenüber deterministischer Planung",
      gain_metric: "+15%",
      gain_tag: "Resilienz",
      pareto_title: "III. Der Trade‑off (Pareto‑Front)",
      pareto_intro: "Es gibt keine perfekte Einzellösung. Die Grafik zeigt die optimalen Trade‑offs des NSGA‑II‑Algorithmus. Lösungen links‑oben sind besser (höherer Nutzen, höhere Gerechtigkeit).",
      pareto_caption: "X: Gerechtigkeit (1 - Gini) | Y: Nutzen (Abdeckung)",
      fuzzy_title: "IV. Warum \"Fuzzy\" zählt",
      fuzzy_intro: "Standardpläne sind fragil. Unser robustes (Fuzzy) Modell garantiert höhere Performance selbst bei unerwarteten Schwankungen der EV‑Adoption (Worst‑Case‑Szenarien).",
      fuzzy_caption: "Vergleich der minimalen Zufriedenheitswerte in Worst‑Case‑Szenarien",
      future_title: "V. Zukünftige Arbeit — Netzintegration",
      future_intro: "Geplante Erweiterungen zur Verbesserung von Robustheit, Skalierbarkeit und operativer Intelligenz für die großskalige EV‑Integration. Schwerpunkte sind geospatiale Leistungsflüsse, dynamische Lastszenarien und Smart‑Charging‑Steuerung.",
      future_card1_t: "Geospatialer Leistungsfluss",
      future_card1_p: "Kopplung von Geodaten und Netz‑Topologie, um lokale Spannungskonflikte zu erkennen und Verstärkungen zu priorisieren.",
      future_card1_meta_l: "Geplante Methoden",
      future_card1_meta_v: "PowerFactory + GIS",
      future_card2_t: "Dynamische Last & Verstärkung",
      future_card2_p: "Simulation von Spitzen‑EV‑Szenarien und zeitvariabler Dispatch‑Strategie zur Dimensionierung von Verstärkungen.",
      future_card2_meta_l: "Kern‑Deliverable",
      future_card2_meta_v: "Szenario‑Suite & Metriken",
      future_card3_t: "Smart Charging & V2G",
      future_card3_p: "Demand‑Response und V2G‑Steuerung zur Lastglättung und Bereitstellung von Netz‑Services.",
      future_card3_meta_l: "Integration",
      future_card3_meta_v: "Netzsignale & Markt"
    },
    contact: {
      hero_title: "Bereit für Netz-Herausforderungen? ⚡",
      hero_subtitle: "Offen für Rollen in Engineering und Simulation.",
      form_title: "Gespräch beginnen",
      form_desc: "Ich freue mich darauf, von Ihren Projekten im Bereich Netzintegration zu hören.",
      form_name_label: "Name",
      form_email_label: "E-Mail",
      form_topic_label: "Thema",
      form_topic_placeholder: "Thema auswählen",
      form_message_label: "Ihre Nachricht",
      form_message_placeholder: "Wie können meine Engineering-Fähigkeiten Ihr Team unterstützen?",
      form_option_grid: "Netzintegration / Energiesysteme",
      form_option_commissioning: "Inbetriebnahme",
      form_option_simulation: "Simulation (PowerFactory/Python)",
      form_option_werkstudent: "Werkstudent-Position",
      form_option_consulting: "Beratung",
      form_option_speaking: "Vortrag / Speaking Engagement",
      form_option_mentorship: "Mentoring",
      form_option_general: "Allgemeine Anfrage",
      contact_email_title: "E-Mail",
      contact_phone_title: "Telefon",
      contact_linkedin_title: "LinkedIn",
      contact_linkedin_cta: "Profil ansehen",
      contact_base_title: "Standort",
      contact_base_desc: "Berlin, Deutschland (Reisen innerhalb Deutschlands möglich)",
      focus_title: "Aktueller Fokus: Deutscher Energiesektor",
      focus_body: "Ich suche aktiv Werkstudent- oder Junior-Engineer-Rollen, um meine Anabin H+ anerkannte Ausbildung und Simulationserfahrung für die Energiewende einzusetzen.",
      focus_roles_label: "Zielrollen",
      focus_roles_desc: "Grid Integration Engineer, Commissioning Engineer (Inbetriebnahme), Power Systems Analyst.",
      focus_sectors_label: "Zielsektoren",
      focus_sectors_desc: "TSOs (Übertragung), DSOs (Verteilung), Wind-/Solar-OEMs und Energieberatung.",
      value_title: "Wie ich Mehrwert schaffe",
      value_sim_title: "Simulation",
      value_sim_desc: "PowerFactory & Python Modellierung für Netzstabilität",
      value_integ_title: "Integration",
      value_integ_desc: "Einbindung von Erneuerbaren & EVs ins Netz",
      value_comm_title: "Inbetriebnahme",
      value_comm_desc: "Feldvalidierung und rigorose Tests",
      value_digi_title: "Digitalisierung",
      value_digi_desc: "SCADA-Datenanalyse und Prozessautomatisierung",
      value_mentor_title: "Mentoring & Bildung",
      value_mentor_desc: "STEM-Förderung und technische Leadership-Entwicklung",
      commitment_title: "Mein Versprechen",
      commitment_body: "Ich lese jede Nachricht persönlich und antworte in der Regel innerhalb von 24–48 Stunden. Wenn Ihr Projekt oder Ihre Rolle zu technischer Exzellenz und menschlichem Zweck passt, lassen Sie uns gemeinsam etwas Sinnvolles schaffen.",
      commitment_quote: "\"Die besten Innovationen entstehen, wenn vielfältige Perspektiven auf ein gemeinsames Ziel ausgerichtet sind.\"",
      cta_title: "Bereit, etwas Wirkungsvoller aufzubauen?",
      cta_body: "Lassen Sie uns technische Exzellenz mit zielgerichteter Innovation verbinden.",
      cta_button: "Gespräch starten",
      field_name: "Name",
      field_email: "E-Mail",
      field_subj: "Thema",
      field_msg: "Nachricht",
      btn_send: "Absenden"
    },
    privacy: {
      title: "Datenschutzerklärung",
      subtitle: "Ihre Privatsphäre und der Schutz Ihrer Daten sind die Grundlage meiner Arbeit",
      commitment_title: "Unser Engagement für Ihre Privatsphäre",
      commitment_p1: "Als Ingenieur, der sowohl technische Exzellenz als auch menschliche Werte schätzt, verpflichte ich mich, Ihre Privatsphäre zu schützen und transparent darüber zu informieren, wie Daten auf dieser Website gesammelt und verwendet werden.",
      commitment_p2: "Diese Datenschutzerklärung erläutert, welche Informationen erfasst werden, wie sie genutzt werden und welche Rechte Sie in Bezug auf Ihre persönlichen Daten haben, wenn Sie mein Portfolio besuchen.",
      info_title: "Informationen, die wir erfassen",
      analytics_title: "Analysedaten (Microsoft Clarity)",
      analytics_what: "Nutzerinteraktionen, Seitenaufrufe, Scrollverhalten, Klickmuster, Sitzungsaufzeichnungen",
      analytics_purpose: "Um zu verstehen, wie Besucher mit Inhalten interagieren und die Nutzererfahrung zu verbessern",
      analytics_p: "Wir verwenden Microsoft Clarity, um die Nutzung unserer Website durch Verhaltensmetriken, Heatmaps und Sitzungswiederholungen zu analysieren und zu verbessern. Nutzungsdaten werden mithilfe von Cookies (Erst- und Drittanbieter) erfasst.",
      analytics_controller: "Microsoft Corporation",
      analytics_retention: "Die Daten werden gemäß der Datenschutzerklärung von Microsoft gespeichert",
      analytics_link: "https://privacy.microsoft.com/de-de/privacystatement",
      analytics_link_text: "Microsoft-Datenschutzerklärung",
      contact_form_title: "Kontaktformular-Daten (Formspree)",
      contact_what: "Name, E-Mail-Adresse, Betreff, Nachrichteninhalt",
      contact_purpose: "Beantwortung Ihrer Anfragen und möglicher Zusammenarbeit",
      contact_controller: "Clifford Ondieki",
      contact_p: "Wir nutzen den Dienst Formspree für die Abwicklung von Kontaktanfragen. Wenn Sie das Formular absenden, werden Ihr Name, Ihre E-Mail-Adresse und Ihre Nachricht an Formspree Inc. (USA) übermittelt und dort verarbeitet.",
      contact_link: "https://formspree.io/legal/privacy-policy",
      contact_link_text: "Datenschutzerklärung von Formspree",
      contact_retention: "Speicherdauer: Die Daten werden bis zu 2 Jahre sicher gespeichert oder bis Sie die Löschung beantragen.",
      technical_title: "Technische Daten",
      technical_what: "IP-Adresse, Browsertyp, Geräteinformationen, verweisende Website",
      technical_purpose: "Gewährleistung der Funktionalität, Sicherheit und grundlegende Analysen",
      technical_basis: "Berechtigtes Interesse am Betrieb und der Sicherheit der Website",
      use_title: "Wie wir Ihre Informationen nutzen",
      use_list: [
        "Verbesserung der Website: Verständnis des Nutzerverhaltens zur Optimierung von Inhalt und Navigation",
        "Kommunikation: Beantwortung von Kontaktanfragen und Möglichkeiten der Zusammenarbeit",
        "Sicherheit: Schutz vor Spam, Missbrauch und Sicherheitsbedrohungen",
        "Analyse: Messung der Website-Leistung und des Nutzerengagements"
      ],
      rights_title: "Ihre Rechte (DSGVO)",
      rights_p: "Wenn Sie sich in der Europäischen Union befinden, haben Sie folgende Rechte bezüglich Ihrer personenbezogenen Daten:",
      rights_list1: [
        "Auskunftsrecht: Sie können eine Kopie der gespeicherten Daten anfordern.",
        "Recht auf Berichtigung: Sie können die Korrektur unrichtiger Daten verlangen.",
        "Recht auf Löschung: Sie können die Löschung Ihrer Daten verlangen (\"Recht auf Vergessenwerden\").",
        "Recht auf Einschränkung: Sie können die Einschränkung der Verarbeitung verlangen."
      ],
      rights_list2: [
        "Recht auf Datenübertragbarkeit: Sie können die Übertragung Ihrer Daten verlangen.",
        "Widerspruchsrecht: Sie können der Verarbeitung Ihrer Daten widersprechen.",
        "Widerrufsrecht: Sie können Ihre Einwilligung zur Datenverarbeitung jederzeit widerrufen."
      ],
      rights_contact: "Um eines dieser Rechte auszuüben, kontaktieren Sie mich bitte unter den unten angegebenen Informationen.",
      contact_info_title: "Kontaktinformationen",
      contact_info_p: "Wenn Sie Fragen zu dieser Datenschutzerklärung haben oder Ihre Rechte ausüben möchten, kontaktieren Sie mich bitte:",
      email: "engomari6@gmail.com",
      phone: "+49 1575 5653967 (Deutschland)",
      location: "Berlin, Deutschland",
      response_time: "Ich antworte auf Datenschutzanfragen innerhalb von 72 Stunden.",
      last_updated: "Zuletzt aktualisiert",
      effective_date: "Gültig ab",
      questions_title: "Fragen zum Datenschutz?",
      questions_p: "Ich setze mich für Transparenz und den Schutz Ihrer Daten ein. Zögern Sie nicht, mich bei Fragen zu kontaktieren.",
      contact_cta: "Kontakt aufnehmen"
    },
    footer: {
      tagline: "Technologie mit Sinn verbinden — Veränderung System für System ermöglichen.",
      privacy: "Datenschutz",
      home: "Start"
    }
  }
} as const;

type Language = keyof typeof TRANSLATIONS;
type T = (typeof TRANSLATIONS)[Language];
type PageId =
  | 'home'
  | 'about'
  | 'projects'
  | 'ev-study'
  | 'philosophy'
  | 'blog'
  | 'contact'
  | 'privacy';
type SetPage = React.Dispatch<React.SetStateAction<PageId>>;

type SectionHeaderProps = {
  title: string;
  sub: string;
  dark?: boolean;
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
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    .section-shell {
      max-width: 80rem;
      margin-inline: auto;
      padding-inline: 1rem;
    }

    .section-shell-narrow {
      max-width: 56rem;
      margin-inline: auto;
      padding-inline: 1rem;
    }

    .section-space {
      padding-block: clamp(3rem, 6vw, 5rem);
    }

    .type-section-title {
      font-size: clamp(1.875rem, 3.5vw, 2.5rem);
      line-height: 1.1;
      letter-spacing: -0.015em;
      font-weight: 800;
      color: #0f172a;
    }

    .type-section-sub {
      font-size: clamp(1rem, 1.4vw, 1.125rem);
      line-height: 1.7;
      color: #475569;
      max-width: 52rem;
      margin-inline: auto;
    }

    .card-pad {
      padding: 1.25rem;
    }

    @media (min-width: 640px) {
      .section-shell,
      .section-shell-narrow {
        padding-inline: 1.5rem;
      }

      .card-pad {
        padding: 1.5rem;
      }
    }

    @media (min-width: 1024px) {
      .section-shell,
      .section-shell-narrow {
        padding-inline: 2rem;
      }

      .card-pad {
        padding: 2rem;
      }
    }

    .glass-nav {
      background: linear-gradient(135deg, rgba(255,255,255,0.86), rgba(255,255,255,0.7));
      backdrop-filter: blur(18px) saturate(140%);
      -webkit-backdrop-filter: blur(18px) saturate(140%);
      border-bottom: 1px solid rgba(148, 163, 184, 0.35);
      box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255,255,255,0.65);
    }

    .liquid-card {
      background: linear-gradient(160deg, rgba(255,255,255,0.88), rgba(255,255,255,0.74));
      border: 1px solid rgba(148, 163, 184, 0.35);
      backdrop-filter: blur(14px) saturate(135%);
      -webkit-backdrop-filter: blur(14px) saturate(135%);
      box-shadow: 0 12px 26px rgba(15, 23, 42, 0.09), inset 0 1px 0 rgba(255,255,255,0.72);
    }

    .liquid-pill {
      background: rgba(255,255,255,0.88);
      border: 1px solid rgba(148, 163, 184, 0.45);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.75);
    }

    .liquid-pill:hover {
      background: rgba(255,255,255,0.95);
    }

    .liquid-pill-active {
      background: linear-gradient(145deg, rgba(67,56,202,0.95), rgba(79,70,229,0.9));
      border: 1px solid rgba(99,102,241,0.85);
      color: #fff;
      box-shadow: 0 10px 20px rgba(67, 56, 202, 0.25), inset 0 1px 0 rgba(255,255,255,0.25);
    }

    .btn-cta {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 3rem;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      font-size: 1rem;
      line-height: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      text-align: center;
      transition: all 300ms ease;
      white-space: nowrap;
    }

    .btn-cta-sm {
      min-height: 2.5rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 700;
    }

    .btn-cta-block {
      width: 100%;
    }

    @media (min-width: 640px) {
      .btn-cta {
        min-height: 3.25rem;
        padding: 0.8rem 1.75rem;
      }

      .btn-cta-block {
        width: auto;
      }
    }

    .btn-cta-primary {
      background: #4f46e5;
      border: 1px solid #4f46e5;
      color: #ffffff;
      box-shadow: 0 12px 28px rgba(79, 70, 229, 0.28);
    }

    .btn-cta-primary:hover {
      background: #4338ca;
      border-color: #4338ca;
    }

    .btn-cta-outline {
      background: transparent;
      border: 2px solid #facc15;
      color: #facc15;
    }

    .btn-cta-outline:hover {
      background: #fefce8;
      color: #111827;
    }

    .btn-cta-light {
      background: #ffffff;
      border: 1px solid #ffffff;
      color: #312e81;
      box-shadow: 0 12px 28px rgba(15, 23, 42, 0.2);
    }

    .btn-cta-light:hover {
      background: #f8fafc;
    }

    .btn-cta-dark {
      background: #111827;
      border: 1px solid #111827;
      color: #ffffff;
      box-shadow: 0 10px 24px rgba(15, 23, 42, 0.24);
    }

    .btn-cta-dark:hover {
      background: #1f2937;
      border-color: #1f2937;
    }

    @media (max-width: 640px) {
      .glass-nav,
      .liquid-card,
      .liquid-pill {
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }
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
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }

    .page-fade-in {
      animation: page-fade-in 700ms ease-out;
      will-change: opacity, transform;
    }

    @keyframes page-fade-in {
      0% { opacity: 0; transform: translateY(8px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    .page-fade-in section {
      opacity: 0;
      transform: translateY(10px);
      animation: section-focus-in 700ms ease-out forwards;
    }

    .page-fade-in section:nth-of-type(1) { animation-delay: 60ms; }
    .page-fade-in section:nth-of-type(2) { animation-delay: 100ms; }
    .page-fade-in section:nth-of-type(3) { animation-delay: 140ms; }
    .page-fade-in section:nth-of-type(4) { animation-delay: 180ms; }
    .page-fade-in section:nth-of-type(5) { animation-delay: 220ms; }
    .page-fade-in section:nth-of-type(6) { animation-delay: 260ms; }
    .page-fade-in section:nth-of-type(7) { animation-delay: 300ms; }
    .page-fade-in section:nth-of-type(8) { animation-delay: 340ms; }

    @keyframes section-focus-in {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      .page-fade-in,
      .page-fade-in section {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
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
      animation: scroll 55s linear infinite;
    }

    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    .journey-timeline {
      position: relative;
      margin: 0 auto;
      padding-left: 1.5rem;
      border-left: 2px solid rgba(136, 14, 79, 0.25);
    }

    .journey-item {
      position: relative;
      background: #ffffff;
      border-radius: 0.75rem;
      border: 1px solid #e5e7eb;
      box-shadow: 0 8px 24px rgba(2, 6, 23, 0.06);
      padding: 1.25rem 1.25rem 1.25rem 1.5rem;
      margin-bottom: 1rem;
      transition: transform 300ms ease, box-shadow 300ms ease;
    }

    .journey-item::before {
      content: "";
      position: absolute;
      left: -2.1rem;
      top: 1.4rem;
      width: 0.75rem;
      height: 0.75rem;
      border-radius: 9999px;
      background: var(--accent-fire);
      box-shadow: 0 0 0 4px rgba(136, 14, 79, 0.15);
    }

    .journey-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 30px rgba(2, 6, 23, 0.1);
    }

    .chip-proof {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      line-height: 1;
      color: #065f46;
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      white-space: nowrap;
    }

    .chip-tech {
      display: inline-flex;
      align-items: center;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 500;
      line-height: 1;
      color: #1f2937;
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      white-space: nowrap;
    }

  `}} />
);

// --- UTILITY COMPONENTS ---

const SectionHeader = ({ title, sub, dark = false }: SectionHeaderProps) => (
  <header className={`py-16 lg:py-20 text-center ${dark ? 'bg-slate-950 text-white' : 'bg-indigo-900 text-white'} relative overflow-hidden`}>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tighter leading-[0.95]">{title}</h1>
    <p className="text-lg sm:text-xl opacity-70 max-w-4xl mx-auto font-light leading-relaxed">{sub}</p>
  </header>
);

const ProblemSolutionImpact = ({
  language,
  problem,
  solution,
  impact
}: {
  language: Language;
  problem: string;
  solution: string;
  impact: string;
}) => (
  <div className="mb-5 space-y-2 sm:space-y-3">
    <div className="border-l-4 border-rose-800 pl-3 sm:pl-4 bg-rose-50 p-3 sm:p-4 rounded-md">
      <h4 className="text-xs sm:text-sm font-black text-rose-900 mb-1">{language === 'en' ? 'Problem' : 'Problem'}</h4>
      <p className="text-gray-600 text-xs sm:text-sm">{problem}</p>
    </div>
    <div className="border-l-4 border-teal-700 pl-3 sm:pl-4 bg-teal-50 p-3 sm:p-4 rounded-md">
      <h4 className="text-xs sm:text-sm font-black text-teal-900 mb-1">{language === 'en' ? 'Solution' : 'Loesung'}</h4>
      <p className="text-gray-600 text-xs sm:text-sm">{solution}</p>
    </div>
    <div className="border-l-4 border-blue-800 pl-3 sm:pl-4 bg-blue-50 p-3 sm:p-4 rounded-md">
      <h4 className="text-xs sm:text-sm font-black text-blue-900 mb-1">{language === 'en' ? 'Impact' : 'Wirkung'}</h4>
      <p className="text-gray-600 text-xs sm:text-sm">{impact}</p>
    </div>
  </div>
);

// --- MAIN VIEWS ---

const Home = ({ setPage, t, language }: { setPage: SetPage; t: T; language: Language }) => {
  const [activeFeatureTile, setActiveFeatureTile] = useState<'research' | 'article'>('research');

  return (
  <div className="page-fade-in">
    {/* HERO */}
    <section className="relative min-h-[100svh] md:min-h-screen flex items-start md:items-center justify-center bg-cover bg-center text-white overflow-hidden py-20 md:py-0" style={{ backgroundImage: "url('/imgs/website.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-indigo-900/70 to-gray-900/80"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-3/5 lg:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center space-x-3 bg-indigo-500/10 border border-indigo-500/20 px-4 sm:px-6 py-2 rounded-full mb-5 md:mb-8 backdrop-blur-xl">
              <span className="w-3 h-3 rounded-full bg-teal-400 animate-pulse shadow-[0_0_20px_rgba(45,212,191,0.6)]"></span>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.35em] sm:tracking-[0.5em] text-indigo-200">{t.home.status_badge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4 md:mb-6">
              {t.home.hero_title.split('&').map((part: string, i: number) => (
                <React.Fragment key={i}>
                  {part} {i === 0 && <br className="hidden md:block" />}
                  {i === 0 && <span className="text-indigo-600">&</span>}
                </React.Fragment>
              ))}
            </h1>
            <p className="text-base sm:text-lg text-gray-200 mb-6 md:mb-8">
              {t.home.hero_subtitle_pre}{" "}
              <span className="font-semibold text-yellow-400">{t.home.hero_subtitle_grid}</span>{" "}
              {t.home.hero_subtitle_mid}{" "}
              <span className="font-semibold text-yellow-400">{t.home.hero_subtitle_real}</span>{" "}
              {t.home.hero_subtitle_tail}{" "}
              <span className="font-semibold text-rose-400">{t.home.hero_subtitle_target}</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <button 
                onClick={() => setPage('projects')} 
                className="btn-cta btn-cta-block bg-yellow-500 text-gray-900 hover:bg-yellow-400"
              >
                {t.home.cta_portfolio}
              </button>
              <button 
                onClick={() => setPage('contact')} 
                className="btn-cta btn-cta-block btn-cta-outline"
              >
                {t.home.cta_contact}
              </button>
            </div>
          </div>
          <div className="hidden md:flex md:w-2/5 lg:w-1/2 justify-center mt-12 md:mt-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <img src="/imgs/GOAT.jpg" alt="Clifford Ondieki" className="rounded-full w-full h-full object-cover shadow-2xl border-8 border-white/10" />
              <div className="absolute -bottom-4 -right-4 bg-white text-indigo-900 px-4 py-2 rounded-lg shadow-xl font-bold text-sm flex items-center animate-blink">
                <span className="text-yellow-500 mr-2">🏆</span> {t.home.ieee_badge}
              </div>
              <a
                href="https://berlin.cwiemeevents.com/articles/how-cwieme-shaped-clifford-ondiekis-future"
                target="_blank"
                rel="noreferrer"
                className="absolute -bottom-16 right-0 bg-emerald-600 text-white px-3 py-1.5 rounded-lg shadow-lg font-semibold text-xs hover:bg-emerald-500 transition"
              >
                {t.home.article_tag}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-6 bg-slate-950 text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-slate-300 mr-2">Trusted Stack</span>
          {TECH_STACK.slice(0, 6).map((stack) => (
            <span key={stack.key} className="text-xs sm:text-sm px-3 py-1.5 rounded-full border border-white/20 bg-white/5">
              {t.home.tech_stack_labels[stack.key] ?? stack.name}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* SERVICE AREAS */}
    <section className="section-space bg-white">
      <div className="section-shell">
        <div className="bg-white p-10 rounded-xl shadow-2xl border-l-8 border-indigo-800">
          <h2 className="text-3xl font-extrabold text-indigo-800 mb-4 text-center">{t.home.future_title}</h2>
          <p className="text-center text-lg text-gray-700 max-w-4xl mx-auto mb-8">{t.home.future_desc}</p>
          <div className="grid md:grid-cols-3 gap-8 text-center mt-6">
            {[
              { icon: <Zap size={48} />, title: t.home.card1_title, body: t.home.card1_body },
              { icon: <Cpu size={48} />, title: t.home.card2_title, body: t.home.card2_body },
              { icon: <Activity size={48} />, title: t.home.card3_title, body: t.home.card3_body }
            ].map((pillar, i) => (
              <a key={i} href="#projects" onClick={() => setPage('projects')} className="block p-4 rounded-lg border-2 border-transparent transition-all duration-300 hover:shadow-lg hover:border-indigo-600 hover:-translate-y-1 group">
                <div className="w-10 h-10 mx-auto mb-3 text-yellow-400 transition-transform duration-300 group-hover:-translate-y-0.5">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1 transition-all duration-300 group-hover:text-indigo-700">{pillar.title}</h3>
                <p className="text-gray-600 text-sm">{pillar.body}</p>
                <span className="inline-block mt-3 text-sm font-semibold text-indigo-600 opacity-0 transition-all duration-300 group-hover:opacity-100">{t.home.card_cta}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* BIO SECTION */}
    <section className="section-space bg-white">
      <div className="section-shell">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="type-section-title mb-4">{t.home.bio_title}</h2>
            <p className="text-lg leading-relaxed mb-4">{t.home.bio_p1}</p>
            <p className="text-base mb-6">
              {t.home.bio_p2_pre}{' '}
              <a href="https://www.elephant.healthcare/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800"><strong>Elephant Healthcare</strong></a>{' '}
              {t.home.bio_p2_mid}{' '}
              <a href="https://www.ilarahealth.com/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800"><strong>Ilara Health</strong></a>{' '}
              {t.home.bio_p2_post}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
                <span>{t.home.stat_msc}</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-indigo-600" />
                <span>{t.home.stat_member}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                <span>{t.home.stat_location}</span>
              </div>
            </div>
            <button onClick={() => setPage('about')} className="btn-cta btn-cta-primary mt-6">
              {t.home.bio_button}
            </button>
          </div>
          <div className="bg-gradient-to-br from-indigo-900 to-gray-700 p-8 rounded-xl text-white shadow-xl">
            <h4 className="text-xl font-semibold mb-3">{t.home.sim_title}</h4>
            <p className="opacity-90">{t.home.sim_quote}</p>
          </div>
        </div>
      </div>
    </section>

    {/* RESEARCH */}
    <section className="section-space bg-slate-950 text-white">
      <div className="section-shell">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveFeatureTile('research')}
              className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                activeFeatureTile === 'research'
                  ? 'border-white/50 bg-white/20 text-white'
                  : 'border-white/30 bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              {t.home.research_tag}
            </button>
            <button
              type="button"
              onClick={() => setActiveFeatureTile('article')}
              className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                activeFeatureTile === 'article'
                  ? 'border-emerald-300/60 bg-emerald-500/30 text-emerald-100'
                  : 'border-emerald-300/40 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30'
              }`}
            >
              {t.home.article_tag}
            </button>
          </div>
          <p className="text-lg text-gray-300">
            {activeFeatureTile === 'research'
              ? t.home.research_title
              : "How CWIEME shaped My future"}
          </p>
        </div>
        {activeFeatureTile === 'article' ? (
          <div className="max-w-6xl mx-auto">
            <a
              href="https://berlin.cwiemeevents.com/articles/how-cwieme-shaped-clifford-ondiekis-future"
              target="_blank"
              rel="noreferrer"
              className="group block w-full text-left"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
                <img
                  src="/imgs/1769782529906_1.jpg"
                  alt="Featured article cover"
                  className="w-full h-[300px] sm:h-[520px] object-contain object-center bg-[#0b4e62] transition-opacity duration-500 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />
                <div className="relative sm:absolute inset-x-0 bottom-0 p-4 sm:p-8 bg-slate-950/92 sm:bg-transparent">
                  <span className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-300/30 px-3 py-1 text-[11px] tracking-[0.25em] uppercase text-emerald-200 mb-3">
                    {t.home.article_tag}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-extrabold text-white mb-2">
                    How CWIEME shaped My future
                  </h3>
                  <p className="text-sm sm:text-base text-slate-200 mb-4 sm:mb-6 max-w-4xl">
                    Can curiosity turn into direction? One conversation about EV charging became an IEEE award-winning paper.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-3 sm:px-4 py-3 max-w-full">
                      <span className="text-2xl font-black text-emerald-300">CWIEME</span>
                      <div className="text-sm text-slate-200">
                        <p className="font-semibold">Featured Article</p>
                        <p className="opacity-80">Conference career story</p>
                      </div>
                    </div>
                    <span className="btn-cta btn-cta-sm btn-cta-primary">
                      Read Featured Article <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setPage('ev-study')}
              className="group block w-full text-left"
              aria-label={t.home.research_button}
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
                <img
                  src="/imgs/berlin.png"
                  alt={t.home.research_main_title}
                  className="w-full h-[300px] sm:h-[520px] object-cover transition-opacity duration-500 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/50 to-transparent" />
                <div className="relative sm:absolute inset-x-0 bottom-0 p-4 sm:p-8 bg-slate-950/92 sm:bg-transparent">
                  <span className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-300/30 px-3 py-1 text-[11px] tracking-[0.25em] uppercase text-emerald-200 mb-3">
                    {language === 'en' ? 'Featured Case' : 'Featured Case'}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-3 max-w-4xl">
                    {t.home.research_main_title}
                  </h3>
                  <p className="text-base sm:text-lg text-slate-200 max-w-4xl mb-4 sm:mb-6">
                    {t.home.research_desc}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-3 sm:px-4 py-3 max-w-full">
                      <span className="text-2xl sm:text-3xl font-black text-emerald-300">{t.home.research_stat_val}</span>
                      <div className="text-xs sm:text-sm text-slate-200">
                        <p className="font-semibold">{t.home.research_stat_title}</p>
                        <p className="opacity-80">{t.home.research_stat_label}</p>
                      </div>
                    </div>
                    <span className="btn-cta btn-cta-sm btn-cta-primary">
                      {t.home.research_button} <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>

    {/* SKILLS & TECH STACK */}
    <section className="section-space bg-white">
      <div className="section-shell">
        <div className="text-center mb-12">
          <h2 className="type-section-title mb-4">{t.home.skills_title}</h2>
          <p className="type-section-sub">{t.home.skills_sub}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-800">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{t.home.toolkit_title}</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700"><strong>{t.home.toolkit_1_label}:</strong> {t.home.toolkit_1_body}</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700"><strong>{t.home.toolkit_2_label}:</strong> {t.home.toolkit_2_body}</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700"><strong>{t.home.toolkit_3_label}:</strong> {t.home.toolkit_3_body}</span>
              </div>
            </div>
          </div>
          <div className="bg-indigo-50 p-8 rounded-xl shadow-lg border-t-4 border-indigo-600">
            <h3 className="text-2xl font-semibold text-indigo-900 mb-6 text-center">{t.home.regulatory_title}</h3>
            <div className="space-y-4">
              <div className="flex items-center bg-white p-3 rounded shadow-sm">
                <div className="bg-indigo-100 p-2 rounded mr-3 text-indigo-700 font-bold">VDE</div>
                <span className="text-gray-800 font-medium">{t.home.regulatory_vde}</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded shadow-sm">
                <div className="bg-indigo-100 p-2 rounded mr-3 text-indigo-700 font-bold">EnWG</div>
                <span className="text-gray-800 font-medium">{t.home.regulatory_enwg}</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded shadow-sm">
                <div className="bg-indigo-100 p-2 rounded mr-3 text-indigo-700 font-bold">IEC</div>
                <span className="text-gray-800 font-medium">{t.home.regulatory_iec}</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-800 md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">{t.home.leadership_title}</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700">{t.home.leadership_1}</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700">{t.home.leadership_2}</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700">{t.home.leadership_3}</span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="text-green-500 mr-3 mt-1" size={16} />
                <span className="text-gray-700">{t.home.leadership_4}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-800">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">{t.home.tech_stack_title}</h3>
          <div className="overflow-hidden">
            <div className="flex animate-scroll space-x-8">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex space-x-8 min-w-max">
                  {TECH_STACK.map((stack) => (
                    <div key={`${dup}-${stack.key}`} className="flex flex-col items-center group min-w-[100px]">
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-3 group-hover:-translate-y-0.5 transition-transform duration-300 p-2 shadow-sm border border-gray-100">
                        <img src={`imgs/${stack.icon}`} alt={stack.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-sm text-gray-600 text-center font-medium">
                        {t.home.tech_stack_labels[stack.key] ?? stack.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* AFFILIATIONS */}
    <section className="section-space">
      <div className="section-shell-narrow text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.home.affiliations_title}</h2>
        <div className="flex gap-6 overflow-x-auto py-4 px-2 -mx-2 snap-x snap-mandatory">
          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" title="Visit IEEE Website" className="mb-3">
              <img src="imgs/ieee.png" alt="IEEE Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_ieee}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.vdi.de/" target="_blank" rel="noopener noreferrer" title="Visit VDI Website" className="mb-3">
              <img src="imgs/VDI.svg" alt="VDI Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_vdi}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.vde.com/en" target="_blank" rel="noopener noreferrer" title="Visit VDE Website" className="mb-3">
              <img src="imgs/VDE.svg" alt="VDE Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_vde}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-blue-100 p-4 rounded-lg shadow-md border border-blue-200">
            <a href="https://www.kiron.ngo" target="_blank" rel="noopener noreferrer" title="Visit Kiron Website" className="mb-3">
              <img src="imgs/kiron.svg" alt="Kiron Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_kiron}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.joinimagine.com" target="_blank" rel="noopener noreferrer" title="Visit Imagine Foundation Website" className="mb-3">
              <img src="imgs/imagine.webp" alt="Imagine Foundation Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_imagine}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.ashoka.org" target="_blank" rel="noopener noreferrer" title="Visit Ashoka Website" className="mb-3">
              <img src="imgs/ashoka.png" alt="Ashoka Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_ashoka}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.alxafrica.com" target="_blank" rel="noopener noreferrer" title="Visit Alx Website" className="mb-3">
              <img src="imgs/alx.svg" alt="alx Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_alx}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <a href="https://www.ebk.go.ke/" target="_blank" rel="noopener noreferrer" title="Visit EBK Website" className="mb-3">
              <img src="imgs/ebk.png" alt="ebk Logo" className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_ebk}</p>
          </div>
        </div>
      </div>
    </section>

    {/* PHILOSOPHY */}
    <section className="section-space bg-white">
      <div className="section-shell-narrow text-center">
        <h2 className="type-section-title mb-4">{t.home.philosophy_section_title}</h2>
        <p className="type-section-sub mb-8">{t.home.philosophy_section_sub}</p>
        <div className="bg-gradient-to-br from-indigo-900 to-gray-700 p-8 rounded-xl text-white">
          <h4 className="text-2xl font-semibold mb-4">"Smart Laziness" & Systemic Efficiency</h4>
          <p className="text-lg mb-4">{t.home.phil_body}</p>
          <p className="opacity-90">{t.home.phil_sub}</p>
        </div>
        <button onClick={() => setPage('philosophy')} className="btn-cta mt-6 border border-indigo-800 text-indigo-800 hover:bg-indigo-800 hover:text-white">
          {t.home.philosophy_button}
        </button>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 text-white" style={{ backgroundColor: 'var(--primary-indigo)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{t.home.cta_title2}</h2>
        <p className="text-lg font-light mb-6">{t.home.cta_body2}</p>
        <button onClick={() => window.location.href = '/contact'} className="btn-cta btn-cta-light">
          {t.home.cta_button2}
        </button>
      </div>
    </section>
  </div>
  );
};

const AboutView = ({ t, setPage }: { t: T; setPage: SetPage }) => {
  const endorsements = [
    {
      name: t.about.endorse_1_name,
      role: t.about.endorse_1_role,
      quote: t.about.endorse_1_quote,
      image: "/imgs/testimonials/Yukabeth.jpg",
      alt: "Yukabeth Kidenda"
    },
    {
      name: t.about.endorse_2_name,
      role: t.about.endorse_2_role,
      quote: t.about.endorse_2_quote,
      image: "/imgs/testimonials/Valarie.jpg",
      alt: "Valerie O."
    },
    {
      name: t.about.endorse_3_name,
      role: t.about.endorse_3_role,
      quote: t.about.endorse_3_quote,
      image: "/imgs/abdul-idris.jpg",
      alt: "Abdul Idris"
    }
  ];
  const [activeEndorsement, setActiveEndorsement] = useState(0);
  const [isEndorsementPaused, setIsEndorsementPaused] = useState(false);

  useEffect(() => {
    if (isEndorsementPaused) return;

    const timer = window.setInterval(() => {
      setActiveEndorsement((prev) => (prev + 1) % endorsements.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [endorsements.length, isEndorsementPaused]);

  return (
  <div className="page-fade-in">
    <SectionHeader title={t.about.hero_title} sub={t.about.hero_subtitle} />
    
    <section className="section-space">
      <div className="section-shell">
        <div className="grid lg:grid-cols-2 gap-12 items-start lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border-l-4 border-indigo-600 mb-8">
              <h2 className="type-section-title mb-4">{t.about.bio_title}</h2>
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
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-lg h-full flex flex-col items-center justify-center border-l-4 border-indigo-600 min-h-[620px]">
              <img
                src="/imgs/GOAT.jpg"
                alt="Clifford Ondieki, The Innovator"
                className="profile-image mb-3"
                width={300}
                height={340}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://placehold.co/300x340/303F9F/ffffff?text=The+Architect";
                }}
              />
              <p className="text-sm font-medium text-indigo-600 text-center">{t.about.photo_caption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-gray-100">
      <div className="section-shell-narrow">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{t.about.moments_title}</h2>
        <div className="journey-timeline">
          <div className="journey-item">
            <h4 className="text-xl font-semibold" style={{ color: "var(--accent-fire)" }}>
              {t.about.m1_t}
            </h4>
            <p className="text-sm text-gray-500 mb-2">{t.about.m1_s}</p>
            <p className="text-[--neutral-charcoal]">{t.about.m1_d}</p>
          </div>

          <div className="journey-item">
            <h4 className="text-xl font-semibold" style={{ color: "var(--accent-fire)" }}>
              {t.about.m2_t}
            </h4>
            <p className="text-sm text-gray-500 mb-2">{t.about.m2_s}</p>
            <p className="text-[--neutral-charcoal]">{t.about.m2_d}</p>
          </div>

          <div className="journey-item">
            <h4 className="text-xl font-semibold" style={{ color: "var(--accent-fire)" }}>
              {t.about.m3_t}
            </h4>
            <p className="text-sm text-gray-500 mb-2">{t.about.m3_s}</p>
            <p className="text-[--neutral-charcoal]">{t.about.m3_d}</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-space">
      <div className="section-shell-narrow">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{t.about.overcome_title}</h2>
        <div className="space-y-8">
          <div className="p-6 sm:p-8 bg-white rounded-xl shadow-lg" style={{ borderTop: "4px solid var(--accent-fire)" }}>
            <h4 className="text-2xl font-semibold text-gray-800 mb-3">{t.about.overcome_1_t}</h4>
            <p className="text-[--neutral-charcoal] mb-4">{t.about.overcome_1_p}</p>
          </div>
          
          <div className="p-6 sm:p-8 bg-white rounded-xl shadow-lg" style={{ borderTop: "4px solid var(--accent-fire)" }}>
            <h4 className="text-2xl font-semibold text-gray-800 mb-3">{t.about.overcome_2_t}</h4>
            <p className="text-[--neutral-charcoal] mb-4">{t.about.overcome_2_p}</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-gray-100">
      <div className="section-shell">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{t.about.stars_title}</h2>
        <div className="max-w-3xl mx-auto p-8 sm:p-10 text-white rounded-2xl shadow-xl mb-12 bg-gray-900">
          <blockquote className="text-center">
            <p className="text-2xl italic mb-4 font-light leading-relaxed">
              {t.about.stars_q}
            </p>
            <footer className="text-sm opacity-80">{t.about.stars_f}</footer>
          </blockquote>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md" style={{ borderBottom: "4px solid var(--primary-indigo)" }}>
            <div className="flex items-center space-x-3 mb-2">
              <span style={{ color: "var(--highlight-gold)" }}>
                <Cpu className="w-5 h-5" />
              </span>
              <h5 className="text-xl font-semibold text-gray-800">{t.about.stars_card1_t}</h5>
            </div>
            <p className="text-[--neutral-charcoal]">{t.about.stars_card1_p}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md" style={{ borderBottom: "4px solid var(--primary-indigo)" }}>
            <div className="flex items-center space-x-3 mb-2">
              <span style={{ color: "var(--highlight-gold)" }}>
                <Users className="w-5 h-5" />
              </span>
              <h5 className="text-xl font-semibold text-gray-800">{t.about.stars_card2_t}</h5>
            </div>
            <p className="text-[--neutral-charcoal]">{t.about.stars_card2_p}</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section-space">
      <div className="section-shell">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">{t.about.skills_title}</h2>
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">{t.about.skills_sub}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300" style={{ borderTop: "4px solid var(--primary-indigo)" }}>
            <h5 className="text-xl font-semibold text-gray-800 mb-1">{t.about.skills_1_t}</h5>
            <p className="text-[--neutral-charcoal] text-sm">{t.about.skills_1_p}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300" style={{ borderTop: "4px solid var(--primary-indigo)" }}>
            <h5 className="text-xl font-semibold text-gray-800 mb-1">{t.about.skills_2_t}</h5>
            <p className="text-[--neutral-charcoal] text-sm">{t.about.skills_2_p}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300" style={{ borderTop: "4px solid var(--primary-indigo)" }}>
            <h5 className="text-xl font-semibold text-gray-800 mb-1">{t.about.skills_3_t}</h5>
            <p className="text-[--neutral-charcoal] text-sm">{t.about.skills_3_p}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300" style={{ borderTop: "4px solid var(--primary-indigo)" }}>
            <h5 className="text-xl font-semibold text-gray-800 mb-1">{t.about.skills_4_t}</h5>
            <p className="text-[--neutral-charcoal] text-sm">{t.about.skills_4_p}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300" style={{ borderTop: "4px solid var(--primary-indigo)" }}>
            <h5 className="text-xl font-semibold text-gray-800 mb-1">{t.about.skills_5_t}</h5>
            <p className="text-[--neutral-charcoal] text-sm">{t.about.skills_5_p}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300" style={{ borderTop: "4px solid var(--primary-indigo)" }}>
            <h5 className="text-xl font-semibold text-gray-800 mb-1">{t.about.skills_6_t}</h5>
            <p className="text-[--neutral-charcoal] text-sm">{t.about.skills_6_p}</p>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-gray-100">
      <div className="section-shell">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">{t.about.endorsements_title}</h2>
        <div className="max-w-4xl mx-auto">
          <div
            className="overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsEndorsementPaused(true)}
            onMouseLeave={() => setIsEndorsementPaused(false)}
            onTouchStart={() => setIsEndorsementPaused(true)}
            onTouchEnd={() => setIsEndorsementPaused(false)}
            onTouchCancel={() => setIsEndorsementPaused(false)}
            onFocus={() => setIsEndorsementPaused(true)}
            onBlur={() => setIsEndorsementPaused(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeEndorsement * 100}%)` }}
            >
              {endorsements.map((endorsement, idx) => (
                <article
                  key={`${endorsement.name}-${idx}`}
                  className="w-full shrink-0 p-6 bg-white rounded-2xl shadow-xl flex flex-col border-l-4 border-indigo-600 min-h-[240px]"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={endorsement.image}
                      alt={endorsement.alt}
                      className="w-16 h-16 rounded-full object-cover border-4 border-indigo-200 mr-4"
                    />
                    <div>
                      <h5 className="text-lg font-semibold text-gray-900">{endorsement.name}</h5>
                      <div className="text-sm font-medium text-indigo-600">{endorsement.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">{endorsement.quote}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2">
            {endorsements.map((endorsement, idx) => (
              <button
                key={`${endorsement.name}-dot-${idx}`}
                type="button"
                onClick={() => setActiveEndorsement(idx)}
                aria-label={`Show endorsement ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeEndorsement ? "w-8 bg-indigo-600" : "w-2.5 bg-indigo-300 hover:bg-indigo-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 text-white bg-indigo-900">
      <div className="section-shell-narrow text-center">
        <h2 className="text-4xl font-bold mb-4">{t.about.outlook_title}</h2>
        <p className="text-xl font-light mb-6">{t.about.outlook_p1}</p>
        <p className="mb-8 opacity-90">{t.about.outlook_p2}</p>
        <button onClick={() => setPage('contact')} className="btn-cta btn-cta-light inline-flex items-center">
          {t.about.outlook_button} <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </section>
  </div>
);
};

const PhilosophyView = ({ t, language, setPage }: { t: T; language: Language; setPage: SetPage }) => {
  const reflectionsByLang: Record<Language, Array<{ title: string; quote: string; text: string }>> = {
    en: [
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
    ],
    de: [
      {
        title: "Über technisches Können",
        quote:
          "Das Debuggen von Transformatoren lehrte mich Systemdenken; das Vatersein lehrte mich Geduld.",
        text:
          "Technische Fähigkeiten und Lebensweisheit befruchten sich gegenseitig. Geduld im Debugging ist Geduld im Leben.",
      },
      {
        title: "Über Innovation",
        quote: "Agilität ist nicht nur für Software — auch für Stromnetze.",
        text:
          "Iteration, Feedback‑Schleifen und kontinuierliche Verbesserung gelten für jede komplexe Infrastruktur.",
      },
      {
        title: "Über Selbstführung",
        quote: "Wo verhandle ich noch mit meinem alten Ich?",
        text:
          "Wachstum braucht Ehrlichkeit darüber, welche Muster mich nicht mehr weitertragen.",
      },
    ],
  };

  const insightsByLang: Record<Language, Array<{ title: string; text: string }>> = {
    en: [
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
    ],
    de: [
      {
        title: "Heutige Reflexion",
        text: "Verstehen ist wichtiger als Auswendiglernen – die Weisheit meines Großvaters.",
      },
      {
        title: "Über Systeme",
        text: "Jedes komplexe System hat einfache Prinzipien im Kern. Finde sie.",
      },
      {
        title: "Über Wachstum",
        text: "Wo verhandle ich noch mit meinem alten Ich? Wachstum braucht Loslassen.",
      },
      {
        title: "Über Innovation",
        text: "Die besten Lösungen entstehen an der Schnittstelle verschiedener Welten — wie Netze und Daten.",
      },
    ],
  };

  const smartLazyItems: Record<
    Language,
    Array<{ title: string; body: string }>
  > = {
    en: [
      {
        title: "Deep System Understanding",
        body:
          "Before coding or modeling, I invest time in understanding component interactions to prevent cascading failures.",
      },
      {
        title: "Root Cause Focus",
        body:
          "Instead of patching symptoms, I use data to identify the underlying anomalies in the grid or workflow.",
      },
      {
        title: "Automation Philosophy",
        body:
          "If a task is repetitive (like data cleaning or reporting), I write the script to automate it forever.",
      },
    ],
    de: [
      {
        title: "Tiefes Systemverständnis",
        body:
          "Bevor ich code oder modelliere, investiere ich Zeit in das Verständnis der Komponenten‑Interaktionen, um Kaskadenfehler zu vermeiden.",
      },
      {
        title: "Ursachenfokus",
        body:
          "Statt Symptome zu flicken, nutze ich Daten, um die zugrunde liegenden Anomalien im Netz oder Workflow zu finden.",
      },
      {
        title: "Automations‑Philosophie",
        body:
          "Wenn eine Aufgabe repetitiv ist (z. B. Datenbereinigung oder Reporting), automatisiere ich sie dauerhaft.",
      },
    ],
  };

  const ctaByLang: Record<Language, { title: string; body: string; button: string }> = {
    en: {
      title: "Let's Build Resilient Systems",
      body:
        "If these values—systemic thinking, engineering empathy, and innovation—align with your team's mission, let's explore how we can collaborate.",
      button: t.contact.cta_button,
    },
    de: {
      title: "Lass uns resiliente Systeme bauen",
      body:
        "Wenn diese Werte—Systemdenken, Engineering‑Empathie und Innovation—zu eurer Mission passen, lasst uns gemeinsam arbeiten.",
      button: t.contact.cta_button,
    },
  };

  const [reflectionIndex, setReflectionIndex] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);

  useEffect(() => {
    const reflectionTimer = setInterval(() => {
      setReflectionIndex((prev) => (prev + 1) % reflectionsByLang[language].length);
    }, 8000);
    const insightTimer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % insightsByLang[language].length);
    }, 10000);

    return () => {
      clearInterval(reflectionTimer);
      clearInterval(insightTimer);
    };
  }, [language, reflectionsByLang, insightsByLang]);

  const reflection = reflectionsByLang[language][reflectionIndex];
  const insight = insightsByLang[language][insightIndex];
  const smartLazy = smartLazyItems[language];
  const cta = ctaByLang[language];

  return (
    <div className="page-fade-in">
      <header
        className="py-20 lg:py-24 text-white"
        style={{ backgroundColor: "var(--primary-indigo)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            {t.philosophy.hero_title}
          </h1>
          <p className="text-xl sm:text-2xl font-light opacity-90 max-w-3xl mx-auto">
            {t.philosophy.hero_subtitle}
          </p>
        </div>
      </header>

      <main className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
                <h2 className="type-section-title mb-4">
                  {t.philosophy.core_title}
                </h2>
                <p className="text-lg text-gray-700 mb-4">{t.philosophy.core_p1}</p>
                <p className="text-gray-600 mb-4">{t.philosophy.core_p2}</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
                <h2 className="type-section-title mb-4">
                  {t.philosophy.smart_title}
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg text-center mb-6">
                  <p className="text-xl italic text-indigo-800 font-medium">
                    {t.home.phil_body}
                  </p>
                </div>
                <p className="text-gray-600 mb-6">{t.home.phil_sub}</p>

                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  {t.philosophy.smart_how_title}
                </h4>
                <div className="space-y-4">
                  {smartLazy.map((item) => (
                    <div key={item.title} className="border-l-4 border-rose-800 pl-4">
                      <h5 className="font-semibold text-gray-800">{item.title}</h5>
                      <p className="text-gray-600">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                {t.philosophy.reflections_title}
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
                {t.philosophy.living_title}
              </h2>
              <div className="bg-gradient-to-br from-rose-800 to-indigo-900 p-8 rounded-xl text-white text-center min-h-[180px] flex flex-col justify-center items-center transition-all duration-500">
                <h4 className="text-xl font-semibold mb-3">{insight.title}</h4>
                <p className="opacity-90">{insight.text}</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="max-w-6xl mx-auto">
              <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {t.philosophy.practice_title}
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  {t.philosophy.practice_intro}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition">
                    <div className="text-[--primary-indigo] mb-3">
                      <Layers className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{t.philosophy.prac1_t}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{t.philosophy.prac1_d}</p>
                  </div>

                  <div className="p-6 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition">
                    <div className="text-[--highlight-gold] mb-3">
                      <Users className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{t.philosophy.prac2_t}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{t.philosophy.prac2_d}</p>
                  </div>

                  <div className="p-6 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition">
                    <div className="text-[--accent-fire] mb-3">
                      <Puzzle className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{t.philosophy.prac3_t}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{t.philosophy.prac3_d}</p>
                  </div>

                  <div className="p-6 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-md transition">
                    <div className="text-indigo-600 mb-3">
                      <Lightbulb className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{t.philosophy.prac4_t}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{t.philosophy.prac4_d}</p>
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
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{cta.title}</h2>
          <p className="text-lg font-light mb-8 opacity-90">{cta.body}</p>
          <button
            onClick={() => setPage("contact")}
            className="btn-cta btn-cta-light inline-flex items-center"
            style={{ color: "var(--primary-indigo)" }}
          >
            {cta.button}
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
};

const ProjectsView = ({ t, language }: { t: T; language: Language }) => {
  const [projectDomain, setProjectDomain] = useState<'all' | 'grid' | 'optimization' | 'digitalization' | 'advisory'>('grid');
  const ctaCaseStudy = language === 'en' ? 'View Case Study' : 'Fallstudie ansehen';
  const ctaOpenRepo = language === 'en' ? 'Open Repo' : 'Repository öffnen';
  const ctaFullBrief = language === 'en' ? 'Request Full Brief' : 'Vollständiges Briefing anfragen';

  useEffect(() => {
    const saved = localStorage.getItem('projects-domain');
    if (
      saved === 'all' ||
      saved === 'grid' ||
      saved === 'optimization' ||
      saved === 'digitalization' ||
      saved === 'advisory'
    ) {
      setProjectDomain(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('projects-domain', projectDomain);
  }, [projectDomain]);

  return (
  <div className="page-fade-in">
    {/* Header */}
    <header className="py-16 lg:py-20 text-white relative overflow-hidden" style={{ backgroundColor: 'var(--primary-indigo)' }}>
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
    <main className="pt-4 lg:pt-6 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-6 py-2">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
            <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-2 justify-start md:justify-center min-w-max px-1">
            {[
              { key: 'all', label: language === 'en' ? 'All' : 'Alle' },
              { key: 'grid', label: language === 'en' ? 'Grid' : 'Netz' },
              { key: 'optimization', label: language === 'en' ? 'Optimization' : 'Optimierung' },
              { key: 'digitalization', label: language === 'en' ? 'Digitalization' : 'Digitalisierung' },
              { key: 'advisory', label: language === 'en' ? 'Advisory' : 'Beratung' }
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setProjectDomain(tab.key as 'all' | 'grid' | 'optimization' | 'digitalization' | 'advisory')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-300 ${
                  projectDomain === tab.key
                    ? 'liquid-pill-active'
                    : 'liquid-pill text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          </div>
          </div>
        </section>

        {projectDomain === 'all' && (
        <section className="mb-8">
          <div className="max-w-5xl mx-auto px-1 sm:px-2">
            <div className="overflow-hidden rounded-2xl liquid-card px-2 py-2">
            <div className="animate-scroll gap-3">
              <a href="#projects-serverless" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CloudLightning className="w-4 h-4 text-indigo-700" />
                  1. Serverless Grid Compliance Pipeline
                </p>
                <p className="text-xs text-slate-600 mt-1">Serverless pipelines and Digital Twins for Redispatch 3.0.</p>
              </a>
              <a href="#projects-equitable" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-700" />
                  2. Equitable EV Charger Deployment
                </p>
                <p className="text-xs text-slate-600 mt-1">Geospatial optimization to balance coverage and spatial equity.</p>
              </a>
              <a href="#projects-cim" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-700" />
                  3. {t.projects.p3_t}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {language === 'en' ? 'Interoperability layer for standards-based grid data exchange.' : 'Interoperabilitaets-Schicht fuer standardbasierten Datenaustausch.'}
                </p>
              </a>
              <a href="#projects-kinangop" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Wind className="w-4 h-4 text-indigo-700" />
                  4. {t.projects.p5_t}
                </p>
                <p className="text-xs text-slate-600 mt-1">{t.projects.p5_d}</p>
              </a>
              <a href="#projects-digital" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-teal-700" />
                  5. {t.projects.section_digital_title}
                </p>
                <p className="text-xs text-slate-600 mt-1">{t.projects.section_digital_sub}</p>
              </a>
              <a href="#projects-climate" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  6. {t.projects.climate_title}
                </p>
                <p className="text-xs text-slate-600 mt-1">{t.projects.climate_sub}</p>
              </a>
              <a href="#projects-premium" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-700" />
                  7. {t.projects.premium_title}
                </p>
                <p className="text-xs text-slate-600 mt-1">{t.projects.premium_sub}</p>
              </a>
              <a href="#projects-serverless" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CloudLightning className="w-4 h-4 text-indigo-700" />
                  1. Serverless Grid Compliance Pipeline
                </p>
                <p className="text-xs text-slate-600 mt-1">Serverless pipelines and Digital Twins for Redispatch 3.0.</p>
              </a>
              <a href="#projects-equitable" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-indigo-700" />
                  2. Equitable EV Charger Deployment
                </p>
                <p className="text-xs text-slate-600 mt-1">Geospatial optimization to balance coverage and spatial equity.</p>
              </a>
              <a href="#projects-cim" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-700" />
                  3. {t.projects.p3_t}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {language === 'en' ? 'Interoperability layer for standards-based grid data exchange.' : 'Interoperabilitaets-Schicht fuer standardbasierten Datenaustausch.'}
                </p>
              </a>
              <a href="#projects-kinangop" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Wind className="w-4 h-4 text-indigo-700" />
                  4. {t.projects.p5_t}
                </p>
                <p className="text-xs text-slate-600 mt-1">{t.projects.p5_d}</p>
              </a>
              <a href="#projects-digital" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-teal-700" />
                  5. {t.projects.section_digital_title}
                </p>
                <p className="text-xs text-slate-600 mt-1">{t.projects.section_digital_sub}</p>
              </a>
              <a href="#projects-climate" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  6. {t.projects.climate_title}
                </p>
                <p className="text-xs text-slate-600 mt-1">{t.projects.climate_sub}</p>
              </a>
              <a href="#projects-premium" className="block liquid-pill rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 min-w-[340px]">
                <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-700" />
                  7. {t.projects.premium_title}
                </p>
                <p className="text-xs text-slate-600 mt-1">{t.projects.premium_sub}</p>
              </a>
            </div>
            </div>
          </div>
        </section>
        )}

        {/* Cloud-Native Grid Automation */}
        {(projectDomain === 'all' || projectDomain === 'grid') && (
        <section id="projects-cloud" className="mb-20 scroll-mt-32">
          <div className="flex items-center mb-10">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <CloudLightning className="w-8 h-8 text-indigo-700" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{t.projects.p1_t}</h2>
              <p className="text-gray-600">{t.projects.p1_s}</p>
            </div>
          </div>

          <div id="projects-serverless" className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800 mb-12 transform transition hover:-translate-y-1 duration-300 scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="min-h-[400px] flex flex-col justify-between">
                <div>
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.projects.p2_t}</h2>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded border border-yellow-400">{t.projects.p2_badge}</span>
                </div>
                <p className="text-lg text-indigo-700 mb-6">{t.projects.p2_d}</p>
                
                <ProblemSolutionImpact
                  language={language}
                  problem={
                    language === 'en'
                      ? 'Traditional studies are manual, slow, and hard to scale for compliance-heavy planning.'
                      : 'Traditionelle Studien sind manuell, langsam und fuer compliance-intensive Planung schwer skalierbar.'
                  }
                  solution={t.projects.p2_d}
                  impact={
                    language === 'en'
                      ? 'Faster scenario throughput and stronger Redispatch readiness using cloud-native execution.'
                      : 'Schnellerer Szenario-Durchsatz und bessere Redispatch-Bereitschaft durch cloud-native Ausfuehrung.'
                  }
                />

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="chip-proof">VDE 4110 aligned</span>
                  <span className="chip-proof">Cloud-native</span>
                  <span className="chip-tech">Python</span>
                  <span className="chip-tech">AWS Lambda</span>
                  <span className="chip-tech">Pandapower</span>
                  <span className="chip-tech">DynamoDB</span>
                </div>
              </div>

              <a href="https://github.com/omari91/serverless-grid-compliance" target="_blank" className="btn-cta btn-cta-sm btn-cta-dark inline-flex items-center w-fit">
                <Github className="w-5 h-5 mr-2" />
                {ctaOpenRepo}
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

          <details id="projects-cim" className="mb-12 group scroll-mt-32">
            <summary className="list-none cursor-pointer liquid-pill rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-indigo-700">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                <p className="font-semibold text-slate-900">{t.projects.p3_t}</p>
                <p className="text-sm text-slate-600 mt-1">
                  {language === 'en'
                    ? 'Interoperability layer for standards-based grid data exchange.'
                    : 'Interoperabilitaets-Schicht fuer standardbasierten Austausch von Netzdaten.'}
                </p>
              </div>
              </div>
              <span className="text-slate-500 text-sm group-open:rotate-180 transition-transform">⌄</span>
            </summary>
            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800 mt-3 transform transition hover:-translate-y-1 duration-300">
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
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded border border-blue-400">{t.projects.p3_badge}</span>
                  </div>
                  <p className="text-lg text-indigo-700 mb-6">{t.projects.p3_d}</p>
                  
                  <ProblemSolutionImpact
                    language={language}
                    problem={
                      language === 'en'
                        ? 'Grid data often lives in fragmented formats that block automation and interoperability.'
                        : 'Netzdaten liegen oft in fragmentierten Formaten vor, die Automatisierung und Interoperabilitaet blockieren.'
                    }
                    solution={t.projects.p3_d}
                    impact={
                      language === 'en'
                        ? 'Portable, machine-readable models reduce vendor lock-in and improve toolchain compatibility.'
                        : 'Portable, maschinenlesbare Modelle reduzieren Vendor-Lock-in und verbessern Toolchain-Kompatibilitaet.'
                    }
                  />

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="chip-proof">IEC 61970 ready</span>
                    <span className="chip-proof">Vendor lock-in ↓</span>
                    <span className="chip-tech">IEC 61970 (CIM)</span>
                    <span className="chip-tech">NetworkX</span>
                    <span className="chip-tech">Fuzzy Logic</span>
                  </div>
                </div>
                
                <a href="https://github.com/omari91/cim-grid-control-engine" target="_blank" className="btn-cta btn-cta-sm btn-cta-dark inline-flex items-center w-fit">
                  <Github className="w-5 h-5 mr-2" />
                  {ctaOpenRepo}
                </a>
              </div>
            </div>
          </div>
          </details>
        </section>
        )}

        {/* Grid Integration & Power Systems */}
        {(projectDomain === 'all' || projectDomain === 'optimization') && (
        <section id="projects-equitable" className="mb-20 scroll-mt-32">
          <div className="flex items-center mb-10">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <Zap className="w-8 h-8 text-indigo-700" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{t.projects.section_grid_title}</h2>
              <p className="text-gray-600">{t.projects.section_grid_sub}</p>
            </div>
          </div>

          <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="min-h-[400px] flex flex-col justify-between">
                <div>
                  <h2 className="type-section-title mb-4">{t.projects.p4_t}</h2>
                  <p className="text-lg text-indigo-700 mb-6">{t.projects.p4_d}</p>
                  
                  <ProblemSolutionImpact
                    language={language}
                    problem={t.projects.p4_challenge_p}
                    solution={t.projects.p4_solution_p}
                    impact={
                      language === 'en'
                        ? 'Reduced inequality by 13% and improved access in underserved districts by up to 21%.'
                        : 'Ungleichheit um 13% gesenkt und Zugang in unterversorgten Bezirken um bis zu 21% verbessert.'
                    }
                  />

                  <div className="mb-6 border-l-4 border-blue-800 pl-4 bg-blue-50 p-4 rounded-md">
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">{t.projects.role_timeline_title}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-blue-800">{t.projects.role_label}</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          {t.projects.p4_role_items.map((item: string) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong className="text-blue-800">{t.projects.timeline_label}</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          {t.projects.p4_timeline_items.map((item: string) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="chip-proof">13% Gini ↓</span>
                    <span className="chip-proof">+21% access</span>
                    <span className="chip-tech">Python</span>
                    <span className="chip-tech">NSGA-II</span>
                    <span className="chip-tech">Geospatial Optimization</span>
                    <span className="chip-tech">Urban Planning</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-t pt-4 mt-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">13%</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p4_stat_1_label}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">6x</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p4_stat_2_label}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">21%</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p4_stat_3_label}</p>
                  </div>
                </div>
              </div>
              
              <div className="min-h-[400px] flex flex-col gap-6">
                <img src="/imgs/berlin.png" alt="Berlin EV Charger Distribution" className="w-full h-64 object-cover rounded-lg shadow-lg border border-gray-200" />
                
                <div className="bg-gray-50 p-5 rounded-xl shadow-inner border border-gray-200">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">{t.projects.p4_side_title}</h5>
                  <p className="text-sm text-gray-600 mb-4">{t.projects.p4_side_p}</p>
                  <button onClick={() => window.location.href = '/ev-study'} className="btn-cta btn-cta-sm btn-cta-primary btn-cta-block mb-4">
                    {ctaCaseStudy}
                  </button>
                </div>
                
                <img src="/imgs/Cert best.png" alt="IEEE Best Paper Award Certificate" className="w-full h-auto rounded-lg shadow-lg border border-gray-200" />
              </div>
            </div>
          </div>
        </section>
        )}

        {(projectDomain === 'all' || projectDomain === 'grid') && (
        <details id="projects-kinangop" className="mb-20 group scroll-mt-32">
          <summary className="list-none cursor-pointer liquid-pill rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-indigo-700">
                <Wind className="w-4 h-4" />
              </div>
              <div>
              <p className="font-semibold text-slate-900">{t.projects.p5_t}</p>
              <p className="text-sm text-slate-600 mt-1">{t.projects.p5_d}</p>
              </div>
            </div>
            <span className="text-slate-500 text-sm group-open:rotate-180 transition-transform">⌄</span>
          </summary>
          <section className="mt-3">
          <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="min-h-[400px] flex flex-col gap-6">
                <img src="/imgs/wind farm.jpg" alt="Kinangop Wind Integration" className="w-full h-64 object-cover rounded-lg shadow-lg border border-gray-200" />
                <div className="bg-gray-50 p-5 rounded-xl shadow-inner border border-gray-200 flex-1">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">{t.projects.p5_key_lesson_title}</h5>
                  <p className="text-sm text-gray-600 mb-4">{t.projects.p5_key_lesson_p}</p>
                  <a href="https://drive.google.com/file/d/1NBIsal051Oqn_8JWls9Lhgr8mEcLpKhq/view" target="_blank" className="btn-cta btn-cta-sm btn-cta-primary btn-cta-block">
                    {ctaCaseStudy}
                  </a>
                </div>
              </div>

              <div className="min-h-[400px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{t.projects.p5_t}</h2>
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded border border-red-400">{t.projects.p5_badge}</span>
                  </div>
                  <p className="text-lg text-indigo-700 mb-6">{t.projects.p5_d}</p>
                  
                  <ProblemSolutionImpact
                    language={language}
                    problem={t.projects.p5_challenge_p}
                    solution={t.projects.p5_solution_p}
                    impact={
                      language === 'en'
                        ? 'Delivered stable integration strategy for 60MW wind while improving voltage profile under stress.'
                        : 'Stabile Integrationsstrategie fuer 60MW Wind mit verbessertem Spannungsprofil unter Last entwickelt.'
                    }
                  />

                  <div className="mb-6 border-l-4 border-blue-800 pl-4 bg-blue-50 p-4 rounded-md">
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">{t.projects.role_timeline_title}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-blue-800">{t.projects.role_label}</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          {t.projects.p5_role_items.map((item: string) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong className="text-blue-800">{t.projects.timeline_label}</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          {t.projects.p5_timeline_items.map((item: string) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="chip-proof">60MW integrated</span>
                    <span className="chip-proof">25% stability gain</span>
                    <span className="chip-tech">DIgSILENT PowerFactory</span>
                    <span className="chip-tech">Power System Analysis</span>
                    <span className="chip-tech">Renewable Energy Integration</span>
                    <span className="chip-tech">Grid Stability Modeling</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-t pt-4 mt-auto">
                  <div className="text-left">
                    <div className="text-3xl font-bold text-indigo-800">25%</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p5_stat_1_label}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">60MW</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p5_stat_2_label}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-indigo-800">100k+</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p5_stat_3_label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </details>
        )}

        {/* Digitalization & Automation */}
        {(projectDomain === 'all' || projectDomain === 'digitalization') && (
        <details id="projects-digital" className="mb-20 scroll-mt-32 group">
          <summary className="list-none cursor-pointer liquid-pill rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-teal-700">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
              <p className="font-semibold text-slate-900">{t.projects.section_digital_title}</p>
              <p className="text-sm text-slate-600 mt-1">{t.projects.section_digital_sub}</p>
              </div>
            </div>
            <span className="text-slate-500 text-sm group-open:rotate-180 transition-transform">⌄</span>
          </summary>
          <section className="mt-3">
          <div className="flex items-center mb-10">
            <div className="bg-teal-100 p-3 rounded-full mr-4">
              <Cpu className="w-8 h-8 text-teal-700" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{t.projects.section_digital_title}</h2>
              <p className="text-gray-600">{t.projects.section_digital_sub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <img src="/imgs/geothermal-drilling-activities.jpg" alt="Predictive Maintenance AI" className="w-full h-48 object-cover rounded-lg shadow-lg border border-gray-200" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.projects.p6_t}</h3>
                  <p className="text-sm text-indigo-700 mb-4">{t.projects.p6_d}</p>
                  
                  <ProblemSolutionImpact
                    language={language}
                    problem={t.projects.p6_challenge_p}
                    solution={t.projects.p6_solution_p}
                    impact={
                      language === 'en'
                        ? 'Cut unplanned downtime by 40% and supported measurable OPEX reduction.'
                        : 'Ungeplante Ausfaelle um 40% reduziert und messbare OPEX-Senkung unterstuetzt.'
                    }
                  />
                  
                  <div className="mb-4 border-l-4 border-blue-800 pl-3 bg-blue-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">{t.projects.role_timeline_title}</h4>
                    <div className="space-y-1 text-xs">
                      <p><strong className="text-blue-800">{t.projects.role_label}</strong> {t.projects.p6_role_line}</p>
                      <p><strong className="text-blue-800">{t.projects.timeline_label}</strong> {t.projects.p6_timeline_line}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="chip-proof">40% downtime ↓</span>
                    <span className="chip-proof">$2M savings</span>
                    <span className="chip-tech">Python</span>
                    <span className="chip-tech">TensorFlow</span>
                    <span className="chip-tech">Time Series</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 border-t pt-3 mt-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-800">40%</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p6_stat_1_label}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-800">$2M</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p6_stat_2_label}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-800">95%</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p6_stat_3_label}</p>
                  </div>
                </div>
                
                <a href="https://drive.google.com/file/d/0B2ovMeevnDjZd195VHN4UjNXak0/view?usp=sharing&resourcekey=0-OM41Swf1myiikab1d5w7LQ" target="_blank" className="btn-cta btn-cta-sm btn-cta-primary btn-cta-block mt-4">
                  {ctaCaseStudy}
                </a>
              </div>
            </div>

            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <img src="https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Health Tech Load Balancing" className="w-full h-48 object-cover rounded-lg shadow-lg border border-gray-200" />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t.projects.health_title}</h3>
                  <p className="text-sm text-indigo-700 mb-4">{t.projects.health_sub}</p>
                  
                  <ProblemSolutionImpact
                    language={language}
                    problem={t.projects.health_challenge_p}
                    solution={t.projects.health_solution_p}
                    impact={
                      language === 'en'
                        ? 'Improved load balancing with faster triage and stronger continuity of care.'
                        : 'Lastverteilung verbessert mit schnellerer Triage und besserer Versorgungskontinuitaet.'
                    }
                  />
                  
                  <div className="mb-4 border-l-4 border-blue-800 pl-3 bg-blue-50 p-3 rounded-md">
                    <h4 className="text-sm font-semibold text-blue-900 mb-1">{t.projects.role_timeline_title}</h4>
                    <div className="space-y-1 text-xs">
                      <p><strong className="text-blue-800">{t.projects.role_label}</strong> {t.projects.health_role_line}</p>
                      <p><strong className="text-blue-800">{t.projects.timeline_label}</strong> {t.projects.health_timeline_line}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="chip-proof">50% wait-time ↓</span>
                    <span className="chip-proof">30% throughput ↑</span>
                    <span className="chip-tech">Node.js</span>
                    <span className="chip-tech">React</span>
                    <span className="chip-tech">MongoDB</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 border-t pt-3 mt-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-800">50%</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.health_stat_1_label}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-800">30%</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.health_stat_2_label}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-800">15k+</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.health_stat_3_label}</p>
                  </div>
                </div>
                
                <button onClick={() => window.location.href = '/contact'} className="btn-cta btn-cta-sm btn-cta-primary btn-cta-block mt-4">
                  {ctaFullBrief}
                </button>
              </div>
            </div>

          </div>
        </section>
        </details>
        )}

        {/* Climate Tech Investment Consultancy */}
        {(projectDomain === 'all' || projectDomain === 'advisory') && (
        <details id="projects-climate" className="mb-20 group scroll-mt-32">
          <summary className="list-none cursor-pointer liquid-pill rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-indigo-700">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
              <p className="font-semibold text-slate-900">{t.projects.climate_title}</p>
              <p className="text-sm text-slate-600 mt-1">{t.projects.climate_sub}</p>
              </div>
            </div>
            <span className="text-slate-500 text-sm group-open:rotate-180 transition-transform">⌄</span>
          </summary>
          <section className="mt-3">
          <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="min-h-[400px] flex flex-col gap-6">
                <img src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Climate Tech Advisory" className="w-full h-auto rounded-lg shadow-lg border border-gray-200 object-cover mb-4" />
                <div className="bg-gray-50 p-5 rounded-xl shadow-inner border border-gray-200 flex-1">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">{t.projects.climate_left_title}</h5>
                  <p className="text-sm text-gray-600 mb-4">{t.projects.climate_left_p}</p>
                  <a href="https://www.linkedin.com/in/clifford-ondieki-tpm/details/volunteering-experiences/" target="_blank" className="btn-cta btn-cta-sm btn-cta-primary btn-cta-block">
                    {ctaFullBrief}
                  </a>
                </div>
              </div>
              
              <div className="min-h-[400px] flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.projects.climate_title}</h2>
                  <p className="text-lg text-indigo-700 mb-6">{t.projects.climate_sub}</p>
                  
                  <ProblemSolutionImpact
                    language={language}
                    problem={t.projects.climate_challenge_p}
                    solution={t.projects.climate_approach_p}
                    impact={
                      language === 'en'
                        ? 'Built stronger founder-investor deployment alignment to de-risk climate commercialization.'
                        : 'Staerkere Deployment-Ausrichtung zwischen Gruendern und Investoren zur Risikoreduktion in der Kommerzialisierung.'
                    }
                  />

                  <div className="mb-6 border-l-4 border-blue-800 pl-4 bg-blue-50 p-4 rounded-md">
                    <h4 className="text-lg font-semibold text-blue-900 mb-2">{t.projects.role_timeline_title}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-blue-800">{t.projects.role_label}</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          {t.projects.climate_role_items.map((item: string) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong className="text-blue-800">{t.projects.timeline_label}</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          {t.projects.climate_timeline_items.map((item: string) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="chip-proof">5+ startups</span>
                    <span className="chip-proof">3x deployment speed</span>
                    <span className="chip-tech">Venture Capital Analysis</span>
                    <span className="chip-tech">Operational Due Diligence</span>
                    <span className="chip-tech">Deployment Strategy</span>
                    <span className="chip-tech">{t.projects.climate_tag_market}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-t pt-4 mt-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">5+</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.climate_stat_1_label}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">2</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.climate_stat_2_label}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-800">3x</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.climate_stat_3_label}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </details>
        )}

        {/* Premium Case Studies */}
        {(projectDomain === 'all' || projectDomain === 'digitalization') && (
        <details id="projects-premium" className="mb-16 group scroll-mt-32">
          <summary className="list-none cursor-pointer liquid-pill rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-amber-600">
                <Shield className="w-4 h-4" />
              </div>
              <div>
              <p className="font-semibold text-slate-900">{t.projects.premium_title}</p>
              <p className="text-sm text-slate-600 mt-1">{t.projects.premium_sub}</p>
              </div>
            </div>
            <span className="text-slate-500 text-sm group-open:rotate-180 transition-transform">⌄</span>
          </summary>
          <section className="mt-3">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">{t.projects.premium_title}</h2>
            <p className="type-section-sub">{t.projects.premium_sub}</p>
          </div>

          <div className="space-y-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border-4 border-amber-400 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gray-900/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl p-8 z-10">
                <div className="text-center text-white">
                  <Shield className="mx-auto mb-4 w-10 h-10 text-amber-400" />
                  <p className="text-xl font-bold">{t.projects.premium_overlay1_title}</p>
                  <small className="block text-gray-300 mb-6">{t.projects.premium_overlay1_sub}</small>
                  <button onClick={() => window.location.href = '/contact'} className="btn-cta bg-amber-400 text-gray-900 hover:bg-amber-300">
                    {ctaFullBrief}
                  </button>
                </div>
              </div>

              <div className="opacity-50 group-hover:opacity-20 transition-opacity duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">{t.projects.premium_case1_title}</h2>
                    <p className="text-lg text-gray-500 mb-6">{t.projects.premium_case1_desc}</p>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">{t.projects.premium_role_title}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong className="text-gray-700">{t.projects.premium_role_label}</strong>
                          <p className="text-gray-600 mt-1">{t.projects.premium_role_1}</p>
                        </div>
                        <div>
                          <strong className="text-gray-700">{t.projects.premium_timeline_label}</strong>
                          <p className="text-gray-600 mt-1">{t.projects.premium_timeline_1}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">{t.projects.premium_highlights_title}</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                        {t.projects.premium_highlights_items.map((item: string) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="chip-tech">Python</span>
                      <span className="chip-tech">TensorFlow</span>
                      <span className="chip-tech">LSTM Networks</span>
                      <span className="chip-tech">SCADA Integration</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative w-full">
                      <img src="/imgs/saas.png" alt="Advanced Grid Optimization Preview" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                        <div className="text-center text-white">
                          <Eye className="mx-auto mb-1 w-8 h-8" />
                          <p className="font-semibold">{t.projects.premium_preview_label}</p>
                          <small>{t.projects.premium_preview_hint}</small>
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
                  <p className="text-xl font-bold">{t.projects.premium_overlay2_title}</p>
                  <small className="block text-gray-300 mb-6">{t.projects.premium_overlay2_sub}</small>
                  <button onClick={() => window.location.href = '/contact'} className="btn-cta bg-amber-400 text-gray-900 hover:bg-amber-300">
                    {ctaFullBrief}
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
                          <p className="font-semibold">{t.projects.premium_preview_label}</p>
                          <small>{t.projects.premium_preview_hint}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">{t.projects.premium_case2_title}</h2>
                    <p className="text-lg text-gray-500 mb-6">{t.projects.premium_case2_desc}</p>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">{t.projects.premium_role_title}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong className="text-gray-700">{t.projects.premium_role_label}</strong>
                          <p className="text-gray-600 mt-1">{t.projects.premium_role_2}</p>
                        </div>
                        <div>
                          <strong className="text-gray-700">{t.projects.premium_timeline_label}</strong>
                          <p className="text-gray-600 mt-1">{t.projects.premium_timeline_2}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                      <h4 className="text-lg font-semibold text-gray-600 mb-2">{t.projects.premium_highlights2_title}</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                        {t.projects.premium_highlights2_items.map((item: string) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="chip-tech">Node.js</span>
                      <span className="chip-tech">InfluxDB</span>
                      <span className="chip-tech">MQTT</span>
                      <span className="chip-tech">Docker</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </details>
        )}

        {/* CTA */}
        <section
          className="section-space text-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
          style={{ backgroundColor: 'var(--primary-indigo)' }}
        >
          <div className="section-shell-narrow text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{t.projects.cta_title}</h2>
            <p className="text-lg font-light mb-6">{t.projects.cta_body}</p>
            <button onClick={() => window.location.href = '/contact'} className="btn-cta btn-cta-light inline-flex items-center">
              {t.projects.cta_button} <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </section>
      </div> {/* Closes max-w-7xl */}
    </main> {/* Closes main */}
  </div>
  );
};

const BlogView = ({ t }: { t: T }) => (
  <div className="page-fade-in">
    <SectionHeader title={t.blog.hero_title} sub={t.blog.hero_subtitle} />
    <main className="py-4 lg:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <section>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-900 to-gray-700 p-8 rounded-xl text-white shadow-xl">
              <div className="text-sm opacity-80 mb-2">{t.blog.featured_label}</div>
              <h2 className="text-3xl font-bold mb-4">{t.blog.featured_title}</h2>
              <p className="text-lg mb-4 opacity-90">{t.blog.featured_lede}</p>
              <p className="opacity-80">{t.blog.featured_body}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {t.blog.featured_tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-white/20 text-white rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
              <div className="text-sm text-gray-500 mb-2">{t.blog.post_a_label}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.blog.post_a_title}</h3>
              <p className="text-gray-600 mb-6">{t.blog.post_a_body}</p>
              <div className="flex flex-wrap gap-2">
                {t.blog.post_a_tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
              <div className="text-sm text-gray-500 mb-2">{t.blog.post_b_label}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.blog.post_b_title}</h3>
              <p className="text-gray-600 mb-6">{t.blog.post_b_body}</p>
              <div className="flex flex-wrap gap-2">
                {t.blog.post_b_tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
              <div className="text-sm text-gray-500 mb-2">{t.blog.post_c_label}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.blog.post_c_title}</h3>
              <p className="text-gray-600 mb-6">{t.blog.post_c_body}</p>
              <div className="flex flex-wrap gap-2">
                {t.blog.post_c_tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
              <div className="text-sm text-gray-500 mb-2">{t.blog.post_d_label}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.blog.post_d_title}</h3>
              <p className="text-gray-600 mb-6">{t.blog.post_d_body}</p>
              <div className="flex flex-wrap gap-2">
                {t.blog.post_d_tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-600 p-8 rounded-xl text-white text-center">
              <h3 className="text-2xl font-bold mb-4">{t.blog.linkedin_title}</h3>
              <p className="text-lg mb-6 opacity-90">{t.blog.linkedin_body}</p>
              <a href="https://www.linkedin.com/in/clifford-ondieki-559b9771/" target="_blank" rel="noreferrer" className="btn-cta bg-white text-blue-600 border border-white hover:bg-gray-100">
                {t.blog.linkedin_button}
              </a>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto">
            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.blog.newsletter_title}</h3>
              <p className="text-gray-600 mb-6">{t.blog.newsletter_body}</p>
              <form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <input type="email" placeholder={t.blog.newsletter_placeholder} className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-80" />
                <button type="submit" className="btn-cta btn-cta-primary btn-cta-block">
                  {t.blog.newsletter_button}
                </button>
              </form>
              <p className="text-sm text-gray-500 mt-4">{t.blog.newsletter_note}</p>
            </div>
          </div>
        </section>
      </div>
    </main>

    <section className="py-16 text-white" style={{ backgroundColor: 'var(--primary-indigo)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{t.blog.cta_title}</h2>
        <p className="text-lg font-light mb-6">{t.blog.cta_body}</p>
        <button onClick={() => window.location.href = '/contact'} className="btn-cta btn-cta-light">
          {t.blog.cta_button}
        </button>
      </div>
    </section>
  </div>
);

const ContactView = ({ t }: { t: T }) => (
  <div className="page-fade-in">
    <header className="py-16 lg:py-20 text-white" style={{ backgroundColor: 'var(--primary-indigo)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
          {t.contact.hero_title}
        </h1>
        <p className="text-xl sm:text-2xl font-light opacity-90 max-w-3xl mx-auto">
          {t.contact.hero_subtitle}
        </p>
      </div>
    </header>

    <main className="py-4 lg:py-6 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <section>
          <div className="max-w-4xl mx-auto">
            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">{t.contact.form_title}</h2>
              <p className="text-center text-gray-600 mb-8">{t.contact.form_desc}</p>

              <form action="https://formspree.io/f/xoqooyrz" method="POST" className="space-y-6">
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form_name_label}</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder={t.contact.form_name_label}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form_email_label}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder={t.contact.form_email_label}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form_topic_label}</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                    defaultValue=""
                  >
                    <option value="" disabled>{t.contact.form_topic_placeholder}</option>
                    <option value={t.contact.form_option_grid}>{t.contact.form_option_grid}</option>
                    <option value={t.contact.form_option_commissioning}>{t.contact.form_option_commissioning}</option>
                    <option value={t.contact.form_option_simulation}>{t.contact.form_option_simulation}</option>
                    <option value={t.contact.form_option_werkstudent}>{t.contact.form_option_werkstudent}</option>
                    <option value={t.contact.form_option_consulting}>{t.contact.form_option_consulting}</option>
                    <option value={t.contact.form_option_speaking}>{t.contact.form_option_speaking}</option>
                    <option value={t.contact.form_option_mentorship}>{t.contact.form_option_mentorship}</option>
                    <option value={t.contact.form_option_general}>{t.contact.form_option_general}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">{t.contact.form_message_label}</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder={t.contact.form_message_placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn-cta btn-cta-primary">
                    {t.contact.btn_send}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-indigo-800">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{t.contact.contact_email_title}</h4>
                <a href="mailto:ondiekiclifford05@gmail.com" className="text-indigo-700 hover:text-indigo-900 font-medium">
                  ondiekiclifford05 [at] gmail.com
                </a>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-indigo-800">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{t.contact.contact_phone_title}</h4>
                <div className="space-y-1">
                  <a href="tel:+4915755653967" className="text-indigo-700 hover:text-indigo-900 font-medium">+49 1575 5653967 (DE)</a>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-indigo-800">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{t.contact.contact_linkedin_title}</h4>
                <a href="https://www.linkedin.com/in/clifford-ondieki-559b9771/" target="_blank" rel="noreferrer" className="text-indigo-700 hover:text-indigo-900 font-medium">
                  {t.contact.contact_linkedin_cta}
                </a>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-indigo-800">
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{t.contact.contact_base_title}</h4>
                <p className="text-gray-600">{t.contact.contact_base_desc}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto">
            <div className="bg-amber-50 p-8 rounded-xl border-l-4 border-amber-400">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.contact.focus_title}</h3>
              <p className="text-gray-700 mb-4">{t.contact.focus_body}</p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>{t.contact.focus_roles_label}:</strong> {t.contact.focus_roles_desc}</p>
                </div>
                <div>
                  <p><strong>{t.contact.focus_sectors_label}:</strong> {t.contact.focus_sectors_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-900 to-gray-700 p-8 rounded-xl text-white text-center">
              <h3 className="text-2xl font-bold mb-6">{t.contact.value_title}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h5 className="text-lg font-semibold mb-2">{t.contact.value_sim_title}</h5>
                  <p className="text-sm opacity-90">{t.contact.value_sim_desc}</p>
                </div>
                <div>
                  <h5 className="text-lg font-semibold mb-2">{t.contact.value_integ_title}</h5>
                  <p className="text-sm opacity-90">{t.contact.value_integ_desc}</p>
                </div>
                <div>
                  <h5 className="text-lg font-semibold mb-2">{t.contact.value_comm_title}</h5>
                  <p className="text-sm opacity-90">{t.contact.value_comm_desc}</p>
                </div>
                <div>
                  <h5 className="text-lg font-semibold mb-2">{t.contact.value_digi_title}</h5>
                  <p className="text-sm opacity-90">{t.contact.value_digi_desc}</p>
                </div>
                <div>
                  <h5 className="text-lg font-semibold mb-2">{t.contact.value_mentor_title}</h5>
                  <p className="text-sm opacity-90">{t.contact.value_mentor_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.contact.commitment_title}</h3>
            <p className="type-section-sub mb-4">{t.contact.commitment_body}</p>
            <p className="text-base italic text-gray-500">{t.contact.commitment_quote}</p>
          </div>
        </section>
      </div>
    </main>

    <section className="py-16 text-white" style={{ backgroundColor: 'var(--primary-indigo)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{t.contact.cta_title}</h2>
        <p className="text-lg font-light mb-6">{t.contact.cta_body}</p>
        <a href="mailto:engomari6@gmail.com" className="btn-cta btn-cta-light inline-block">
          {t.contact.cta_button}
        </a>
      </div>
    </section>
  </div>
);

const PrivacyView = ({ t, language, setPage }: { t: T; language: Language; setPage: SetPage }) => {
  const now = new Date();
  const dateString = now.toLocaleDateString(language === 'en' ? 'en-US' : 'de-DE', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="page-fade-in">
      <SectionHeader title={t.privacy.title} sub={t.privacy.subtitle} />
      <section className="section-space bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <section className="mb-12">
            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
              <h2 className="type-section-title mb-4">{t.privacy.commitment_title}</h2>
              <p className="text-lg text-gray-700 mb-4">{t.privacy.commitment_p1}</p>
              <p className="text-gray-600">{t.privacy.commitment_p2}</p>
            </div>
          </section>

          <section className="mb-12">
            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.privacy.info_title}</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{t.privacy.analytics_title}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>{language === 'en' ? 'What:' : 'Was:'}</strong> {t.privacy.analytics_what}</p>
                    <p><strong>{language === 'en' ? 'Purpose:' : 'Zweck:'}</strong> {t.privacy.analytics_purpose}</p>
                    <p><strong>{language === 'en' ? 'Data Controller:' : 'Verantwortlicher:'}</strong> {t.privacy.analytics_controller}</p>
                    <p><strong>{language === 'en' ? 'Retention:' : 'Speicherdauer:'}</strong> {t.privacy.analytics_retention}</p>
                    {language === 'de' && (
                      <>
                        <p className="mt-2"><strong>Verantwortlicher:</strong> {t.privacy.analytics_controller}</p>
                        <p>Weitere Informationen darüber, wie Microsoft Ihre Daten erfasst und verwendet, finden Sie in der <a href={t.privacy.analytics_link} target="_blank" className="text-indigo-600 underline">{t.privacy.analytics_link_text}</a>.</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{t.privacy.contact_form_title}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    {language === 'en' ? (
                      <>
                        <p><strong>What:</strong> {t.privacy.contact_what}</p>
                        <p><strong>Purpose:</strong> {t.privacy.contact_purpose}</p>
                        <p><strong>Data Controller:</strong> {t.privacy.contact_controller}</p>
                        <p><strong>Retention:</strong> {t.privacy.contact_retention}</p>
                      </>
                    ) : (
                      <>
                        <p>{t.privacy.contact_p}</p>
                        <p>Formspree verkauft Ihre Daten nicht an Dritte. Weitere Informationen finden Sie in der <a href={t.privacy.contact_link} target="_blank" className="text-indigo-600 underline">{t.privacy.contact_link_text}</a>.</p>
                        <p className="mt-2"><strong>{t.privacy.contact_retention}</strong></p>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">{t.privacy.technical_title}</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>{language === 'en' ? 'What:' : 'Was:'}</strong> {t.privacy.technical_what}</p>
                    <p><strong>{language === 'en' ? 'Purpose:' : 'Zweck:'}</strong> {t.privacy.technical_purpose}</p>
                    <p><strong>{language === 'en' ? 'Legal Basis:' : 'Rechtsgrundlage:'}</strong> {t.privacy.technical_basis}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.privacy.use_title}</h2>
              <ul className="space-y-3 text-gray-600">
                {t.privacy.use_list.map((item: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="text-indigo-600 mr-2">•</span>
                    <span><strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <div className="liquid-card card-pad rounded-xl shadow-lg border-l-4 border-indigo-800">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.privacy.rights_title}</h2>
              <p className="text-gray-600 mb-4">{t.privacy.rights_p}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3 text-sm text-gray-600">
                  {t.privacy.rights_list1.map((item: string, i: number) => (
                    <div key={i}><strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</div>
                  ))}
                </div>
                <div className="space-y-3 text-sm text-gray-600">
                  {t.privacy.rights_list2.map((item: string, i: number) => (
                    <div key={i}><strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</div>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mt-4">{t.privacy.rights_contact}</p>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-br from-indigo-900 to-gray-700 p-8 rounded-xl text-white text-center">
              <h2 className="text-2xl font-bold mb-4">{t.privacy.contact_info_title}</h2>
              <p className="mb-4 opacity-90">{t.privacy.contact_info_p}</p>
              <div className="space-y-2">
                <p><strong>{language === 'en' ? 'Email:' : 'E-Mail:'}</strong> <a href={`mailto:${t.privacy.email}`} className="text-white underline hover:text-gray-200">{t.privacy.email.replace('@', ' [at] ')}</a></p>
                <p><strong>{language === 'en' ? 'Phone:' : 'Telefon:'}</strong> {t.privacy.phone}</p>
                <p><strong>{language === 'en' ? 'Location:' : 'Standort:'}</strong> {t.privacy.location}</p>
                <p><strong>{language === 'en' ? 'Response Time:' : 'Antwortzeit:'}</strong> {t.privacy.response_time}</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gray-100 p-6 rounded-xl text-center">
              <p className="text-gray-600"><strong>{t.privacy.last_updated}:</strong> {dateString}</p>
              <p className="text-gray-600"><strong>{t.privacy.effective_date}:</strong> {dateString}</p>
            </div>
          </section>
        </div>
      </section>

      <section className="py-16 text-white" style={{ backgroundColor: 'var(--primary-indigo)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">{t.privacy.questions_title}</h2>
          <p className="text-lg font-light mb-6">{t.privacy.questions_p}</p>
          <button onClick={() => setPage('contact')} className="btn-cta btn-cta-light">
            {t.privacy.contact_cta}
          </button>
        </div>
      </section>
    </div>
  );
};

const EVStudyView = ({ t }: { t: T }) => {
  const [activeDistrict, setActiveDistrict] = useState<District>(DISTRICT_DATA[10]); // Treptow focus (Fixed Index)
  const sortedDistricts = useMemo<District[]>(
    () => [...DISTRICT_DATA].sort((a, b) => b.ratio - a.ratio),
    []
  );
  const [currentStrategy, setCurrentStrategy] = useState<'equity' | 'balanced' | 'utility'>('equity');
  const allocChartRef = useRef<HTMLCanvasElement | null>(null);
  const paretoChartRef = useRef<HTMLCanvasElement | null>(null);
  const resilienceChartRef = useRef<HTMLCanvasElement | null>(null);
  const allocChartInstanceRef = useRef<any>(null);
  const paretoChartInstanceRef = useRef<any>(null);
  const resilienceChartInstanceRef = useRef<any>(null);

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
      if (allocChartInstanceRef.current) {
        allocChartInstanceRef.current.destroy();
        allocChartInstanceRef.current = null;
      }
      if (paretoChartInstanceRef.current) {
        paretoChartInstanceRef.current.destroy();
        paretoChartInstanceRef.current = null;
      }
      if (resilienceChartInstanceRef.current) {
        resilienceChartInstanceRef.current.destroy();
        resilienceChartInstanceRef.current = null;
      }
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initCharts = () => {
    if (!window.Chart || !allocChartRef.current || !paretoChartRef.current || !resilienceChartRef.current) {
      return;
    }

    const allocCtx = allocChartRef.current.getContext('2d');
    if (!allocCtx) {
      return;
    }
    allocChartInstanceRef.current = new window.Chart(allocCtx, {
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

    const paretoCtx = paretoChartRef.current.getContext('2d');
    if (!paretoCtx) {
      return;
    }
    paretoChartInstanceRef.current = new window.Chart(paretoCtx, {
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

    const resilienceCtx = resilienceChartRef.current.getContext('2d');
    if (!resilienceCtx) {
      return;
    }
    resilienceChartInstanceRef.current = new window.Chart(resilienceCtx, {
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

  const updateStrategy = (stratKey: keyof typeof strategies) => {
    setCurrentStrategy(stratKey);
    const chart = allocChartInstanceRef.current;
    if (chart) {
      chart.data.datasets[0].data = strategies[stratKey].data;
      chart.update();
    }
  };

  return (
    <div className="page-fade-in">
      {/* Header / Abstract */}
      <header className="bg-slate-900 text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <span className="inline-block bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3 shadow-lg">
                {t.ev.header_badge}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                {t.ev.header_title}
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                {t.ev.header_subtitle}
              </p>
            </div>
            <div className="mt-6 md:mt-0 text-right hidden md:block">
              <p className="text-sm text-slate-400">{t.ev.header_authors_label}</p>
              <p className="font-semibold">{t.ev.header_author_1}</p>
              <p className="font-semibold">{t.ev.header_author_2}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 border-t border-slate-700 pt-8 mt-8">
            <div>
              <h3 className="text-teal-400 font-bold mb-2">{t.ev.header_problem_t}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{t.ev.header_problem_p}</p>
            </div>
            <div>
              <h3 className="text-teal-400 font-bold mb-2">{t.ev.header_method_t}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{t.ev.header_method_p}</p>
            </div>
            <div>
              <h3 className="text-teal-400 font-bold mb-2">{t.ev.header_result_t}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{t.ev.header_result_p}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6 space-y-16">

        {/* SECTION 1: THE DIAGNOSIS (Interactive District Map) */}
        <section id="diagnosis">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.ev.diagnosis_title}</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t.ev.diagnosis_intro}
              <br /><span className="text-sm text-slate-500 italic">{t.ev.diagnosis_hint}</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Interactive List */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <span className="font-bold text-slate-700">{t.ev.district_select_label}</span>
                <span className="text-xs font-semibold bg-red-100 text-red-800 px-2 py-1 rounded">{t.ev.district_congestion_label}</span>
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
                      ? <span className="text-red-600 font-bold">{t.ev.district_high}</span>
                      : <span className="text-green-600 font-bold">{t.ev.district_well}</span>
                    } {activeDistrict.ratio > 28 ? t.ev.district_high_note : t.ev.district_low_note}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="metric-value">{activeDistrict.chargers}</p>
                    <p className="metric-label">{t.ev.metric_chargers}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="metric-value">{activeDistrict.bevs.toLocaleString()}</p>
                    <p className="metric-label">{t.ev.metric_bevs}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-lg col-span-2">
                    <p className="metric-value text-red-600">{activeDistrict.ratio}</p>
                    <p className="metric-label">{t.ev.metric_ratio}</p>
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
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.ev.optimization_title}</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">{t.ev.optimization_intro}</p>
            </div>

            {/* Strategy Controls */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
              <button onClick={() => updateStrategy('equity')} className={`px-6 py-3 rounded-full font-bold transition duration-300 ${currentStrategy === 'equity' ? 'text-white bg-teal-600 shadow-lg' : 'text-slate-600 bg-white border border-slate-300 hover:bg-slate-50'}`}>
                {t.ev.strategy_a}
              </button>
              <button onClick={() => updateStrategy('balanced')} className={`px-6 py-3 rounded-full font-bold transition duration-300 ${currentStrategy === 'balanced' ? 'text-white bg-teal-600 shadow-lg' : 'text-slate-600 bg-white border border-slate-300 hover:bg-slate-50'}`}>
                {t.ev.strategy_b}
              </button>
              <button onClick={() => updateStrategy('utility')} className={`px-6 py-3 rounded-full font-bold transition duration-300 ${currentStrategy === 'utility' ? 'text-white bg-teal-600 shadow-lg' : 'text-slate-600 bg-white border border-slate-300 hover:bg-slate-50'}`}>
                {t.ev.strategy_c}
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Text Context */}
              <div className="lg:col-span-1 space-y-6">
                <div className="card border-t-4 border-teal-500">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{strategies[currentStrategy].title}</h3>
                  <p className="text-slate-600 mb-4">{strategies[currentStrategy].desc}</p>
                  <div className="bg-slate-100 p-4 rounded-lg">
                    <h4 className="font-bold text-sm text-slate-500 uppercase mb-2">{t.ev.key_outcome_label}</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>{t.ev.gini_label}</span>
                        <span className="font-bold text-teal-700">{strategies[currentStrategy].gini}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>{t.ev.focus_label}</span>
                        <span className="font-bold text-slate-700">{strategies[currentStrategy].focus}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Visual Chart */}
              <div className="lg:col-span-2 card">
                <h4 className="text-center font-semibold text-slate-500 mb-4">{t.ev.chart_title}</h4>
                <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3 text-green-700">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">{t.ev.gain_label}</p>
                      <p className="text-xs text-gray-500">{t.ev.gain_sub}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-black text-green-700">{t.ev.gain_metric}</span>
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wide">{t.ev.gain_tag}</span>
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
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.ev.pareto_title}</h2>
              <p className="text-slate-600 mb-6">{t.ev.pareto_intro}</p>
              <div className="card">
                <div className="chart-container" style={{ height: '300px' }}>
                  <canvas ref={paretoChartRef}></canvas>
                </div>
                <p className="text-xs text-center text-slate-400 mt-2">{t.ev.pareto_caption}</p>
              </div>
            </div>

            {/* Resilience Analysis */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t.ev.fuzzy_title}</h2>
              <p className="text-slate-600 mb-6">{t.ev.fuzzy_intro}</p>
              <div className="card">
                <div className="chart-container" style={{ height: '300px' }}>
                  <canvas ref={resilienceChartRef}></canvas>
                </div>
                <p className="text-xs text-center text-slate-400 mt-2">{t.ev.fuzzy_caption}</p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: FUTURE WORK - GRID INTEGRATION */}
        <section id="future-work" className="pt-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900">{t.ev.future_title}</h2>
              <p className="mt-2 text-slate-600 max-w-3xl mx-auto">{t.ev.future_intro}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Card 1 */}
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-lg transition">
                <div className="flex items-start gap-4 mb-2">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-teal-50 text-teal-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{t.ev.future_card1_t}</h3>
                    <p className="text-sm text-slate-600 mt-2">{t.ev.future_card1_p}</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                  <span>{t.ev.future_card1_meta_l}</span>
                  <span className="font-semibold text-teal-700">{t.ev.future_card1_meta_v}</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-lg transition">
                <div className="flex items-start gap-4 mb-2">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-amber-50 text-amber-600">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{t.ev.future_card2_t}</h3>
                    <p className="text-sm text-slate-600 mt-2">{t.ev.future_card2_p}</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                  <span>{t.ev.future_card2_meta_l}</span>
                  <span className="font-semibold text-amber-700">{t.ev.future_card2_meta_v}</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-lg transition">
                <div className="flex items-start gap-4 mb-2">
                  <div className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{t.ev.future_card3_t}</h3>
                    <p className="text-sm text-slate-600 mt-2">{t.ev.future_card3_p}</p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                  <span>{t.ev.future_card3_meta_l}</span>
                  <span className="font-semibold text-indigo-700">{t.ev.future_card3_meta_v}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}

const loadClarity = () => {
  if (typeof window === 'undefined' || window.clarity) {
    return;
  }

  const clarityWindow = window as any;
  clarityWindow.clarity =
    clarityWindow.clarity ||
    function (...args: unknown[]) {
      (clarityWindow.clarity.q = clarityWindow.clarity.q || []).push(args);
    };

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.clarity.ms/tag/t41xxbb71x';
  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
};

const App = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const pageContentRef = useRef<HTMLDivElement | null>(null);

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent === '1') {
      loadClarity();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('site-language', language);
    window.dispatchEvent(
      new CustomEvent('language-change', { detail: language })
    );
  }, [language]);

  useEffect(() => {
    const pageFromHash = (hash: string): PageId | null => {
      switch (hash) {
        case 'about':
          return 'about';
        case 'projects':
          return 'projects';
        case 'philosophy':
          return 'philosophy';
        case 'blog':
          return 'blog';
        case 'contact':
          return 'contact';
        case 'ev-study':
          return 'ev-study';
        case 'privacy':
          return 'privacy';
        default:
          return null;
      }
    };

    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      const page = pageFromHash(hash);
      if (!page) return;
      setCurrentPage((prev) => (page === prev ? prev : page));
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  useEffect(() => {
    const hashFromPage = (page: PageId) => {
      switch (page) {
        case 'about':
          return '#about';
        case 'projects':
          return '#projects';
        case 'philosophy':
          return '#philosophy';
        case 'blog':
          return '#blog';
        case 'contact':
          return '#contact';
        case 'ev-study':
          return '#ev-study';
        case 'privacy':
          return '#privacy';
        default:
          return '';
      }
    };

    const hash = hashFromPage(currentPage);
    if (hash && window.location.hash !== hash) {
      window.history.replaceState(null, '', hash);
    }
    if (!hash && window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    pageContentRef.current?.focus({ preventScroll: true });
    setMenuOpen(false);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setPage={setCurrentPage} t={t} language={language} />;
      case 'about':
        return <AboutView t={t} setPage={setCurrentPage} />;
      case 'projects':
        return <ProjectsView t={t} language={language} />;
      case 'philosophy':
        return <PhilosophyView t={t} language={language} setPage={setCurrentPage} />;
      case 'blog':
        return <BlogView t={t} />;
      case 'contact':
        return <ContactView t={t} />;
      case 'ev-study':
        return <EVStudyView t={t} />;
      case 'privacy':
        return <PrivacyView t={t} language={language} setPage={setCurrentPage} />;
      default:
        return <Home setPage={setCurrentPage} t={t} language={language} />;
    }
  };

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'projects', label: t.nav.projects },
    { id: 'philosophy', label: t.nav.philosophy },
    { id: 'blog', label: t.nav.blog },
    { id: 'contact', label: t.nav.contact }
  ];

  return (
    <div className="min-h-screen bg-white">
      <GlobalStyles />
      <CookieBanner />

      <nav className="sticky top-0 inset-x-0 z-50 w-full glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              type="button"
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-xl font-bold text-gray-800"
            >
              <span className="flex-shrink-0">
                <img
                  src="/imgs/man.jpg"
                  alt="Clifford Ondieki Icon"
                  className="w-11 h-11 rounded-full border-4 border-[#303f9f] shadow-md bg-white object-cover"
                />
              </span>
              <span>
                {t.nav.brand}
                <span className="text-sm font-normal text-[--primary-indigo] ml-1 hidden sm:inline-block">
                  | {t.nav.role}
                </span>
              </span>
            </button>

            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="liquid-pill text-slate-700 hover:text-[--primary-indigo] focus:outline-none focus:ring-2 focus:ring-[--primary-indigo] rounded-lg p-2 transition duration-300"
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    className={menuOpen ? 'hidden' : ''}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                  <path
                    className={menuOpen ? '' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentPage(item.id)}
                  className={`px-3 py-2 rounded-full text-sm transition duration-300 ${
                    currentPage === item.id
                      ? 'liquid-pill-active font-bold'
                      : 'liquid-pill text-gray-700 hover:text-[--primary-indigo] font-medium'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="flex items-center gap-1 ml-4 border-l pl-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`language-toggle text-xs font-semibold py-1 px-3 rounded-full transition whitespace-nowrap ${
                    language === 'en'
                      ? 'active liquid-pill-active'
                      : 'liquid-pill text-gray-700'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('de')}
                  className={`language-toggle text-xs font-semibold py-1 px-3 rounded-full transition whitespace-nowrap ${
                    language === 'de'
                      ? 'active liquid-pill-active'
                      : 'liquid-pill text-gray-700'
                  }`}
                >
                  DE
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={`md:hidden ${menuOpen ? '' : 'hidden'}`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 liquid-card rounded-2xl mt-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCurrentPage(item.id);
                  setMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-full text-base transition duration-300 ${
                  currentPage === item.id
                    ? 'liquid-pill-active font-bold'
                    : 'liquid-pill text-gray-700 hover:text-[--primary-indigo] font-medium'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`language-toggle text-sm font-semibold py-1 px-3 rounded-full whitespace-nowrap transition duration-300 ${
                  language === 'en'
                    ? 'active liquid-pill-active'
                    : 'liquid-pill text-gray-700'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('de')}
                className={`language-toggle text-sm font-semibold py-1 px-3 rounded-full whitespace-nowrap transition duration-300 ${
                  language === 'de'
                    ? 'active liquid-pill-active'
                    : 'liquid-pill text-gray-700'
                }`}
              >
                DE
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div key={currentPage} ref={pageContentRef} tabIndex={-1} className="pt-0 page-fade-in focus:outline-none">
        {renderPage()}
      </div>

      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-card inline-flex items-center justify-center px-5 py-3 rounded-full mb-6">
            <a href="https://www.linkedin.com/in/clifford-ondieki-tpm/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[--highlight-gold] transition duration-300" title="LinkedIn Profile" aria-label="LinkedIn Profile">
              <Linkedin size={28} />
            </a>
          </div>

          <p className="text-gray-400 text-sm mb-4">
            Copyright &copy; {new Date().getFullYear()} {t.nav.brand} | {t.footer.tagline}
          </p>
          <p className="text-xs flex items-center justify-center gap-2">
            <button onClick={() => setCurrentPage('privacy')} className="liquid-pill px-3 py-1 rounded-full text-slate-700 hover:text-slate-900 transition duration-300">
              {t.footer.privacy}
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => setCurrentPage('home')} className="liquid-pill px-3 py-1 rounded-full text-slate-700 hover:text-slate-900 transition duration-300">
              {t.footer.home}
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
