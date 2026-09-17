import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal, ArrowRight, ShieldCheck, Cpu, Cloud, Layers, Activity, Download } from 'lucide-react';

export default function HeroSection({ hero, profile }) {
  if (!hero && !profile) return null;

  const [roleIndex, setRoleIndex] = useState(0);
  const roles = profile?.roles || ['DevOps Engineer', 'Cloud Architect', 'Full Stack Developer'];

  useEffect(() => {
    if (!roles.length) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Holographic Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-cyan-400/40 text-xs sm:text-sm font-mono text-higgs-cyan mb-8 animate-pulse-glow shadow-[0_0_20px_rgba(0,245,255,0.2)]">
          <Sparkles className="w-4 h-4 text-higgs-cyan animate-spin-slow" />
          <span className="tracking-wide">
            {profile?.statusBadge || hero?.badge || 'HIGGS FIELD: ACTIVE RESONANCE'}
          </span>
        </div>

        {/* Dynamic Name & Role Matrix */}
        <div className="mb-4">
          <h2 className="text-sm sm:text-base font-mono uppercase tracking-widest text-slate-400 mb-2">
            {profile?.title || 'DEVOPS ENGINEER & SOFTWARE ARCHITECT'}
          </h2>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-tight">
            {profile?.name || 'Akhilesh Ravuri'}
          </h1>
        </div>

        {/* Animated Headline with Quantum Gradient */}
        <div className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-slate-200 mt-2 mb-6">
          <span>{hero?.headlinePrefix || 'Engineering'} </span>
          <span className="bg-gradient-to-r from-higgs-cyan via-purple-400 to-pink-400 bg-clip-text text-transparent text-glow-cyan">
            {hero?.headlineHighlight || 'Mass & Scalability'}
          </span>
          <span> {hero?.headlineSuffix || 'Across Distributed Clouds'}</span>
        </div>

        {/* Dynamic Role Rotator */}
        <div className="h-8 mb-6 flex items-center justify-center font-mono text-sm sm:text-base text-cyan-300">
          <span className="text-slate-400 mr-2">&gt; specialization:</span>
          <span className="border-b border-cyan-400 pb-0.5 px-2 bg-cyan-950/40 rounded">
            {roles[roleIndex]}
          </span>
        </div>

        {/* Bio / Description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-10">
          {hero?.description || profile?.bio || 'Orchestrating hyperscale cloud topologies, automated CI/CD acceleration, and microservice containerization.'}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {hero?.ctaPrimary && (
            <a
              href={hero.ctaPrimary.href}
              className="px-7 py-3.5 rounded-xl font-mono text-sm font-semibold text-quantum-dark bg-gradient-to-r from-higgs-cyan to-higgs-neon hover:shadow-[0_0_30px_rgba(0,245,255,0.6)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>{hero.ctaPrimary.label}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          )}

          {hero?.ctaSecondary && (
            <a
              href={hero.ctaSecondary.href}
              className="px-6 py-3.5 rounded-xl font-mono text-sm font-semibold text-slate-200 glass-panel border-cyan-500/30 hover:border-cyan-400 hover:text-white transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-higgs-cyan" />
              <span>{hero.ctaSecondary.label}</span>
            </a>
          )}

          {hero?.resumeCta && (
            <a
              href={hero.resumeCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl font-mono text-sm font-semibold text-purple-300 glass-panel border-purple-500/30 hover:border-purple-400 hover:text-white transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span>{hero.resumeCta.label}</span>
            </a>
          )}
        </div>

        {/* Interactive Floating Tech Stack Matrix */}
        {hero?.techStack && Array.isArray(hero.techStack) && hero.techStack.length > 0 && (
          <div className="pt-6 border-t border-cyan-500/15">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
              <Activity className="w-3.5 h-3.5 text-higgs-cyan" />
              <span>Entangled Cloud & Development Stack</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
              {hero.techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg glass-panel text-xs font-mono text-slate-200 border-cyan-500/20 hover:border-cyan-400 hover:text-higgs-cyan transition-all transform hover:scale-105 flex items-center gap-2 cursor-default"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: tech.color || '#00f5ff' }}
                  />
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
