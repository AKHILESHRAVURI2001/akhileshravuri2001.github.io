import React, { useState, useEffect } from 'react';
import { Atom, Radio, Terminal, Menu, X, ArrowUpRight, Cpu } from 'lucide-react';

export default function Navbar({ profile, onParticleToggle, particleCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'stats', 'experience', 'projects', 'skills', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300">
      <div className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
        scrolled
          ? 'glass-panel-glow border-cyan-500/30 px-4 sm:px-6 py-3 shadow-2xl'
          : 'bg-transparent px-2 py-2'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo & Status Indicator */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-colors">
              <Atom className="w-5 h-5 text-higgs-cyan animate-spin-slow group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-cyan-400/10 blur-sm rounded-xl" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base sm:text-lg tracking-wider text-white group-hover:text-higgs-cyan transition-colors">
                  {profile?.shortName || 'AKHILESH RAVURI'}
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-cyan-950/80 text-higgs-cyan border border-cyan-500/30">
                  DevOps
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="text-emerald-400 font-medium">Available for Work</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-xl bg-quantum-surface/70 border border-cyan-500/15 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-higgs-cyan bg-cyan-500/15 font-semibold border border-cyan-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-2 h-0.5 bg-higgs-cyan shadow-[0_0_8px_#00f5ff]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Terminal CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-quantum-dark bg-gradient-to-r from-higgs-cyan to-higgs-neon hover:brightness-110 shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Contact Me</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-quantum-surface/80 border border-cyan-500/30 text-higgs-cyan hover:bg-cyan-500/20 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-cyan-500/20 flex flex-col gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-mono text-slate-300 hover:text-higgs-cyan hover:bg-cyan-500/10 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 rounded-lg text-sm font-mono font-medium text-quantum-dark bg-higgs-cyan"
            >
              INITIALIZE HANDSHAKE
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
