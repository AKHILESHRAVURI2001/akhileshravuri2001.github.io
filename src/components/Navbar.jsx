import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPos = window.scrollY + 220;

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
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pointer-events-none transition-all duration-300">
      <div
        className={`relative overflow-hidden pointer-events-auto mx-auto transition-all duration-500 ease-out rounded-2xl border ${
          scrolled
            ? 'max-w-5xl bg-[#070b14]/85 backdrop-blur-2xl border-slate-700/70 py-2.5 px-4 sm:px-5 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.65),0_0_25px_-5px_rgba(56,189,248,0.14)]'
            : 'max-w-6xl bg-[#070b14]/70 backdrop-blur-xl border-slate-800/75 py-3 px-4 sm:px-6 shadow-[0_8px_30px_rgb(0,0,0,0.4)]'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group min-w-0">
            <div className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 flex items-center justify-center text-slate-950 font-display font-extrabold text-base shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
              AR
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#070b14]" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-bold text-sm sm:text-base text-white leading-tight truncate group-hover:text-sky-300 transition-colors">
                {profile?.name || 'Akhilesh Ravuri'}
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-tight truncate">
                DevOps &amp; Full-Stack Engineer
              </div>
            </div>
          </a>

          {/* Desktop Floating Pill Nav Items */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-slate-800/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'bg-sky-500/15 text-sky-300 font-semibold border border-sky-400/30 shadow-sm shadow-sky-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Download CV Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="./AkhileshRavuri.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Akhilesh_Ravuri-Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-300 hover:from-sky-300 hover:to-cyan-200 transition-all shadow-md shadow-sky-500/20 hover:shadow-sky-400/35 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0">
            <a
              href="./AkhileshRavuri.pdf"
              download="Akhilesh_Ravuri-Resume.pdf"
              aria-label="Download resume"
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky-400 to-cyan-300 text-slate-950 flex items-center justify-center shadow-md shadow-sky-500/25 active:scale-95 transition-transform"
            >
              <Download className="w-4 h-4" />
            </a>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 flex items-center justify-center"
              aria-label="Toggle Navigation"
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileMenuOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Floating Dropdown */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
              >
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      variants={{ hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0 } }}
                      className={`px-3.5 py-3 rounded-xl text-sm font-medium text-center transition-colors ${
                        isActive
                          ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 font-semibold'
                          : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll progress */}
        <motion.div
          aria-hidden
          className="absolute left-0 right-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500"
          style={{ scaleX: progress }}
        />
      </div>
    </header>
  );
}
