import React from 'react';
import { Layers, CheckCircle2, Box } from 'lucide-react';

interface FrameworkCardsProps {
  primaryFramework: string | null;
  detectedFrameworks: string[];
}

export const FrameworkCards: React.FC<FrameworkCardsProps> = ({
  primaryFramework,
  detectedFrameworks,
}) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Frameworks & Dependencies</span>
            </h3>
            <p className="text-xs text-slate-400">Automated config & manifest analysis</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 font-semibold">
            {detectedFrameworks.length} Detected
          </span>
        </div>

        {/* Primary Framework Badge */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-900/30 via-slate-900 to-indigo-900/30 border border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
              <Box className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">Primary Framework</div>
              <div className="text-lg font-extrabold text-white">
                {primaryFramework || 'Custom / Standard Architecture'}
              </div>
            </div>
          </div>
          <div className="text-xs text-purple-300/80 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
            Detected via Manifest
          </div>
        </div>

        {/* All Detected Grid */}
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Detected Stack</div>
          {detectedFrameworks.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {detectedFrameworks.map((fw, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs font-medium text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">{fw}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-slate-500 italic p-3 text-center bg-slate-950/40 rounded-lg">
              No specific framework manifest detected. Standard source code format.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
