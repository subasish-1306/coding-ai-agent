import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { LanguageDistribution } from '../types/scanner';
import { PieChart as PieIcon } from 'lucide-react';

interface LanguageChartProps {
  data: LanguageDistribution[];
}

const COLORS = [
  '#38bdf8', // sky-400
  '#60a5fa', // blue-400
  '#818cf8', // indigo-400
  '#c084fc', // purple-400
  '#f472b6', // pink-400
  '#34d399', // emerald-400
  '#fbbf24', // amber-400
  '#f87171', // red-400
  '#94a3b8', // slate-400
];

export const LanguageChart: React.FC<LanguageChartProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.language,
    value: item.file_count,
    percentage: item.percentage,
  }));

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-sky-400" />
            <span>Language Distribution</span>
          </h3>
          <p className="text-xs text-slate-400">File breakdown by extension language</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-md bg-slate-800 text-slate-300 font-mono">
          {data.length} languages
        </span>
      </div>

      <div className="h-56 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#0f172a" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length && payload[0]) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-950 border border-slate-700 p-2.5 rounded-lg shadow-xl text-xs">
                      <div className="font-bold text-white mb-1">{d.name}</div>
                      <div className="text-slate-300">{d.value} files ({d.percentage}%)</div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend list */}
      <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[idx % COLORS.length] }}
              />
              <span className="text-slate-300 font-medium">{item.language}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">{item.file_count} files</span>
              <span className="font-semibold text-slate-200 w-12 text-right">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
