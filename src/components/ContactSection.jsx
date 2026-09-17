import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles, Terminal, Linkedin, Github } from 'lucide-react';
import confetti from 'canvas-confetti';

const socialIcons = {
  Linkedin: Linkedin,
  Github: Github,
  Mail: Mail,
};

export default function ContactSection({ contact, social }) {
  if (!contact) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'transmitting' | 'sent' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMessage('Please fill in all mandatory quantum telemetry vectors.');
      return;
    }

    setStatus('transmitting');
    setStatusMessage('Transmitting wavepacket via Google Apps Script Node...');

    try {
      if (contact.googleScriptUrl) {
        const payload = new URLSearchParams();
        payload.append('name', formData.name);
        payload.append('email', formData.email);
        payload.append('subject', formData.subject || 'Portfolio Inquiry');
        payload.append('message', formData.message);

        await fetch(contact.googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: payload.toString(),
        });
      }

      setStatus('sent');
      setStatusMessage('Transmission Received & Entangled. I will respond swiftly.');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f5ff', '#a855f7', '#10b981', '#ffffff'],
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Submission failed:', err);
      // Fallback to mailto
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        formData.subject || 'Portfolio Handshake'
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      setStatus('sent');
      setStatusMessage('Fallback mailer invoked. Check your default email client.');
    }
  };

  return (
    <section id="contact" className="py-24 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-higgs-cyan mb-4">
            <Terminal className="w-3.5 h-3.5 text-higgs-cyan" />
            <span>COMMUNICATION FREQUENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight">
            {contact.title || 'Initialize Quantum Handshake'}
          </h2>
          {contact.subtitle && (
            <p className="mt-3 text-slate-300 font-light text-base">
              {contact.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Coordinates & Social Matrix (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-cyan-500/20 space-y-6">
              <h3 className="text-sm font-mono uppercase tracking-widest text-higgs-cyan flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>DIRECT COORDINATES</span>
              </h3>

              <div className="space-y-4">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-quantum-surface/70 border border-cyan-500/15 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all group"
                  >
                    <div className="p-3 rounded-lg bg-cyan-950/80 text-higgs-cyan border border-cyan-500/30 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Electronic Mail</div>
                      <div className="text-sm font-mono font-medium text-white group-hover:text-higgs-cyan transition-colors">
                        {contact.email}
                      </div>
                    </div>
                  </a>
                )}

                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-quantum-surface/70 border border-cyan-500/15 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all group"
                  >
                    <div className="p-3 rounded-lg bg-cyan-950/80 text-higgs-cyan border border-cyan-500/30 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Voice / Signal</div>
                      <div className="text-sm font-mono font-medium text-white group-hover:text-higgs-cyan transition-colors">
                        {contact.phone}
                      </div>
                    </div>
                  </a>
                )}

                {contact.location && (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-quantum-surface/70 border border-cyan-500/15">
                    <div className="p-3 rounded-lg bg-cyan-950/80 text-purple-400 border border-purple-500/30">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Base Location</div>
                      <div className="text-sm font-mono font-medium text-white">
                        {contact.location}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Channels */}
              {social && Array.isArray(social) && social.length > 0 && (
                <div className="pt-4 border-t border-cyan-500/15">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                    ENTANGLED PROFILES
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {social.map((s, idx) => {
                      const Icon = socialIcons[s.icon] || Mail;
                      return (
                        <a
                          key={idx}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono glass-panel border-cyan-500/20 hover:border-cyan-400 hover:text-higgs-cyan transition-all transform hover:-translate-y-0.5"
                        >
                          <Icon className="w-4 h-4" />
                          <span>{s.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Quantum Transmission Terminal Form (7 cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass-panel-glow p-6 sm:p-8 rounded-3xl border-cyan-500/30 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                <span className="text-xs font-mono text-higgs-cyan font-bold">
                  SIGNAL DISPATCH TERMINAL
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {contact.status || 'ENCRYPTED 256-BIT'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Your Name / Organization <span className="text-higgs-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-3 rounded-xl bg-quantum-surface/90 border border-cyan-500/25 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Return Email Channel <span className="text-higgs-cyan">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-quantum-surface/90 border border-cyan-500/25 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Inquiry Vector / Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. DevOps Architecture Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-quantum-surface/90 border border-cyan-500/25 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Message Payload <span className="text-higgs-cyan">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Describe project requirements, tech stack details, or schedule a discussion..."
                  className="w-full px-4 py-3 rounded-xl bg-quantum-surface/90 border border-cyan-500/25 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600 resize-none"
                />
              </div>

              {/* Status Feedback */}
              {status !== 'idle' && (
                <div
                  className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 ${
                    status === 'sent'
                      ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-300'
                      : status === 'transmitting'
                      ? 'bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 animate-pulse'
                      : 'bg-red-950/70 border border-red-500/40 text-red-300'
                  }`}
                >
                  {status === 'sent' && <CheckCircle2 className="w-4 h-4" />}
                  {status === 'transmitting' && <Sparkles className="w-4 h-4 animate-spin" />}
                  {status === 'error' && <AlertCircle className="w-4 h-4" />}
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'transmitting'}
                className="w-full py-4 rounded-xl font-mono text-sm font-bold text-quantum-dark bg-gradient-to-r from-higgs-cyan to-higgs-neon hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {status === 'transmitting' ? 'DISPATCHING PACKET...' : 'TRANSMIT WAVEFORM'}
                </span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
