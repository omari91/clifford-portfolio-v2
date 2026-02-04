"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Language = "en" | "de";
type ChatRole = "user" | "assistant";
type Audience = "general" | "engineer" | "recruiter" | "researcher";
type Confidence = "low" | "medium" | "high";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  links?: Array<{ label: string; href: string }>;
};

type FaqMatch = {
  keywords: string[];
  answer: Record<Language, string>;
  links?: Array<{ label: Record<Language, string>; href: string }>;
};

const FAQ_MATCHES: FaqMatch[] = [
  {
    keywords: ["who are you", "who is this", "introduce yourself", "wer bist du"],
    answer: {
      en: "I am Clifford Ondieki, a power systems engineer focused on grid planning, simulation, and data-driven optimization.",
      de: "Ich bin Clifford Ondieki, Power-Systems-Ingenieur mit Fokus auf Netzplanung, Simulation und datengetriebene Optimierung.",
    },
    links: [{ label: { en: "Open About", de: "Über mich öffnen" }, href: "#about" }],
  },
  {
    keywords: ["what do you do", "background", "engineer or researcher", "where are you based", "was machst du"],
    answer: {
      en: "I work at the intersection of power systems engineering and applied research, currently based in Berlin.",
      de: "Ich arbeite an der Schnittstelle von Power-Systems-Engineering und angewandter Forschung, aktuell in Berlin.",
    },
    links: [{ label: { en: "Open About", de: "Über mich öffnen" }, href: "#about" }],
  },
  {
    keywords: ["help", "what can you do", "assist", "hilfe", "kannst du"],
    answer: {
      en: "I can answer high-signal questions about projects, technical focus, IEEE research, and collaboration options.",
      de: "Ich beantworte präzise Fragen zu Projekten, technischem Fokus, IEEE-Forschung und Zusammenarbeit.",
    },
  },
  {
    keywords: ["project", "portfolio", "work", "case study", "what have you built", "projekt"],
    answer: {
      en: "My project portfolio covers grid simulation, optimization, and practical delivery outcomes with measurable impact.",
      de: "Mein Projektportfolio zeigt Netzsimulation, Optimierung und praktische Ergebnisse mit messbarem Impact.",
    },
    links: [{ label: { en: "Open Projects", de: "Projekte öffnen" }, href: "#projects" }],
  },
  {
    keywords: ["about", "journey", "experience", "über"],
    answer: {
      en: "You can explore my background, engineering journey, and cross-domain experience in the About section.",
      de: "Im Bereich „Über mich“ siehst du meinen Hintergrund, meinen Engineering-Weg und meine Erfahrungen.",
    },
    links: [{ label: { en: "Open About", de: "Über mich öffnen" }, href: "#about" }],
  },
  {
    keywords: ["contact", "email", "phone", "hire", "reach", "can we talk", "work with you", "consulting", "collaboration", "kontakt"],
    answer: {
      en: "Yes - I am open to collaboration and role conversations. The contact section is the best next step.",
      de: "Ja - ich bin offen für Zusammenarbeit und Rollen-Gespräche. Der Kontaktbereich ist der beste nächste Schritt.",
    },
    links: [{ label: { en: "Open Contact", de: "Kontakt öffnen" }, href: "#contact" }],
  },
  {
    keywords: ["skill", "skills", "tech", "tool", "python", "powerfactory", "aws", "kompetenz", "specialize", "what problems do you solve"],
    answer: {
      en: "I specialize in grid planning under uncertainty: EVs, renewables, and power-electronics-heavy systems using simulation, optimization, and automation.",
      de: "Ich spezialisiere mich auf Netzplanung unter Unsicherheit: EVs, Erneuerbare und leistungselektroniklastige Systeme mit Simulation, Optimierung und Automatisierung.",
    },
    links: [{ label: { en: "View Skills", de: "Skills ansehen" }, href: "#home" }],
  },
  {
    keywords: ["award", "ieee", "paper", "research", "publication", "forschung", "auszeichnung", "doi"],
    answer: {
      en: "Yes—there’s an IEEE publication highlight and a full EV grid integration case study.",
      de: "Ja—es gibt ein IEEE-Publikations-Highlight und eine vollständige EV-Integrations-Case-Study.",
    },
    links: [{ label: { en: "Open EV Study", de: "EV-Studie öffnen" }, href: "#ev-study" }],
  },
  {
    keywords: ["digital twin", "real projects", "industry", "utility", "dso", "tso", "practical or academic"],
    answer: {
      en: "The work is practical, not only academic - grounded in real grid data, planning constraints, and operational workflows.",
      de: "Die Arbeit ist praktisch, nicht nur akademisch - basierend auf realen Netzdaten, Planungsgrenzen und operativen Workflows.",
    },
    links: [{ label: { en: "Open Projects", de: "Projekte öffnen" }, href: "#projects" }],
  },
  {
    keywords: ["powerfactory", "load flow", "hosting capacity", "dynamic simulation", "rms", "emt", "n-1", "hvdc", "statcom", "grid congestion", "ev charging impact"],
    answer: {
      en: "In many MV networks, voltage rise is the real limiter before thermal limits. Time-series and dynamic studies usually reveal more usable capacity than static assumptions.",
      de: "In vielen MV-Netzen ist Spannungsanhebung der echte Engpass vor thermischen Grenzen. Zeitreihen- und Dynamikstudien zeigen meist mehr nutzbare Kapazität als statische Annahmen.",
    },
    links: [{ label: { en: "Open EV Study", de: "EV-Studie öffnen" }, href: "#ev-study" }],
  },
  {
    keywords: ["what makes you different", "edge", "why data driven", "why not build more grid", "different approach"],
    answer: {
      en: "My edge is combining engineering realism with time-series thinking: use data and automation first, and only expand CAPEX where it is truly needed.",
      de: "Mein Vorteil ist die Kombination aus Engineering-Realismus und Zeitreihen-Denken: erst Daten und Automatisierung nutzen, CAPEX nur dort erhöhen, wo es wirklich nötig ist.",
    },
  },
  {
    keywords: ["what should i do next", "where do i start", "next step", "how do i get in touch"],
    answer: {
      en: "Best next step: scan the projects quickly, then reach out if one maps to your current challenge or role scope.",
      de: "Bester nächster Schritt: kurz die Projekte ansehen und dann melden, wenn eines zu deiner aktuellen Herausforderung oder Rolle passt.",
    },
    links: [
      { label: { en: "View Projects", de: "Projekte ansehen" }, href: "#projects" },
      { label: { en: "Contact Clifford", de: "Kontakt" }, href: "#contact" },
    ],
  },
  {
    keywords: ["is this ai", "automated", "how accurate", "are answers automated", "ist das ai"],
    answer: {
      en: "This chat uses curated rule-based responses drawn from my projects and publications. No generative AI is used here.",
      de: "Dieser Chat nutzt kuratierte, regelbasierte Antworten aus meinen Projekten und Publikationen. Es wird hier keine generative KI verwendet.",
    },
  },
];

const QUICK_PROMPTS: Record<Language, string[]> = {
  en: ["What can you help with?", "What are your core skills?", "Tell me about IEEE research", "Surprise me"],
  de: ["Wobei kannst du helfen?", "Was sind deine Kernkompetenzen?", "Erzähl mir etwas zur IEEE-Forschung", "Überrasch mich"],
};

const FUN_FACTS: Record<Language, string[]> = {
  en: [
    "Fun fact: Hosting capacity is often limited by voltage rise, not thermal limits.",
    "Fun fact: Most “overloads” exist for a tiny fraction of the year, but we still size for them.",
    "Fun fact: The fastest grid upgrade I’ve seen wasn’t copper, it was a small Python automation.",
    "Fun fact: One conversation at CWIEME Berlin helped shape my IEEE-published work.",
    "Fun fact: If grid models breathed, they’d inhale at night and exhale at noon.",
  ],
  de: [
    "Fun Fact: Hosting Capacity wird oft durch Spannungsanhebung begrenzt, nicht durch Thermik.",
    "Fun Fact: Viele „Überlasten“ treten nur für einen winzigen Teil des Jahres auf, aber wir dimensionieren trotzdem dafür.",
    "Fun Fact: Das schnellste Netz-Upgrade, das ich erlebt habe, war nicht Kupfer, sondern ein kleines Python-Skript.",
    "Fun Fact: Ein Gespräch auf der CWIEME Berlin hat meine IEEE-Publikation mitgeprägt.",
    "Fun Fact: Wenn Netzmodelle atmen würden, würden sie nachts einatmen und mittags ausatmen.",
  ],
};

const QUOTES: Record<Language, string[]> = {
  en: [
    "Grid planning isn’t about predicting peaks - it’s about staying safe when uncertainty shows up.",
    "Most grid constraints are temporary. Planning fails when we treat them as permanent.",
    "Automation doesn’t replace engineering judgment - it scales it.",
  ],
  de: [
    "Netzplanung heißt nicht, Spitzen vorherzusagen - sondern bei Unsicherheit innerhalb sicherer Grenzen zu bleiben.",
    "Viele Netzengpässe sind zeitlich, nicht dauerhaft. Planung scheitert, wenn man das ignoriert.",
    "Automatisierung ersetzt kein Engineering-Urteil - sie skaliert es.",
  ],
};
const QUOTE_SEED = 7;
const FUN_SEED = 13;
const MAX_CHAT_MESSAGES = 24;

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pickFrom<T>(arr: T[], seed: number) {
  if (arr.length === 0) throw new Error("Cannot pick from empty array");
  return arr[seed % arr.length];
}

function detectAudience(normalized: string): Audience {
  if (
    normalized.includes("role") ||
    normalized.includes("hire") ||
    normalized.includes("recruit") ||
    normalized.includes("job") ||
    normalized.includes("position")
  ) {
    return "recruiter";
  }
  if (
    normalized.includes("ieee") ||
    normalized.includes("paper") ||
    normalized.includes("publication") ||
    normalized.includes("research") ||
    normalized.includes("doi")
  ) {
    return "researcher";
  }
  if (
    normalized.includes("grid") ||
    normalized.includes("ev") ||
    normalized.includes("powerfactory") ||
    normalized.includes("model") ||
    normalized.includes("simulation")
  ) {
    return "engineer";
  }
  return "general";
}

function inferConfidence(params: {
  isFunFact: boolean;
  matched: FaqMatch | undefined;
  hasEgg: boolean;
}): Confidence {
  if (params.matched?.links?.length) return "high";
  if (params.isFunFact || params.matched || params.hasEgg) return "medium";
  return "low";
}

function getWelcome(language: Language, id: string): ChatMessage {
  return {
    id,
    role: "assistant",
    text:
      language === "de"
        ? "Hi! Ich bin Cliffords VA. Frag mich zu Projekten, Skills, Forschung oder Kontakt."
        : "Hi! I’m Clifford’s VA . Ask me about projects, skills, research, or contact.",
  };
}

function buildEasterEgg(normalized: string, language: Language): string | null {
  // Context-aware, short and classy
  if (normalized.includes("ev") || normalized.includes("charging") || normalized.includes("charger") || normalized.includes("laden")) {
    return language === "de"
      ? "EVs sind mein Lieblings-Planungsproblem. Wenn du willst, können wir tiefer in Szenarien und Netzgrenzen gehen."
      : "EVs are my favorite planning headache. If you want, we can go deeper into scenarios and grid constraints.";
  }

  if (normalized.includes("powerfactory") || normalized.includes("digsilent")) {
    return language === "de"
      ? "PowerFactory-Note: In RMS-Studien steckt oft mehr „versteckte“ Kapazität, wenn man Zeitreihen sauber modelliert."
      : "PowerFactory note: RMS studies often reveal more “hidden” capacity once time series are modeled properly.";
  }

  if (normalized.includes("ai") || normalized.includes("künstliche intelligenz") || normalized.includes("ki")) {
    return language === "de"
      ? "Ich nutze KI dort, wo sie Planungs-Klarheit, Risikotransparenz und bessere Entscheidungen ermöglicht."
      : "I use AI where it improves planning clarity, risk visibility, and decision quality.";
  }

  return null;
}

function buildSurprise(language: Language): string {
  return language === "de"
    ? "Okay: Dynamische Hosting-Capacity kann je nach Netz 10–30% mehr Anschlusskapazität freilegen, ohne neue Umspannwerke, wenn Curtailment und Zeitreihen sauber umgesetzt werden."
    : "Okay: Dynamic hosting capacity can unlock ~10–30% more grid capacity (network-dependent) without new substations, if curtailment and time-series modeling are done right.";
}

function buildSoftClose(language: Language): ChatMessage {
  return {
    id: "m-softclose",
    role: "assistant",
    text:
      language === "de"
        ? "Hat das geholfen? Wenn du tiefer einsteigen willst, schau gern in die Projekte oder melde dich direkt."
        : "Did this help? If you’d like to go deeper, feel free to check the projects or reach out.",
  };
}

function buildResponse(
  query: string,
  language: Language,
  id: string,
  opts: { interactionCount: number; funFactSeed: number }
): { message: ChatMessage; confidence: Confidence; audience: Audience } {
  const normalized = normalize(query);
  const audience = detectAudience(normalized);

  // Gentle commands
  const isFunFact =
    normalized.includes("fun fact") ||
    normalized.includes("surprise") ||
    normalized.includes("surprise me") ||
    normalized.includes("überrasch") ||
    normalized.includes("zeig mir was cooles") ||
    normalized.includes("show me something cool") ||
    normalized.includes("grid fun");

  if (isFunFact) {
    const fun = pickFrom(FUN_FACTS[language], opts.funFactSeed);
    const extra = buildSurprise(language);
    return { message: { id, role: "assistant", text: `${fun}\n\n${extra}` }, confidence: "medium", audience };
  }

  // Classic FAQ matching
  const matched = FAQ_MATCHES.find((item) => item.keywords.some((k) => normalized.includes(k)));

  // Context-aware micro response (only if relevant)
  const egg = buildEasterEgg(normalized, language);
  const confidence = inferConfidence({ isFunFact, matched, hasEgg: !!egg });

  if (!matched) {
    const audienceHint =
      audience === "engineer"
        ? language === "de"
          ? "Ich helfe am besten bei Grid Integration, EV-Planung und PowerFactory."
          : "I am best for grid integration, EV planning, and PowerFactory topics."
        : audience === "recruiter"
          ? language === "de"
            ? "Ich helfe besonders bei Rollen-Fit, Projekteinblicken und Zusammenarbeit."
            : "I can best help with role fit, project impact, and collaboration scope."
          : audience === "researcher"
            ? language === "de"
              ? "Ich kann Forschungskontext, IEEE-Themen und Methodik zusammenfassen."
              : "I can summarize research context, IEEE topics, and methodology."
            : "";

    // After 3–4 interactions, add a tiny hint + keep it calm
    const nudge =
      opts.interactionCount >= 3
        ? language === "de"
          ? "Tipp: Frag z.B. nach „Projects“, „PowerFactory“, „IEEE“, oder „Contact“."
          : "Tip: Try asking about “Projects”, “PowerFactory”, “IEEE”, or “Contact”."
        : language === "de"
          ? "Teste Fragen zu Projekten, Skills, Forschung oder Kontakt."
          : "Try asking about projects, skills, research, or contact.";

    const combined = [nudge, audienceHint, egg].filter(Boolean).join("\n\n");

    return { message: { id, role: "assistant", text: combined }, confidence, audience };
  }

  const base = matched.answer[language];
  const combined = egg ? `${base}\n\n${egg}` : base;

  return {
    message: {
      id,
      role: "assistant",
      text: combined,
      links:
        confidence === "high"
          ? matched.links?.map((link) => ({ label: link.label[language], href: link.href }))
          : undefined,
    },
    confidence,
    audience,
  };
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [messages, setMessages] = useState<ChatMessage[]>([getWelcome("en", "m-0")]);
  const [input, setInput] = useState("");
  const messageIdRef = useRef(1);
  const nextMessageId = () => {
    const id = `m-${messageIdRef.current}`;
    messageIdRef.current += 1;
    return id;
  };

  // Counts user turns (keeps “fun fact” from feeling gimmicky)
  const [userTurns, setUserTurns] = useState(0);
  const [nudgeOpen, setNudgeOpen] = useState(false);
  const [nudgeDone, setNudgeDone] = useState(false);

  const clampMessages = (items: ChatMessage[]) => {
    const withoutNotice = items.filter((m) => m.id !== "m-history-trimmed");
    if (withoutNotice.length <= MAX_CHAT_MESSAGES) return withoutNotice;

    const trimNotice: ChatMessage = {
      id: "m-history-trimmed",
      role: "assistant",
      text:
        language === "de"
          ? "Hinweis: Der Chatverlauf wurde gekuerzt, damit das Fenster kompakt bleibt."
          : "Note: Older messages were trimmed to keep the chat compact.",
    };

    const tail = withoutNotice.slice(-(MAX_CHAT_MESSAGES - 1));
    return [trimNotice, ...tail];
  };

  // Auto-scroll
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    const stored = localStorage.getItem("site-language");
    if (stored === "de" || stored === "en") setLanguage(stored);

    const handleLanguageChange = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === "de" || detail === "en") setLanguage(detail);
    };

    window.addEventListener("language-change", handleLanguageChange);
    return () => window.removeEventListener("language-change", handleLanguageChange);
  }, []);

  // If language changes, keep conversation but ensure welcome exists in that language if it’s the only message.
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0]?.id === "m-0") return [getWelcome(language, "m-0")];
      if (prev.some((m) => m.id === "m-history-trimmed")) {
        const withoutNotice = prev.filter((m) => m.id !== "m-history-trimmed");
        const trimNotice: ChatMessage = {
          id: "m-history-trimmed",
          role: "assistant",
          text:
            language === "de"
              ? "Hinweis: Der Chatverlauf wurde gekuerzt, damit das Fenster kompakt bleibt."
              : "Note: Older messages were trimmed to keep the chat compact.",
        };
        if (withoutNotice.length >= MAX_CHAT_MESSAGES) {
          return [trimNotice, ...withoutNotice.slice(-(MAX_CHAT_MESSAGES - 1))];
        }
        return [trimNotice, ...withoutNotice];
      }
      return prev;
    });
  }, [language]);

  const prompts = useMemo(() => QUICK_PROMPTS[language], [language]);

  const maybeAppendSoftClose = (turns: number) => {
    // Add a gentle close after 4 user turns (once).
    if (turns === 4) {
      setMessages((prev) => {
        // avoid duplicates
        if (prev.some((m) => m.id === "m-softclose")) return prev;
        return clampMessages([...prev, buildSoftClose(language)]);
      });
    }
  };

  const maybeOpenDecisionNudge = (turns: number, confidence: Confidence) => {
    if (turns >= 3 && confidence === "high" && !nudgeDone) {
      setNudgeOpen(true);
    }
  };

  const maybeAppendFunFactAtEnd = (turns: number) => {
    // Only add a fun fact after 4+ turns, and only once, and only if user didn’t explicitly request it already.
    if (turns >= 4) {
      const fun = pickFrom(FUN_FACTS[language], FUN_SEED + turns);
      setMessages((prev) => {
        const alreadyExplicit = prev.some((m) => m.text.toLowerCase().includes("fun fact"));
        const exists = prev.some((m) => m.id === "m-funfact");
        if (alreadyExplicit || exists) return prev;
        return clampMessages([
          ...prev,
          {
            id: "m-funfact",
            role: "assistant",
            text: fun,
          },
        ]);
      });
    }
  };

  const ask = (query: string) => {
    const clean = query.trim();
    if (!clean) return;

    const userMessage: ChatMessage = { id: nextMessageId(), role: "user", text: clean };

    const result = buildResponse(clean, language, nextMessageId(), {
      interactionCount: userTurns,
      funFactSeed: FUN_SEED + messageIdRef.current,
    });

    const newTurns = userTurns + 1;

    setMessages((prev) => clampMessages([...prev, userMessage, result.message]));
    setInput("");
    setUserTurns(newTurns);
    maybeOpenDecisionNudge(newTurns, result.confidence);

    maybeAppendSoftClose(newTurns);
  };

  const handleDecisionNudge = (mode: "active" | "explore") => {
    setNudgeOpen(false);
    setNudgeDone(true);
    setMessages((prev) => clampMessages([
      ...prev,
      {
        id: nextMessageId(),
        role: "assistant",
        text:
          mode === "active"
            ? language === "de"
              ? "Super. Wenn das ein aktuelles Thema ist, sind die nächsten zwei sinnvollen Schritte: kurzer Projektblick oder direktes Gespräch."
              : "Great. If this is active work, the next useful step is a quick project scan or a short conversation."
            : language === "de"
              ? "Perfekt. Dann ist ein kurzer Überblick über Projekte meist der beste Einstieg."
              : "Perfect. Then a quick project overview is usually the best next step.",
        links: [
          { label: language === "de" ? "Projekte ansehen" : "View Projects", href: "#projects" },
          { label: language === "de" ? "Kontakt" : "Contact Clifford", href: "#contact" },
        ],
      },
    ]));
  };

  const handleClose = () => {
    // If someone had a real chat, end with a small fun fact (warm, not salesy)
    maybeAppendFunFactAtEnd(userTurns);
    setOpen(false);
  };

  const quote = useMemo(() => {
    return pickFrom(QUOTES[language], QUOTE_SEED);
  }, [language]);

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-[60]">
      {open && (
        <div className="w-[calc(100vw-1.5rem)] max-w-[340px] sm:max-w-[380px] liquid-card rounded-2xl shadow-2xl overflow-hidden mb-3">
          <div className="flex items-center justify-between px-4 py-3 liquid-pill">
            <div className="font-semibold text-sm">Clifford AI</div>
            <button
              type="button"
              onClick={handleClose}
              className="text-slate-600 hover:text-slate-900 text-xs transition duration-300"
            >
              {language === "de" ? "Schließen" : "Close"}
            </button>
          </div>

          <div className="px-3 py-3">
            <div
              ref={scrollRef}
              className="max-h-[320px] overflow-y-auto space-y-2 pr-1 custom-scrollbar"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={message.role === "user" ? "text-right" : "text-left"}
                >
                  <div
                    className={`inline-block max-w-[90%] whitespace-pre-line rounded-xl px-3 py-2 text-sm ${
                      message.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "liquid-pill text-slate-700"
                    }`}
                  >
                    {message.text}
                  </div>

                  {!!message.links?.length && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {message.links.map((link) => (
                        <a
                          key={`${message.id}-${link.href}-${link.label}`}
                          href={link.href}
                          className="rounded-full liquid-pill px-3 py-1 text-xs font-semibold text-slate-700 ui-lift"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {userTurns === 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {prompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => ask(prompt)}
                    className="rounded-full liquid-pill px-3 py-1 text-xs font-semibold text-slate-700 ui-lift"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <form
              className="mt-3 flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                ask(input);
              }}
            >
              <label htmlFor="faq-chat-input" className="sr-only">
                {language === "de" ? "Frage eingeben" : "Enter your question"}
              </label>
              <input
                id="faq-chat-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={language === "de" ? "Frage stellen..." : "Ask a question..."}
                className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
              />
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 text-white px-3 py-2 text-sm font-semibold disabled:opacity-50"
                disabled={!input.trim()}
              >
                {language === "de" ? "Senden" : "Send"}
              </button>
            </form>

            {nudgeOpen && (
              <div className="mt-3 rounded-xl liquid-pill px-3 py-2 text-xs text-slate-700 space-y-2">
                <p>
                  {language === "de"
                    ? "Ist das etwas, woran du gerade aktiv arbeitest?"
                    : "Is this something you are actively working on right now?"}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleDecisionNudge("active")}
                    className="rounded-full liquid-pill px-3 py-1 font-semibold ui-lift"
                  >
                    {language === "de" ? "Ja, aktuelles Projekt" : "Yes, current project"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDecisionNudge("explore")}
                    className="rounded-full liquid-pill px-3 py-1 font-semibold ui-lift"
                  >
                    {language === "de" ? "Nur am Erkunden" : "Just exploring"}
                  </button>
                </div>
              </div>
            )}

            {userTurns >= 2 && (
              <div className="mt-3 rounded-xl liquid-pill px-3 py-2 text-[11px] text-slate-600">
                <span className="font-semibold">{language === "de" ? "Zitat:" : "Quote:"}</span>{" "}
                {quote}
              </div>
            )}

            <div className="mt-2 text-[11px] text-slate-500">
              {language === "de"
                ? "Antworten sind kuratiert aus realen Netzprojekten und begutachteter Forschung. Quellen auf Anfrage."
                : "Responses are curated from real grid projects and peer-reviewed research. Sources available on request."}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full liquid-pill-active px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base shadow-lg transition duration-300"
      >
        {open ? (language === "de" ? "Chat ausblenden" : "Hide Chat") : "Chat"}
      </button>
    </div>
  );
}
