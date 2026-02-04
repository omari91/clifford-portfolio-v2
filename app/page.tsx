"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
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
import GlobalStyles from '../components/GlobalStyles';
import ProblemSolutionImpact from '../components/ProblemSolutionImpact';
import SectionHeader from '../components/SectionHeader';
import { TRANSLATIONS, type Language, type Translation } from '@/lib/translations';

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

type T = Translation;

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


// --- UTILITY COMPONENTS ---



// --- MAIN VIEWS ---

const Home = ({ setPage, t, language }: { setPage: SetPage; t: T; language: Language }) => {
  const [activeFeatureTile, setActiveFeatureTile] = useState<'research' | 'article'>('research');

  return (
  <div className="page-fade-in">
    {/* HERO */}
    <section className="relative min-h-[100svh] md:min-h-screen flex items-start md:items-center justify-center text-white overflow-hidden py-20 md:py-0">
      <Image
        src="/imgs/website.png"
        alt="Power systems engineer hero background"
        fill
        priority
        quality={60}
        sizes="100vw"
        className="object-cover object-center"
      />
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
                  {i === 0 && <span className="text-indigo-300">&</span>}
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
              <Image src="/imgs/GOAT.jpg" alt="Clifford Ondieki" width={320} height={320} className="rounded-full w-full h-full object-cover shadow-2xl border-8 border-white/10" />
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
            <span key={stack.key} className="inline-flex items-center text-xs sm:text-sm px-3 py-1.5 rounded-full border border-white/20 bg-white/5 ui-lift transition duration-300 hover:bg-white/15 hover:border-white/35 cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 mr-2 ui-pulse" />
              {t.home.tech_stack_labels[stack.key] ?? stack.name}
            </span>
          ))}
        </div>
      </div>
    </section>

    {/* AREAS OF EXPERTISE */}
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
            <h3 className="text-xl font-semibold mb-3">{t.home.sim_title}</h3>
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
                <Image
                  src="/imgs/1769782529906_1.jpg"
                  alt="Featured article cover"
                  width={1400}
                  height={900}
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
                <Image
                  src="/imgs/berlin.png"
                  alt={t.home.research_main_title}
                  width={1400}
                  height={900}
                  sizes="(max-width: 640px) 100vw, 1200px"
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
              <div className="flex items-center bg-white p-3 rounded shadow-sm ui-lift">
                <div className="bg-indigo-100 p-2 rounded mr-3 text-indigo-700 font-bold ui-pulse">VDE</div>
                <span className="text-gray-800 font-medium">{t.home.regulatory_vde}</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded shadow-sm ui-lift">
                <div className="bg-indigo-100 p-2 rounded mr-3 text-indigo-700 font-bold ui-pulse">EnWG</div>
                <span className="text-gray-800 font-medium">{t.home.regulatory_enwg}</span>
              </div>
              <div className="flex items-center bg-white p-3 rounded shadow-sm ui-lift">
                <div className="bg-indigo-100 p-2 rounded mr-3 text-indigo-700 font-bold ui-pulse">IEC</div>
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
                        <Image src={`/imgs/${stack.icon}`} alt={stack.name} width={64} height={64} className="w-full h-full object-contain ui-pulse" />
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
          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 ui-lift">
            <a href="https://www.ieee.org" target="_blank" rel="noopener noreferrer" title="Visit IEEE Website" className="mb-3">
              <Image src="/imgs/ieee.png" alt="IEEE Logo" width={160} height={40} className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_ieee}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 ui-lift">
            <a href="https://www.vdi.de/" target="_blank" rel="noopener noreferrer" title="Visit VDI Website" className="mb-3">
              <Image src="/imgs/VDI.svg" alt="VDI Logo" width={160} height={40} className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_vdi}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 ui-lift">
            <a href="https://www.vde.com/en" target="_blank" rel="noopener noreferrer" title="Visit VDE Website" className="mb-3">
              <Image src="/imgs/VDE.svg" alt="VDE Logo" width={160} height={40} className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_vde}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-blue-100 p-4 rounded-lg shadow-md border border-blue-200 ui-lift">
            <a href="https://www.kiron.ngo" target="_blank" rel="noopener noreferrer" title="Visit Kiron Website" className="mb-3">
              <Image src="/imgs/kiron.svg" alt="Kiron Logo" width={160} height={40} className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_kiron}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 ui-lift">
            <a href="https://www.joinimagine.com" target="_blank" rel="noopener noreferrer" title="Visit Imagine Foundation Website" className="mb-3">
              <Image src="/imgs/imagine.webp" alt="Imagine Foundation Logo" width={160} height={40} className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_imagine}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 ui-lift">
            <a href="https://www.ashoka.org" target="_blank" rel="noopener noreferrer" title="Visit Ashoka Website" className="mb-3">
              <Image src="/imgs/ashoka.png" alt="Ashoka Logo" width={160} height={40} className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_ashoka}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 ui-lift">
            <a href="https://www.alxafrica.com" target="_blank" rel="noopener noreferrer" title="Visit Alx Website" className="mb-3">
              <Image src="/imgs/alx.svg" alt="alx Logo" width={160} height={40} className="h-10 w-auto transition duration-300 hover:opacity-80" />
            </a>
            <p className="text-xs text-gray-600 text-center">{t.home.aff_alx}</p>
          </div>

          <div className="w-48 flex-shrink-0 snap-start flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-gray-200 ui-lift">
            <a href="https://www.ebk.go.ke/" target="_blank" rel="noopener noreferrer" title="Visit EBK Website" className="mb-3">
              <Image src="/imgs/ebk.png" alt="ebk Logo" width={160} height={40} className="h-10 w-auto transition duration-300 hover:opacity-80" />
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
          <h3 className="text-2xl font-semibold mb-4">"Smart Laziness" & Systemic Efficiency</h3>
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
    <section className="py-4 bg-slate-950 text-white border-b border-white/10">
      <div className="section-shell">
        <div className="overflow-hidden">
          <div className="animate-scroll motion-reduce:animate-none hover:[animation-play-state:paused] gap-2">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-2 pr-2">
                <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white ui-lift transition duration-300 hover:bg-white/15 hover:border-white/35">
                  <Award className="w-3.5 h-3.5 mr-1.5 text-yellow-300 ui-pulse" />
                  IEEE Best Paper 2025
                </span>
                <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white ui-lift transition duration-300 hover:bg-white/15 hover:border-white/35">
                  <Cpu className="w-3.5 h-3.5 mr-1.5 text-indigo-300 ui-pulse" />
                  PowerFactory MV/HV Simulation
                </span>
                <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white ui-lift transition duration-300 hover:bg-white/15 hover:border-white/35">
                  <Layers className="w-3.5 h-3.5 mr-1.5 text-blue-300 ui-pulse" />
                  500+ Time-Series Scenarios
                </span>
                <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white ui-lift transition duration-300 hover:bg-white/15 hover:border-white/35">
                  <Shield className="w-3.5 h-3.5 mr-1.5 text-emerald-300 ui-pulse" />
                  VDE-AR-N 4110 / §14a EnWG
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-4 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-sm text-slate-700">
          <span className="font-semibold uppercase tracking-[0.14em] text-[11px] text-slate-500">{t.home.seen_title}</span>
          <p className="m-0">
            {t.home.seen_1} · {t.home.seen_2} · {t.home.seen_3} · {t.home.seen_4}
          </p>
        </div>
      </div>
    </section>
    
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
              <Image
                src="/imgs/GOAT.jpg"
                alt="Clifford Ondieki, The Innovator"
                className="profile-image mb-3"
                width={300}
                height={340}
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
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md text-center" style={{ borderBottom: "4px solid var(--primary-indigo)" }}>
            <div className="flex items-center justify-center space-x-3 mb-2">
              <span style={{ color: "var(--highlight-gold)" }}>
                <Cpu className="w-5 h-5" />
              </span>
              <h5 className="text-xl font-semibold text-gray-800">{t.about.stars_card1_t}</h5>
            </div>
            <p className="text-[--neutral-charcoal]">{t.about.stars_card1_p}</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md text-center" style={{ borderBottom: "4px solid var(--primary-indigo)" }}>
            <div className="flex items-center justify-center space-x-3 mb-2">
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
                    <Image
                      src={endorsement.image}
                      alt={endorsement.alt}
                      width={64}
                      height={64}
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
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => setPage('contact')} className="btn-cta btn-cta-light inline-flex items-center justify-center">
            {t.about.outlook_button} <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <button onClick={() => setPage('blog')} className="btn-cta btn-cta-outline inline-flex items-center justify-center">
            {t.about.outlook_insights_button} <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
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

    <section className="py-3 bg-slate-900 text-slate-100 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {[t.home.cred_1, t.home.cred_2, t.home.cred_3, t.home.cred_4].map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] sm:text-xs font-semibold tracking-[0.02em] text-slate-100 ui-lift"
            >
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-300 motion-safe:animate-pulse-soft" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>

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
                  <div className="text-center ui-lift">
                    <div className="text-3xl font-bold text-indigo-800">13%</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p4_stat_1_label}</p>
                  </div>
                  <div className="text-center ui-lift">
                    <div className="text-3xl font-bold text-indigo-800">6x</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p4_stat_2_label}</p>
                  </div>
                  <div className="text-center ui-lift">
                    <div className="text-3xl font-bold text-indigo-800">21%</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p4_stat_3_label}</p>
                  </div>
                </div>
              </div>
              
              <div className="min-h-[400px] flex flex-col gap-6">
                <Image src="/imgs/berlin.png" alt="Berlin EV Charger Distribution" width={1200} height={675} className="w-full h-64 object-cover rounded-lg shadow-lg border border-gray-200" />
                
                <div className="bg-gray-50 p-5 rounded-xl shadow-inner border border-gray-200">
                  <h5 className="text-lg font-bold text-gray-800 mb-2">{t.projects.p4_side_title}</h5>
                  <p className="text-sm text-gray-600 mb-4">{t.projects.p4_side_p}</p>
                  <button onClick={() => window.location.hash = 'ev-study'} className="btn-cta btn-cta-sm btn-cta-primary btn-cta-block mb-4">
                    {ctaCaseStudy}
                  </button>
                </div>
                
                <Image src="/imgs/Cert best.png" alt="IEEE Best Paper Award Certificate" width={1200} height={675} className="w-full h-auto rounded-lg shadow-lg border border-gray-200" />
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
                <Image src="/imgs/wind farm.jpg" alt="Kinangop Wind Integration" width={1200} height={675} className="w-full h-64 object-cover rounded-lg shadow-lg border border-gray-200" />
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
                  <div className="text-center ui-lift">
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
                  <Image src="/imgs/geothermal-drilling-activities.jpg" alt="Predictive Maintenance AI" width={1200} height={675} className="w-full h-48 object-cover rounded-lg shadow-lg border border-gray-200" />
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
                  <div className="text-center ui-lift">
                    <div className="text-2xl font-bold text-indigo-800">40%</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p6_stat_1_label}</p>
                  </div>
                  <div className="text-center ui-lift">
                    <div className="text-2xl font-bold text-indigo-800">$2M</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.p6_stat_2_label}</p>
                  </div>
                  <div className="text-center ui-lift">
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
                  <Image src="https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Health Tech Load Balancing" width={1200} height={675} unoptimized className="w-full h-48 object-cover rounded-lg shadow-lg border border-gray-200" />
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
                  <div className="text-center ui-lift">
                    <div className="text-2xl font-bold text-indigo-800">50%</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.health_stat_1_label}</p>
                  </div>
                  <div className="text-center ui-lift">
                    <div className="text-2xl font-bold text-indigo-800">30%</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.health_stat_2_label}</p>
                  </div>
                  <div className="text-center ui-lift">
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
                <Image src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Climate Tech Advisory" width={1200} height={675} unoptimized className="w-full h-auto rounded-lg shadow-lg border border-gray-200 object-cover mb-4" />
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
                  <div className="text-center ui-lift">
                    <div className="text-3xl font-bold text-indigo-800">5+</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.climate_stat_1_label}</p>
                  </div>
                  <div className="text-center ui-lift">
                    <div className="text-3xl font-bold text-indigo-800">2</div>
                    <p className="text-xs text-gray-500 font-medium">{t.projects.climate_stat_2_label}</p>
                  </div>
                  <div className="text-center ui-lift">
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
                      <Image src="/imgs/saas.png" alt="Advanced Grid Optimization Preview" width={1200} height={675} className="w-full h-64 object-cover rounded-lg shadow-lg" />
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
                      <Image src="/imgs/iot.png" alt="Industrial IoT Platform Preview" width={1200} height={675} className="w-full h-64 object-cover rounded-lg shadow-lg" />
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
              <form
                action="https://formspree.io/f/xoqooyrz"
                method="POST"
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <input type="hidden" name="_subject" defaultValue="Newsletter signup - cliffordomari.com" />
                <input type="text" name="_gotcha" defaultValue="" className="hidden" tabIndex={-1} autoComplete="off" />
                <input
                  type="email"
                  name="email"
                  defaultValue=""
                  required
                  placeholder={t.blog.newsletter_placeholder}
                  aria-label={t.blog.newsletter_placeholder}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full sm:w-80"
                />
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
                <Image
                  src="/imgs/man.jpg"
                  alt="Clifford Ondieki Icon"
                  width={44}
                  height={44}
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
                className="liquid-pill text-slate-700 hover:text-[--primary-indigo] focus:outline-none focus:ring-2 focus:ring-[--primary-indigo] rounded-lg p-2 transition duration-300 ui-lift"
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
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
                  className={`px-3 py-2 rounded-full text-sm transition duration-300 ui-lift ${
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
                  className={`language-toggle text-xs font-semibold py-1 px-3 rounded-full transition whitespace-nowrap ui-lift ${
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
                  className={`language-toggle text-xs font-semibold py-1 px-3 rounded-full transition whitespace-nowrap ui-lift ${
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
                className={`block w-full text-left px-3 py-2 rounded-full text-base transition duration-300 ui-lift ${
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
                className={`language-toggle text-sm font-semibold py-1 px-3 rounded-full whitespace-nowrap transition duration-300 ui-lift ${
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
                className={`language-toggle text-sm font-semibold py-1 px-3 rounded-full whitespace-nowrap transition duration-300 ui-lift ${
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

      <div id="main-content" key={currentPage} ref={pageContentRef} tabIndex={-1} className="pt-0 page-fade-in focus:outline-none">
        {renderPage()}
      </div>

      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="liquid-card inline-flex items-center justify-center gap-4 px-5 py-3 rounded-full mb-6">
            <a href="https://www.linkedin.com/in/clifford-ondieki-tpm/" target="_blank" rel="noreferrer" className="group text-black hover:text-[--highlight-gold] ui-lift transition duration-300" title="LinkedIn Profile" aria-label="LinkedIn Profile">
              <Linkedin size={28} className="ui-pulse transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105" />
            </a>
            <a href="https://github.com/omari91" target="_blank" rel="noreferrer" className="group text-black hover:text-[--highlight-gold] ui-lift transition duration-300" title="GitHub Profile" aria-label="GitHub Profile">
              <Github size={28} className="ui-pulse transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105" />
            </a>
          </div>

          <p className="text-gray-300 text-sm mb-4">
            Copyright &copy; {new Date().getFullYear()} {t.nav.brand} | {t.footer.tagline}
          </p>
          <p className="text-xs flex items-center justify-center gap-2">
            <button onClick={() => setCurrentPage('privacy')} className="liquid-pill px-3 py-1 rounded-full text-slate-700 hover:text-slate-900 transition duration-300 ui-lift">
              {t.footer.privacy}
            </button>
            <span className="text-gray-600">|</span>
            <button onClick={() => setCurrentPage('home')} className="liquid-pill px-3 py-1 rounded-full text-slate-700 hover:text-slate-900 transition duration-300 ui-lift">
              {t.footer.home}
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
