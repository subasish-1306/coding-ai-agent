import React from 'react';
import { QualityAudit } from '../types/scanner';
import { CheckCircle2, XCircle, FileText, Shield, HardDrive, GitBranch, Box } from 'lucide-react';

interface QualityAuditGridProps {
  quality: QualityAudit;
}

export const QualityAuditGrid: React.FC<QualityAuditGridProps> = ({ quality }) => {
  const items = [
    {
      label: 'README Documentation',
      passed: quality.has_readme,
      icon: FileText,
      desc: quality.has_readme ? 'Root README.md present' : 'Missing root README.md file',
    },
    {
      label: 'License File',
      passed: quality.has_license,
      icon: Shield,
      desc: quality.has_license ? 'LICENSE file present' : 'Missing explicit LICENSE file',
    },
    {
      label: 'Git Ignore Config',
      passed: quality.has_gitignore,
      icon: GitBranch,
      desc: quality.has_gitignore ? '.gitignore configured' : 'Missing root .gitignore file',
    },
    {
      label: 'Docker Containerization',
      passed: quality.has_docker,
      icon: Box,
      desc: quality.has_docker ? 'Dockerfile / Docker Compose present' : 'Missing Docker container setup',
    },
    {
      label: 'CI/CD Pipeline',
      passed: quality.has_ci,
      icon: GitBranch,
      desc: quality.has_ci ? 'GitHub Actions / CI workflows present' : 'Missing CI/CD pipeline setup',
    },
    {
      label: 'Large Source Files Audit',
      passed: quality.large_files_count === 0,
      icon: HardDrive,
      desc: quality.large_files_count === 0 ? 'No files > 1MB detected' : `${quality.large_files_count} file(s) exceeding 1MB`,
    },
  ];

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-400" />
            <span>Repository Setup & Quality Audit</span>
          </h3>
          <p className="text-xs text-slate-400">Automated structural compliance checklist</p>
        </div>
        <div className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono">
          Score: {quality.config_quality_score} / 100
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all ${
                item.passed
                  ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-200'
                  : 'bg-rose-500/5 border-rose-500/20 text-slate-300'
              }`}
            >
              {item.passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <div className="truncate">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.label}</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate">{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
