export const posDistribution = [
  { season: 2025, range: 60, qb: 21, rb: 20, wr: 17, te: 2 },
  { season: 2025, range: 48, qb: 20, rb: 16, wr: 11, te: 1 },
  { season: 2025, range: 36, qb: 15, rb: 13, wr: 7, te: 1 },
  { season: 2025, range: 24, qb: 12, rb: 6, wr: 5, te: 1 },
  { season: 2025, range: 12, qb: 5, rb: 4, wr: 3, te: 0 },

  { season: 2024, range: 60, qb: 19, rb: 18, wr: 19, te: 4 },
  { season: 2024, range: 48, qb: 17, rb: 16, wr: 13, te: 2 },
  { season: 2024, range: 36, qb: 16, rb: 11, wr: 8, te: 1 },
  { season: 2024, range: 24, qb: 13, rb: 6, wr: 5, te: 0 },
  { season: 2024, range: 12, qb: 7, rb: 4, wr: 1, te: 0 },

  { season: 2023, range: 60, qb: 19, rb: 14, wr: 23, te: 4 },
  { season: 2023, range: 48, qb: 19, rb: 12, wr: 16, te: 1 },
  { season: 2023, range: 36, qb: 15, rb: 7, wr: 14, te: 0 },
  { season: 2023, range: 24, qb: 13, rb: 3, wr: 8, te: 0 },
  { season: 2023, range: 12, qb: 7, rb: 1, wr: 4, te: 0 },

  { season: 2022, range: 60, qb: 20, rb: 17, wr: 21, te: 2 },
  { season: 2022, range: 48, qb: 17, rb: 13, wr: 17, te: 1 },
  { season: 2022, range: 36, qb: 14, rb: 9, wr: 12, te: 1 },
  { season: 2022, range: 24, qb: 11, rb: 6, wr: 6, te: 1 },
  { season: 2022, range: 12, qb: 4, rb: 3, wr: 4, te: 1 },

  { season: 2021, range: 60, qb: 22, rb: 12, wr: 24, te: 2 },
  { season: 2021, range: 48, qb: 20, rb: 8, wr: 18, te: 2 },
  { season: 2021, range: 36, qb: 16, rb: 7, wr: 11, te: 2 },
  { season: 2021, range: 24, qb: 12, rb: 4, wr: 7, te: 1 },
  { season: 2021, range: 12, qb: 7, rb: 2, wr: 3, te: 0 },

  { season: 2020, range: 60, qb: 22, rb: 10, wr: 26, te: 2 },
  { season: 2020, range: 48, qb: 20, rb: 8, wr: 18, te: 2 },
  { season: 2020, range: 36, qb: 18, rb: 6, wr: 10, te: 2 },
  { season: 2020, range: 24, qb: 14, rb: 3, wr: 5, te: 2 },
  { season: 2020, range: 12, qb: 10, rb: 1, wr: 1, te: 0 },
];

export const seasons = [2020, 2021, 2022, 2023, 2024, 2025];
export const ranges = [60, 48, 36, 24, 12];

export function getBySeasonAndRange(season, range) {
  return posDistribution.find(d => d.season === season && d.range === range);
}

export function getBySeason(season) {
  return posDistribution.filter(d => d.season === season);
}

export function getByRange(range) {
  return posDistribution.filter(d => d.range === range).sort((a, b) => a.season - b.season);
}
