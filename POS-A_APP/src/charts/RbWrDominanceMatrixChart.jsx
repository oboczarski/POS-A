import { Bubble } from 'react-chartjs-2';
import SectionHeader from '../components/SectionHeader';
import { getBaseChartOptions, getPaletteSlice, withAlpha } from './chartTheme';

function pointColor(delta, maxMagnitude, palettePositive, paletteNegative) {
  const intensity = Math.min(Math.abs(delta) / Math.max(maxMagnitude, 1), 1);
  if (delta >= 0) {
    return withAlpha(palettePositive[1], 0.35 + intensity * 0.55);
  }
  return withAlpha(paletteNegative[1], 0.35 + intensity * 0.55);
}

function pointBorder(delta, palettePositive, paletteNegative) {
  return delta >= 0 ? palettePositive[0] : paletteNegative[0];
}

function RbWrDominanceMatrixChart({ chartData }) {
  const positivePalette = getPaletteSlice('combo3', 4);
  const negativePalette = getPaletteSlice('combo1', 4);

  const positive = chartData.positive.map((point) => ({
    ...point,
    backgroundColor: pointColor(point.delta, chartData.maxMagnitude, positivePalette, negativePalette),
    borderColor: pointBorder(point.delta, positivePalette, negativePalette)
  }));

  const negative = chartData.negative.map((point) => ({
    ...point,
    backgroundColor: pointColor(point.delta, chartData.maxMagnitude, positivePalette, negativePalette),
    borderColor: pointBorder(point.delta, positivePalette, negativePalette)
  }));

  const data = {
    datasets: [
      {
        label: 'RB lead',
        data: positive,
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 'y'
        },
        pointRadius(context) {
          return context.raw.r;
        },
        pointHoverRadius(context) {
          return context.raw.r + 1.5;
        },
        pointBackgroundColor(context) {
          return context.raw.backgroundColor;
        },
        pointBorderColor(context) {
          return context.raw.borderColor;
        },
        pointBorderWidth: 1.2
      },
      {
        label: 'WR lead',
        data: negative,
        parsing: {
          xAxisKey: 'x',
          yAxisKey: 'y'
        },
        pointRadius(context) {
          return context.raw.r;
        },
        pointHoverRadius(context) {
          return context.raw.r + 1.5;
        },
        pointBackgroundColor(context) {
          return context.raw.backgroundColor;
        },
        pointBorderColor(context) {
          return context.raw.borderColor;
        },
        pointBorderWidth: 1.2
      }
    ]
  };

  const minSeason = Math.min(...chartData.seasons);
  const maxSeason = Math.max(...chartData.seasons);

  const options = getBaseChartOptions({
    plugins: {
      tooltip: {
        callbacks: {
          title(context) {
            const point = context[0]?.raw;
            if (!point) {
              return '';
            }
            return `${point.season} • Top-${point.tier}`;
          },
          label(context) {
            const point = context.raw;
            const sign = point.delta > 0 ? '+' : '';
            return `RB ${point.rb} vs WR ${point.wr} (${sign}${point.delta})`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        min: minSeason - 0.5,
        max: maxSeason + 0.5,
        ticks: {
          stepSize: 1,
          callback(value) {
            return Number.isInteger(value) ? value : '';
          }
        },
        title: {
          display: true,
          text: 'Season'
        }
      },
      y: {
        type: 'linear',
        min: 10,
        max: 62,
        reverse: true,
        ticks: {
          stepSize: 12,
          callback(value) {
            return [12, 24, 36, 48, 60].includes(Number(value)) ? `Top-${value}` : '';
          }
        },
        title: {
          display: true,
          text: 'Tier'
        }
      }
    }
  });

  return (
    <section className="chart-shell">
      <SectionHeader
        eyebrow="REGIME MAP"
        title="RB vs WR Dominance Matrix"
        subtitle="Bubble size = dominance magnitude (RB − WR). 2025 is the first full-tier RB sweep in every tier."
      />
      <div className="chart-canvas chart-canvas--lg">
        <Bubble data={data} options={options} />
      </div>
    </section>
  );
}

export default RbWrDominanceMatrixChart;
