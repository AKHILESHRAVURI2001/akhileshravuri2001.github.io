import React, { useState } from 'react';
import { Cloud, GitBranch, Box, Activity, Code, Sparkles, Cpu, Radio } from 'lucide-react';

const iconMap = {
  Cloud: Cloud,
  GitBranch: GitBranch,
  Box: Box,
  Activity: Activity,
  Code: Code,
};

export default function SkillsSection({ skills }) {
  if (!skills || !skills.categories || !Array.isArray(skills.categories) || skills.categories.length === 0) {
    return null;
  }

  const [activeTab, setActiveTab] = useState(skills.categories[0]?.id || 'all');

  return (
    <section id="skills" className="py-14 sm:py-16 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-xs font-mono text-purple-300 mb-4">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>{skills.sectionTag || 'ENTANGLED OPERATIONAL MATRIX'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            {skills.title || 'Technical Competencies & Quantum Toolset'}
          </h2>
          {skills.description && (
            <p className="mt-3 text-slate-300 font-light text-base">
              {skills.description}
            </p>
          )}
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {skills.categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Cpu;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-higgs-cyan border border-cyan-400 font-semibold shadow-[0_0_20px_rgba(0,245,255,0.3)] scale-105'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-cyan-500/30'
                }`}
              >
                <Icon className="w-4 h-4" style={{ color: cat.color || '#00f5ff' }} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.categories
            .filter((cat) => activeTab === 'all' || cat.id === activeTab)
            .map((cat) => (
              <div
                key={cat.id}
                className="glass-panel p-6 rounded-3xl border-cyan-500/20 hover:border-cyan-400/50 transition-all col-span-1 md:col-span-2 lg:col-span-3"
              >
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-cyan-500/20">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/30"
                      style={{ color: cat.color || '#00f5ff' }}
                    >
                      {React.createElement(iconMap[cat.icon] || Cpu, { className: 'w-5 h-5' })}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">
                        {cat.name}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-400">
                        FREQUENCY BAND: {cat.items.length} MODULES ENTANGLED
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-higgs-cyan bg-cyan-950/80 px-3 py-1 rounded-md border border-cyan-500/30">
                    STATE: ACTIVE
                  </span>
                </div>

                {/* Items in category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-quantum-surface/70 border border-cyan-500/15 hover:border-cyan-400/40 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs sm:text-sm font-mono font-medium text-slate-200 group-hover:text-higgs-cyan transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[11px] font-mono text-purple-300">
                          {item.quantumState || `${item.level}%`}
                        </span>
                      </div>

                      {/* Quantum Energy Level Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
                        <div
                          className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-higgs-cyan to-purple-500"
                          style={{ width: `${item.level || 90}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>

      </div>
    </section>
  );
}
