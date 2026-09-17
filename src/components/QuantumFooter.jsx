import React from 'react';
import { ArrowUp, Terminal, Shield, Github, Linkedin, Mail } from 'lucide-react';

export default function QuantumFooter({ profile, social }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-cyan-500/20 bg-quantum-dark/95 backdrop-blur-xl py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-higgs-cyan">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="font-display font-bold text-white text-sm tracking-wider">
              {profile?.name || 'Akhilesh Ravuri'}
            </div>
            <div className="text-xs font-mono text-slate-400">
              DevOps Engineer & Software Developer
            </div>
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="text-xs font-mono text-slate-400 text-center">
          <div>
            © {currentYear} {profile?.name || 'Akhilesh Ravuri'}. All rights reserved.
          </div>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-300 glass-panel border-cyan-500/30 hover:border-cyan-400 hover:text-higgs-cyan transition-all group cursor-pointer"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-higgs-cyan" />
        </button>

      </div>
    </footer>
  );
}
