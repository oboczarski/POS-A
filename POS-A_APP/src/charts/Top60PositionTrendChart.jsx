import { Line } from 'react-chartjs-2';
import SectionHeader from '../components/SectionHeader';
import { getBaseChartOptions, withAlpha } from './chartTheme';

const positionStyle = {
  QB: '#0099FF',
  RB: '#00FF99',
  WR: '#ff0aa5',
  TE: '#CE34F9'
};

function Top60PositionTrendChart({ chartData }) {
  const data = {
    labels: chartData.years.map(String),
    datasets: chartData.series.map((series) => {
      const color = positionStyle[series.position] ?? '#7B5CFF';
      const isTe = series.position === 'TE';
      const isWr = series.position === 'WR';

      return {
        label: series.label,
        data: series.values,
        borderColor: color,
        backgroundColor: withAlpha(color, isTe ? 0.2 : 0.1),
        borderWidth: isWr || isTe ? 2.8 : 2.2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBorderColor: '#0b0f27',
        pointBorderWidth: 1,
        fill: isTe ? 'origin' : false,
        tension: 0.35
      };
    })
  };

  const options = getBaseChartOptions({
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      focusMarker: {
        xValue: '2025',
        label: '2025 divergence',
        color: withAlpha('#00FF99', 0.75)
      },
      tooltip: {
        callbacks: {
          label(context) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 27,
        ticks: {
          stepSize: 2
        },
        title: {
          display: true,
          text: `Top-60 Count`
        }
      }
    }
  });

  return (
    <section className="chart-shell">
      <SectionHeader
        eyebrow="POSITION CURVES"
        title="Top-60 Positional Drift"
        subtitle="WR contracts (12 → 8 → 6), TE spikes to 12, and RB stabilizes at elevated levels in 2025."
      />
      <div className="chart-canvas chart-canvas--lg">
        <Line data={data} options={options} />
      </div>
    </section>
  );
}

export default Top60PositionTrendChart;
