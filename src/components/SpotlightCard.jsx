import React from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';

/**
 * Premium card: 3D tilt toward the pointer + a spotlight glow that tracks it.
 * `glow` is an rgb triplet string, e.g. "16,185,129".
 */
export default function SpotlightCard({
  as = 'div',
  children,
  className = '',
  glow = '56,189,248',
  tilt = 3,
  ...rest
}) {
  const Tag = motion[as] || motion.div;
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const px = useMotionValue(-200);
  const py = useMotionValue(-200);

  const rotateX = useSpring(useTransform(my, [0, 1], [tilt, -tilt]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-tilt, tilt]), { stiffness: 200, damping: 18 });

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${px}px ${py}px, rgba(${glow},0.18), transparent 70%)`;
  const borderGlow = useMotionTemplate`radial-gradient(220px circle at ${px}px ${py}px, rgba(${glow},0.9), transparent 70%)`;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    px.set(-200);
    py.set(-200);
  };

  return (
    <Tag
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`relative block overflow-hidden ${className}`}
      {...rest}
    >
      {/* gradient border that lights up near the pointer */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-70"
        style={{
          background: borderGlow,
          padding: 1.5,
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* inner spotlight */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{ background: spotlight }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </Tag>
  );
}
