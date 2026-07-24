import React from 'react';
import { FileCode, FileText } from 'lucide-react';
import { FileInfo } from '../types/scanner';

interface LargestFilesTableProps {
  files: FileInfo[];
}

export const LargestFilesTable: React.FC<LargestFilesTableProps> = ({ files }) => {
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileCode className="w-4 h-4 text-sky-400" />
            <span>Top 10 Largest Source Files</span>
          </h3>
          <p className="text-xs text-slate-400">Identified heavy files and modules</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-300 font-mono">
          Top {files.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Relative Path</th>
              <th className="py-3 px-4">Extension</th>
              <th className="py-3 px-4 text-right">Size</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {files.map((file, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-2.5 px-4 font-mono text-slate-200 flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="truncate max-w-md">{file.relative_path}</span>
                </td>
                <td className="py-2.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                    {file.extension || 'none'}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-right font-mono font-semibold text-slate-200">
                  {formatSize(file.size_bytes)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
