import React from 'react';
import { TechnologyIntelligence } from '../types/scanner';
import { Cpu, CheckCircle2, ArrowUpCircle } from 'lucide-react';

interface TechIntelligenceCardProps {
  intelligence: TechnologyIntelligence;
}

export const TechIntelligenceCard: React.FC<TechIntelligenceCardProps> = ({ intelligence }) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>Technology Intelligence & Upgrades</span>
          </h3>
          <p className="text-xs text-slate-400">Framework maturity & compatibility audit</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            {intelligence.framework_maturity}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
            <span>Technology Stack Recommendations</span>
          </h4>
          <ul className="space-y-2">
            {intelligence.recommendations.map((rec, idx) => (
              <li key={idx} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                • {rec}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5">
            <ArrowUpCircle className="w-4 h-4" />
            <span>Suggested Upgrades</span>
          </h4>
          <ul className="space-y-2">
            {intelligence.suggested_upgrades.map((upg, idx) => (
              <li key={idx} className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20 text-xs text-purple-200">
                ↑ {upg}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
