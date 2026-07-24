import React from 'react';
import { Cpu, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface AnalyzingLoaderProps {
  progressPercent: number;
}

export const AnalyzingLoader: React.FC<AnalyzingLoaderProps> = ({ progressPercent }) => {
  const steps = [
    { label: 'Unpacking ZIP Archive & Safe Extraction', threshold: 20 },
    { label: 'Scanning Recursive Directory & Filter Rules', threshold: 45 },
    { label: 'Detecting Frameworks & Extension Languages', threshold: 70 },
    { label: 'Computing Derived Statistics & Metrics', threshold: 85 },
    { label: 'Generating Generative AI Architectural Summary', threshold: 95 },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="relative w-24 h-24 mx-auto mb-8">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-sky-500 to-indigo-600 animate-spin blur-xl opacity-50" />
        <div className="relative w-full h-full rounded-3xl bg-slate-950 border border-sky-500/40 p-0.5 flex items-center justify-center shadow-2xl">
          <Cpu className="w-10 h-10 text-sky-400 animate-bounce" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Analyzing Repository</h2>
      <p className="text-slate-400 text-sm mb-8">
        Parsing source code structure, identifying manifests, and executing static analysis...
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-3 mb-8 overflow-hidden p-0.5 shadow-inner">
        <div
          className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.max(progressPercent, 10)}%` }}
        />
      </div>

      {/* Step checklist */}
      <div className="space-y-3 text-left max-w-md mx-auto bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
        {steps.map((step, idx) => {
          const isDone = progressPercent >= step.threshold;
          const prevThreshold = idx > 0 ? steps[idx - 1]?.threshold ?? 0 : 0;
          const isCurrent = !isDone && (idx === 0 || progressPercent >= prevThreshold);

          return (
            <div key={idx} className="flex items-center gap-3 text-sm">
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-sky-400 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
              )}
              <span
                className={
                  isDone
                    ? 'text-slate-300 font-medium'
                    : isCurrent
                    ? 'text-sky-300 font-semibold'
                    : 'text-slate-500'
                }
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
        <span>Powered by Coding AI Agent Engine</span>
      </div>
    </div>
  );
};
