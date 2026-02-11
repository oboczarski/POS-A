import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import '../../../theme/chartDefaults';
import { getPositionTiersByYear } from '../../data/dataHelpers';
import { COMBO_1, withAlpha } from '../../data/palettes';
import ChartCard from '../layout/ChartCard';

const TIER_COLORS = {
  'TOP-12': COMBO_1[0], // #ff0aa5
  'TOP-24': COMBO_1[2], // #d747ff
  'TOP-36': COMBO_1[5], // #4D79FF
};

/**
 * QB Elite Drought Chart — grouped bar chart showing QB tier counts by year.
 * Highlights the 2025 collapse: 0 Top-12, 2 Top-24.
 */
export default function QBEliteDroughtChart() {
  const chartRef = useRef(null);
  const qbData = getPositionTiersByYear('QB');

  const labels = qbData.map(d => d.year.toString());
  const tiers = ['TOP-12', 'TOP-24', 'TOP-36'];

  const datasets = tiers.map(tier => ({
    label: tier,
    data: qbData.map(d => d[tier]),
    backgroundColor: withAlpha(TIER_COLORS[tier], 0.75),
    hoverBackgroundColor: TIER_COLORS[tier],
    borderColor: TIER_COLORS[tier],
    borderWidth: 1,
    borderRadius: 6,
    borderSkipped: false,
  }));

  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 12, weight: 600 },
          color: (ctx) => {
            return ctx.tick?.label === '2025' ? '#ff0aa5' : '#94a3b8';
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 11,
        ticks: {
          stepSize: 2,
          font: { size: 11 },
        },
        grid: {
          color: 'rgba(255,255,255,0.04)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          padding: 14,
          font: { size: 12, weight: 500 },
        },
      },
      tooltip: {
        callbacks: {
          title: (items) => {
            const year = items[0]?.label;
            return year === '2025'
              ? `${year} — ⚠️ QB Drought`
              : year;
          },
          afterBody: (items) => {
            const year = items[0]?.label;
            if (year === '2025') {
              return '\n🔴 First year with ZERO Top-12 QBs';
            }
            return '';
          },
        },
      },
    },
  };

  // Custom plugin: draw annotation label on the 2025 "0" bar
  const annotationPlugin = {
    id: 'qbDroughtAnnotation',
    afterDraw(chart) {
      const { ctx, scales } = chart;
      const xScale = scales.x;
      const yScale = scales.y;
      const idx25 = labels.indexOf('2025');
      if (idx25 === -1) return;

      const top12Val = qbData.find(d => d.year === 2025)?.['TOP-12'] ?? 0;
      if (top12Val === 0) {
        const xPixel = xScale.getPixelForValue(idx25);
        const yPixel = yScale.getPixelForValue(0);

        ctx.save();
        ctx.font = "600 10px 'Inter', sans-serif";
        ctx.fillStyle = '#ff0aa5';
        ctx.textAlign = 'center';
        ctx.fillText('ZERO', xPixel - 18, yPixel - 12);
        ctx.restore();
      }
    },
  };

  return (
    <ChartCard
      title="The Elite QB Drought"
      subtitle="Quarterback top-tier finishes by year (2019–2025)"
      glowClass="glow-pink"
      className="delay-5"
    >
      <div className="h-[320px] sm:h-[340px]">
        <Bar ref={chartRef} data={data} options={options} plugins={[annotationPlugin]} />
      </div>
    </ChartCard>
  );
}
