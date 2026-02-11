/**
 * Four color palettes provided by the user.
 * Each palette has 8 colors ordered from warm/bright → cool/deep.
 * Use only the needed number of colors from a palette per chart.
 */

export const COMBO_1 = [
  '#ff0aa5', '#fe26f7', '#d747ff', '#a74eff',
  '#7866FF', '#4D79FF', '#00a9f1', '#00DDFA',
];

export const COMBO_2 = [
  '#e8d058', '#FFB847', '#FF916B', '#FF6B6B',
  '#f94d95', '#CE34F9', '#8F33FF', '#7B5CFF',
];

export const COMBO_3 = [
  '#00FF99', '#3ffdbe', '#69D6FF', '#52ACF8',
  '#5882D6', '#6053D5', '#5F03DF', '#3A0CA3',
];

export const COMBO_4 = [
  '#00FF99', '#00FFCC', '#0099FF', '#0066ff',
  '#4c00ff', '#5D00FF', '#8F00FF', '#D200FF',
];

/** All palettes as a keyed object for easy lookup */
export const PALETTES = {
  combo1: COMBO_1,
  combo2: COMBO_2,
  combo3: COMBO_3,
  combo4: COMBO_4,
};

/**
 * Convert hex color to rgba string.
 * @param {string} hex - e.g. '#ff0aa5'
 * @param {number} alpha - 0-1
 * @returns {string}
 */
export function withAlpha(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Create a vertical canvas gradient from two palette colors.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ top: number, bottom: number }} chartArea
 * @param {string} colorTop - hex
 * @param {string} colorBottom - hex
 * @param {number} [alphaTop=0.6]
 * @param {number} [alphaBottom=0.02]
 * @returns {CanvasGradient}
 */
export function createVerticalGradient(ctx, chartArea, colorTop, colorBottom, alphaTop = 0.6, alphaBottom = 0.02) {
  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  gradient.addColorStop(0, withAlpha(colorTop, alphaTop));
  gradient.addColorStop(1, withAlpha(colorBottom, alphaBottom));
  return gradient;
}

/**
 * Create a horizontal canvas gradient across multiple colors.
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ left: number, right: number }} chartArea
 * @param {string[]} colors - array of hex colors
 * @param {number} [alpha=0.8]
 * @returns {CanvasGradient}
 */
export function createHorizontalGradient(ctx, chartArea, colors, alpha = 0.8) {
  const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
  colors.forEach((color, i) => {
    gradient.addColorStop(i / (colors.length - 1), withAlpha(color, alpha));
  });
  return gradient;
}

/**
 * Position-specific brand colors for consistent usage.
 */
export const POS_COLORS = {
  QB: '#FFB847',
  RB: '#00FF99',
  WR: '#8F00FF',
  TE: '#00DDFA',
};

export const POS_COLORS_MUTED = {
  QB: withAlpha('#FFB847', 0.7),
  RB: withAlpha('#00FF99', 0.7),
  WR: withAlpha('#8F00FF', 0.7),
  TE: withAlpha('#00DDFA', 0.7),
};
