import React from 'react';
import { Cpu, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

interface NavbarProps {
  hasScanResult: boolean;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ hasScanResult, onReset }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-sky-500/20">
            <div className="h-full w-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Cpu className="h-5 w-5 text-sky-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Coding AI Agent
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-full">
                v1.0 MVP
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Repository Code Analysis & AI Architecture Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Local Secure Scanner Engine</span>
          </div>

          {hasScanResult && (
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all shadow-sm hover:shadow-sky-500/10"
            >
              <RotateCcw className="h-4 w-4 text-sky-400" />
              <span>Scan New Repository</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500/10 to-indigo-500/10 border border-sky-500/20 text-xs font-medium text-sky-300">
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>AI Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
};
