import { useState, useMemo } from 'react';
import { LayoutGrid } from 'lucide-react';
import useChart from '../../hooks/useChart';
import { getPositionalComposition } from '../../data/dataHelpers';
import { COMBO_2, withAlpha } from '../../data/palettes';
import { POS_DIST_YEARS } from '../../data/posDistribution';
import ChartCard from '../layout/ChartCard';

/** Position → Combo 2 color mapping */
const POS_BAR_COLORS = {
  QB: COMBO_2[1], // #FFB847
  RB: COMBO_2[3], // #FF6B6B
  WR: COMBO_2[5], // #CE34F9
  TE: COMBO_2[7], // #7B5CFF
};

const POSITIONS = ['QB', 'RB', 'WR', 'TE'];

/**
 * Positional Composition Chart — stacked horizontal bar (native Chart.js).
 */
export default function PositionalDistChart() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const composition = getPositionalComposition(selectedYear);
  const labels = composition.map(c => c.range);

  const data = useMemo(() => ({
    labels,
    datasets: POSITIONS.map(pos => ({
      label: pos,
      data: composition.map(c => c[pos]),
      backgroundColor: withAlpha(POS_BAR_COLORS[pos], 0.8),
      hoverBackgroundColor: POS_BAR_COLORS[pos],
      borderColor: withAlpha(POS_BAR_COLORS[pos], 0.9),
      borderWidth: 1,
      borderRadius: 4,
      borderSkipped: false,
    })),
  }), [selectedYear]);

  const options = useMemo(() => ({
    indexAxis: 'y',
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
        max: 65,
        ticks: { font: { size: 11 }, stepSize: 10 },
        grid: { color: 'rgba(255,255,255,0.04)' },
        title: {
          display: true,
          text: 'Number of Players',
          color: '#94a3b8',
          font: { size: 11, weight: 500 },
        },
      },
      y: {
        stacked: true,
        grid: { display: false },
        ticks: { font: { size: 13, weight: 600 }, color: '#e2e8f0' },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { padding: 16, font: { size: 12, weight: 500 } },
      },
      tooltip: {
        callbacks: {
          title(items) { return `${selectedYear} — ${items[0]?.label}`; },
        },
      },
    },
  }), [selectedYear]);

  const { canvasRef } = useChart({ type: 'bar', data, options });

  return (
    <ChartCard
      title="Positional Composition by Tier"
      subtitle={`How the top overall finishers break down by position — ${selectedYear}`}
      icon={LayoutGrid}
      iconColor="#FFB847"
      glowClass="glow-amber"
      className="delay-7"
    >
      {/* Year toggle */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {POS_DIST_YEARS.map(year => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
              selectedYear === year
                ? 'bg-[#FFB847]/15 text-[#FFB847] border border-[#FFB847]/30 shadow-[0_0_12px_rgba(255,184,71,0.1)]'
                : 'bg-white/[0.04] text-slate-400 border border-white/[0.06] hover:bg-white/[0.08] hover:text-slate-200'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <div style={{ position: 'relative', width: '100%', height: '380px' }}>
        <canvas ref={canvasRef} />
      </div>
    </ChartCard>
  );
}
