import React from 'react';
import { GitBranch, Activity, Database, Box } from 'lucide-react';

export default function ProjectArchitectureCard({
  title = '',
  category = '',
}) {
  const renderVisual = () => {
    // 1. CI/CD Pipeline Flow
    if (title.includes('CI/CD') || title.includes('Pipeline') || title.includes('Terraform')) {
      return (
        <div className="w-full flex flex-col justify-between p-3.5 sm:p-4 bg-slate-50/90">
          <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono text-blue-700 mb-2.5">
            <span className="flex items-center gap-1.5 font-semibold">
              <GitBranch className="w-3.5 h-3.5 text-blue-600" /> CI/CD Automation Flow
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
              Automated
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-1.5 items-center">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-center min-w-0">
              <span className="block text-[11px] font-bold text-slate-800 truncate">Azure</span>
              <span className="block text-[9px] text-slate-500 font-medium">Code</span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-blue-50/80 border border-blue-200 shadow-sm text-center min-w-0">
              <span className="block text-[11px] font-bold text-blue-700 truncate">Jenkins</span>
              <span className="block text-[9px] text-blue-600 font-medium">Build</span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-emerald-50/80 border border-emerald-200 shadow-sm text-center min-w-0">
              <span className="block text-[11px] font-bold text-emerald-800 truncate">AWS</span>
              <span className="block text-[9px] text-emerald-600 font-medium">Deploy</span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-slate-500">
            <span>Quality: SonarQube</span>
            <span>IaC: Terraform</span>
          </div>
        </div>
      );
    }

    // 2. Kubernetes Cluster
    if (title.includes('Kubernetes') || title.includes('Microservices')) {
      return (
        <div className="w-full flex flex-col justify-between p-3.5 sm:p-4 bg-slate-50/90">
          <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono text-blue-700 mb-2.5">
            <span className="flex items-center gap-1.5 font-semibold">
              <Box className="w-3.5 h-3.5 text-blue-600" /> Container Orchestration
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300 font-semibold">
              K8s Cluster
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-center min-w-0">
              <span className="block text-[10px] sm:text-[11px] font-bold text-blue-700 truncate">Auth</span>
              <span className="block text-[9px] text-emerald-600 font-medium">● 3 Pods</span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-center min-w-0">
              <span className="block text-[10px] sm:text-[11px] font-bold text-indigo-700 truncate">Gateway</span>
              <span className="block text-[9px] text-emerald-600 font-medium">● 4 Pods</span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-center min-w-0">
              <span className="block text-[10px] sm:text-[11px] font-bold text-emerald-700 truncate">Engine</span>
              <span className="block text-[9px] text-emerald-600 font-medium">● 3 Pods</span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-slate-500">
            <span>Runtime: Docker</span>
            <span>Env: UAT & Staging</span>
          </div>
        </div>
      );
    }

    // 3. Prometheus & Grafana Monitoring
    if (title.includes('Monitoring') || title.includes('Observability') || title.includes('Prometheus')) {
      return (
        <div className="w-full flex flex-col justify-between p-3.5 sm:p-4 bg-slate-50/90">
          <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono text-blue-700 mb-2.5">
            <span className="flex items-center gap-1.5 font-semibold">
              <Activity className="w-3.5 h-3.5 text-blue-600" /> Real-time Observability
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold">
              99.9% Uptime
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-center min-w-0">
              <span className="block text-[10px] sm:text-[11px] font-bold text-amber-700 truncate">Prometheus</span>
              <span className="block text-[9px] text-slate-500 font-medium">Metrics</span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-center min-w-0">
              <span className="block text-[10px] sm:text-[11px] font-bold text-orange-700 truncate">Grafana</span>
              <span className="block text-[9px] text-slate-500 font-medium">Dashboards</span>
            </div>
            <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-center min-w-0">
              <span className="block text-[10px] sm:text-[11px] font-bold text-blue-700 truncate">Alerts</span>
              <span className="block text-[9px] text-slate-500 font-medium">Incidents</span>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-slate-500">
            <span>EC2, ECS & K8s</span>
            <span>Latency: &lt; 50ms</span>
          </div>
        </div>
      );
    }

    // 4. Full-Stack / Query Engine Architecture
    return (
      <div className="w-full flex flex-col justify-between p-3.5 sm:p-4 bg-slate-50/90">
        <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-mono text-blue-700 mb-2.5">
          <span className="flex items-center gap-1.5 font-semibold">
            <Database className="w-3.5 h-3.5 text-blue-600" /> Full-Stack Architecture
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300 font-semibold">
            Production Ready
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-center min-w-0">
            <span className="block text-[11px] font-bold text-blue-700 truncate">React</span>
            <span className="block text-[9px] text-slate-500 font-medium">Frontend</span>
          </div>
          <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-center min-w-0">
            <span className="block text-[11px] font-bold text-indigo-700 truncate">Node / PHP</span>
            <span className="block text-[9px] text-slate-500 font-medium">API</span>
          </div>
          <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-center min-w-0">
            <span className="block text-[11px] font-bold text-amber-700 truncate">Python</span>
            <span className="block text-[9px] text-slate-500 font-medium">Engine</span>
          </div>
          <div className="p-1.5 sm:p-2 rounded-lg bg-white border border-slate-200 shadow-sm text-center min-w-0">
            <span className="block text-[11px] font-bold text-emerald-700 truncate">MySQL</span>
            <span className="block text-[9px] text-slate-500 font-medium">Database</span>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-slate-500">
          <span>Query Engine</span>
          <span>Scalable Backend</span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 bg-white">
      {renderVisual()}
    </div>
  );
}
