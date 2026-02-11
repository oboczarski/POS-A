import { describe, expect, it } from 'vitest';
import posDistributionRaw from '../../data/csv/POS-Distribution.csv?raw';
import seasonOutputRaw from '../../data/csv/SeasonOutputCompare_2019-2025.csv?raw';
import { parsePosDistribution, parseSeasonOutputCompare } from './loaders';
import {
  buildDashboardModel,
  getEliteScarcitySeries,
  getHeadlineStats,
  getInsightBullets,
  getOverallDeclineSeries,
  getRbWrDeltaByTierAndYear,
  getRbWrDeltaMatrix,
  getTopRangePositionTrend
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

  it('builds elite scarcity series with 2025 trough', () => {
    const scarcity = getEliteScarcitySeries(makeModel());

    const index2025 = scarcity.years.indexOf(2025);
    expect(scarcity.counts[index2025]).toBe(2);
    expect(scarcity.shares[index2025]).toBeCloseTo(5.56, 2);
    expect(scarcity.min.year).toBe(2025);
    expect(scarcity.min.count).toBe(2);
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

  it('exposes full RB/WR dominance matrix shape', () => {
    const matrix = getRbWrDeltaMatrix(makeModel());

    expect(matrix.seasons).toEqual([2020, 2021, 2022, 2023, 2024, 2025]);
    expect(matrix.tiers).toEqual([60, 48, 36, 24, 12]);
    expect(matrix.entries).toHaveLength(30);
    expect(matrix.maxMagnitude).toBeGreaterThan(0);
  });

  it('keeps overall trend aligned with decline statement', () => {
    const trend = getOverallDeclineSeries(makeModel());
    const top36 = trend.series.find((line) => line.id === 'ALL_TOP-36');

    const index2020 = trend.years.indexOf(2020);
    const index2025 = trend.years.indexOf(2025);

    expect(top36.values[index2020]).toBe(7);
    expect(top36.values[index2025]).toBe(4);
  });

  it('returns top-60 position trends with WR contraction', () => {
    const trend = getTopRangePositionTrend(makeModel(), 'TOP-60');
    const wrSeries = trend.series.find((entry) => entry.position === 'WR');
    const yearIndex = Object.fromEntries(trend.years.map((year, index) => [year, index]));

    expect(wrSeries.values[yearIndex[2023]]).toBe(12);
    expect(wrSeries.values[yearIndex[2024]]).toBe(8);
    expect(wrSeries.values[yearIndex[2025]]).toBe(6);
  });

  it('returns insight bullets matching narrative checks', () => {
    const insights = getInsightBullets(makeModel());

    expect(insights.highlights[0].text).toMatch(/only year RB exceeds WR in every tier/i);
    expect(insights.highlights[1].text).toMatch(/2024 is the transition year/i);
    expect(insights.highlights[2].text).toMatch(/12 in 2023 to 6 in 2025/);
  });
});
