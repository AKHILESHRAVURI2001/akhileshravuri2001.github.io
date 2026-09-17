import React from 'react';
import { Activity, ShieldCheck, Zap, Server, Award, Gauge } from 'lucide-react';

const statIcons = [Gauge, Zap, ShieldCheck, Server, Award, Activity];

export default function StatsSection({ stats }) {
  if (!stats || !Array.isArray(stats) || stats.length === 0) return null;

  return (
    <section id="stats" className="pt-2 pb-14 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-higgs-cyan animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-widest text-higgs-cyan uppercase">
              Key Metrics & Impact
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Proven Track Record
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <div
                key={stat.id || idx}
                className="glass-panel p-5 rounded-2xl border-cyan-500/20 hover:border-cyan-400/60 glass-card-interactive group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    Impact
                  </span>
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-higgs-cyan transition-colors" />
                </div>

                <div className="my-2">
                  <div className="font-display font-black text-3xl sm:text-4xl text-white group-hover:text-higgs-cyan text-glow-cyan transition-colors flex items-baseline">
                    <span>{stat.value}</span>
                    <span className="text-lg sm:text-xl text-purple-400 ml-1 font-mono font-bold">
                      {stat.suffix}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-semibold text-slate-200 group-hover:text-white transition-colors line-clamp-1">
                    {stat.label}
                  </h4>
                  {stat.sublabel && (
                    <p className="text-[11px] font-sans text-slate-400 mt-0.5 line-clamp-1">
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
