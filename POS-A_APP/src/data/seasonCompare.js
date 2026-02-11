/**
 * Parsed data from SeasonOutputCompare_2019-2025.csv
 * Each row: a position + tier combination tracked across years (2019–2025).
 * Values represent counts of players from that position finishing in the given tier each year.
 *
 * @typedef {{ position: string, range: string, 2019: number, 2020: number, 2021: number, 2022: number, 2023: number, 2024: number, 2025: number }} SeasonCompareRow
 */

/** @type {SeasonCompareRow[]} */
export const SEASON_COMPARE = [
  // ── TOP-60 ──
  { position: 'ALL', range: 'TOP-60', 2019: 4,  2020: 12, 2021: 10, 2022: 8,  2023: 7,  2024: 9,  2025: 10 },
  { position: 'QB',  range: 'TOP-60', 2019: 5,  2020: 11, 2021: 11, 2022: 8,  2023: 6,  2024: 10, 2025: 9  },
  { position: 'RB',  range: 'TOP-60', 2019: 9,  2020: 7,  2021: 7,  2022: 9,  2023: 7,  2024: 11, 2025: 10 },
  { position: 'WR',  range: 'TOP-60', 2019: 6,  2020: 9,  2021: 11, 2022: 8,  2023: 12, 2024: 8,  2025: 6  },
  { position: 'TE',  range: 'TOP-60', 2019: 7,  2020: 6,  2021: 11, 2022: 5,  2023: 9,  2024: 10, 2025: 12 },

  // ── TOP-48 ──
  { position: 'ALL', range: 'TOP-48', 2019: 3,  2020: 9,  2021: 6,  2022: 7,  2023: 6,  2024: 8,  2025: 9  },
  { position: 'QB',  range: 'TOP-48', 2019: 5,  2020: 10, 2021: 9,  2022: 4,  2023: 5,  2024: 9,  2025: 6  },
  { position: 'RB',  range: 'TOP-48', 2019: 7,  2020: 5,  2021: 6,  2022: 6,  2023: 6,  2024: 9,  2025: 9  },
  { position: 'WR',  range: 'TOP-48', 2019: 5,  2020: 7,  2021: 8,  2022: 6,  2023: 9,  2024: 7,  2025: 6  },
  { position: 'TE',  range: 'TOP-48', 2019: 6,  2020: 4,  2021: 6,  2022: 5,  2023: 9,  2024: 7,  2025: 11 },

  // ── TOP-36 ──
  { position: 'ALL', range: 'TOP-36', 2019: 3,  2020: 7,  2021: 6,  2022: 6,  2023: 5,  2024: 5,  2025: 4  },
  { position: 'QB',  range: 'TOP-36', 2019: 2,  2020: 10, 2021: 6,  2022: 4,  2023: 4,  2024: 6,  2025: 4  },
  { position: 'RB',  range: 'TOP-36', 2019: 6,  2020: 3,  2021: 4,  2022: 6,  2023: 3,  2024: 6,  2025: 8  },
  { position: 'WR',  range: 'TOP-36', 2019: 1,  2020: 5,  2021: 7,  2022: 6,  2023: 7,  2024: 5,  2025: 5  },
  { position: 'TE',  range: 'TOP-36', 2019: 6,  2020: 2,  2021: 4,  2022: 4,  2023: 7,  2024: 6,  2025: 7  },

  // ── TOP-24 ──
  { position: 'ALL', range: 'TOP-24', 2019: 2,  2020: 5,  2021: 4,  2022: 3,  2023: 4,  2024: 5,  2025: 1  },
  { position: 'QB',  range: 'TOP-24', 2019: 1,  2020: 6,  2021: 4,  2022: 4,  2023: 2,  2024: 5,  2025: 2  },
  { position: 'RB',  range: 'TOP-24', 2019: 4,  2020: 3,  2021: 2,  2022: 4,  2023: 1,  2024: 4,  2025: 6  },
  { position: 'WR',  range: 'TOP-24', 2019: 1,  2020: 3,  2021: 5,  2022: 5,  2023: 3,  2024: 3,  2025: 4  },
  { position: 'TE',  range: 'TOP-24', 2019: 5,  2020: 2,  2021: 3,  2022: 2,  2023: 6,  2024: 4,  2025: 2  },

  // ── TOP-12 ──
  { position: 'ALL', range: 'TOP-12', 2019: 2,  2020: 1,  2021: 2,  2022: 2,  2023: 2,  2024: 2,  2025: 1  },
  { position: 'QB',  range: 'TOP-12', 2019: 1,  2020: 3,  2021: 3,  2022: 2,  2023: 1,  2024: 2,  2025: 0  },
  { position: 'RB',  range: 'TOP-12', 2019: 1,  2020: 1,  2021: 1,  2022: 2,  2023: 1,  2024: 2,  2025: 4  },
  { position: 'WR',  range: 'TOP-12', 2019: 1,  2020: 1,  2021: 3,  2022: 2,  2023: 2,  2024: 1,  2025: 2  },
  { position: 'TE',  range: 'TOP-12', 2019: 1,  2020: 2,  2021: 2,  2022: 1,  2023: 2,  2024: 3,  2025: 1  },
];

/** All years available in SEASON_COMPARE */
export const COMPARE_YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
