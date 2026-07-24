import React from 'react';
import { UploadCloud, Cpu, LayoutDashboard, ArrowRight } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Upload Repository Archive',
      desc: 'Drag & drop any .zip source archive. Build artifacts and node_modules are automatically filtered out.',
      icon: UploadCloud,
    },
    {
      num: '02',
      title: 'Static & AI Analysis Engine',
      desc: 'Recursive AST scanner extracts file tree, manifest indicators, framework dependencies, and health metrics.',
      icon: Cpu,
    },
    {
      num: '03',
      title: 'Executive Intelligence Dashboard',
      desc: 'Explore calculated health scores, architectural risk reviews, prioritized recommendations, and report exports.',
      icon: LayoutDashboard,
    },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="text-center mb-10">
        <h2 className="text-xs uppercase font-bold tracking-widest text-sky-400 mb-2">Automated Workflow</h2>
        <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          From Archive Upload To Senior Architect Insights In 3 Steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold text-sky-500/40 font-mono">{step.num}</span>
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-sky-400" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>

              {idx < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-slate-700" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
