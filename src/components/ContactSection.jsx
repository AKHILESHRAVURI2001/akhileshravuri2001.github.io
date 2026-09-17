import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Linkedin, Github, ExternalLink, Send, Sparkles, MessageCircle } from 'lucide-react';

export default function ContactSection({ contact, social }) {
  if (!contact) return null;

  const whatsappNumber = '917095643856';
  const whatsappMessage = encodeURIComponent(
    'Hi Akhilesh, I saw your portfolio and would like to connect with you regarding an opportunity!'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-14 sm:py-16 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-higgs-cyan mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-higgs-cyan" />
            <span>Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            {contact.title || "Let's Connect"}
          </h2>
          <p className="mt-3 text-slate-300 font-light text-sm sm:text-base">
            Feel free to reach out directly via WhatsApp, Email, or Phone for job opportunities and technical discussions.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* 1. WHATSAPP INSTANT ACTION CARD (FEATURED) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-quantum-surface/90 to-quantum-dark border border-emerald-500/40 hover:border-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-1 group flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-900/60 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Instant Chat</span>
              </span>
            </div>

            <div>
              <div className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                WhatsApp Messenger
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-emerald-300 transition-colors">
                Chat on WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-light leading-relaxed">
                Connect instantly on WhatsApp at <strong>+91 7095643856</strong> for quick discussions, inquiries, or scheduling calls.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-500/20 flex items-center justify-between text-xs font-mono font-semibold text-emerald-400">
              <span>START WHATSAPP CHAT</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* 2. DIRECT EMAIL CARD */}
          <a
            href={`mailto:${contact.email}?subject=Opportunity%20Discussion`}
            className="p-6 sm:p-8 rounded-3xl glass-panel border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,245,255,0.25)] transition-all transform hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-cyan-950/80 text-higgs-cyan border border-cyan-500/40 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                Direct Email
              </span>
            </div>

            <div>
              <div className="text-xs font-mono text-higgs-cyan font-semibold uppercase tracking-wider mb-1">
                Electronic Mail
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-higgs-cyan transition-colors">
                {contact.email}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-light leading-relaxed">
                Send job descriptions, interview invites, or detailed project requirements directly to my inbox.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-cyan-500/20 flex items-center justify-between text-xs font-mono font-semibold text-higgs-cyan">
              <span>COMPOSE EMAIL</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* 3. DIRECT PHONE CALL CARD */}
          <a
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            className="p-6 rounded-3xl glass-panel border-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,245,255,0.2)] transition-all transform hover:-translate-y-1 group flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-cyan-950/80 text-higgs-cyan border border-cyan-500/30 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">Direct Phone</div>
                <div className="text-base sm:text-lg font-mono font-bold text-white group-hover:text-higgs-cyan transition-colors">
                  {contact.phone}
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-higgs-cyan transition-colors" />
          </a>

          {/* 4. LINKEDIN & GITHUB PROFILES CARD */}
          <div className="p-6 rounded-3xl glass-panel border-purple-500/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://www.linkedin.com/in/akhileshravuri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold text-white bg-blue-600/30 border border-blue-500/40 hover:bg-blue-600/50 transition-all"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/AKHILESHRAVURI2001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold text-white bg-slate-800/60 border border-slate-700 hover:bg-slate-700/60 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            <div className="text-right hidden sm:block">
              <div className="text-xs font-mono text-slate-400">Location</div>
              <div className="text-xs font-mono text-slate-200">Bengaluru, India</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
