import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { HealthBreakdown } from '../types/scanner';
import { ShieldCheck } from 'lucide-react';

interface HealthRadarChartProps {
  health: HealthBreakdown;
}

export const HealthRadarChart: React.FC<HealthRadarChartProps> = ({ health }) => {
  const radarData = [
    { category: 'Structure', score: health.folder_structure },
    { category: 'Organization', score: health.project_organization },
    { category: 'Docs', score: health.documentation },
    { category: 'Config', score: health.configuration },
    { category: 'Dependencies', score: health.dependency_management },
    { category: 'Frameworks', score: health.framework_usage },
    { category: 'Size', score: health.repository_size },
    { category: 'Languages', score: health.language_distribution },
  ];

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Repository Health Radar</span>
          </h3>
          <p className="text-xs text-slate-400">8-axis quality & organization evaluation</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">Overall Score</div>
          <div className="text-xl font-extrabold text-emerald-400">{health.overall_score} / 100</div>
        </div>
      </div>

      <div className="h-64 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="category" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
            <Radar name="Health Score" dataKey="score" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.35} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length && payload[0]) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-950 border border-slate-700 p-2.5 rounded-lg shadow-xl text-xs">
                      <div className="font-bold text-white mb-0.5">{d.category}</div>
                      <div className="text-sky-400 font-semibold">{d.score} / 100 Points</div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Grid of Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
        {radarData.map((item, idx) => (
          <div key={idx} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 text-center">
            <div className="text-[10px] text-slate-400 font-medium">{item.category}</div>
            <div className="text-sm font-bold text-slate-200">{item.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
