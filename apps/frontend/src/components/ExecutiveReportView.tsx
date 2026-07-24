import React from 'react';
import { FileText, Copy, Check, Printer } from 'lucide-react';

interface ExecutiveReportViewProps {
  summary: string;
}

export const ExecutiveReportView: React.FC<ExecutiveReportViewProps> = ({ summary }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-sky-400" />
          <h3 className="text-base font-bold text-white">Senior Software Architect Review</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print</span>
          </button>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 font-sans text-xs text-slate-300 leading-relaxed whitespace-pre-line">
        {summary}
      </div>
    </div>
  );
};
