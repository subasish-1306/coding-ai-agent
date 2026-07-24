import React from 'react';
import { ArchitectureAnalysis } from '../types/scanner';
import { Layers, ShieldCheck, AlertTriangle, Cpu } from 'lucide-react';

interface ArchitectureAnalysisCardProps {
  architecture: ArchitectureAnalysis;
}

export const ArchitectureAnalysisCard: React.FC<ArchitectureAnalysisCardProps> = ({ architecture }) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Architecture & Scale Evaluation</span>
          </h3>
          <p className="text-xs text-slate-400">Architectural classification & risk assessment</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold">
            {architecture.style}
          </span>
          <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20 text-xs font-semibold">
            Scale: {architecture.scale}
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-[10px] font-semibold text-slate-400 uppercase">Architecture Style</div>
          <div className="text-sm font-bold text-white mt-1">{architecture.style}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-[10px] font-semibold text-slate-400 uppercase">Codebase Complexity</div>
          <div className="text-sm font-bold text-white mt-1">{architecture.complexity}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-[10px] font-semibold text-slate-400 uppercase">Layer Separation</div>
          <div className="text-sm font-bold text-emerald-400 mt-1">{architecture.layer_separation_score} / 100</div>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Architectural Strengths</span>
          </h4>
          <ul className="space-y-2">
            {architecture.strengths.map((str, idx) => (
              <li key={idx} className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-slate-200">
                ✓ {str}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Potential Risks & Weaknesses</span>
          </h4>
          <ul className="space-y-2">
            {[...architecture.weaknesses, ...architecture.potential_risks].map((risk, idx) => (
              <li key={idx} className="p-2.5 rounded-lg bg-rose-500/5 border border-rose-500/20 text-xs text-rose-200/90">
                ⚠ {risk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
