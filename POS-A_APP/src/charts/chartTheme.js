import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Tooltip
} from 'chart.js';
import { palettes } from '../data/palettes';

let hasRegisteredTheme = false;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function withAlpha(hex, alpha = 1) {
  const normalized = hex.replace('#', '');
  const safeAlpha = clamp(alpha, 0, 1);
  const numeric = Number.parseInt(normalized, 16);
  const red = (numeric >> 16) & 255;
  const green = (numeric >> 8) & 255;
  const blue = numeric & 255;
  return `rgba(${red}, ${green}, ${blue}, ${safeAlpha})`;
}

const glowPlugin = {
  id: 'datasetGlow',
  beforeDatasetDraw(chart, args) {
    const dataset = chart.data.datasets?.[args.index];
    if (!dataset?.glow) {
      return;
    }

    const glowColor = Array.isArray(dataset.borderColor)
      ? dataset.borderColor[0]
      : dataset.glowColor || dataset.borderColor;

    chart.ctx.save();
    chart.ctx.shadowBlur = dataset.glowBlur ?? 14;
    chart.ctx.shadowColor = glowColor;
    chart.ctx.shadowOffsetX = 0;
    chart.ctx.shadowOffsetY = 0;
  },
  afterDatasetDraw(chart, args) {
    const dataset = chart.data.datasets?.[args.index];
    if (dataset?.glow) {
      chart.ctx.restore();
    }
  }
};

export function registerChartTheme() {
  if (hasRegisteredTheme) {
    return;
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    Tooltip,
    Legend,
    Filler,
    glowPlugin
  );

  ChartJS.defaults.color = '#c9d2f0';
  ChartJS.defaults.font.family =
    'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
  ChartJS.defaults.font.size = 12;
  ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
  ChartJS.defaults.plugins.legend.labels.boxWidth = 9;
  ChartJS.defaults.plugins.legend.labels.boxHeight = 9;
  ChartJS.defaults.plugins.legend.labels.padding = 14;

  hasRegisteredTheme = true;
}

function mergeObjects(base, overrides) {
  const merged = { ...base, ...overrides };

  Object.keys(base).forEach((key) => {
    const baseValue = base[key];
    const overrideValue = overrides?.[key];

    if (
      baseValue &&
      overrideValue &&
      typeof baseValue === 'object' &&
      typeof overrideValue === 'object' &&
      !Array.isArray(baseValue) &&
      !Array.isArray(overrideValue)
    ) {
      merged[key] = mergeObjects(baseValue, overrideValue);
    }
  });

  return merged;
}

export function getBaseChartOptions(overrides = {}) {
  const base = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    animation: {
      duration: 950,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#d7def7'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(8, 11, 30, 0.96)',
        borderColor: 'rgba(130, 146, 255, 0.45)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        titleColor: '#f8fafc',
        bodyColor: '#dbe7ff'
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#b7c2e4'
        },
        grid: {
          color: 'rgba(163, 177, 225, 0.12)'
        },
        border: {
          color: 'rgba(196, 208, 255, 0.18)'
        }
      },
      y: {
        ticks: {
          color: '#b7c2e4'
        },
        grid: {
          color: 'rgba(163, 177, 225, 0.11)'
        },
        border: {
          color: 'rgba(196, 208, 255, 0.18)'
        }
      }
    }
  };

  return mergeObjects(base, overrides);
}

export function getPaletteSlice(comboName, count) {
  const combo = palettes[comboName];
  if (!combo) {
    throw new Error(`Unknown palette combo: ${comboName}`);
  }

  return combo.slice(0, count);
}

export function buildVerticalGradient(context, colors) {
  const chart = context?.chart;
  const chartArea = chart?.chartArea;
  if (!chartArea) {
    return withAlpha(colors[0], 0.35);
  }

  const gradient = chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  const last = Math.max(colors.length - 1, 1);
  colors.forEach((color, index) => {
    gradient.addColorStop(index / last, color);
  });

  return gradient;
}
