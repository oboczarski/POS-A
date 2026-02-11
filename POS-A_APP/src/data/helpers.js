import { posDistribution, seasons, ranges } from './posDistribution.js';

export function positionSharePct(season, range, position) {
  const row = posDistribution.find(d => d.season === season && d.range === range);
  if (!row) return 0;
  return Number(((row[position] / range) * 100).toFixed(1));
}

export function getPositionCountsByRange(range, position) {
  return seasons.map(season => {
    const row = posDistribution.find(d => d.season === season && d.range === range);
    return row ? row[position] : 0;
  });
}

export function rbDominatesWrAllRanges(season) {
  return ranges.every(range => {
    const row = posDistribution.find(d => d.season === season && d.range === range);
    return row && row.rb > row.wr;
  });
}

export function rbMinusWr(season) {
  return ranges.map(range => {
    const row = posDistribution.find(d => d.season === season && d.range === range);
    return row ? row.rb - row.wr : 0;
  });
}

export function yoyDelta(season, range, position) {
  const curr = posDistribution.find(d => d.season === season && d.range === range);
  const prev = posDistribution.find(d => d.season === season - 1 && d.range === range);
  if (!curr || !prev) return null;
  return curr[position] - prev[position];
}

export function getStatCards() {
  return [
    {
      value: '0',
      label: 'Top-12 QBs in 2025',
      delta: 'First time ever',
      deltaType: 'warning',
      accent: '#7866FF',
    },
    {
      value: '4',
      label: 'Top-12 RBs in 2025',
      delta: '+2 vs 2024',
      deltaType: 'success',
      accent: '#00FF99',
    },
    {
      value: '-50%',
      label: 'WR Top-60 since 2023',
      delta: '12 → 6 in 3 yrs',
      deltaType: 'danger',
      accent: '#FF6B6B',
    },
    {
      value: '12',
      label: 'TEs in Top-60 (2025)',
      delta: '2x 2022 volume',
      deltaType: 'info',
      accent: '#00DDFA',
    },
  ];
}
