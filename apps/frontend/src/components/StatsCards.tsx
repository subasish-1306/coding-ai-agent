import React from 'react';
import { Files, Folder, HardDrive, Layers, Code, Timer } from 'lucide-react';
import { ScanResponse } from '../types/scanner';

interface StatsCardsProps {
  data: ScanResponse;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  const { summary, statistics } = data;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const primaryLang = statistics.language_distribution[0]?.language || 'Unknown';

  const cards = [
    {
      title: 'Total Files',
      value: summary.total_files.toLocaleString(),
      subtitle: `${summary.ignored_directories} directories ignored`,
      icon: Files,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10 border-sky-500/20',
    },
    {
      title: 'Total Directories',
      value: summary.total_folders.toLocaleString(),
      subtitle: 'Scanned recursively',
      icon: Folder,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Repository Size',
      value: formatSize(summary.total_size_bytes),
      subtitle: 'Uncompressed size',
      icon: HardDrive,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Primary Framework',
      value: statistics.primary_framework || 'Custom / Vanilla',
      subtitle: `${statistics.detected_frameworks.length} detected`,
      icon: Layers,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Primary Language',
      value: primaryLang,
      subtitle: `${summary.extension_counts} file extensions`,
      icon: Code,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Scan Duration',
      value: `${summary.scanned_duration_ms} ms`,
      subtitle: 'Fast AST extraction',
      icon: Timer,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-sm ${card.bgColor}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">{card.title}</span>
              <Icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 truncate">
              {card.value}
            </div>
            <div className="text-[11px] text-slate-400 truncate">{card.subtitle}</div>
          </div>
        );
      })}
    </div>
  );
};
