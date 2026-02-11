import { Bar } from 'react-chartjs-2';
import SectionHeader from '../components/SectionHeader';
import { getBaseChartOptions, getPaletteSlice, withAlpha } from './chartTheme';
import { positions } from '../data/palettes';

function PositionCompositionByTierChart({ chartData }) {
  const colors = getPaletteSlice('combo4', 4);

  const data = {
    labels: chartData.labels,
    datasets: positions.map((position, index) => ({
      label: position,
      data: chartData.percentages[position],
      rawCounts: chartData.counts[position],
      backgroundColor: withAlpha(colors[index], 0.82),
      borderColor: colors[index],
      borderWidth: 1,
      borderRadius: 6,
      borderSkipped: false,
      stack: 'share'
    }))
  };

  const options = getBaseChartOptions({
    plugins: {
      tooltip: {
        callbacks: {
          label(context) {
            const count = context.dataset.rawCounts[context.dataIndex];
            return `${context.dataset.label}: ${count} players (${context.parsed.y.toFixed(1)}%)`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        ticks: {
          callback(value) {
            return `${value}%`;
          }
        },
        title: {
          display: true,
          text: 'Share of Tier'
        }
      }
    }
  });

  return (
    <section className="chart-panel p-4 sm:p-5">
      <SectionHeader
        title="2025 Positional Composition by Tier"
        subtitle="A 100% stacked view of how QB, RB, WR, and TE fill each cumulative scoring threshold."
      />
      <div className="h-[320px] sm:h-[350px]">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
}

export default PositionCompositionByTierChart;
