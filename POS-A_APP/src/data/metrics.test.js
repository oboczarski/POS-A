import { describe, expect, it } from 'vitest';
import posDistributionRaw from '../../data/csv/POS-Distribution.csv?raw';
import seasonOutputRaw from '../../data/csv/SeasonOutputCompare_2019-2025.csv?raw';
import { parsePosDistribution, parseSeasonOutputCompare } from './loaders';
import {
  buildDashboardModel,
  getHeadlineStats,
  getInsightBullets,
  getOverallDeclineSeries,
  getRbWrDeltaByTierAndYear
} from './metrics';

function makeModel() {
  const posRows = parsePosDistribution(posDistributionRaw);
  const seasonMatrix = parseSeasonOutputCompare(seasonOutputRaw);
  return buildDashboardModel(posRows, seasonMatrix);
}

describe('metrics', () => {
  it('computes headline stats from source values', () => {
    const stats = getHeadlineStats(makeModel());
    const byId = Object.fromEntries(stats.map((stat) => [stat.id, stat]));

    expect(byId['qb-top-12-2025'].value).toBe(0);
    expect(byId['qb-top-24-2025'].value).toBe(2);
    expect(byId['rb-top-12-2025'].value).toBe(4);
    expect(byId['te-top-60-2025'].value).toBe(12);
    expect(byId['wr-top-60-change-2023-2025'].value).toBe(-50);
    expect(byId['elite-share-2025'].value).toBeCloseTo(5.56, 2);
  });

  it('captures RB vs WR shift in 2024 and 2025', () => {
    const shift = getRbWrDeltaByTierAndYear(makeModel());
    const bySeason = Object.fromEntries(shift.bySeason.map((bucket) => [bucket.season, bucket.values]));

    expect(bySeason[2025].every((entry) => entry.delta > 0)).toBe(true);

    const values2024 = bySeason[2024];
    expect(values2024[0].tier).toBe(60);
    expect(values2024[0].delta).toBe(-1);
    expect(values2024.slice(1).every((entry) => entry.delta > 0)).toBe(true);
  });

  it('keeps overall trend aligned with decline statement', () => {
    const trend = getOverallDeclineSeries(makeModel());
    const top36 = trend.series.find((line) => line.id === 'ALL_TOP-36');

    const index2020 = trend.years.indexOf(2020);
    const index2025 = trend.years.indexOf(2025);

    expect(top36.values[index2020]).toBe(7);
    expect(top36.values[index2025]).toBe(4);
  });

  it('returns insight bullets matching narrative checks', () => {
    const insights = getInsightBullets(makeModel());

    expect(insights.highlights[0].text).toMatch(/only year RB exceeds WR in every tier/i);
    expect(insights.highlights[1].text).toMatch(/2024 is the transition year/i);
    expect(insights.highlights[2].text).toMatch(/12 in 2023 to 6 in 2025/);
  });
});
