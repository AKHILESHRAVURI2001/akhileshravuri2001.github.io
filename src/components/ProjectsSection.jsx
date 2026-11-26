import React, { useState, useMemo, useCallback } from 'react';
import { Layers, Sparkles, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';
import SpotlightCard from './SpotlightCard';
import ProjectModal from './ProjectModal';

const ACCENTS = [
  { glow: '14,165,233', text: 'text-sky-600', chip: 'bg-sky-50 text-sky-700 border-sky-200', bar: 'from-sky-400 to-blue-600', dot: 'text-sky-500' },
  { glow: '139,92,246', text: 'text-violet-600', chip: 'bg-violet-50 text-violet-700 border-violet-200', bar: 'from-violet-400 to-fuchsia-500', dot: 'text-violet-500' },
  { glow: '16,185,129', text: 'text-emerald-600', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200', bar: 'from-emerald-400 to-teal-500', dot: 'text-emerald-500' },
];

const MAX_TAGS = 6;

const ProjectCard = React.forwardRef(function ProjectCard({ project, accent, index, onOpen }, ref) {
  const tags = project.techStack || [];
  const shown = tags.slice(0, MAX_TAGS);
  const extra = tags.length - shown.length;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <SpotlightCard
        glow={accent.glow}
        tilt={2}
        className="group h-full rounded-3xl bg-white border border-slate-200/80 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)] hover:shadow-[0_24px_50px_-16px_rgba(15,23,42,0.25)] transition-shadow"
      >
        <div className="flex flex-col h-full">
          {/* Image */}
          {project.image && (
            <div className="relative h-52 overflow-hidden bg-slate-50">
              <img
                src={project.image}
                alt={`${project.title} – project by Akhilesh Ravuri`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur text-[11px] font-semibold text-white">
                {project.category}
              </span>
            </div>
          )}

          {/* Body */}
          <div className="relative flex flex-col flex-1 px-6 pt-5 pb-6">
            <h3 className="text-xl font-display font-bold text-slate-900 leading-snug">{project.title}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">{project.description}</p>

            {/* Key stats */}
            {Array.isArray(project.metrics) && project.metrics.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {project.metrics.slice(0, 2).map((m) => (
                  <div key={m.label} className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{m.label}</div>
                    <div className={`text-[13px] font-bold ${accent.text} leading-tight mt-0.5`}>{m.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer: impact, tags, toggle */}
            <div className="mt-auto pt-5 space-y-4">
              {project.impact && (
                <div className="flex items-start gap-2 text-[13px] font-medium text-slate-800">
                  <Sparkles className={`w-4 h-4 flex-shrink-0 mt-0.5 ${accent.dot}`} />
                  <span>{project.impact}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {shown.map((t) => (
                  <span key={t} className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${accent.chip}`}>
                    {t}
                  </span>
                ))}
                {extra > 0 && (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-slate-200 text-slate-500">
                    +{extra}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onOpen}
                className="group/btn w-full flex items-center justify-between pt-4 border-t border-slate-100 text-sm font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                <span>View details</span>
                <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover/btn:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>

          {/* accent bar */}
          <div className={`h-1 w-full bg-gradient-to-r ${accent.bar} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
        </div>
      </SpotlightCard>
    </motion.div>
  );
});

export default function ProjectsSection({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeProject, setActiveProject] = useState(null);
  const accentFor = (p) => ACCENTS[Math.max(0, projects.indexOf(p)) % ACCENTS.length];
  const closeModal = useCallback(() => setActiveProject(null), []);

  const categories = useMemo(() => {
    const set = new Set(['ALL']);
    (projects || []).forEach((p) => p.category && set.add(p.category));
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (selectedCategory === 'ALL') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  if (!Array.isArray(projects) || projects.length === 0) return null;

  return (
    <section id="projects" className="py-16 sm:py-24 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-sky-600 shadow-sm mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold text-slate-900 leading-tight tracking-tight">
            Featured{' '}
            <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600">
            Kubernetes migrations, AI RAG platforms, CRM portals and automated CI/CD pipelines.
          </p>
        </Reveal>

        {/* Filters */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-1 p-1 rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-sm overflow-x-auto max-w-full no-scrollbar">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                    active ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 shadow-md shadow-sky-500/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{cat === 'ALL' ? 'All' : cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                accent={accentFor(project)}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={activeProject}
        accent={activeProject ? accentFor(activeProject) : ACCENTS[0]}
        onClose={closeModal}
      />
    </section>
  );
}
