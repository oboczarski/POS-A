import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler
);

export function applyChartTheme() {
  const defaults = Chart.defaults;

  defaults.color = '#94a3b8';
  defaults.font.family = "'Inter', 'system-ui', sans-serif";
  defaults.font.size = 12;
  defaults.font.weight = 400;

  defaults.responsive = true;
  defaults.maintainAspectRatio = false;

  defaults.animation.duration = 1200;
  defaults.animation.easing = 'easeOutQuart';

  // Tooltip
  defaults.plugins.tooltip.backgroundColor = 'rgba(10, 10, 26, 0.95)';
  defaults.plugins.tooltip.titleColor = '#ffffff';
  defaults.plugins.tooltip.titleFont = { weight: 600, size: 13 };
  defaults.plugins.tooltip.bodyColor = '#cbd5e1';
  defaults.plugins.tooltip.bodyFont = { size: 12 };
  defaults.plugins.tooltip.borderColor = 'rgba(120, 102, 255, 0.3)';
  defaults.plugins.tooltip.borderWidth = 1;
  defaults.plugins.tooltip.cornerRadius = 10;
  defaults.plugins.tooltip.padding = 12;
  defaults.plugins.tooltip.displayColors = true;
  defaults.plugins.tooltip.boxPadding = 6;
  defaults.plugins.tooltip.caretSize = 6;

  // Legend
  defaults.plugins.legend.labels.color = '#94a3b8';
  defaults.plugins.legend.labels.padding = 20;
  defaults.plugins.legend.labels.usePointStyle = true;
  defaults.plugins.legend.labels.pointStyleWidth = 10;
  defaults.plugins.legend.labels.font = { size: 12, weight: 500 };

  // Scale defaults
  defaults.scale.grid = {
    color: 'rgba(255, 255, 255, 0.05)',
    drawBorder: false,
  };
  defaults.scale.ticks = {
    color: '#64748b',
    font: { size: 11 },
  };
  defaults.scale.border = {
    display: false,
  };
}
