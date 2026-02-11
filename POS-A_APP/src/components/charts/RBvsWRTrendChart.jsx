import { useState, useRef, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { ArrowRightLeft } from 'lucide-react';
import { getRBvsWRByYear } from '../../data/dataHelpers';
import { COMBO_4, withAlpha, createVerticalGradient } from '../../data/palettes';
import { RANGES } from '../../data/posDistribution';
import ChartCard from '../layout/ChartCard';

const RB_COLOR = COMBO_4[0]; // #00FF99
const WR_COLOR = COMBO_4[6]; // #8F00FF

const TIER_OPTIONS = [...RANGES].reverse(); // TOP-60 first

/**
 * Hero Chart — RB vs WR Trend Reversal.
 */
export default function RBvsWRTrendChart() {
  const [selectedTier, setSelectedTier] = useState('TOP-60');
  const chartRef = useRef(null);

  const rawData = getRBvsWRByYear(selectedTier);
  const labels = rawData.map(d => d.year.toString());

  const getGradient = useCallback((ctx, chartArea, color) => {
    if (!chartArea) return withAlpha(color, 0.3);
    return createVerticalGradient(ctx, chartArea, color, color, 0.3, 0.01);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: 'Running Backs',
        data: rawData.map(d => d.rb),
        borderColor: RB_COLOR,
        backgroundColor(context) {
          const { ctx, chartArea } = context.chart;
          return getGradient(ctx, chartArea, RB_COLOR);
        },
        pointBackgroundColor: RB_COLOR,
        pointBorderColor: '#0a0a1a',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBorderWidth: 2,
      },
      {
        label: 'Wide Receivers',
        data: rawData.map(d => d.wr),
        borderColor: WR_COLOR,
        backgroundColor(context) {
          const { ctx, chartArea } = context.chart;
          return getGradient(ctx, chartArea, WR_COLOR);
        },
        pointBackgroundColor: WR_COLOR,
        pointBorderColor: '#0a0a1a',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 13, weight: 600 }, color: '#e2e8f0' },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 5, font: { size: 11 } },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { padding: 16, font: { size: 13, weight: 500 } },
      },
      tooltip: {
        callbacks: {
          afterBody(items) {
            if (items.length >= 2) {
              const rb = items.find(i => i.dataset.label === 'Running Backs')?.raw ?? 0;
              const wr = items.find(i => i.dataset.label === 'Wide Receivers')?.raw ?? 0;
              const diff = rb - wr;
              const leader = diff > 0 ? 'RB' : diff < 0 ? 'WR' : 'Tie';
              return `\nDiff: ${diff > 0 ? '+' : ''}${diff} (${leader})`;
            }
            return '';
          },
        },
      },
    },
  };

  return (
    <ChartCard
      title="RB vs WR — The Great Reversal"
      subtitle="Positional representation within overall fantasy finishers (2020–2025)"
      icon={ArrowRightLeft}
      iconColor="#00FF99"
      glowClass="glow-green"
      className="delay-3"
    >
      {/* Tier toggle */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {TIER_OPTIONS.map(tier => (
          <button
            key={tier}
            onClick={() => setSelectedTier(tier)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              selectedTier === tier
                ? 'bg-[#00FF99]/15 text-[#00FF99] border border-[#00FF99]/30 shadow-[0_0_12px_rgba(0,255,153,0.1)]'
                : 'bg-white/[0.04] text-slate-400 border border-white/[0.06] hover:bg-white/[0.08] hover:text-slate-200'
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      <div className="h-[340px] sm:h-[400px]">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </ChartCard>
  );
}
