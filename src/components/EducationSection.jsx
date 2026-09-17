import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';

export default function EducationSection({ education }) {
  if (!education || !Array.isArray(education) || education.length === 0) return null;

  return (
    <section id="education" className="py-20 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-higgs-cyan mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-higgs-cyan" />
            <span>ACADEMIC FOUNDATION & DEGREES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Engineering Qualifications
          </h2>
        </div>

        {/* Education Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/20 hover:border-cyan-400/50 glass-card-interactive flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.duration}</span>
                  </span>
                  {item.gradeBadge && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-950/80 text-purple-300 border border-purple-500/30">
                      {item.gradeBadge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-display font-bold text-white mb-2 leading-snug">
                  {item.degree}
                </h3>
                <p className="text-sm font-mono text-higgs-cyan mb-4">
                  {item.institution}
                </p>

                {item.highlights && (
                  <p className="text-xs text-slate-300 font-light leading-relaxed border-t border-cyan-500/10 pt-3">
                    {item.highlights}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-cyan-500/15 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Score Achieved:</span>
                <span className="font-display font-bold text-base text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-500/30">
                  {item.score}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
