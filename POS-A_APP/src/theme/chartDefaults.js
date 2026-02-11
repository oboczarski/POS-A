/**
 * Global Chart.js defaults for dark mode dashboard.
 * MUST be imported once at app entry (main.jsx) before any chart renders.
 *
 * Uses 'chart.js/auto' to auto-register ALL controllers, elements, scales,
 * and plugins — prevents production tree-shaking from stripping components.
 */
import { Chart } from 'chart.js/auto';

// ── Global Defaults ──
const defaults = Chart.defaults;

// Font
defaults.font.family = "'Inter', system-ui, -apple-system, sans-serif";
defaults.font.size = 12;
defaults.font.weight = 400;
defaults.color = '#cbd5e1'; // slate-300

// Layout
defaults.layout.padding = { top: 4, right: 4, bottom: 4, left: 4 };

// Scales
defaults.scale.grid = {
  ...defaults.scale.grid,
  color: 'rgba(255, 255, 255, 0.05)',
  lineWidth: 1,
};
defaults.scale.border = {
  ...defaults.scale.border,
  color: 'rgba(255, 255, 255, 0.08)',
};
defaults.scale.ticks = {
  ...defaults.scale.ticks,
  color: '#94a3b8', // slate-400
  padding: 8,
  font: { size: 11, family: "'Inter', system-ui, sans-serif" },
};

// Tooltip
defaults.plugins.tooltip = {
  ...defaults.plugins.tooltip,
  backgroundColor: 'rgba(8, 12, 30, 0.92)',
  titleColor: '#f1f5f9',
  bodyColor: '#cbd5e1',
  borderColor: 'rgba(255, 255, 255, 0.1)',
  borderWidth: 1,
  cornerRadius: 10,
  padding: { x: 14, y: 10 },
  titleFont: { size: 13, weight: 600, family: "'Inter', system-ui, sans-serif" },
  bodyFont: { size: 12, weight: 400, family: "'Inter', system-ui, sans-serif" },
  displayColors: true,
  boxPadding: 6,
  caretSize: 6,
  caretPadding: 8,
  usePointStyle: true,
};

// Legend
defaults.plugins.legend.labels = {
  ...defaults.plugins.legend.labels,
  color: '#e2e8f0',
  padding: 20,
  usePointStyle: true,
  pointStyleWidth: 12,
  font: { size: 12, weight: 500, family: "'Inter', system-ui, sans-serif" },
};

// Animation
defaults.animation = {
  duration: 900,
  easing: 'easeOutQuart',
};

// Elements
defaults.elements.line = {
  ...defaults.elements.line,
  tension: 0.35,
  borderWidth: 2.5,
};

defaults.elements.point = {
  ...defaults.elements.point,
  radius: 4,
  hoverRadius: 7,
  hitRadius: 12,
  borderWidth: 2,
  backgroundColor: '#0f172a',
};

defaults.elements.bar = {
  ...defaults.elements.bar,
  borderRadius: 5,
  borderWidth: 0,
};

export default Chart;
