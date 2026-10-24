import React from 'react';
import { Mail, Phone, MessageSquare, Linkedin, Github, ExternalLink, MessageCircle } from 'lucide-react';

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-blue-600 shadow-sm mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
            {contact.title || "Let's Connect"}
          </h2>
          <p className="mt-3 text-slate-600 font-normal text-sm sm:text-base">
            Feel free to reach out directly via WhatsApp, Email, or Phone for job opportunities and technical discussions.
          </p>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* 1. WHATSAPP CARD */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                <span>Instant Chat</span>
              </span>
            </div>

            <div>
              <div className="text-xs font-mono text-emerald-700 font-semibold uppercase tracking-wider mb-1">
                WhatsApp Messenger
              </div>
              <h3 className="text-lg sm:text-2xl font-display font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Chat on WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed">
                Connect instantly on WhatsApp at <strong>+91 7095643856</strong> for inquiries or scheduling calls.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-semibold text-emerald-700">
              <span>START WHATSAPP CHAT</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* 2. DIRECT EMAIL CARD */}
          <a
            href={`mailto:${contact.email}?subject=Opportunity%20Discussion`}
            className="p-5 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-400 transition-all group flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200">
                <Mail className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                Direct Email
              </span>
            </div>

            <div>
              <div className="text-xs font-mono text-blue-700 font-semibold uppercase tracking-wider mb-1">
                Email Address
              </div>
              <h3 className="text-base sm:text-2xl font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors break-all sm:break-normal">
                {contact.email}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal leading-relaxed">
                Send job descriptions, interview invites, or technical requirements directly to my inbox.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-semibold text-blue-600">
              <span>COMPOSE EMAIL</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* 3. DIRECT PHONE CALL CARD */}
          <a
            href={`tel:${contact.phone.replace(/\s+/g, '')}`}
            className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-100 text-blue-600 border border-slate-200">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-500">Direct Phone</div>
                <div className="text-sm sm:text-lg font-mono font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {contact.phone}
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </a>

          {/* 4. LINKEDIN & GITHUB PROFILES CARD */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <a
                href="https://www.linkedin.com/in/akhileshravuri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/AKHILESHRAVURI2001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            <div className="text-left sm:text-right text-xs font-mono text-slate-500 pt-1 sm:pt-0">
              <span>Bengaluru, India</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


