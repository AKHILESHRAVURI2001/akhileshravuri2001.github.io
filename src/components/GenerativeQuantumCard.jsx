import React, { useRef, useEffect } from 'react';
import { Layers, Server, Activity, GitBranch, Box, Cpu } from 'lucide-react';

export default function GenerativeQuantumCard({
  quantumHash = '0x0000',
  title = '',
  category = '',
  isHovered = false,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let time = 0;

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
      time += isHovered ? 0.04 : 0.02;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Dark Cloud VPC Background
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, '#09152b');
      bgGrad.addColorStop(0.7, '#050c1b');
      bgGrad.addColorStop(1, '#030712');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Cloud VPC Grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.06)';
      ctx.lineWidth = 1;
      const gridSize = 24;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 3. Render specific Cloud / DevOps Architecture Graphics based on project title
      if (title.includes('CI/CD') || title.includes('Pipeline') || title.includes('Terraform')) {
        // CI/CD Pipeline Architecture Visual
        const stages = ['Code (Azure)', 'Build (Jenkins)', 'SonarQube', 'Terraform', 'AWS Staging', 'Prod'];
        const stageCount = stages.length;
        const startX = 35;
        const endX = width - 35;
        const spacing = (endX - startX) / (stageCount - 1);
        const cy = height * 0.52;

        // Pipeline connection bus
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(startX, cy);
        ctx.lineTo(endX, cy);
        ctx.stroke();

        // Traveling deployment packet pulse
        const packetProgress = (time * 0.4) % 1;
        const packetX = startX + packetProgress * (endX - startX);
        ctx.beginPath();
        ctx.arc(packetX, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#00f5ff';
        ctx.shadowColor = '#00f5ff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Pipeline Stages Nodes
        stages.forEach((st, i) => {
          const sx = startX + i * spacing;
          const isActive = (packetX >= sx - 15 && packetX <= sx + 15) || isHovered;

          ctx.beginPath();
          ctx.arc(sx, cy, isActive ? 9 : 6, 0, Math.PI * 2);
          ctx.fillStyle = i === stageCount - 1 ? '#10b981' : i === 2 ? '#a855f7' : '#00f5ff';
          ctx.fill();

          ctx.fillStyle = isActive ? '#ffffff' : 'rgba(148, 163, 184, 0.8)';
          ctx.font = '9px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText(st, sx, cy + (i % 2 === 0 ? -16 : 22));
        });
      } else if (title.includes('Kubernetes') || title.includes('Microservices')) {
        // Kubernetes Cluster Architecture Visual
        const cx = width / 2;
        const cy = height * 0.52;

        // Cluster Boundary Ring
        ctx.strokeStyle = 'rgba(50, 108, 229, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(cx, cy, 50 + Math.sin(time) * 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Master Control Plane (Center)
        ctx.beginPath();
        ctx.arc(cx, cy, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#326CE5';
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px Space Grotesk, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('K8s', cx, cy + 3.5);

        // Worker Pods Orbiting
        const podCount = 6;
        for (let p = 0; p < podCount; p++) {
          const angle = (p / podCount) * Math.PI * 2 + time * 0.5;
          const radius = 52 + (p % 2 === 0 ? 8 : -6);
          const px = cx + Math.cos(angle) * radius;
          const py = cy + Math.sin(angle) * radius;

          // Pod to Master link
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.stroke();

          // Pod Node
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981'; // Green healthy pod
          ctx.fill();
        }
      } else if (title.includes('Monitoring') || title.includes('Observability') || title.includes('Prometheus')) {
        // Prometheus & Grafana Metric Dashboard Visual
        const startY = height * 0.72;
        const graphHeight = height * 0.45;

        // Time-series metric lines
        ['#FF9900', '#00f5ff', '#10b981'].forEach((lineColor, lIdx) => {
          ctx.beginPath();
          for (let x = 0; x <= width; x += 6) {
            const freq = 0.02 + lIdx * 0.01;
            const y = startY - Math.sin(x * freq + time * (1.5 + lIdx * 0.5)) * (graphHeight * 0.35) - lIdx * 12;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 2;
          ctx.stroke();
        });

        // Current metric value marker
        const liveX = width * 0.75;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(liveX, 20);
        ctx.lineTo(liveX, height - 20);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        // High-Efficiency Query Engine / React & Node Feature Mesh Visual
        const cx = width / 2;
        const cy = height * 0.52;

        // Data nodes & AST trees
        const nodes = [
          { x: cx - 70, y: cy - 25, label: 'Client / API', color: '#61DAFB' },
          { x: cx, y: cy, label: 'Validation AST', color: '#FF9900' },
          { x: cx + 70, y: cy - 25, label: 'MySQL Engine', color: '#00f5ff' },
          { x: cx, y: cy + 38, label: 'Cache / Store', color: '#10b981' },
        ];

        // Draw connections
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.lineWidth = 2;
        nodes.forEach((n, i) => {
          nodes.forEach((m, j) => {
            if (i < j) {
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(m.x, m.y);
              ctx.stroke();
            }
          });
        });

        // Draw node points
        nodes.forEach((n) => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.x, n.y + 18);
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [title, isHovered]);

  return (
    <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden border border-cyan-500/20 bg-quantum-deep group">
      {/* Visual Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block transition-transform duration-500 group-hover:scale-105"
      />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-quantum-dark/85 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-higgs-cyan">
          <Layers className="w-3.5 h-3.5 text-higgs-cyan" />
          <span>{category || 'Cloud Architecture'}</span>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-quantum-dark/85 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
          <Server className="w-3 h-3 text-emerald-400" />
          <span>Architecture Schematic</span>
        </div>
      </div>

      {/* Bottom Status Strip */}
      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-quantum-dark via-quantum-dark/90 to-transparent flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
          <span className="text-[11px] font-mono text-slate-300 font-medium">
            {title || 'Infrastructure Deployment'}
          </span>
        </div>
        <div className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
          Verified
        </div>
      </div>
    </div>
  );
}
