import { Bar } from 'react-chartjs-2';
import SectionHeader from '../components/SectionHeader';
import {
  buildVerticalGradient,
  getBaseChartOptions,
  getPaletteSlice,
  withAlpha
} from './chartTheme';

function EliteScarcityChart({ chartData }) {
  const combo1 = getPaletteSlice('combo1', 8);
  const combo2 = getPaletteSlice('combo2', 8);

  const years = chartData.years.map(String);

  const data = {
    labels: years,
    datasets: [
      {
        type: 'bar',
        label: 'Top-24 + Top-12 count',
        data: chartData.counts,
        backgroundColor: (context) =>
          buildVerticalGradient(context, [withAlpha(combo1[0], 0.95), withAlpha(combo1[6], 0.45)]),
        borderColor: combo1[2],
        borderWidth: 1,
        borderRadius: 10,
        maxBarThickness: 38,
        yAxisID: 'y'
      },
      {
        type: 'line',
        label: 'Share of elite pool (%)',
        data: chartData.shares,
        borderColor: combo2[4],
        backgroundColor: withAlpha(combo2[4], 0.2),
        pointBackgroundColor: combo2[4],
        pointBorderColor: '#14172f',
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2.4,
        tension: 0.34,
        yAxisID: 'y1'
      },
      {
        type: 'line',
        label: '2020–2024 baseline',
        data: years.map(() => chartData.baselineAverage),
        borderColor: withAlpha(combo2[0], 0.95),
        borderWidth: 1.7,
        borderDash: [6, 5],
        pointRadius: 0,
        yAxisID: 'y'
      }
    ]
  };

  const options = getBaseChartOptions({
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      focusMarker: {
        xValue: '2025',
        label: '2 total finishes',
        color: withAlpha(combo1[1], 0.78)
      },
      tooltip: {
        callbacks: {
          label(context) {
            if (context.dataset.label === 'Share of elite pool (%)') {
              return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}%`;
            }
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 8,
        ticks: {
          stepSize: 1
        },
        title: {
          display: true,
          text: 'Combined Finishes'
        }
      },
      y1: {
        position: 'right',
        beginAtZero: true,
        suggestedMax: 35,
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          callback(value) {
            return `${value}%`;
          }
        },
        title: {
          display: true,
          text: 'Pool Share'
        }
      }
    }
  });

  return (
    <section className="chart-shell">
      <SectionHeader
        eyebrow="SCARCITY INDEX"
        title="High-End Finish Scarcity"
        subtitle="2025 posts the lowest Top-24 + Top-12 volume and just 5.56% of the entire 2019–2025 elite pool."
      />
      <div className="chart-canvas chart-canvas--lg">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
}

export default EliteScarcityChart;
