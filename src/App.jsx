import React, { useState, useEffect } from 'react';
import portfolioData from './data/portfolioData.json';
import HiggsFieldCanvas from './components/HiggsFieldCanvas';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import QuantumFooter from './components/QuantumFooter';

export default function App() {
  const [data, setData] = useState(portfolioData || {});
  const [particleCount, setParticleCount] = useState(16000);

  // Validate data presence
  const profile = data?.profile || null;
  const hero = data?.hero || null;
  const stats = data?.stats || null;
  const about = data?.about || null;
  const experience = data?.experience || null;
  const projects = data?.projects || null;
  const skills = data?.skills || null;
  const education = data?.education || null;
  const contact = data?.contact || null;
  const social = data?.social || null;

  return (
    <div className="relative min-h-screen bg-quantum-dark text-slate-100 overflow-x-hidden selection:bg-higgs-cyan selection:text-quantum-dark">
      {/* 3D WebGL Higgs Field & Quantum Lattice Engine */}
      <HiggsFieldCanvas particleCount={particleCount} />

      {/* Floating HUD Navigation */}
      <Navbar
        profile={profile}
        particleCount={particleCount}
        onParticleToggle={() => setParticleCount(prev => (prev === 16000 ? 8000 : 16000))}
      />

      {/* Main Content Layout strictly bound to portfolioData */}
      <main className="relative z-10">
        {hero && <HeroSection hero={hero} profile={profile} />}
        {stats && <StatsSection stats={stats} />}
        {about && <AboutSection about={about} profile={profile} />}
        {experience && <ExperienceSection experience={experience} />}
        {projects && <ProjectsSection projects={projects} />}
        {skills && <SkillsSection skills={skills} />}
        {education && <EducationSection education={education} />}
        {contact && <ContactSection contact={contact} social={social} />}
      </main>

      {/* Quantum Telemetry Footer */}
      <QuantumFooter profile={profile} social={social} />
    </div>
  );
}
