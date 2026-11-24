import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Linkedin, Github } from 'lucide-react';
import { Reveal, Stagger, StaggerItem } from './Reveal';

function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function ContactSection({ contact }) {
  if (!contact) return null;

  const phoneClean = contact.phone.replace(/\s+/g, '');
  const whatsappMessage = encodeURIComponent(
    'Hi Akhilesh, I saw your portfolio and would like to connect with you regarding an opportunity!'
  );

  const titleWords = (contact.title || "Let's Connect").trim().split(/\s+/);
  const titleTail = titleWords.pop();
  const titleHead = titleWords.join(' ');

  const links = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/917095643856?text=${whatsappMessage}`,
      icon: WhatsAppIcon,
      tone: 'bg-[#25D366] shadow-[#25D366]/30',
      external: true,
    },
    {
      label: 'Call',
      href: `tel:${phoneClean}`,
      icon: Phone,
      tone: 'bg-indigo-500 shadow-indigo-500/30',
    },
    {
      label: 'Email',
      href: `mailto:${contact.email}?subject=Opportunity%20Discussion`,
      icon: Mail,
      tone: 'bg-blue-600 shadow-blue-600/30',
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/akhileshravuri',
      icon: Linkedin,
      tone: 'bg-sky-600 shadow-sky-600/30',
      external: true,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/AKHILESHRAVURI2001',
      icon: Github,
      tone: 'bg-slate-900 shadow-slate-900/30',
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-blue-600 shadow-sm mb-4">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-extrabold text-slate-900 leading-tight tracking-tight">
            {titleHead}{titleHead && ' '}
            <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 bg-clip-text text-transparent">
              {titleTail}
            </span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Open to DevOps and Full-Stack roles. Reach out through any of these.
          </p>
        </Reveal>

        <Stagger className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-5 sm:gap-8" stagger={0.08}>
          {links.map(({ label, href, icon: Icon, tone, external }) => (
            <StaggerItem key={label}>
              <motion.a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                aria-label={label}
                title={label}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.92 }}
                className="group flex flex-col items-center gap-3 cursor-pointer"
              >
                <span
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${tone} text-white flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow`}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-110 transition-transform" />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                  {label}
                </span>
              </motion.a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
