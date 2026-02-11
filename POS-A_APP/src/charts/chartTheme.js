import {
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  RadarController,
  RadialLinearScale,
  Tooltip
} from 'chart.js';
import { palettes } from '../data/palettes';

let hasRegisteredTheme = false;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function toComparable(value) {
  return String(value ?? '').trim();
}

export function withAlpha(hex, alpha = 1) {
  const safeAlpha = clamp(alpha, 0, 1);
  const sourceHex = typeof hex === 'string' ? hex : '#ffffff';
  const normalized = sourceHex.replace('#', '');

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return `rgba(255, 255, 255, ${safeAlpha})`;
  }

  const numeric = Number.parseInt(normalized, 16);
  const red = (numeric >> 16) & 255;
  const green = (numeric >> 8) & 255;
  const blue = numeric & 255;
  return `rgba(${red}, ${green}, ${blue}, ${safeAlpha})`;
}

const chartAreaAuraPlugin = {
  id: 'chartAreaAura',
  beforeDraw(chart, _, pluginOptions) {
    const options = pluginOptions ?? chart.options?.plugins?.chartAreaAura;
    if (options === false || options?.enabled === false) {
      return;
    }

    const chartArea = chart.chartArea;
    if (!chartArea) {
      return;
    }

    const ctx = chart.ctx;
    const topColor = options?.topColor ?? 'rgba(120, 102, 255, 0.11)';
    const bottomColor = options?.bottomColor ?? 'rgba(0, 169, 241, 0.03)';

    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, topColor);
    gradient.addColorStop(1, bottomColor);

    ctx.save();
    ctx.fillStyle = gradient;
    ctx.fillRect(
      chartArea.left,
      chartArea.top,
      chartArea.right - chartArea.left,
      chartArea.bottom - chartArea.top
    );
    ctx.restore();
  }
};

const focusMarkerPlugin = {
  id: 'focusMarker',
  afterDatasetsDraw(chart) {
    const marker = chart.options?.plugins?.focusMarker;
    if (!marker || marker.enabled === false) {
      return;
    }

    const xScale = chart.scales[marker.scaleId || 'x'];
    if (!xScale) {
      return;
    }

    let pixelX = Number.NaN;
    if (typeof xScale.getPixelForValue === 'function') {
      pixelX = xScale.getPixelForValue(marker.xValue);
    }

    if (!Number.isFinite(pixelX)) {
      const labels = chart.data.labels ?? [];
      const index = labels.findIndex((label) => toComparable(label) === toComparable(marker.xValue));
      if (index >= 0 && typeof xScale.getPixelForValue === 'function') {
        pixelX = xScale.getPixelForValue(index);
      }
    }

    if (!Number.isFinite(pixelX)) {
      return;
    }

    const chartArea = chart.chartArea;
    if (!chartArea) {
      return;
    }

    const ctx = chart.ctx;
    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = marker.lineWidth ?? 1.25;
    ctx.strokeStyle = marker.color ?? 'rgba(255, 255, 255, 0.45)';
    ctx.beginPath();
    ctx.moveTo(pixelX, chartArea.top);
    ctx.lineTo(pixelX, chartArea.bottom);
    ctx.stroke();

    if (marker.label) {
      ctx.setLineDash([]);
      ctx.fillStyle = marker.textColor ?? '#e2e8f0';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(marker.label, pixelX + 6, chartArea.top + 12);
    }

    ctx.restore();
  }
};

export function registerChartTheme() {
  if (hasRegisteredTheme) {
    return;
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    PointElement,
    LineElement,
    BarElement,
    LineController,
    BarController,
    RadarController,
    BubbleController,
    Tooltip,
    Legend,
    Filler,
    chartAreaAuraPlugin,
    focusMarkerPlugin
  );

  ChartJS.defaults.color = '#cbd5f5';
  ChartJS.defaults.font.family =
    'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
  ChartJS.defaults.font.size = 12;
  ChartJS.defaults.animation.duration = 950;
  ChartJS.defaults.animation.easing = 'easeOutQuart';

  ChartJS.defaults.plugins.legend.labels.usePointStyle = true;
  ChartJS.defaults.plugins.legend.labels.boxWidth = 10;
  ChartJS.defaults.plugins.legend.labels.boxHeight = 10;
  ChartJS.defaults.plugins.legend.labels.padding = 12;

  hasRegisteredTheme = true;
}

function mergeObjects(base, overrides) {
  if (!overrides) {
    return base;
  }

  const merged = { ...base, ...overrides };

  Object.keys(base).forEach((key) => {
    const baseValue = base[key];
    const overrideValue = overrides[key];

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
      mode: 'nearest',
      intersect: false
    },
    plugins: {
      chartAreaAura: {
        enabled: true
      },
      legend: {
        position: 'bottom',
        labels: {
          color: '#d9e1ff'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(8, 10, 30, 0.96)',
        borderColor: 'rgba(140, 155, 255, 0.5)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        titleColor: '#ffffff',
        bodyColor: '#dbe7ff'
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#b8c2e2'
        },
        border: {
          color: 'rgba(167, 177, 214, 0.22)'
        },
        grid: {
          color: 'rgba(164, 177, 224, 0.13)'
        }
      },
      y: {
        ticks: {
          color: '#b8c2e2'
        },
        border: {
          color: 'rgba(167, 177, 214, 0.22)'
        },
        grid: {
          color: 'rgba(164, 177, 224, 0.13)'
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

  if (count <= combo.length) {
    return combo.slice(0, count);
  }

  return Array.from({ length: count }, (_, index) => combo[index % combo.length]);
}

export function buildVerticalGradient(context, colors) {
  const chart = context?.chart;
  const chartArea = chart?.chartArea;
  if (!chartArea) {
    return withAlpha(colors[0], 0.45);
  }

  const gradient = chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  const last = Math.max(colors.length - 1, 1);
  colors.forEach((color, index) => {
    gradient.addColorStop(index / last, color);
  });

  return gradient;
}

export function buildHorizontalGradient(context, colors) {
  const chart = context?.chart;
  const chartArea = chart?.chartArea;
  if (!chartArea) {
    return withAlpha(colors[0], 0.45);
  }

  const gradient = chart.ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
  const last = Math.max(colors.length - 1, 1);
  colors.forEach((color, index) => {
    gradient.addColorStop(index / last, color);
  });

  return gradient;
}
