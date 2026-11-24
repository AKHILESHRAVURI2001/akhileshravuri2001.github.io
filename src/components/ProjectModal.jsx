import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Server } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

/**
 * Project details popup.
 * Desktop: centred dialog. Mobile: bottom sheet that fills most of the screen.
 * Rendered in a portal so parent transforms (card tilt) can't break fixed positioning.
 */
export default function ProjectModal({ project, accent, onClose }) {
  const open = !!project;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease }}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white flex items-center justify-center shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Mobile drag handle look */}
            <div className="sm:hidden absolute top-2 left-1/2 -translate-x-1/2 z-20 w-10 h-1.5 rounded-full bg-white/80" />

            <div className="overflow-y-auto overscroll-contain">
              {/* Image */}
              {project.image && (
                <div className="relative h-48 sm:h-64 bg-slate-50">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>
              )}

              <div className="px-5 sm:px-8 pb-8 -mt-4 relative">
                <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold border ${accent.chip}`}>
                  {project.category}
                </span>
                <h3
                  id="project-modal-title"
                  className="mt-3 text-2xl sm:text-3xl font-display font-extrabold text-slate-900 leading-tight"
                >
                  {project.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">{project.description}</p>

                {/* Stats */}
                {Array.isArray(project.metrics) && project.metrics.length > 0 && (
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{m.label}</div>
                        <div className={`text-sm font-bold ${accent.text} mt-0.5`}>{m.value}</div>
                      </div>
                    ))}
                    {project.environment && (
                      <div className="rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3">
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1">
                          <Server className="w-3 h-3" /> Environment
                        </div>
                        <div className={`text-sm font-bold ${accent.text} mt-0.5`}>{project.environment}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Highlights */}
                {Array.isArray(project.highlights) && (
                  <>
                    <h4 className="mt-7 text-sm font-bold text-slate-900 uppercase tracking-wider">What I did</h4>
                    <ul className="mt-3 space-y-3">
                      {project.highlights.map((h, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease }}
                          className="flex gap-3 text-sm text-slate-600 leading-relaxed"
                        >
                          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${accent.dot}`} />
                          <span>{h}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Impact */}
                {project.impact && (
                  <div className="mt-7 flex items-start gap-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white px-5 py-4">
                    <Sparkles className="w-5 h-5 flex-shrink-0 text-amber-300" />
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Key outcome</div>
                      <div className="text-sm font-semibold mt-0.5">{project.impact}</div>
                    </div>
                  </div>
                )}

                {/* Full tech stack */}
                {Array.isArray(project.techStack) && (
                  <>
                    <h4 className="mt-7 text-sm font-bold text-slate-900 uppercase tracking-wider">Tech stack</h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.techStack.map((t) => (
                        <span key={t} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${accent.chip}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
