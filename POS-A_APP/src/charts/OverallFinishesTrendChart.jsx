import { Line } from 'react-chartjs-2';
import SectionHeader from '../components/SectionHeader';
import { getBaseChartOptions, getPaletteSlice, withAlpha } from './chartTheme';

function OverallFinishesTrendChart({ chartData }) {
  const colors = getPaletteSlice('combo2', chartData.series.length);

  const data = {
    labels: chartData.years.map(String),
    datasets: chartData.series.map((series, index) => ({
      label: series.label,
      data: series.values,
      borderColor: colors[index],
      backgroundColor: withAlpha(colors[index], 0.18),
      borderWidth: 2.2,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: colors[index],
      fill: false,
      tension: 0.35,
      glow: true,
      glowColor: withAlpha(colors[index], 0.8),
      glowBlur: 11
    }))
  };

  const options = getBaseChartOptions({
    plugins: {
      tooltip: {
        callbacks: {
          label(context) {
            return `${context.dataset.label}: ${context.parsed.y} players`;
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
          text: 'Player Count'
        }
      }
    }
  });

  return (
    <section className="chart-panel p-4 sm:p-5">
      <SectionHeader
        title="Elite Finish Trend (2019–2025)"
        subtitle="Top-12 through Top-60 trend lines reveal shrinking elite throughput, with 2025 the clear trough."
      />
      <div className="h-[320px] sm:h-[350px]">
        <Line data={data} options={options} />
      </div>
    </section>
  );
}

export default OverallFinishesTrendChart;
