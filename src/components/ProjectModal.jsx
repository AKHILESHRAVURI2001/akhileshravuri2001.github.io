import React from 'react';
import { X, ExternalLink, Github, Cpu, Activity, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import GenerativeQuantumCard from './GenerativeQuantumCard';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-xl bg-quantum-dark/80 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-panel-glow p-6 sm:p-8 rounded-3xl border border-cyan-400/50 shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-quantum-surface/90 border border-cyan-500/40 text-slate-300 hover:text-white hover:border-cyan-400 transition-colors z-10"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Generative Visual Header */}
        <div className="mb-6">
          <GenerativeQuantumCard
            quantumHash={project.quantumHash}
            energyFrequency={project.energyFrequency}
            title={project.title}
            category={project.category}
            isHovered={true}
          />
        </div>

        {/* Title & Category */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-higgs-cyan uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>{project.category}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            {project.title}
          </h3>
        </div>

        {/* Deep Dive Description */}
        <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
          <p>{project.description}</p>
          {project.deepDive && (
            <div className="p-4 rounded-xl bg-quantum-surface/80 border border-cyan-500/20">
              <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>ARCHITECTURAL DEEP DIVE</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {project.deepDive}
              </p>
            </div>
          )}
        </div>

        {/* Metrics If Available */}
        {project.metrics && Array.isArray(project.metrics) && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between"
              >
                <span className="text-xs font-mono text-slate-400">{m.label}</span>
                <span className="font-display font-bold text-sm text-higgs-cyan">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack */}
        {project.techStack && Array.isArray(project.techStack) && (
          <div className="mb-6">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              APPLIED TECHNOLOGIES
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-purple-950/50 text-purple-200 border border-purple-500/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions Links */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-cyan-500/20">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-200 glass-panel border-cyan-500/30 hover:border-cyan-400 hover:text-white flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl text-xs font-mono font-medium text-quantum-dark bg-higgs-cyan hover:brightness-110 flex items-center gap-2"
            >
              <span>Launch Live Grid</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
}
