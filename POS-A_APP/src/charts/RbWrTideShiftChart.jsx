import { Bar } from 'react-chartjs-2';
import SectionHeader from '../components/SectionHeader';
import { getBaseChartOptions, getPaletteSlice, withAlpha } from './chartTheme';

function getDeltaColor(delta, positivePalette, negativePalette) {
  if (delta >= 0) {
    return withAlpha(positivePalette[1], 0.85);
  }
  return withAlpha(negativePalette[2], 0.92);
}

function RbWrTideShiftChart({ chartData }) {
  const positivePalette = getPaletteSlice('combo3', 3);
  const negativePalette = getPaletteSlice('combo1', 3);

  const data = {
    labels: chartData.labels,
    datasets: chartData.bySeason.map((seasonBucket, index) => ({
      label: `${seasonBucket.season} (RB - WR)`,
      data: seasonBucket.values.map((entry) => entry.delta),
      backgroundColor: seasonBucket.values.map((entry) =>
        getDeltaColor(entry.delta, positivePalette, negativePalette)
      ),
      borderColor: seasonBucket.values.map((entry) =>
        entry.delta >= 0 ? positivePalette[0] : negativePalette[0]
      ),
      borderWidth: 1,
      borderRadius: 8,
      barPercentage: 0.78,
      categoryPercentage: 0.7,
      meta: seasonBucket.values,
      glow: true,
      glowColor: index === 0 ? withAlpha(negativePalette[1], 0.55) : withAlpha(positivePalette[1], 0.45),
      glowBlur: 10
    }))
  };

  const maxAbsDelta = Math.max(
    ...chartData.bySeason.flatMap((bucket) => bucket.values.map((entry) => Math.abs(entry.delta)))
  );

  const options = getBaseChartOptions({
    indexAxis: 'y',
    plugins: {
      tooltip: {
        callbacks: {
          label(context) {
            const detail = context.dataset.meta[context.dataIndex];
            const sign = detail.delta > 0 ? '+' : '';
            return `${context.dataset.label}: ${sign}${detail.delta} (RB ${detail.rb} vs WR ${detail.wr})`;
          }
        }
      }
    },
    scales: {
      x: {
        min: -maxAbsDelta - 1,
        max: maxAbsDelta + 1,
        ticks: {
          callback(value) {
            const numeric = Number(value);
            return numeric > 0 ? `+${numeric}` : String(numeric);
          }
        },
        title: {
          display: true,
          text: 'RB minus WR count'
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  });

  return (
    <section className="chart-panel p-4 sm:p-5">
      <SectionHeader
        title="RB vs WR Tide Shift"
        subtitle="Diverging bars capture the 2024 transition and 2025 full-tier RB lead across Top-60 to Top-12."
      />
      <div className="h-[320px] sm:h-[350px]">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
}

export default RbWrTideShiftChart;
