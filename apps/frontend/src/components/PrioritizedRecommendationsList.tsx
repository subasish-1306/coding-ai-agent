import React, { useState } from 'react';
import { PrioritizedRecommendation } from '../types/scanner';
import { AlertCircle, AlertTriangle, Info, CheckCircle, ShieldAlert } from 'lucide-react';

interface PrioritizedRecommendationsListProps {
  recommendations: PrioritizedRecommendation[];
}

export const PrioritizedRecommendationsList: React.FC<PrioritizedRecommendationsListProps> = ({ recommendations }) => {
  const [filter, setFilter] = useState<'All' | 'Critical' | 'High' | 'Medium' | 'Low'>('All');

  const filtered = filter === 'All' ? recommendations : recommendations.filter((r) => r.priority === filter);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return {
          icon: AlertCircle,
          color: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        };
      case 'High':
        return {
          icon: AlertTriangle,
          color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        };
      case 'Medium':
        return {
          icon: Info,
          color: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
        };
      default:
        return {
          icon: CheckCircle,
          color: 'bg-slate-800 text-slate-300 border-slate-700',
        };
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Prioritized Engineering Recommendations</span>
          </h3>
          <p className="text-xs text-slate-400">Actionable findings categorized by impact priority</p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium">
          {(['All', 'Critical', 'High', 'Medium', 'Low'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilter(p)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === p ? 'bg-sky-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((item, idx) => {
            const badge = getPriorityBadge(item.priority);
            const Icon = badge.icon;

            return (
              <div key={idx} className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{item.title}</span>
                  </h4>
                  <span className={`px-2.5 py-0.5 rounded-full border text-xs font-semibold flex items-center gap-1 ${badge.color}`}>
                    <Icon className="w-3 h-3" />
                    <span>{item.priority}</span>
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-900 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900/40 border border-slate-800">
                    <span className="font-semibold text-slate-400 block mb-0.5">Why it matters:</span>
                    <span className="text-slate-300">{item.why_it_matters}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-sky-950/20 border border-sky-900/30">
                    <span className="font-semibold text-sky-400 block mb-0.5">Suggested solution:</span>
                    <span className="text-sky-200/90">{item.suggested_solution}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-slate-500 text-xs italic">
            No recommendations match priority filter '{filter}'.
          </div>
        )}
      </div>
    </div>
  );
};
