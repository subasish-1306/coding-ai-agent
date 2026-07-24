import React, { useState } from 'react';
import { ScanResponse } from '../types/scanner';
import { StatsCards } from './StatsCards';
import { AISummaryCard } from './AISummaryCard';
import { LanguageChart } from './LanguageChart';
import { FrameworkCards } from './FrameworkCards';
import { LargestFilesTable } from './LargestFilesTable';
import { FileTreeExplorer } from './FileTreeExplorer';
import { HealthRadarChart } from './HealthRadarChart';
import { DeveloperMetricsGrid } from './DeveloperMetricsGrid';
import { QualityAuditGrid } from './QualityAuditGrid';
import { ArchitectureAnalysisCard } from './ArchitectureAnalysisCard';
import { TechIntelligenceCard } from './TechIntelligenceCard';
import { PrioritizedRecommendationsList } from './PrioritizedRecommendationsList';
import { ExecutiveReportView } from './ExecutiveReportView';
import { ReportExportModal } from './ReportExportModal';
import { LayoutDashboard, FileCode, Layers, PieChart, ShieldCheck, Cpu, Download, FileText } from 'lucide-react';

interface DashboardProps {
  data: ScanResponse;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'architecture' | 'tech' | 'recommendations' | 'files'>('overview');
  const [isExportOpen, setIsExportOpen] = useState(false);

  const intel = data.intelligence;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <div className="text-xs uppercase font-bold tracking-wider text-sky-400 mb-1 flex items-center gap-2">
            <span>AI Code Intelligence Workspace</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
              Score: {intel?.health.overall_score ?? 88}/100
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>{data.metadata.original_filename}</span>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              ID: {data.workspace_id}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Scanned at {new Date(data.metadata.scanned_at).toLocaleString()}
          </p>
        </div>

        {/* Tab Controls & Export Action */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('health')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'health'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Health & Quality</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'architecture'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Architecture</span>
            </button>

            <button
              onClick={() => setActiveTab('tech')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'tech'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Tech Stack</span>
            </button>

            <button
              onClick={() => setActiveTab('recommendations')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'recommendations'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Recommendations</span>
            </button>

            <button
              onClick={() => setActiveTab('files')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'files'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Files</span>
            </button>
          </div>

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-xs shadow-lg shadow-sky-500/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top Quick Metrics */}
      <StatsCards data={data} />

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <AISummaryCard summary={data.ai_summary} />

          {intel && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <HealthRadarChart health={intel.health} />
              <QualityAuditGrid quality={intel.quality} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LanguageChart data={data.statistics.language_distribution} />
            <FrameworkCards
              primaryFramework={data.statistics.primary_framework}
              detectedFrameworks={data.statistics.detected_frameworks}
            />
          </div>

          {intel && <ExecutiveReportView summary={intel.executive_summary} />}
        </div>
      )}

      {/* Health & Quality Tab */}
      {activeTab === 'health' && intel && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HealthRadarChart health={intel.health} />
            <QualityAuditGrid quality={intel.quality} />
          </div>
          <div>
            <h3 className="text-base font-bold text-white mb-4">Developer Insights & Quality Gauges</h3>
            <DeveloperMetricsGrid insights={intel.developer_insights} />
          </div>
        </div>
      )}

      {/* Architecture Tab */}
      {activeTab === 'architecture' && intel && (
        <div className="space-y-8">
          <ArchitectureAnalysisCard architecture={intel.architecture} />
          <ExecutiveReportView summary={intel.executive_summary} />
        </div>
      )}

      {/* Tech Stack Tab */}
      {activeTab === 'tech' && intel && (
        <div className="space-y-8">
          <TechIntelligenceCard intelligence={intel.tech_intelligence} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <LanguageChart data={data.statistics.language_distribution} />
            <FrameworkCards
              primaryFramework={data.statistics.primary_framework}
              detectedFrameworks={data.statistics.detected_frameworks}
            />
          </div>
        </div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && intel && (
        <div className="space-y-8">
          <PrioritizedRecommendationsList recommendations={intel.recommendations} />
        </div>
      )}

      {/* Files Tab */}
      {activeTab === 'files' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FileTreeExplorer files={data.files} />
          <LargestFilesTable files={data.statistics.largest_files} />
        </div>
      )}

      {/* Export Modal */}
      <ReportExportModal data={data} isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
    </div>
  );
};
