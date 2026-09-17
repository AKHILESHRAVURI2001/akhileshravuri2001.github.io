import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, ArrowUp, Sparkles } from 'lucide-react';

export default function FloatingContactDock() {
  const whatsappNumber = '917095643856';
  const whatsappMessage = encodeURIComponent(
    'Hi Akhilesh, I saw your portfolio and would like to connect with you regarding an opportunity!'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const emailUrl = 'mailto:akhileshravuri2001@gmail.com?subject=Portfolio%20Opportunity%20Discussion';
  const phoneUrl = 'tel:+917095643856';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* 1. Floating WhatsApp Button (Primary Green Glow) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 text-white shadow-[0_4px_25px_rgba(16,185,129,0.5)] hover:bg-emerald-400 hover:shadow-[0_6px_30px_rgba(16,185,129,0.7)] hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30 pointer-events-none" />
        
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />

        {/* Hover Tooltip */}
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-quantum-dark/95 border border-emerald-500/40 text-emerald-300 text-xs font-mono whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      {/* 2. Floating Email Button (Cyan Glow) */}
      <a
        href={emailUrl}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-cyan-500 text-quantum-dark shadow-[0_4px_20px_rgba(0,245,255,0.4)] hover:bg-cyan-400 hover:shadow-[0_6px_25px_rgba(0,245,255,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Send Email"
      >
        <Mail className="w-5 h-5" />

        {/* Hover Tooltip */}
        <span className="absolute right-14 px-3 py-1.5 rounded-xl bg-quantum-dark/95 border border-cyan-500/40 text-higgs-cyan text-xs font-mono whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Send Email
        </span>
      </a>

      {/* 3. Floating Phone Button (Purple Glow) */}
      <a
        href={phoneUrl}
        className="group relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-purple-600 text-white shadow-[0_4px_18px_rgba(168,85,247,0.4)] hover:bg-purple-500 hover:shadow-[0_6px_22px_rgba(168,85,247,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
        aria-label="Call Phone"
      >
        <Phone className="w-4 h-4" />

        {/* Hover Tooltip */}
        <span className="absolute right-13 px-3 py-1.5 rounded-xl bg-quantum-dark/95 border border-purple-500/40 text-purple-300 text-xs font-mono whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          +91 7095643856
        </span>
      </a>

    </div>
  );
}
