import React, { useState } from 'react';
import { Cloud, GitBranch, Box, Activity, Code, CheckCircle2, Layers } from 'lucide-react';

export default function SkillsSection({ skills }) {
  const [activeTab, setActiveTab] = useState('all');

  const categories = skills?.categories || [];

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Cloud':
        return <Cloud className="w-4 h-4 text-sky-500" />;
      case 'GitBranch':
        return <GitBranch className="w-4 h-4 text-purple-500" />;
      case 'Box':
        return <Box className="w-4 h-4 text-emerald-500" />;
      case 'Activity':
        return <Activity className="w-4 h-4 text-amber-500" />;
      case 'Code':
      default:
        return <Code className="w-4 h-4 text-blue-500" />;
    }
  };

  const displayedCategories = activeTab === 'all'
    ? categories
    : categories.filter((c) => c.id === activeTab);

  return (
    <section id="skills" className="py-16 sm:py-20 bg-transparent relative z-10 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-600 font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{skills?.tag || 'Technical Skills'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
            {skills?.title || 'Technologies by Category'}
          </h2>
          <p className="mt-3 text-slate-600 font-normal text-sm sm:text-base">
            {skills?.description || 'Core competencies across cloud infrastructure, CI/CD automation, container orchestration, monitoring, and backend engineering.'}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                : 'bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
            }`}
          >
            All Categories
          </button>

          {categories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                    : 'bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((category) => (
            <div
              key={category.id}
              className="bg-slate-50/70 p-6 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-sky-300 hover:bg-white transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-slate-900">
                      {category.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500">
                      {category.items?.length || 0} Core Technologies
                    </span>
                  </div>
                </div>

                {/* Technology Chips */}
                <div className="flex flex-wrap gap-2">
                  {category.items?.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-medium text-slate-700 hover:text-sky-600 hover:border-sky-300 transition-colors shadow-2xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 flex-shrink-0" />
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
