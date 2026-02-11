import { Radar } from 'react-chartjs-2';
import SectionHeader from '../components/SectionHeader';
import { getBaseChartOptions, getPaletteSlice, withAlpha } from './chartTheme';

function PositionMomentumChart({ chartData }) {
  const palette = getPaletteSlice('combo1', 8);

  const data = {
    labels: chartData.positions,
    datasets: [
      {
        label: `2025 ${chartData.range}`,
        data: chartData.current,
        borderColor: palette[0],
        backgroundColor: withAlpha(palette[0], 0.2),
        pointBackgroundColor: palette[1],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        fill: true,
        glow: true,
        glowColor: withAlpha(palette[0], 0.8),
        glowBlur: 12
      },
      {
        label: `2020–2024 Avg ${chartData.range}`,
        data: chartData.baseline,
        borderColor: palette[6],
        backgroundColor: withAlpha(palette[6], 0.17),
        pointBackgroundColor: palette[7],
        borderWidth: 2,
        fill: true,
        borderDash: [6, 4]
      }
    ]
  };

  const options = getBaseChartOptions({
    scales: {
      r: {
        angleLines: {
          color: 'rgba(169, 178, 222, 0.2)'
        },
        grid: {
          color: 'rgba(169, 178, 222, 0.2)'
        },
        pointLabels: {
          color: '#c9d2f0',
          font: {
            size: 12
          }
        },
        suggestedMin: 0,
        ticks: {
          color: '#94a3b8',
          backdropColor: 'transparent'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label(context) {
            return `${context.dataset.label}: ${context.parsed.r.toFixed(1)}`;
          }
        }
      }
    }
  });

  return (
    <section className="chart-panel p-4 sm:p-5">
      <SectionHeader
        title="Position Momentum (Top-60)"
        subtitle="Radar profile compares 2025 output to 2020–2024 baseline averages by position."
      />
      <div className="h-[320px] sm:h-[350px]">
        <Radar data={data} options={options} />
      </div>
    </section>
  );
}

export default PositionMomentumChart;
