import React from 'react';
import { Mail, Phone } from 'lucide-react';

export default function FloatingContactDock() {
  const emailUrl = 'mailto:akhileshravuri2001@gmail.com?subject=DevOps%20%2F%20Engineering%20Inquiry';
  const phoneUrl = 'tel:+917095643856';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* 1. Phone Call Button (Minimal Outline) */}
      <a
        href={phoneUrl}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white text-blue-600 border border-slate-200 shadow-lg hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
        aria-label="Call Akhilesh"
      >
        <Phone className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="absolute right-14 px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-mono whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          +91 7095643856
        </span>
      </a>

      {/* 2. Email Button (Minimal Outline) */}
      <a
        href={emailUrl}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white text-slate-700 border border-slate-200 shadow-lg hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
        aria-label="Email Akhilesh"
      >
        <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="absolute right-14 px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-mono whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Email Akhilesh
        </span>
      </a>
    </div>
  );
}


