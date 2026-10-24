import React, { useState } from 'react';
import portfolioData from './data/portfolioData.json';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingContactDock from './components/FloatingContactDock';

export default function App() {
  const [data] = useState(portfolioData || {});

  const profile = data?.profile || null;
  const hero = data?.hero || null;
  const stats = data?.stats || null;
  const about = data?.about || null;
  const skills = data?.skills || null;
  const experience = data?.experience || null;
  const projects = data?.projects || null;
  const education = data?.education || null;
  const contact = data?.contact || null;
  const social = data?.social || null;

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-800 overflow-x-hidden selection:bg-sky-500 selection:text-white">
      {/* Global Background Ambient Animated Layers (30% Opacity) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Animated Drifting Tech Grid with 30% Opacity */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:36px_36px] animate-grid-drift opacity-30" />

        {/* Ambient Floating Glow Orbs with 30% Opacity */}
        <div className="absolute top-[15%] left-[-6%] w-[600px] h-[600px] bg-sky-400/30 rounded-full blur-[130px] animate-ambient-1" />
        <div className="absolute top-[35%] right-[-8%] w-[650px] h-[650px] bg-cyan-400/30 rounded-full blur-[140px] animate-ambient-2" />
        <div className="absolute top-[55%] left-[-6%] w-[550px] h-[550px] bg-blue-400/30 rounded-full blur-[130px] animate-orb-float" />
        <div className="absolute top-[72%] right-[4%] w-[600px] h-[600px] bg-indigo-400/30 rounded-full blur-[140px] animate-ambient-3" />
        <div className="absolute top-[88%] left-[20%] w-[500px] h-[500px] bg-emerald-400/30 rounded-full blur-[130px] animate-ambient-1" />
      </div>

      {/* Navigation */}
      <Navbar profile={profile} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {hero && <HeroSection hero={hero} profile={profile} stats={stats} />}
        {about && <AboutSection about={about} profile={profile} />}
        {skills && <SkillsSection skills={skills} />}
        {experience && <ExperienceSection experience={experience} />}
        {projects && <ProjectsSection projects={projects} />}
        {education && <EducationSection education={education} />}
        {contact && <ContactSection contact={contact} social={social} />}
      </main>

      {/* Floating Quick Action Dock */}
      <FloatingContactDock />

      {/* Footer */}
      <Footer profile={profile} social={social} />
    </div>
  );
}
