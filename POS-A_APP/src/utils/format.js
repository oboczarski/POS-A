export function formatPercent(value, digits = 2) {
  return `${Number(value).toFixed(digits)}%`;
}

export function formatSigned(value, digits = 0) {
  const numeric = Number(value);
  const sign = numeric > 0 ? '+' : '';
  return `${sign}${numeric.toFixed(digits)}`;
}

export function formatTier(tier) {
  return `Top-${tier}`;
}

export function formatDecimal(value, digits = 1) {
  return Number(value).toFixed(digits);
}
