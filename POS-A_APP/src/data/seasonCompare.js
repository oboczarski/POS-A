export const seasonCompare = [
  { position: 'ALL', range: 60, values: { 2025: 10, 2024: 9, 2023: 7, 2022: 8, 2021: 10, 2020: 12, 2019: 4 } },
  { position: 'QB',  range: 60, values: { 2025: 9,  2024: 10, 2023: 6, 2022: 8, 2021: 11, 2020: 11, 2019: 5 } },
  { position: 'RB',  range: 60, values: { 2025: 10, 2024: 11, 2023: 7, 2022: 9, 2021: 7,  2020: 7,  2019: 9 } },
  { position: 'WR',  range: 60, values: { 2025: 6,  2024: 8,  2023: 12, 2022: 8, 2021: 11, 2020: 9,  2019: 6 } },
  { position: 'TE',  range: 60, values: { 2025: 12, 2024: 10, 2023: 9, 2022: 5, 2021: 11, 2020: 6,  2019: 7 } },

  { position: 'ALL', range: 48, values: { 2025: 9,  2024: 8,  2023: 6, 2022: 7, 2021: 6,  2020: 9,  2019: 3 } },
  { position: 'QB',  range: 48, values: { 2025: 6,  2024: 9,  2023: 5, 2022: 4, 2021: 9,  2020: 10, 2019: 5 } },
  { position: 'RB',  range: 48, values: { 2025: 9,  2024: 9,  2023: 6, 2022: 6, 2021: 6,  2020: 5,  2019: 7 } },
  { position: 'WR',  range: 48, values: { 2025: 6,  2024: 7,  2023: 9, 2022: 6, 2021: 8,  2020: 7,  2019: 5 } },
  { position: 'TE',  range: 48, values: { 2025: 11, 2024: 7,  2023: 9, 2022: 5, 2021: 6,  2020: 4,  2019: 6 } },

  { position: 'ALL', range: 36, values: { 2025: 4,  2024: 5,  2023: 5, 2022: 6, 2021: 6,  2020: 7,  2019: 3 } },
  { position: 'QB',  range: 36, values: { 2025: 4,  2024: 6,  2023: 4, 2022: 4, 2021: 6,  2020: 10, 2019: 2 } },
  { position: 'RB',  range: 36, values: { 2025: 8,  2024: 6,  2023: 3, 2022: 6, 2021: 4,  2020: 3,  2019: 6 } },
  { position: 'WR',  range: 36, values: { 2025: 5,  2024: 5,  2023: 7, 2022: 6, 2021: 7,  2020: 5,  2019: 1 } },
  { position: 'TE',  range: 36, values: { 2025: 7,  2024: 6,  2023: 7, 2022: 4, 2021: 4,  2020: 2,  2019: 6 } },

  { position: 'ALL', range: 24, values: { 2025: 1,  2024: 5,  2023: 4, 2022: 3, 2021: 4,  2020: 5,  2019: 2 } },
  { position: 'QB',  range: 24, values: { 2025: 2,  2024: 5,  2023: 2, 2022: 4, 2021: 4,  2020: 6,  2019: 1 } },
  { position: 'RB',  range: 24, values: { 2025: 6,  2024: 4,  2023: 1, 2022: 4, 2021: 2,  2020: 3,  2019: 4 } },
  { position: 'WR',  range: 24, values: { 2025: 4,  2024: 3,  2023: 3, 2022: 5, 2021: 5,  2020: 3,  2019: 1 } },
  { position: 'TE',  range: 24, values: { 2025: 2,  2024: 4,  2023: 6, 2022: 2, 2021: 3,  2020: 2,  2019: 5 } },

  { position: 'ALL', range: 12, values: { 2025: 1,  2024: 2,  2023: 2, 2022: 2, 2021: 2,  2020: 1,  2019: 2 } },
  { position: 'QB',  range: 12, values: { 2025: 0,  2024: 2,  2023: 1, 2022: 2, 2021: 3,  2020: 3,  2019: 1 } },
  { position: 'RB',  range: 12, values: { 2025: 4,  2024: 2,  2023: 1, 2022: 2, 2021: 1,  2020: 1,  2019: 1 } },
  { position: 'WR',  range: 12, values: { 2025: 2,  2024: 1,  2023: 2, 2022: 2, 2021: 3,  2020: 1,  2019: 1 } },
  { position: 'TE',  range: 12, values: { 2025: 1,  2024: 3,  2023: 2, 2022: 1, 2021: 2,  2020: 2,  2019: 1 } },
];

export const compareYears = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
export const positions = ['ALL', 'QB', 'RB', 'WR', 'TE'];
export const compareRanges = [60, 48, 36, 24, 12];

export function getCompareByPosAndRange(position, range) {
  return seasonCompare.find(d => d.position === position && d.range === range);
}

export function getCompareByPosition(position) {
  return seasonCompare.filter(d => d.position === position);
}
