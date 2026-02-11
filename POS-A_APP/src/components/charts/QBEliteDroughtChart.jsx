import { useMemo } from 'react';
import { ShieldAlert } from 'lucide-react';
import useChart from '../../hooks/useChart';
import { getPositionTiersByYear } from '../../data/dataHelpers';
import { COMBO_1, withAlpha } from '../../data/palettes';
import ChartCard from '../layout/ChartCard';

const TIER_COLORS = {
  'TOP-12': COMBO_1[0], // #ff0aa5
  'TOP-24': COMBO_1[2], // #d747ff
  'TOP-36': COMBO_1[5], // #4D79FF
};

/**
 * QB Elite Drought Chart — grouped bar (native Chart.js).
 */
export default function QBEliteDroughtChart() {
  const qbData = getPositionTiersByYear('QB');
  const labels = qbData.map(d => d.year.toString());
  const tiers = ['TOP-12', 'TOP-24', 'TOP-36'];

  const data = useMemo(() => ({
    labels,
    datasets: tiers.map(tier => ({
      label: tier,
      data: qbData.map(d => d[tier]),
      backgroundColor: withAlpha(TIER_COLORS[tier], 0.75),
      hoverBackgroundColor: TIER_COLORS[tier],
      borderColor: TIER_COLORS[tier],
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
    })),
  }), []);

  /** Custom inline plugin: annotation on 2025's zero bar */
  const annotationPlugin = useMemo(() => ({
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
        ctx.beginPath();
        ctx.arc(xPixel - 18, yPixel - 16, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ff0aa5';
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.font = "700 10px 'Inter', sans-serif";
        ctx.fillStyle = '#ff0aa5';
        ctx.textAlign = 'center';
        ctx.fillText('ZERO', xPixel - 18, yPixel - 6);
        ctx.restore();
      }
    },
  }), []);

  const options = useMemo(() => ({
    interaction: { mode: 'index', intersect: false },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 12, weight: 600 },
          color: '#94a3b8',
        },
      },
      y: {
        beginAtZero: true,
        max: 11,
        ticks: { stepSize: 2, font: { size: 11 } },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { padding: 14, font: { size: 12, weight: 500 } },
      },
      tooltip: {
        callbacks: {
          title(items) {
            const year = items[0]?.label;
            return year === '2025' ? `${year} — QB Drought` : year;
          },
          afterBody(items) {
            const year = items[0]?.label;
            if (year === '2025') return '\nFirst year with ZERO Top-12 QBs';
            return '';
          },
        },
      },
    },
  }), []);

  const { canvasRef } = useChart({
    type: 'bar',
    data,
    options,
    plugins: [annotationPlugin],
  });

  return (
    <ChartCard
      title="The Elite QB Drought"
      subtitle="Quarterback top-tier finishes by year (2019–2025)"
      icon={ShieldAlert}
      iconColor="#ff0aa5"
      glowClass="glow-pink"
      className="delay-5"
    >
      <div style={{ position: 'relative', width: '100%', height: '360px' }}>
        <canvas ref={canvasRef} />
      </div>
    </ChartCard>
  );
}
