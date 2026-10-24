import React, { useState, useMemo } from 'react';
import { Layers, Filter } from 'lucide-react';

export default function ProjectsSection({ projects }) {
  if (!projects || !Array.isArray(projects) || projects.length === 0) return null;

  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = useMemo(() => {
    const set = new Set(['ALL']);
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'ALL') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <section id="projects" className="py-16 sm:py-20 bg-transparent relative z-10 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono text-sky-600 font-semibold mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Engineering Initiatives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
              Featured Projects
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-600 font-normal">
            Production-grade cloud automation, Kubernetes microservices, and backend engineering.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
          <Filter className="w-4 h-4 text-sky-500 mr-1 flex-shrink-0" />
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/25'
                    : 'bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Project Image Banner */}
              {project.image && (
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-slate-700/50 text-[10px] font-mono text-white font-medium shadow-sm">
                    {project.category}
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-sky-600 font-semibold uppercase tracking-wider mb-1.5">
                    {project.category}
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed">
                    {project.description}
                  </p>
                  {project.deepDive && (
                    <p className="text-xs text-slate-500 mt-2 font-normal leading-relaxed">
                      {project.deepDive}
                    </p>
                  )}
                </div>

                {/* Impact Metric & Tech Tags */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  {project.impact && (
                    <div className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center justify-between font-semibold">
                      <span className="text-[10px] text-slate-500 font-normal">IMPACT:</span>
                      <span>{project.impact}</span>
                    </div>
                  )}

                  {project.techStack && Array.isArray(project.techStack) && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Deployment Status */}
                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                      <span className="text-slate-600 font-medium">{project.environment || 'Enterprise Production'}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-normal">TriByte Technologies</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
