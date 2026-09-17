import React from 'react';
import { ArrowUp, Atom, Heart, Shield, Radio } from 'lucide-react';

export default function QuantumFooter({ profile, social }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-cyan-500/20 bg-quantum-dark/90 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Telemetry */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-higgs-cyan">
            <Atom className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="font-display font-bold text-white text-sm tracking-wider">
              {profile?.name || 'AKHILESH RAVURI'}
            </div>
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span>ZERO-POINT ENERGY OBSERVER</span>
              <span>•</span>
              <span className="text-emerald-400">STATUS: 100% OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* Center: System Timestamp & Built With */}
        <div className="text-xs font-mono text-slate-400 text-center">
          <div>
            Architected with Three.js • WebGL Shaders • React • Tailwind CSS
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            © {currentYear} {profile?.name || 'Akhilesh Ravuri'}. Bound to <span className="text-cyan-400 font-mono">portfolioData.json</span>
          </div>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-300 glass-panel border-cyan-500/30 hover:border-cyan-400 hover:text-higgs-cyan transition-all group"
        >
          <span>ASCEND TO ZERO-POINT</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-higgs-cyan" />
        </button>

      </div>
    </footer>
  );
}
