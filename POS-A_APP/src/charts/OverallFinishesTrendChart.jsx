import { Line } from 'react-chartjs-2';
import SectionHeader from '../components/SectionHeader';
import { buildVerticalGradient, getBaseChartOptions, getPaletteSlice, withAlpha } from './chartTheme';

function OverallFinishesTrendChart({ chartData }) {
  const colors = getPaletteSlice('combo2', chartData.series.length);

  const datasets = chartData.series.map((series, index) => {
    const isAnchorSeries = series.id === 'ALL_TOP-36';
    return {
      label: series.label,
      data: series.values,
      borderColor: colors[index],
      backgroundColor: (context) =>
        isAnchorSeries
          ? buildVerticalGradient(context, [withAlpha(colors[index], 0.35), withAlpha(colors[index], 0.04)])
          : withAlpha(colors[index], 0.1),
      borderWidth: isAnchorSeries ? 3 : 2,
      pointRadius: isAnchorSeries ? 3.2 : 2.4,
      pointHoverRadius: isAnchorSeries ? 5 : 4,
      pointBackgroundColor: colors[index],
      pointBorderColor: '#0f1230',
      pointBorderWidth: 1,
      tension: 0.34,
      fill: isAnchorSeries ? 'origin' : false,
      order: isAnchorSeries ? 0 : index + 1
    };
  });

  const data = {
    labels: chartData.years.map(String),
    datasets
  };

  const options = getBaseChartOptions({
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      focusMarker: {
        xValue: '2025',
        label: '2025 trough',
        color: withAlpha(colors[3], 0.8)
      },
      tooltip: {
        callbacks: {
          label(context) {
            return `${context.dataset.label}: ${context.parsed.y} finishes`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 13,
        ticks: {
          stepSize: 1
        },
        title: {
          display: true,
          text: 'Finish Count'
        }
      }
    }
  });

  return (
    <section className="chart-shell chart-shell--wide">
      <SectionHeader
        eyebrow="MACRO TREND"
        title="Elite Throughput Collapse (2019–2025)"
        subtitle="Across Top-12 through Top-60, the trend compresses into 2025. Top-36 falls from 7 in 2020 to 4 in 2025."
      />
      <div className="chart-canvas chart-canvas--xl">
        <Line data={data} options={options} />
      </div>
    </section>
  );
}

export default OverallFinishesTrendChart;
