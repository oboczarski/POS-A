import { Bar } from 'react-chartjs-2';
import SectionHeader from '../components/SectionHeader';
import { getBaseChartOptions, withAlpha } from './chartTheme';

const positionColors = {
  QB: '#0099FF',
  RB: '#00FF99',
  WR: '#ff0aa5',
  TE: '#8F33FF'
};

function PositionCompositionByTierChart({ chartData }) {
  const labels = [...chartData.labels].reverse();
  const reverseValues = (values) => [...values].reverse();

  const datasets = Object.keys(positionColors).map((position) => ({
    label: position,
    data: reverseValues(chartData.percentages[position]),
    rawCounts: reverseValues(chartData.counts[position]),
    stack: 'share',
    backgroundColor: withAlpha(positionColors[position], 0.86),
    borderColor: positionColors[position],
    borderWidth: 1,
    borderRadius: 7,
    borderSkipped: false,
    maxBarThickness: 30
  }));

  const data = {
    labels,
    datasets
  };

  const options = getBaseChartOptions({
    indexAxis: 'y',
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      tooltip: {
        callbacks: {
          label(context) {
            const count = context.dataset.rawCounts[context.dataIndex];
            return `${context.dataset.label}: ${count} (${context.parsed.x.toFixed(1)}%)`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        max: 100,
        ticks: {
          callback(value) {
            return `${value}%`;
          }
        },
        title: {
          display: true,
          text: 'Tier Share'
        }
      },
      y: {
        stacked: true,
        grid: {
          display: false
        }
      }
    }
  });

  return (
    <section className="chart-shell">
      <SectionHeader
        eyebrow="2025 TIER COMPOSITION"
        title="How 2025 Fills from Top-12 to Top-60"
        subtitle="Horizontal 100% stacks show each tier’s positional structure as the pool expands by 12-player increments."
      />
      <div className="chart-canvas chart-canvas--lg">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
}

export default PositionCompositionByTierChart;
