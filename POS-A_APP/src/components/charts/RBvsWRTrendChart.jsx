import { useState, useMemo, useRef, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { posDistribution, seasons, ranges } from '../../data/posDistribution.js';
import { posColors, createVerticalGradient } from '../../config/palettes.js';

export default function RBvsWRTrendChart() {
  const [selectedRange, setSelectedRange] = useState(60);
  const chartRef = useRef(null);

  const chartData = useMemo(() => {
    const filtered = posDistribution
      .filter(d => d.range === selectedRange)
      .sort((a, b) => a.season - b.season);

    return {
      labels: filtered.map(d => `'${String(d.season).slice(2)}`),
      datasets: [
        {
          label: 'RB',
          data: filtered.map(d => d.rb),
          borderColor: posColors.rb,
          backgroundColor: posColors.rb,
          pointBackgroundColor: posColors.rb,
          pointBorderColor: '#0a0a1a',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 3,
          tension: 0.35,
          fill: true,
        },
        {
          label: 'WR',
          data: filtered.map(d => d.wr),
          borderColor: posColors.wr,
          backgroundColor: posColors.wr,
          pointBackgroundColor: posColors.wr,
          pointBorderColor: '#0a0a1a',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 3,
          tension: 0.35,
          fill: true,
        },
      ],
    };
  }, [selectedRange]);

  const gradientPlugin = useMemo(() => ({
    id: 'gradientFill',
    beforeDatasetsDraw(chart) {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;
      chart.data.datasets.forEach((dataset, i) => {
        const color = dataset.borderColor;
        const gradient = createVerticalGradient(ctx, chartArea, color, 0.25, 0);
        chart.getDatasetMeta(i).dataset.options.backgroundColor = gradient;
      });
    },
  }), []);

  const options = {
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12, weight: 600 } },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 5 },
        grid: { color: 'rgba(255,255,255,0.04)' },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: ctx => `${ctx[0].label} \u2022 Top-${selectedRange}`,
          label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y} players`,
        },
      },
      legend: {
        position: 'top',
        align: 'end',
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {ranges.map(r => (
          <button
            key={r}
            onClick={() => setSelectedRange(r)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
              selectedRange === r
                ? 'bg-[#00FF99] text-[#0a0a1a] shadow-lg shadow-[#00FF99]/25'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300'
            }`}
          >
            Top-{r}
          </button>
        ))}
      </div>
      <div className="h-72 md:h-80">
        <Line ref={chartRef} data={chartData} options={options} plugins={[gradientPlugin]} />
      </div>
    </div>
  );
}
