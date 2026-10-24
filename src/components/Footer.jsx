import React from 'react';
import { Linkedin, Github, Mail, MessageSquare } from 'lucide-react';

export default function Footer({ profile, social }) {
  const socialIcons = {
    Linkedin: <Linkedin className="w-4 h-4" />,
    Github: <Github className="w-4 h-4" />,
    Mail: <Mail className="w-4 h-4" />,
    MessageSquare: <MessageSquare className="w-4 h-4" />,
  };

  const socialLinks = social || [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/akhileshravuri', icon: 'Linkedin' },
    { name: 'GitHub', url: 'https://github.com/AKHILESHRAVURI2001', icon: 'Github' },
    { name: 'Email', url: 'mailto:ravuriakhilesh2001@gmail.com', icon: 'Mail' },
    { name: 'WhatsApp', url: 'https://wa.me/917095643856', icon: 'MessageSquare' },
  ];

  return (
    <footer className="relative z-10 bg-[#03060f] border-t border-slate-800/80 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-display font-bold text-sm shadow-md shadow-sky-500/20">
            AR
          </div>
          <div>
            <div className="font-display font-bold text-sm sm:text-base text-white">
              {profile?.name || 'Akhilesh Ravuri'}
            </div>
            <div className="text-xs text-slate-400 font-sans">
              {profile?.title || 'DevOps Engineer | Web Developer'}
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex items-center gap-6 text-xs sm:text-sm text-slate-400 font-medium">
          <a href="#home" className="hover:text-sky-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-sky-400 transition-colors">About</a>
          <a href="#projects" className="hover:text-sky-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-sky-400 transition-colors">Contact</a>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex items-center gap-3">
          {socialLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-sky-400 hover:bg-sky-500/10 transition-all"
            >
              {socialIcons[item.icon] || <Mail className="w-4 h-4" />}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
