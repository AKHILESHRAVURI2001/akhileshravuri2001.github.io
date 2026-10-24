import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';

export default function QuantumFooter({ profile, social }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-slate-200 bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-600">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="font-display font-bold text-slate-900 text-sm tracking-wide">
              {profile?.name || 'Akhilesh Ravuri'}
            </div>
            <div className="text-xs font-mono text-slate-500">
              DevOps Engineer & Software Developer
            </div>
          </div>
        </div>

        {/* Center: Copyright */}
        <div className="text-xs font-mono text-slate-500 text-center">
          <div>
            © {currentYear} {profile?.name || 'Akhilesh Ravuri'}. All rights reserved.
          </div>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-slate-700 bg-white border border-slate-200 shadow-sm hover:border-blue-400 hover:text-blue-600 transition-all group cursor-pointer"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform text-blue-600" />
        </button>

      </div>
    </footer>
  );
}

