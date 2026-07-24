import React from 'react';
import { DeveloperInsights } from '../types/scanner';
import { Wrench, Rocket, Eye, Cpu, Award } from 'lucide-react';

interface DeveloperMetricsGridProps {
  insights: DeveloperInsights;
}

export const DeveloperMetricsGrid: React.FC<DeveloperMetricsGridProps> = ({ insights }) => {
  const metrics = [
    {
      title: 'Maintainability',
      score: insights.maintainability,
      icon: Wrench,
      desc: 'Ease of modular updates & refactoring',
      color: 'from-sky-500 to-blue-600',
      textColor: 'text-sky-400',
    },
    {
      title: 'Scalability',
      score: insights.scalability,
      icon: Cpu,
      desc: 'Ability to grow team & codebase size',
      color: 'from-indigo-500 to-purple-600',
      textColor: 'text-indigo-400',
    },
    {
      title: 'Readability',
      score: insights.readability,
      icon: Eye,
      desc: 'Code clarity & file naming consistency',
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-400',
    },
    {
      title: 'Deployment Readiness',
      score: insights.deployment_readiness,
      icon: Rocket,
      desc: 'Container & CI/CD pipeline readiness',
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
    },
    {
      title: 'Production Readiness',
      score: insights.production_readiness,
      icon: Award,
      desc: 'Security, configs & enterprise readiness',
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
    },
    {
      title: 'Architecture Quality',
      score: insights.architecture_quality,
      icon: Award,
      desc: 'Layer separation & domain structure',
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${metric.textColor}`} />
                  <span>{metric.title}</span>
                </span>
                <span className={`text-base font-extrabold ${metric.textColor}`}>{metric.score} %</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">{metric.desc}</p>
            </div>

            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`bg-gradient-to-r ${metric.color} h-full rounded-full transition-all duration-700`}
                style={{ width: `${metric.score}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
