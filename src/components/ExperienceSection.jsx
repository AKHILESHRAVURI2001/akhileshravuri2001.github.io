import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function ExperienceSection({ experience }) {
  if (!experience || !Array.isArray(experience) || experience.length === 0) return null;

  return (
    <section id="experience" className="py-16 sm:py-20 bg-transparent relative z-10 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-600 font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
            Work Experience
          </h2>
          <p className="mt-3 text-slate-600 font-normal text-sm sm:text-base">
            Hands-on software development and DevOps engineering delivering reliable cloud systems.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-6"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                      {item.company}
                    </h3>
                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-sky-600 mt-1">
                    {item.role}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-sky-500" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              {item.responsibilities && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Key Engineering Contributions:
                  </h4>
                  <ul className="space-y-2.5">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {item.technologies && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider mb-2">
                    Technologies Operated:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-200 font-medium"
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
