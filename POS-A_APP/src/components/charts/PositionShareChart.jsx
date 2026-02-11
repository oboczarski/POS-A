import { useState, useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { posDistribution, seasons, ranges } from '../../data/posDistribution.js';
import { posColors, withAlpha } from '../../config/palettes.js';

const posKeys = ['qb', 'rb', 'wr', 'te'];
const posLabels = { qb: 'QB', rb: 'RB', wr: 'WR', te: 'TE' };

export default function PositionShareChart() {
  const [selectedRange, setSelectedRange] = useState(60);

  const data = useMemo(() => {
    const filtered = posDistribution
      .filter(d => d.range === selectedRange)
      .sort((a, b) => a.season - b.season);

    return {
      labels: filtered.map(d => `'${String(d.season).slice(2)}`),
      datasets: posKeys.map(pos => ({
        label: posLabels[pos],
        data: filtered.map(d => ((d[pos] / selectedRange) * 100).toFixed(1)),
        backgroundColor: withAlpha(posColors[pos], 0.82),
        hoverBackgroundColor: posColors[pos],
        borderColor: withAlpha(posColors[pos], 0.9),
        borderWidth: 1,
        borderRadius: pos === 'te' ? { topLeft: 4, topRight: 4 } : 0,
        borderSkipped: false,
      })),
    };
  }, [selectedRange]);

  const options = {
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 12, weight: 600 } },
      },
      y: {
        stacked: true,
        max: 100,
        ticks: {
          callback: v => `${v}%`,
          stepSize: 25,
        },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}%`,
          title: ctx => `${ctx[0].label} \u2022 Top-${selectedRange}`,
        },
      },
      legend: {
        position: 'top',
        align: 'end',
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {ranges.map(r => (
          <button
            key={r}
            onClick={() => setSelectedRange(r)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              selectedRange === r
                ? 'bg-[#7866FF] text-white shadow-lg shadow-[#7866FF]/25'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300'
            }`}
          >
            Top-{r}
          </button>
        ))}
      </div>
      <div className="h-72 md:h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
