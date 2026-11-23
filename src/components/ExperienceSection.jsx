import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Zap } from 'lucide-react';

export default function ExperienceSection({ experience }) {
  if (!experience || !Array.isArray(experience) || experience.length === 0) return null;

  return (
    <section id="experience" className="py-16 sm:py-20 bg-transparent relative z-10 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60">
      <div className="max-w-6xl mx-auto">
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
            Delivering secure, automated, cloud-native platforms on AWS and full-stack applications.
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all space-y-6"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                      {item.role}
                    </h3>
                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-sky-600 mt-1">
                    {item.company}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-sky-500" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Key Impact Banner */}
              {item.keyImpact && (
                <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-sky-50 via-indigo-50/40 to-emerald-50/50 border border-sky-200/80 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-600 text-white font-mono text-xs font-bold">
                    <Zap className="w-3.5 h-3.5" />
                    KEY IMPACT
                  </span>
                  <span className="font-semibold text-slate-800">{item.keyImpact}</span>
                </div>
              )}

              {/* Categorized Pillars (2x2 Grid) or Flat Responsibilities */}
              {item.categories && Array.isArray(item.categories) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {item.categories.map((cat, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3 hover:border-sky-300/80 transition-colors"
                    >
                      <h4 className="text-sm sm:text-base font-display font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-sky-500" />
                        <span>{cat.title}</span>
                      </h4>
                      <ul className="space-y-2">
                        {cat.items.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                item.responsibilities && (
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
                )
              )}

              {/* Technologies */}
              {item.technologies && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider mb-2.5">
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
