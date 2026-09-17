import React, { useState, useMemo } from 'react';
import { Layers, Sparkles, ArrowUpRight, Cpu, ExternalLink, Filter } from 'lucide-react';
import GenerativeQuantumCard from './GenerativeQuantumCard';
import ProjectModal from './ProjectModal';

export default function ProjectsSection({ projects }) {
  if (!projects || !Array.isArray(projects) || projects.length === 0) return null;

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeProject, setActiveProject] = useState(null);
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const set = new Set(['ALL']);
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  // Filter projects dynamically
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'ALL') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <section id="projects" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-higgs-cyan mb-4">
              <Layers className="w-3.5 h-3.5 text-higgs-cyan" />
              <span>QUANTUM PROJECTS & DEPLOYMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              Featured Infrastructure & Engineering
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-300 font-light">
            Every project visual is generated procedurally using quantum topological waveform synthesis mapped to each project's data hash.
          </p>
        </div>

        {/* Dynamic Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <Filter className="w-4 h-4 text-cyan-400 mr-1 flex-shrink-0" />
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-higgs-cyan to-higgs-neon text-quantum-dark font-bold shadow-[0_0_15px_rgba(0,245,255,0.4)]'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-cyan-500/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const isHovered = hoveredProjectId === project.id;
            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => setActiveProject(project)}
                className="glass-panel p-5 rounded-3xl border-cyan-500/20 hover:border-cyan-400/60 glass-card-interactive group cursor-pointer flex flex-col justify-between relative overflow-hidden"
              >
                {/* Generative Visual Header */}
                <div className="mb-4">
                  <GenerativeQuantumCard
                    quantumHash={project.quantumHash}
                    energyFrequency={project.energyFrequency}
                    title={project.title}
                    category={project.category}
                    isHovered={isHovered}
                  />
                </div>

                {/* Content */}
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-mono text-higgs-cyan uppercase tracking-wider mb-1">
                      {project.category}
                    </div>
                    <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-higgs-cyan transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-3 font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Impact Metric & Tech Tags */}
                  <div className="pt-4 border-t border-cyan-500/15 space-y-3">
                    {project.impact && (
                      <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">IMPACT:</span>
                        <span className="font-semibold">{project.impact}</span>
                      </div>
                    )}

                    {project.techStack && Array.isArray(project.techStack) && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-quantum-surface/90 text-slate-300 border border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Hover Trigger Arrow */}
                <div className="mt-4 pt-3 border-t border-cyan-500/10 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-higgs-cyan">
                  <span>INSPECT ARCHITECTURE</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Modal */}
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}

      </div>
    </section>
  );
}
