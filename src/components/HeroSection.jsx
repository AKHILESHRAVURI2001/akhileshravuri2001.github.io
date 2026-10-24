import React, { useState } from 'react';
import { 
  Send, 
  Download, 
  Terminal, 
  Cloud, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Server,
  Cpu,
  Layers
} from 'lucide-react';

export default function HeroSection({ hero, profile, stats }) {
  const [activePipelineStep, setActivePipelineStep] = useState(1);

  const pipelineSteps = [
    { id: 1, title: 'Code & Quality', desc: 'Azure Repos + SonarQube Quality Gates', status: 'Passed' },
    { id: 2, title: 'CI/CD Automation', desc: 'Jenkins Multi-Branch Release Pipeline', status: 'Automated' },
    { id: 3, title: 'Containers & K8s', desc: 'Docker Containers & Kubernetes Deployments', status: 'Running' },
    { id: 4, title: 'AWS Cloud Infra', desc: 'Terraform IaC (Staging, UAT, Production)', status: 'Provisioned' },
  ];

  return (
    <section
      id="home"
      className="relative z-10 pt-28 sm:pt-36 pb-16 sm:pb-24 bg-[#050811] text-white overflow-hidden"
    >
      {/* 1. DevOps Hero Visual Texture with Increased Opacity & Subtle Motion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src="./devops_hero.jpg"
          alt="DevOps Cloud Architecture Texture"
          className="w-full h-full object-cover object-center opacity-[0.30] sm:opacity-[0.38] mix-blend-screen animate-hero-bg select-none will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-[#050811]/75" />
      </div>

      {/* 2. Light Subtle Floating Ambient Glow Orbs & Grid */}
      <div className="absolute top-[-50px] left-1/4 w-[550px] h-[550px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none animate-ambient-1 z-0" />
      <div className="absolute top-1/3 right-4 w-[600px] h-[500px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none animate-ambient-2 z-0" />
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none animate-ambient-3 z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-50 z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* 1. Left Hero Column: Headline, Bio & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Live Availability Status Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-200 font-medium">Available for DevOps & Full-Stack Roles</span>
            </div>

            {/* Personal Portfolio Headline */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-sm sm:text-base font-semibold">
                <span>👋 Hi, I am</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
                Akhilesh{' '}
                <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  Ravuri
                </span>
              </h1>

              <div className="text-xl sm:text-2xl font-bold text-slate-200 flex flex-wrap items-center gap-2 pt-1">
                <span className="text-white">DevOps Engineer</span>
                <span className="text-sky-400 font-normal">&</span>
                <span className="text-sky-300">Software Developer</span>
              </div>
            </div>

            {/* Bio Description */}
            <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Around 4 years of experience building resilient cloud systems, automating CI/CD release pipelines, and orchestrating Kubernetes clusters on AWS at TriByte Technologies — cutting environment setup time by 80%.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-400/40 transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4 -rotate-45" />
                <span>View My Projects</span>
              </a>

              <a
                href="./AkhileshRavuri.pdf"
                download="Akhilesh_Ravuri_Resume.pdf"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/90 border border-slate-700 hover:border-slate-500 hover:text-white transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Download CV</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors pl-2"
              >
                <span>Let's Connect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Tech Highlights */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 flex-wrap text-xs font-mono text-slate-400">
              <span className="text-slate-500">Core Stack:</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-400">AWS</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-400">Terraform</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-400">Docker</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-400">Kubernetes</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-400">Jenkins</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-400">PHP/Python</span>
            </div>

          </div>

          {/* 2. Right Hero Column: Interactive DevOps Cloud Cockpit Terminal */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-[#0a0f1d] to-slate-950 border border-slate-800 shadow-2xl shadow-sky-500/10 overflow-hidden">
              
              {/* Terminal Window Header */}
              <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    akhilesh-cloud-ops ~ /production
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>99.9% Uptime</span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-5 sm:p-6 space-y-5">
                
                {/* Infrastructure Metric Highlights */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl font-display font-bold text-white">80% Saved</div>
                      <div className="text-[11px] font-mono text-slate-400">Terraform IaC Setup</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xl font-display font-bold text-white">90% Boost</div>
                      <div className="text-[11px] font-mono text-slate-400">Query Accuracy</div>
                    </div>
                  </div>
                </div>

                {/* Interactive CI/CD Release Pipeline Steps */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center justify-between">
                    <span>Active Deployment Pipeline</span>
                    <span className="text-sky-400">AWS Production</span>
                  </div>

                  <div className="space-y-2">
                    {pipelineSteps.map((step) => {
                      const isActive = activePipelineStep === step.id;
                      return (
                        <div
                          key={step.id}
                          onClick={() => setActivePipelineStep(step.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isActive
                              ? 'bg-sky-500/10 border-sky-500/40 text-white shadow-sm'
                              : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-600'}`} />
                            <div>
                              <div className={`text-xs font-mono font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                                {step.title}
                              </div>
                              <div className="text-[11px] text-slate-500 font-sans">
                                {step.desc}
                              </div>
                            </div>
                          </div>

                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-emerald-400 border border-slate-700/60 font-medium">
                            {step.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cloud Environment Badges */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-sky-400" />
                    <span>AWS 3-Tier Environments:</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Staging</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">UAT</span>
                    <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-500/30 font-semibold">Production</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* 3. Bottom Hero Stats Row */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 shadow-sm space-y-1">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-sky-400">4+ Years</div>
            <div className="text-xs font-mono text-slate-300 font-semibold">DevOps & Web Development</div>
            <div className="text-[11px] text-slate-500">TriByte Technologies & Cloud Systems</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 shadow-sm space-y-1">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-sky-400">80% Saved</div>
            <div className="text-xs font-mono text-slate-300 font-semibold">IaC Environment Setup</div>
            <div className="text-[11px] text-slate-500">Terraform & Ansible Automation</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 shadow-sm space-y-1">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-emerald-400">90% Boost</div>
            <div className="text-xs font-mono text-slate-300 font-semibold">Query Validation Accuracy</div>
            <div className="text-[11px] text-slate-500">Zero Downstream Error Pipeline</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 shadow-sm space-y-1">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-sky-400">99.9% Uptime</div>
            <div className="text-xs font-mono text-slate-300 font-semibold">High Availability Operations</div>
            <div className="text-[11px] text-slate-500">Prometheus & Grafana Proactive Telemetry</div>
          </div>
        </div>

      </div>
    </section>
  );
}
