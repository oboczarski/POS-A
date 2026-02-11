export const palettes = {
  combo1: ['#ff0aa5', '#fe26f7', '#d747ff', '#a74eff', '#7866FF', '#4D79FF', '#00a9f1', '#00DDFA'],
  combo2: ['#e8d058', '#FFB847', '#FF916B', '#FF6B6B', '#f94d95', '#CE34F9', '#8F33FF', '#7B5CFF'],
  combo3: ['#00FF99', '#3ffdbe', '#69D6FF', '#52ACF8', '#5882D6', '#6053D5', '#5F03DF', '#3A0CA3'],
  combo4: ['#00FF99', '#00FFCC', '#0099FF', '#0066ff', '#4c00ff', '#5D00FF', '#8F00FF', '#D200FF'],
};

export const posColors = {
  qb: '#7866FF',
  rb: '#00FF99',
  wr: '#FF6B6B',
  te: '#00DDFA',
};

export const posColorsList = [posColors.qb, posColors.rb, posColors.wr, posColors.te];
export const posLabels = ['QB', 'RB', 'WR', 'TE'];

export function withAlpha(hex, alpha) {
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return hex + a;
}

export function createVerticalGradient(ctx, chartArea, color, topAlpha = 0.5, bottomAlpha = 0) {
  if (!chartArea) return color;
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(0, withAlpha(color, bottomAlpha));
  gradient.addColorStop(1, withAlpha(color, topAlpha));
  return gradient;
}
