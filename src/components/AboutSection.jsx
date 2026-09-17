import React from 'react';
import { Cpu, Terminal, ShieldCheck, Network, Sparkles, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Cpu: Cpu,
  Terminal: Terminal,
  ShieldCheck: ShieldCheck,
  Network: Network,
};

export default function AboutSection({ about, profile }) {
  if (!about) return null;

  return (
    <section id="about" className="py-14 sm:py-16 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-xs font-mono text-purple-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{about.sectionTag || 'About Me'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            {about.title || 'DevOps Engineer & Software Developer'}
          </h2>
          {about.summary && (
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              {about.summary}
            </p>
          )}
        </div>

        {/* Content Matrix Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Narrative & Key Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-500/20 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/15">
                <span className="text-xs font-mono text-higgs-cyan font-bold tracking-wider uppercase">
                  Professional Background
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  4+ Years Experience
                </span>
              </div>

              {about.paragraphs && Array.isArray(about.paragraphs) && (
                <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  {about.paragraphs.map((paragraph, idx) => (
                    <p key={idx} className="relative pl-4 border-l-2 border-cyan-500/40">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Resume Key Highlights Card */}
            {about.highlights && Array.isArray(about.highlights) && (
              <div className="glass-panel-glow p-6 rounded-2xl border-cyan-500/30 space-y-3">
                <div className="text-xs font-mono font-bold text-higgs-cyan uppercase tracking-wider mb-2">
                  Key Technical Achievements
                </div>
                <div className="space-y-2.5">
                  {about.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-higgs-cyan flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Core Engineering Vectors (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
              Core Strengths
            </h3>

            {about.traits && Array.isArray(about.traits) && about.traits.map((trait, idx) => {
              const IconComponent = iconMap[trait.icon] || Sparkles;
              return (
                <div
                  key={idx}
                  className="glass-panel p-5 rounded-xl border-purple-500/20 hover:border-cyan-400/50 glass-card-interactive group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-higgs-cyan group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-mono font-bold text-white group-hover:text-higgs-cyan transition-colors">
                        {trait.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {trait.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
