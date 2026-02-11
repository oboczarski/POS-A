import { describe, expect, it } from 'vitest';
import posDistributionRaw from '../../data/csv/POS-Distribution.csv?raw';
import seasonOutputRaw from '../../data/csv/SeasonOutputCompare_2019-2025.csv?raw';
import { parsePosDistribution, parseSeasonOutputCompare } from './loaders';

describe('parsePosDistribution', () => {
  it('parses rows and validates tier totals', () => {
    const rows = parsePosDistribution(posDistributionRaw);

    expect(rows).toHaveLength(30);
    const row2025Top12 = rows.find((entry) => entry.season === 2025 && entry.tier === 12);
    expect(row2025Top12).toMatchObject({ QB: 5, RB: 4, WR: 3, TE: 0, total: 12 });
  });

  it('throws on malformed SZN & Range value', () => {
    const malformed = posDistributionRaw.replace('2025_TOP-60', '2025TOP-60');
    expect(() => parsePosDistribution(malformed)).toThrow(/Malformed "SZN & Range"/);
  });

  it('throws if row totals do not match tier', () => {
    const invalidTotals = posDistributionRaw.replace('2025_TOP-60,21,20,17,2', '2025_TOP-60,21,20,17,3');
    expect(() => parsePosDistribution(invalidTotals)).toThrow(/expected 60/);
  });
});

describe('parseSeasonOutputCompare', () => {
  it('parses matrix and sorts year headers', () => {
    const matrix = parseSeasonOutputCompare(seasonOutputRaw);

    expect(matrix.years[0]).toBe(2019);
    expect(matrix.years.at(-1)).toBe(2025);
    expect(matrix.data['QB_TOP-12'][2025]).toBe(0);
  });

  it('throws when first header is missing', () => {
    const malformedHeaders = seasonOutputRaw.replace('POS & RANGE', 'POS_RANGE');
    expect(() => parseSeasonOutputCompare(malformedHeaders)).toThrow(/Missing required first header/);
  });

  it('throws for duplicate metric keys', () => {
    const [header, firstDataRow, ...rest] = seasonOutputRaw.trim().split('\n');
    const duplicateCsv = [header, firstDataRow, firstDataRow, ...rest].join('\n');
    expect(() => parseSeasonOutputCompare(duplicateCsv)).toThrow(/Duplicate metric key/);
  });
});
