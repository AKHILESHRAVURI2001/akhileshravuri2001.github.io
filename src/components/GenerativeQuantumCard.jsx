import React, { useRef, useEffect, useState } from 'react';
import { Activity, Radio, Cpu, Sparkles } from 'lucide-react';

/**
 * Computes a numeric seed from a string hash
 */
function hashToSeed(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function GenerativeQuantumCard({
  quantumHash = '0x0000_QUANTUM_NULL',
  energyFrequency = '500.0 THz',
  title = '',
  category = '',
  isHovered = false,
}) {
  const canvasRef = useRef(null);
  const [telemetry, setTelemetry] = useState({
    flux: 0.94,
    entropy: '0.012 eV',
    coherence: '99.8%',
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let time = 0;

    // Derive deterministic parameters from hash
    const seed = hashToSeed(quantumHash);
    const harmonicA = (seed % 7) + 2;
    const harmonicB = ((seed >> 3) % 5) + 3;
    const colorScheme = seed % 3; // 0: Cyan/Blue, 1: Violet/Pink, 2: Emerald/Amber

    // Particle nodes for visualization
    const particles = Array.from({ length: 24 }, (_, i) => ({
      angle: (i / 24) * Math.PI * 2,
      distance: 30 + ((seed * (i + 1)) % 70),
      speed: 0.015 + ((i % 5) * 0.005),
      size: 1.2 + (i % 3) * 0.8,
    }));

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      time += isHovered ? 0.045 : 0.02;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Quantum Dark Energy Background Gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      bgGrad.addColorStop(0, '#0a1628');
      bgGrad.addColorStop(0.6, '#060d1a');
      bgGrad.addColorStop(1, '#030712');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Coordinate Grid & Quantum Concentric Probability Rings
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      const cx = width / 2;
      const cy = height / 2;

      for (let r = 25; r < Math.max(width, height) * 0.6; r += 35) {
        ctx.beginPath();
        ctx.arc(cx, cy, r + Math.sin(time * 1.5 + r) * 2, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Topological Waveform Interference
      const wavesCount = 4;
      for (let w = 0; w < wavesCount; w++) {
        ctx.beginPath();
        const waveOffset = (w * Math.PI) / wavesCount;
        const amplitude = (height * 0.16) * (1 + (isHovered ? 0.35 : 0));

        for (let x = 0; x <= width; x += 4) {
          const normX = (x / width) * Math.PI * 2;
          const y =
            cy +
            Math.sin(normX * harmonicA + time + waveOffset) * amplitude * 0.6 +
            Math.cos(normX * harmonicB - time * 0.8 + waveOffset) * amplitude * 0.4;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Color styling by theme
        if (colorScheme === 0) {
          ctx.strokeStyle = `rgba(0, 245, 255, ${0.45 - w * 0.08})`;
        } else if (colorScheme === 1) {
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.45 - w * 0.08})`;
        } else {
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.45 - w * 0.08})`;
        }

        ctx.lineWidth = w === 0 ? 2.2 : 1.2;
        ctx.stroke();
      }

      // 4. Orbiting Quantum Probability Sparks
      particles.forEach((p, idx) => {
        p.angle += p.speed * (isHovered ? 1.8 : 1.0);
        const radius = p.distance + Math.sin(time * 2 + idx) * 8;
        const px = cx + Math.cos(p.angle) * radius * (width / 320);
        const py = cy + Math.sin(p.angle) * (radius * 0.55);

        ctx.beginPath();
        ctx.arc(px, py, p.size * (isHovered ? 1.4 : 1.0), 0, Math.PI * 2);
        ctx.fillStyle = idx % 2 === 0 ? '#00f5ff' : '#a855f7';
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // 5. Central Singularity Core
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 32);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      coreGrad.addColorStop(0.3, 'rgba(0, 245, 255, 0.6)');
      coreGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.25)');
      coreGrad.addColorStop(1, 'rgba(3, 7, 18, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 32 + Math.sin(time * 3) * 4, 0, Math.PI * 2);
      ctx.fill();

      // 6. Scanning Laser Sweep
      const scanY = (Math.sin(time * 1.2) * 0.5 + 0.5) * height;
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [quantumHash, isHovered]);

  return (
    <div className="relative w-full h-52 sm:h-60 rounded-xl overflow-hidden border border-cyan-500/20 bg-quantum-deep group">
      {/* Generative Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair transition-transform duration-500 group-hover:scale-105"
      />

      {/* Top HUD Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-quantum-dark/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-higgs-cyan">
          <Radio className="w-3 h-3 animate-pulse text-higgs-cyan" />
          <span>{energyFrequency}</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-quantum-dark/80 backdrop-blur-md border border-purple-500/30 text-[10px] font-mono text-purple-300">
          <Cpu className="w-3 h-3 text-purple-400" />
          <span>{quantumHash}</span>
        </div>
      </div>

      {/* Bottom Telemetry Strip */}
      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-quantum-dark via-quantum-dark/90 to-transparent flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-higgs-cyan animate-pulse" />
          <span className="text-[11px] font-mono text-slate-300 tracking-wider">
            HIGGS DENSITY: <strong className="text-white">OPTIMAL</strong>
          </span>
        </div>
        <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
          |ψ|² = 0.99
        </div>
      </div>
    </div>
  );
}
