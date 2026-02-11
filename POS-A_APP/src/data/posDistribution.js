/**
 * Parsed data from POS-Distribution.csv
 * Each row: how many players of each position finished inside a given tier for a given season.
 * Tiers are cumulative (Top-12 is the 12 best overall players, Top-60 is 60 best, etc.)
 *
 * @typedef {{ year: number, range: string, QB: number, RB: number, WR: number, TE: number }} PosDistRow
 */

/** @type {PosDistRow[]} */
export const POS_DISTRIBUTION = [
  // ── 2025 ──
  { year: 2025, range: 'TOP-60', QB: 21, RB: 20, WR: 17, TE: 2 },
  { year: 2025, range: 'TOP-48', QB: 20, RB: 16, WR: 11, TE: 1 },
  { year: 2025, range: 'TOP-36', QB: 15, RB: 13, WR: 7,  TE: 1 },
  { year: 2025, range: 'TOP-24', QB: 12, RB: 6,  WR: 5,  TE: 1 },
  { year: 2025, range: 'TOP-12', QB: 5,  RB: 4,  WR: 3,  TE: 0 },

  // ── 2024 ──
  { year: 2024, range: 'TOP-60', QB: 19, RB: 18, WR: 19, TE: 4 },
  { year: 2024, range: 'TOP-48', QB: 17, RB: 16, WR: 13, TE: 2 },
  { year: 2024, range: 'TOP-36', QB: 16, RB: 11, WR: 8,  TE: 1 },
  { year: 2024, range: 'TOP-24', QB: 13, RB: 6,  WR: 5,  TE: 0 },
  { year: 2024, range: 'TOP-12', QB: 7,  RB: 4,  WR: 1,  TE: 0 },

  // ── 2023 ──
  { year: 2023, range: 'TOP-60', QB: 19, RB: 14, WR: 23, TE: 4 },
  { year: 2023, range: 'TOP-48', QB: 19, RB: 12, WR: 16, TE: 1 },
  { year: 2023, range: 'TOP-36', QB: 15, RB: 7,  WR: 14, TE: 0 },
  { year: 2023, range: 'TOP-24', QB: 13, RB: 3,  WR: 8,  TE: 0 },
  { year: 2023, range: 'TOP-12', QB: 7,  RB: 1,  WR: 4,  TE: 0 },

  // ── 2022 ──
  { year: 2022, range: 'TOP-60', QB: 20, RB: 17, WR: 21, TE: 2 },
  { year: 2022, range: 'TOP-48', QB: 17, RB: 13, WR: 17, TE: 1 },
  { year: 2022, range: 'TOP-36', QB: 14, RB: 9,  WR: 12, TE: 1 },
  { year: 2022, range: 'TOP-24', QB: 11, RB: 6,  WR: 6,  TE: 1 },
  { year: 2022, range: 'TOP-12', QB: 4,  RB: 3,  WR: 4,  TE: 1 },

  // ── 2021 ──
  { year: 2021, range: 'TOP-60', QB: 22, RB: 12, WR: 24, TE: 2 },
  { year: 2021, range: 'TOP-48', QB: 20, RB: 8,  WR: 18, TE: 2 },
  { year: 2021, range: 'TOP-36', QB: 16, RB: 7,  WR: 11, TE: 2 },
  { year: 2021, range: 'TOP-24', QB: 12, RB: 4,  WR: 7,  TE: 1 },
  { year: 2021, range: 'TOP-12', QB: 7,  RB: 2,  WR: 3,  TE: 0 },

  // ── 2020 ──
  { year: 2020, range: 'TOP-60', QB: 22, RB: 10, WR: 26, TE: 2 },
  { year: 2020, range: 'TOP-48', QB: 20, RB: 8,  WR: 18, TE: 2 },
  { year: 2020, range: 'TOP-36', QB: 18, RB: 6,  WR: 10, TE: 2 },
  { year: 2020, range: 'TOP-24', QB: 14, RB: 3,  WR: 5,  TE: 2 },
  { year: 2020, range: 'TOP-12', QB: 10, RB: 1,  WR: 1,  TE: 0 },
];

/** All unique years in POS_DISTRIBUTION (sorted descending) */
export const POS_DIST_YEARS = [2025, 2024, 2023, 2022, 2021, 2020];

/** All unique tier ranges (ordered from smallest to largest) */
export const RANGES = ['TOP-12', 'TOP-24', 'TOP-36', 'TOP-48', 'TOP-60'];

/** Position keys */
export const POSITIONS = ['QB', 'RB', 'WR', 'TE'];
