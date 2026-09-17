import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, Terminal, Cpu } from 'lucide-react';

export default function ExperienceSection({ experience }) {
  if (!experience || !Array.isArray(experience) || experience.length === 0) return null;

  return (
    <section id="experience" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-higgs-cyan mb-4">
            <Briefcase className="w-3.5 h-3.5 text-higgs-cyan" />
            <span>OPERATIONAL TIMELINE & IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            Production Engineering History
          </h2>
          <p className="mt-3 text-slate-300 font-light text-base">
            Continuous delivery, enterprise cloud operations, and microservices architecture in action.
          </p>
        </div>

        {/* Experience Timeline Stream */}
        <div className="space-y-12">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-10 rounded-3xl border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Ambient Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-cyan-500/15">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      {exp.role}
                    </h3>
                    {exp.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 animate-pulse">
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-base sm:text-lg font-mono text-higgs-cyan mt-1">
                    {exp.company}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Metrics Highlights Bar */}
              {exp.metrics && Array.isArray(exp.metrics) && exp.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                  {exp.metrics.map((metric, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 rounded-xl bg-quantum-surface/60 border border-cyan-500/20 flex items-center justify-between"
                    >
                      <span className="text-xs font-mono text-slate-300">{metric.label}</span>
                      <span className="font-display font-extrabold text-xl text-higgs-cyan text-glow-cyan">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Responsibilities & Achievements */}
              {exp.responsibilities && Array.isArray(exp.responsibilities) && (
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    KEY RESPONSIBILITIES & ARCHITECTURAL CONTRIBUTIONS
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/30 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-higgs-cyan flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies Tag Cloud */}
              {exp.technologies && Array.isArray(exp.technologies) && (
                <div className="mt-8 pt-6 border-t border-cyan-500/15">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    <span>DEPLOYED INFRASTRUCTURE & TOOLS</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-md text-xs font-mono bg-cyan-950/40 text-cyan-200 border border-cyan-500/20 hover:border-cyan-400 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
