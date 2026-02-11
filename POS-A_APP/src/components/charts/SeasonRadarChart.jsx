import { useState, useMemo } from 'react';
import { Radar } from 'react-chartjs-2';
import { seasonCompare, compareYears, compareRanges } from '../../data/seasonCompare.js';
import { palettes, withAlpha } from '../../config/palettes.js';

const posOptions = ['ALL', 'QB', 'RB', 'WR', 'TE'];

const yearColors = {
  2025: palettes.combo1[0],
  2024: palettes.combo1[2],
  2023: palettes.combo1[4],
  2022: palettes.combo1[5],
  2021: palettes.combo1[6],
  2020: palettes.combo1[7],
  2019: '#94a3b8',
};

export default function SeasonRadarChart() {
  const [selectedPos, setSelectedPos] = useState('RB');
  const [activeYears, setActiveYears] = useState([2025, 2024, 2023]);

  const toggleYear = (year) => {
    setActiveYears(prev =>
      prev.includes(year)
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  };

  const data = useMemo(() => {
    const labels = compareRanges.map(r => `Top-${r}`);

    const datasets = activeYears
      .sort((a, b) => b - a)
      .map(year => {
        const values = compareRanges.map(range => {
          const row = seasonCompare.find(d => d.position === selectedPos && d.range === range);
          return row ? row.values[year] : 0;
        });

        const color = yearColors[year];
        const isCurrent = year === 2025;

        return {
          label: `${year}`,
          data: values,
          borderColor: color,
          backgroundColor: withAlpha(color, isCurrent ? 0.2 : 0.08),
          borderWidth: isCurrent ? 3 : 2,
          pointBackgroundColor: color,
          pointBorderColor: '#0a0a1a',
          pointBorderWidth: 2,
          pointRadius: isCurrent ? 5 : 3,
          pointHoverRadius: 7,
        };
      });

    return { labels, datasets };
  }, [selectedPos, activeYears]);

  const options = {
    scales: {
      r: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,0.06)', circular: true },
        angleLines: { color: 'rgba(255,255,255,0.08)' },
        pointLabels: {
          color: '#e2e8f0',
          font: { size: 12, weight: 600 },
        },
        ticks: {
          display: false,
          stepSize: 3,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.r}`,
        },
      },
    },
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex gap-1.5">
          {posOptions.map(pos => (
            <button
              key={pos}
              onClick={() => setSelectedPos(pos)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedPos === pos
                  ? 'bg-[#ff0aa5] text-white shadow-lg shadow-[#ff0aa5]/25'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
        <div className="w-px h-5 bg-white/10 hidden md:block" />
        <div className="flex flex-wrap gap-1.5">
          {compareYears.map(year => (
            <button
              key={year}
              onClick={() => toggleYear(year)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeYears.includes(year)
                  ? 'text-white'
                  : 'bg-white/5 text-slate-500 hover:bg-white/10'
              }`}
              style={
                activeYears.includes(year)
                  ? { backgroundColor: withAlpha(yearColors[year], 0.3), color: yearColors[year] }
                  : {}
              }
            >
              '{String(year).slice(2)}
            </button>
          ))}
        </div>
      </div>
      <div className="h-72 md:h-80 flex items-center justify-center">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}
