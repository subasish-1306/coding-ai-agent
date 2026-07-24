import React from 'react';
import { FolderSearch, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Repository Analyzed Yet',
  description = 'Upload a ZIP source repository archive to trigger static AST scanning and AI architectural intelligence.',
  onReset,
}) => {
  return (
    <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center max-w-md mx-auto my-8">
      <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mx-auto mb-4">
        <FolderSearch className="w-8 h-8 text-sky-400" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-400 mb-6 leading-relaxed">{description}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs shadow-lg shadow-sky-600/20 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Upload Archive</span>
        </button>
      )}
    </div>
  );
};
