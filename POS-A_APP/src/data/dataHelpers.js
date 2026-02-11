/**
 * Data helper functions for deriving chart-ready metrics from the raw data.
 */
import { POS_DISTRIBUTION, POS_DIST_YEARS, RANGES } from './posDistribution';
import { SEASON_COMPARE, COMPARE_YEARS } from './seasonCompare';

/**
 * Get RB vs WR counts across years for a specific tier.
 * Source: POS_DISTRIBUTION (2020–2025)
 * @param {string} range - e.g. 'TOP-60'
 * @returns {{ year: number, rb: number, wr: number, diff: number }[]}
 */
export function getRBvsWRByYear(range = 'TOP-60') {
  return POS_DIST_YEARS
    .slice()
    .sort((a, b) => a - b)
    .map(year => {
      const row = POS_DISTRIBUTION.find(r => r.year === year && r.range === range);
      if (!row) return null;
      return {
        year,
        rb: row.RB,
        wr: row.WR,
        diff: row.RB - row.WR,
      };
    })
    .filter(Boolean);
}

/**
 * Get tier breakdown for a given position across years.
 * Source: SEASON_COMPARE (2019–2025)
 * @param {string} position - 'QB', 'RB', 'WR', 'TE', or 'ALL'
 * @returns {{ year: number, 'TOP-12': number, 'TOP-24': number, 'TOP-36': number, 'TOP-48': number, 'TOP-60': number }[]}
 */
export function getPositionTiersByYear(position) {
  const rows = SEASON_COMPARE.filter(r => r.position === position);
  return COMPARE_YEARS.map(year => {
    const entry = { year };
    RANGES.forEach(range => {
      const row = rows.find(r => r.range === range);
      entry[range] = row ? row[year] : 0;
    });
    return entry;
  });
}

/**
 * Get positional composition for a single year.
 * Source: POS_DISTRIBUTION
 * @param {number} year
 * @returns {{ range: string, QB: number, RB: number, WR: number, TE: number }[]}
 */
export function getPositionalComposition(year) {
  return RANGES.map(range => {
    const row = POS_DISTRIBUTION.find(r => r.year === year && r.range === range);
    return row
      ? { range, QB: row.QB, RB: row.RB, WR: row.WR, TE: row.TE }
      : { range, QB: 0, RB: 0, WR: 0, TE: 0 };
  });
}

/**
 * Count how many tiers RB > WR for a given year.
 * Source: POS_DISTRIBUTION
 * @param {number} year
 * @returns {{ tiersRBLeads: number, totalTiers: number, details: { range: string, rb: number, wr: number, rbLeads: boolean }[] }}
 */
export function getRBvsWRTierDominance(year) {
  const rows = POS_DISTRIBUTION.filter(r => r.year === year);
  const details = rows.map(r => ({
    range: r.range,
    rb: r.RB,
    wr: r.WR,
    rbLeads: r.RB > r.WR,
  }));
  return {
    tiersRBLeads: details.filter(d => d.rbLeads).length,
    totalTiers: details.length,
    details,
  };
}

/**
 * Compute headline stat card metrics from both datasets.
 * @returns {object}
 */
export function getStatCardMetrics() {
  // QB Top-12 in 2025 (from SEASON_COMPARE)
  const qbTop12_2025 = SEASON_COMPARE.find(r => r.position === 'QB' && r.range === 'TOP-12');
  const qbTop12_2024 = qbTop12_2025?.[2024] ?? 0;

  // RB vs WR tier dominance 2025
  const rbWrDom = getRBvsWRTierDominance(2025);

  // TE Top-60 in 2025 (from SEASON_COMPARE)
  const teTop60 = SEASON_COMPARE.find(r => r.position === 'TE' && r.range === 'TOP-60');

  // WR Top-60 decline (from SEASON_COMPARE)
  const wrTop60 = SEASON_COMPARE.find(r => r.position === 'WR' && r.range === 'TOP-60');

  // RB Top-12 in 2025 (from SEASON_COMPARE)
  const rbTop12 = SEASON_COMPARE.find(r => r.position === 'RB' && r.range === 'TOP-12');

  return {
    qbEliteDrought: {
      value: qbTop12_2025?.[2025] ?? 0,
      prevValue: qbTop12_2024,
      label: 'Top-12 QBs in 2025',
      sublabel: 'First year: Zero elite QBs',
    },
    rbDominance: {
      value: `${rbWrDom.tiersRBLeads}/${rbWrDom.totalTiers}`,
      label: 'Tiers RB > WR (2025)',
      sublabel: 'First year ever at every tier',
    },
    teDepthExplosion: {
      value: teTop60?.[2025] ?? 0,
      prevValue: teTop60?.[2024] ?? 0,
      label: 'TEs in Top-60 (2025)',
      sublabel: '2× historical average',
    },
    wrDecline: {
      value: wrTop60?.[2025] ?? 0,
      prevValue: wrTop60?.[2023] ?? 0,
      label: 'WRs in Top-60 (2025)',
      sublabel: '3-year decline: 50%',
    },
    rbTop12: {
      value: rbTop12?.[2025] ?? 0,
      prevValue: rbTop12?.[2024] ?? 0,
      label: 'RBs in Top-12 (2025)',
      sublabel: 'Highest ever in dataset',
    },
  };
}

/**
 * Get WR Top-60 count trend from SEASON_COMPARE (2019-2025).
 * @returns {{ year: number, count: number }[]}
 */
export function getWRTop60Trend() {
  const row = SEASON_COMPARE.find(r => r.position === 'WR' && r.range === 'TOP-60');
  if (!row) return [];
  return COMPARE_YEARS.map(year => ({ year, count: row[year] }));
}
