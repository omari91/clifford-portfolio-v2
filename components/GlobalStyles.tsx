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

export default GlobalStyles;
