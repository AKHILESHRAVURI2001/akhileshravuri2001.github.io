import React from 'react';
import { Activity, ShieldCheck, Zap, Server, Award, Gauge } from 'lucide-react';

const statIcons = [Gauge, Zap, ShieldCheck, Server, Award, Activity];

export default function StatsSection({ stats }) {
  if (!stats || !Array.isArray(stats) || stats.length === 0) return null;

  return (
    <section id="stats" className="pt-2 pb-14 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-mono font-semibold tracking-widest text-slate-700 uppercase">
              Key Metrics & Impact
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Production Results
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
          {stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <div
                key={stat.id || idx}
                className="bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col justify-between shadow-sm"
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded border border-slate-200 font-semibold">
                    Impact
                  </span>
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <div className="my-1.5 sm:my-2">
                  <div className="font-display font-bold text-2xl sm:text-4xl text-slate-900 group-hover:text-blue-600 transition-colors flex items-baseline">
                    <span>{stat.value}</span>
                    <span className="text-base sm:text-xl text-blue-600 ml-1 font-mono font-bold">
                      {stat.suffix}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] sm:text-xs font-mono font-semibold text-slate-700 group-hover:text-slate-900 transition-colors truncate">
                    {stat.label}
                  </h4>
                  {stat.sublabel && (
                    <p className="text-[10px] sm:text-[11px] font-sans text-slate-500 mt-0.5 truncate">
                      {stat.sublabel}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}



