import React from 'react';
import { Sparkles, Activity, CheckCircle, ShieldAlert, Cpu } from 'lucide-react';
import { AISummary } from '../types/scanner';

interface AISummaryCardProps {
  summary: AISummary;
}

export const AISummaryCard: React.FC<AISummaryCardProps> = ({ summary }) => {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-sky-500/30 p-6 sm:p-8 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>{summary.title}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                AI Architectural Insight
              </span>
            </h2>
            <p className="text-xs text-slate-400">Generative code intelligence breakdown</p>
          </div>
        </div>

        {/* Health Gauge */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800">
          <Activity className="w-5 h-5 text-emerald-400" />
          <div>
            <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Code Health Score</div>
            <div className="text-lg font-extrabold text-emerald-400">{summary.code_health_score} / 100</div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6">
        {/* Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>Architectural Overview</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {summary.architecture_overview}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Tech Stack Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {summary.tech_stack_highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 text-xs text-slate-200">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations & Modules */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Main Modules</h3>
            <div className="flex flex-wrap gap-1.5">
              {summary.key_modules.map((mod, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700">
                  /{mod}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Recommendations</span>
            </h3>
            <ul className="space-y-2">
              {summary.recommendations.map((rec, idx) => (
                <li key={idx} className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
                  • {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
