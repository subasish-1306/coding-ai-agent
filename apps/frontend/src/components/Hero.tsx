import React from 'react';
import { Layers, Zap, FolderSearch, Code2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden pt-8 pb-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-sky-500/30 text-xs font-semibold text-sky-400 mb-6 shadow-lg shadow-sky-950">
          <Zap className="h-3.5 w-3.5" />
          <span>Automated Repository Scanner & Intelligence Engine</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
          Analyze Any Codebase <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            In Seconds With AI
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Upload a repository archive to extract structural metadata, language distribution, framework dependencies, largest files, and generative AI architectural summaries.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <FolderSearch className="h-5 w-5 text-sky-400 mb-2" />
            <div className="text-sm font-semibold text-slate-200">ZIP Extraction</div>
            <div className="text-xs text-slate-400">Recursive scanning</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <Code2 className="h-5 w-5 text-blue-400 mb-2" />
            <div className="text-sm font-semibold text-slate-200">30+ Languages</div>
            <div className="text-xs text-slate-400">Extension mapping</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <Layers className="h-5 w-5 text-indigo-400 mb-2" />
            <div className="text-sm font-semibold text-slate-200">Framework Detection</div>
            <div className="text-xs text-slate-400">Manifest heuristics</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
            <Zap className="h-5 w-5 text-amber-400 mb-2" />
            <div className="text-sm font-semibold text-slate-200">AI Summary</div>
            <div className="text-xs text-slate-400">Architectural analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
};
