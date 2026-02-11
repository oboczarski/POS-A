import { useState, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { posDistribution, seasons } from '../../data/posDistribution.js';
import { posColors, withAlpha } from '../../config/palettes.js';

const posKeys = ['qb', 'rb', 'wr', 'te'];
const posLabels = { qb: 'QB', rb: 'RB', wr: 'WR', te: 'TE' };

const centerTextPlugin = {
  id: 'centerText',
  afterDraw(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const { width, height, top, left } = chartArea;
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const selectedSeason = chart.config.options.plugins.centerText?.season || '';

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.font = "bold 32px 'Inter', sans-serif";
    ctx.fillStyle = '#ffffff';
    ctx.fillText('12', centerX, centerY - 12);

    ctx.font = "500 11px 'Inter', sans-serif";
    ctx.fillStyle = '#64748b';
    ctx.fillText('TOP-12 OVERALL', centerX, centerY + 12);

    ctx.font = "600 13px 'Inter', sans-serif";
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(selectedSeason, centerX, centerY + 30);

    ctx.restore();
  },
};

export default function EliteTierDoughnutChart() {
  const [selectedSeason, setSelectedSeason] = useState(2025);

  const { data, activePositions } = useMemo(() => {
    const row = posDistribution.find(d => d.season === selectedSeason && d.range === 12);
    if (!row) return { data: { labels: [], datasets: [] }, activePositions: [] };

    const active = posKeys.filter(pos => row[pos] > 0);
    const values = active.map(pos => row[pos]);
    const colors = active.map(pos => posColors[pos]);
    const labels = active.map(pos => posLabels[pos]);

    return {
      activePositions: active,
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors.map(c => withAlpha(c, 0.8)),
            hoverBackgroundColor: colors,
            borderColor: colors.map(c => withAlpha(c, 0.4)),
            borderWidth: 2,
            hoverBorderWidth: 3,
            spacing: 3,
          },
        ],
      },
    };
  }, [selectedSeason]);

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: ctx => {
            const pct = ((ctx.parsed / 12) * 100).toFixed(0);
            return `${ctx.label}: ${ctx.parsed} players (${pct}%)`;
          },
        },
      },
      centerText: {
        season: selectedSeason,
      },
    },
    animation: {
      animateRotate: true,
      duration: 800,
    },
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {seasons.map(s => (
          <button
            key={s}
            onClick={() => setSelectedSeason(s)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              selectedSeason === s
                ? 'bg-[#D200FF] text-white shadow-lg shadow-[#D200FF]/25'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300'
            }`}
          >
            '{String(s).slice(2)}
          </button>
        ))}
      </div>
      <div className="h-72 md:h-80 flex items-center justify-center">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
}
