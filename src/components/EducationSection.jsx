import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

export default function EducationSection({ education }) {
  if (!education || !Array.isArray(education) || education.length === 0) return null;

  return (
    <section id="education" className="py-14 sm:py-16 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-blue-600 shadow-sm mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900">
            Academic Background
          </h2>
        </div>

        {/* Education Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{item.duration}</span>
                  </span>
                  {item.gradeBadge && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                      {item.gradeBadge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-display font-bold text-slate-900 mb-2 leading-snug">
                  {item.degree}
                </h3>
                <p className="text-sm font-mono text-blue-600 font-semibold mb-4">
                  {item.institution}
                </p>

                {item.highlights && (
                  <p className="text-xs text-slate-600 font-normal leading-relaxed border-t border-slate-100 pt-3">
                    {item.highlights}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">Score / Grade:</span>
                <span className="font-display font-bold text-sm text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
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

