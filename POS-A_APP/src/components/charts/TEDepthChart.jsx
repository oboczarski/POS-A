import { useRef } from 'react';
import { Radar } from 'react-chartjs-2';
import { Waves } from 'lucide-react';
import { getPositionTiersByYear } from '../../data/dataHelpers';
import { COMBO_3, withAlpha } from '../../data/palettes';
import ChartCard from '../layout/ChartCard';

const YEAR_CONFIGS = [
  { year: 2025, color: COMBO_3[0], label: '2025', weight: 3 },
  { year: 2024, color: COMBO_3[2], label: '2024', weight: 2 },
  { year: 2023, color: COMBO_3[4], label: '2023', weight: 1.5 },
  { year: 2022, color: COMBO_3[6], label: '2022', weight: 1.5 },
];

/**
 * TE Depth Explosion Chart — radar chart.
 */
export default function TEDepthChart() {
  const chartRef = useRef(null);
  const teData = getPositionTiersByYear('TE');

  const tierLabels = ['Top 12', 'Top 24', 'Top 36', 'Top 48', 'Top 60'];
  const tierKeys = ['TOP-12', 'TOP-24', 'TOP-36', 'TOP-48', 'TOP-60'];

  const datasets = YEAR_CONFIGS.map(cfg => {
    const yearEntry = teData.find(d => d.year === cfg.year);
    return {
      label: cfg.label,
      data: tierKeys.map(k => yearEntry?.[k] ?? 0),
      borderColor: cfg.color,
      backgroundColor: withAlpha(cfg.color, cfg.year === 2025 ? 0.15 : 0.04),
      pointBackgroundColor: cfg.color,
      pointBorderColor: '#0a0a1a',
      borderWidth: cfg.weight,
      pointRadius: cfg.year === 2025 ? 5 : 3,
      pointHoverRadius: 8,
      pointBorderWidth: 2,
    };
  });

  const data = { labels: tierLabels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 13,
        ticks: {
          stepSize: 3,
          color: '#64748b',
          backdropColor: 'transparent',
          font: { size: 10 },
        },
        grid: { color: 'rgba(255,255,255,0.06)', circular: true },
        pointLabels: {
          color: '#cbd5e1',
          font: { size: 12, weight: 500, family: "'Inter', sans-serif" },
          padding: 14,
        },
        angleLines: { color: 'rgba(255,255,255,0.06)' },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 18, font: { size: 12, weight: 500 } },
      },
      tooltip: {
        callbacks: {
          title(items) { return `Tight Ends — ${items[0]?.label}`; },
          label(item) { return ` ${item.dataset.label}: ${item.raw} players`; },
        },
      },
    },
  };

  return (
    <ChartCard
      title="TE Depth Explosion"
      subtitle="Tight End representation across tiers — 2025 shattered volume records"
      icon={Waves}
      iconColor="#69D6FF"
      glowClass="glow-blue"
      className="delay-6"
    >
      <div className="h-[340px] sm:h-[400px] flex items-center justify-center">
        <Radar ref={chartRef} data={data} options={options} />
      </div>
    </ChartCard>
  );
}
