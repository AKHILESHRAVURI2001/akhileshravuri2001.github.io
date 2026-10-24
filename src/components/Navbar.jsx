import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
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
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#070b14]/90 backdrop-blur-xl border-b border-slate-800/80 py-3 shadow-lg shadow-black/30'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-display font-extrabold text-lg shadow-md shadow-sky-500/20">
              AR
            </div>
            <div>
              <div className="font-display font-bold text-base sm:text-lg text-white leading-tight">
                {profile?.name || 'Akhilesh Ravuri'}
              </div>
              <div className="text-xs text-slate-400 font-sans">
                {profile?.title || 'DevOps Engineer | Web Developer'}
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-sky-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Download CV Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="./AkhileshRavuri.pdf"
              download="Akhilesh_Ravuri_CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all shadow-md shadow-sky-500/25 hover:shadow-sky-400/40 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-5 bg-[#0a0f1d] border-b border-slate-800 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800 hover:text-sky-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="./AkhileshRavuri.pdf"
              download="Akhilesh_Ravuri_CV.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        )}

      </div>
    </header>
  );
}
