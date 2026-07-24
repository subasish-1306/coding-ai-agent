import React from 'react';
import { ShieldCheck, Cpu, Layers, PieChart, Download, FileText, Zap } from 'lucide-react';

export const LandingFeatures: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Calculated Health Score',
      desc: 'Evaluates structure, documentation, dependencies, and setup configs on an 8-axis scoring radar.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      icon: Layers,
      title: 'Architectural Analysis',
      desc: 'Detects monorepo vs SPA vs microservice styles, scale metrics, complexity ratings, and layer score.',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      icon: Cpu,
      title: 'Technology Intelligence',
      desc: 'Audits framework maturity, version compatibility status, deprecated tech, and suggested upgrades.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/20',
    },
    {
      icon: Zap,
      title: 'Prioritized Recommendations',
      desc: 'Actionable Critical, High, Medium, and Low engineering findings with step-by-step resolution guides.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      icon: PieChart,
      title: 'Interactive Visual Analytics',
      desc: 'Recharts Donut Pie language breakdown, top 10 largest files audit, and expandable file tree explorer.',
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10 border-sky-500/20',
    },
    {
      icon: Download,
      title: 'Multi-Format Exporters',
      desc: '1-click export of structured JSON, formatted Markdown (.md), and standalone styled HTML reports.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10 border-blue-500/20',
    },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-xs uppercase font-bold tracking-widest text-sky-400 mb-2">Platform Capabilities</h2>
        <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Everything You Need For Automated Code Quality & Intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all group backdrop-blur-sm shadow-sm hover:shadow-sky-500/10"
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${f.bgColor}`}>
                <Icon className={`w-6 h-6 ${f.color} group-hover:scale-110 transition-transform`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
