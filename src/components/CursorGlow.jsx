import React, { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion';

/** A small dot that chases the cursor with its own spring — stacked to form a trail. */
function TrailDot({ x, y, stiffness, size, opacity }) {
  const sx = useSpring(x, { stiffness, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness, damping: 22, mass: 0.6 });
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 rounded-full bg-sky-400 pointer-events-none z-[9998]"
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        opacity,
      }}
    />
  );
}

/**
 * Site-wide cursor-reactive background:
 *  - soft aurora glow that follows the pointer
 *  - a brighter grid that is only revealed around the pointer
 *  - ring + spring trail that grows over interactive elements
 * Only mounts for fine pointers (mouse/trackpad) and respects reduced-motion.
 */
export default function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-600);
  const y = useMotionValue(-600);

  const glowX = useSpring(x, { stiffness: 70, damping: 20, mass: 0.8 });
  const glowY = useSpring(y, { stiffness: 70, damping: 20, mass: 0.8 });
  const ringX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.5 });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return undefined;
    setEnabled(true);

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target;
      setHovering(!!(t && t.closest && t.closest('a, button, [role="button"], input, textarea')));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [reduce, x, y]);

  const gridMask = useMotionTemplate`radial-gradient(240px circle at ${glowX}px ${glowY}px, black 0%, transparent 100%)`;
  const aurora = useMotionTemplate`radial-gradient(520px circle at ${glowX}px ${glowY}px, rgba(56,189,248,0.20), rgba(99,102,241,0.10) 45%, transparent 72%)`;

  if (!enabled) return null;

  return (
    <>
      {/* Aurora glow */}
      <motion.div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-[60]"
        style={{ background: aurora }}
      />

      {/* Grid revealed under the cursor */}
      <motion.div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(37,99,235,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.35) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
        }}
      />

      {/* Spring trail (skipped for reduced-motion users) */}
      {!reduce && (
        <>
          <TrailDot x={x} y={y} stiffness={120} size={6} opacity={0.35} />
          <TrailDot x={x} y={y} stiffness={80} size={5} opacity={0.25} />
          <TrailDot x={x} y={y} stiffness={55} size={4} opacity={0.18} />
        </>
      )}

      {/* Cursor ring */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border border-sky-500 bg-sky-400/10"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: hovering ? 54 : 30,
          height: hovering ? 54 : 30,
          scale: pressed ? 0.8 : 1,
          backgroundColor: hovering ? 'rgba(56,189,248,0.18)' : 'rgba(56,189,248,0.06)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </>
  );
}
