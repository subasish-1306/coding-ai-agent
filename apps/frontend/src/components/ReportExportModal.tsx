import React from 'react';
import { Download, FileCode, FileText, Code2, X } from 'lucide-react';
import { ScanResponse } from '../types/scanner';

interface ReportExportModalProps {
  data: ScanResponse;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({ data, isOpen, onClose }) => {
  if (!isOpen) return null;

  const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    downloadFile(`${data.metadata.original_filename}_code_intelligence.json`, jsonStr, 'application/json');
  };

  const handleExportMarkdown = () => {
    const intel = data.intelligence;
    const health = intel?.health;
    const arch = intel?.architecture;

    const md = `# AI Code Intelligence Audit Report

**Repository:** ${data.metadata.original_filename}  
**Workspace ID:** \`${data.workspace_id}\`  
**Scanned At:** ${data.metadata.scanned_at}  
**Overall Health Score:** ${health?.overall_score ?? 85} / 100  

---

## Executive Architectural Summary

${intel?.executive_summary ?? data.ai_summary.architecture_overview}

---

## Category Health Breakdown

- Folder Structure: ${health?.folder_structure ?? 85} / 100
- Project Organization: ${health?.project_organization ?? 85} / 100
- Documentation: ${health?.documentation ?? 70} / 100
- Configuration: ${health?.configuration ?? 80} / 100

---

## Architecture Analysis

- **Style:** ${arch?.style ?? 'Modular Package'}
- **Scale:** ${arch?.scale ?? 'Medium Project'}
- **Complexity:** ${arch?.complexity ?? 'Moderate'}

### Strengths
${(arch?.strengths ?? []).map((s) => `- ${s}`).join('\n')}

---

## Prioritized Recommendations

${(intel?.recommendations ?? []).map((r) => `### [${r.priority}] ${r.title}\n${r.description}\n\n**Solution:** ${r.suggested_solution}\n`).join('\n---\n')}
`;
    downloadFile(`${data.metadata.original_filename}_report.md`, md, 'text/markdown');
  };

  const handleExportHTML = () => {
    const intel = data.intelligence;
    const health = intel?.health;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Code Intelligence Report - ${data.metadata.original_filename}</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; line-height: 1.6; max-width: 900px; margin: 0 auto; }
        h1 { color: #38bdf8; border-bottom: 2px solid #334155; padding-bottom: 12px; }
        .score-card { background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0; }
        .score { font-size: 48px; font-weight: bold; color: #34d399; }
    </style>
</head>
<body>
    <h1>AI Code Intelligence Audit</h1>
    <p>Repository: <strong>${data.metadata.original_filename}</strong> | Workspace ID: <code>${data.workspace_id}</code></p>
    
    <div class="score-card">
        <div>Overall Health Score</div>
        <div class="score">${health?.overall_score ?? 85} / 100</div>
    </div>

    <h2>Executive Summary</h2>
    <p>${(intel?.executive_summary ?? data.ai_summary.architecture_overview).replace(/\n/g, '<br>')}</p>
</body>
</html>`;
    downloadFile(`${data.metadata.original_filename}_report.html`, html, 'text/html');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-sky-400" />
            <span>Export Intelligence Report</span>
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Select report export format for <strong>{data.metadata.original_filename}</strong>:
        </p>

        <div className="space-y-3">
          <button
            onClick={handleExportJSON}
            className="w-full p-4 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left flex items-center gap-3 transition-colors group"
          >
            <Code2 className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-white">Download Raw JSON Data (.json)</div>
              <div className="text-[11px] text-slate-400">Full structured scan & intelligence tree</div>
            </div>
          </button>

          <button
            onClick={handleExportMarkdown}
            className="w-full p-4 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left flex items-center gap-3 transition-colors group"
          >
            <FileText className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-white">Download Markdown Report (.md)</div>
              <div className="text-[11px] text-slate-400">Formatted documentation for GitHub & docs</div>
            </div>
          </button>

          <button
            onClick={handleExportHTML}
            className="w-full p-4 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left flex items-center gap-3 transition-colors group"
          >
            <FileCode className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-white">Download Styled HTML (.html)</div>
              <div className="text-[11px] text-slate-400">Standalone report document for sharing</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
