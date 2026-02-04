type SectionHeaderProps = {
  title: string;
  sub: string;
  dark?: boolean;
};

const SectionHeader = ({ title, sub, dark = false }: SectionHeaderProps) => (
  <header className={`py-16 lg:py-20 text-center ${dark ? 'bg-slate-950 text-white' : 'bg-indigo-900 text-white'} relative overflow-hidden`}>
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tighter leading-[0.95]">{title}</h1>
    <p className="text-lg sm:text-xl opacity-90 max-w-4xl mx-auto font-light leading-relaxed">{sub}</p>
  </header>
);

export default SectionHeader;
