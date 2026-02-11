import { formatPercent } from '../utils/format';
import { positions } from './palettes';

const ORDERED_TIERS_ASC = [12, 24, 36, 48, 60];
const ORDERED_TIERS_DESC = [60, 48, 36, 24, 12];
const RB_WR_ANALYSIS_SEASONS = [2020, 2021, 2022, 2023, 2024, 2025];

function requireMatrixValue(matrix, key, year) {
  if (!matrix.data[key]) {
    throw new Error(`Season output metric "${key}" is missing.`);
  }

  if (typeof matrix.data[key][year] !== 'number') {
    throw new Error(`Season output value missing for key "${key}" year ${year}.`);
  }

  return matrix.data[key][year];
}

function getPosRow(model, season, tier) {
  const row = model.posBySeasonTier.get(`${season}-${tier}`);
  if (!row) {
    throw new Error(`POS distribution row missing for season ${season} and top-${tier}.`);
  }
  return row;
}

function average(values) {
  if (!values.length) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/**
 * @param {import('./contracts').PosDistributionRow[]} posDistributionRows
 * @param {import('./contracts').SeasonOutputMatrix} seasonOutputMatrix
 * @returns {import('./contracts').DashboardModel}
 */
export function buildDashboardModel(posDistributionRows, seasonOutputMatrix) {
  const posBySeasonTier = new Map(
    posDistributionRows.map((row) => [`${row.season}-${row.tier}`, row])
  );

  return {
    posDistributionRows,
    seasonOutputMatrix,
    posBySeasonTier,
    years: [...seasonOutputMatrix.years],
    tiers: [...ORDERED_TIERS_ASC]
  };
}

export function getHeadlineStats(model) {
  const matrix = model.seasonOutputMatrix;
  const qbTop12 = requireMatrixValue(matrix, 'QB_TOP-12', 2025);
  const qbTop24 = requireMatrixValue(matrix, 'QB_TOP-24', 2025);
  const rbTop12 = requireMatrixValue(matrix, 'RB_TOP-12', 2025);
  const teTop60 = requireMatrixValue(matrix, 'TE_TOP-60', 2025);

  const wrTop60_2023 = requireMatrixValue(matrix, 'WR_TOP-60', 2023);
  const wrTop60_2025 = requireMatrixValue(matrix, 'WR_TOP-60', 2025);
  const wrChangePct = ((wrTop60_2025 - wrTop60_2023) / wrTop60_2023) * 100;

  const elite_2025 =
    requireMatrixValue(matrix, 'ALL_TOP-24', 2025) + requireMatrixValue(matrix, 'ALL_TOP-12', 2025);
  const eliteAllYears = matrix.years.reduce(
    (total, year) =>
      total +
      requireMatrixValue(matrix, 'ALL_TOP-24', year) +
      requireMatrixValue(matrix, 'ALL_TOP-12', year),
    0
  );
  const eliteSharePct = (elite_2025 / eliteAllYears) * 100;

  return [
    {
      id: 'qb-top-12-2025',
      label: 'QB Top-12 in 2025',
      value: qbTop12,
      valueDisplay: String(qbTop12),
      context: 'Only season with zero elite QBs.'
    },
    {
      id: 'qb-top-24-2025',
      label: 'QB Top-24 in 2025',
      value: qbTop24,
      valueDisplay: String(qbTop24),
      context: 'Lowest high-end QB count in sample.'
    },
    {
      id: 'rb-top-12-2025',
      label: 'RB Top-12 in 2025',
      value: rbTop12,
      valueDisplay: String(rbTop12),
      context: 'Resurgence peak across tracked years.'
    },
    {
      id: 'wr-top-60-change-2023-2025',
      label: 'WR Top-60 change (2023→2025)',
      value: wrChangePct,
      valueDisplay: formatPercent(wrChangePct, 0),
      context: `${wrTop60_2023} to ${wrTop60_2025} wide receivers.`
    },
    {
      id: 'te-top-60-2025',
      label: 'TE Top-60 in 2025',
      value: teTop60,
      valueDisplay: String(teTop60),
      context: 'Depth spike versus prior cycles.'
    },
    {
      id: 'elite-share-2025',
      label: '2025 elite share (Top-24+12)',
      value: eliteSharePct,
      valueDisplay: formatPercent(eliteSharePct, 2),
      context: `${elite_2025} of ${eliteAllYears} total elite finishes since 2019.`
    }
  ];
}

export function getOverallDeclineSeries(model) {
  const years = model.years;
  const series = ORDERED_TIERS_DESC.map((tier) => {
    const key = `ALL_TOP-${tier}`;
    return {
      id: key,
      label: `Top-${tier}`,
      values: years.map((year) => requireMatrixValue(model.seasonOutputMatrix, key, year))
    };
  });

  return {
    years,
    series,
    top36Decline: {
      from2020: requireMatrixValue(model.seasonOutputMatrix, 'ALL_TOP-36', 2020),
      to2025: requireMatrixValue(model.seasonOutputMatrix, 'ALL_TOP-36', 2025)
    }
  };
}

export function getEliteScarcitySeries(model) {
  const years = [...model.years];
  const counts = years.map(
    (year) =>
      requireMatrixValue(model.seasonOutputMatrix, 'ALL_TOP-24', year) +
      requireMatrixValue(model.seasonOutputMatrix, 'ALL_TOP-12', year)
  );

  const total = counts.reduce((sum, value) => sum + value, 0);
  const shares = counts.map((count) => (count / total) * 100);

  const entries = years.map((year, index) => ({
    year,
    count: counts[index],
    share: shares[index]
  }));

  const min = entries.reduce((lowest, entry) => (entry.count < lowest.count ? entry : lowest), entries[0]);
  const max = entries.reduce((highest, entry) => (entry.count > highest.count ? entry : highest), entries[0]);

  const baselineEntries = entries.filter((entry) => entry.year >= 2020 && entry.year <= 2024);
  const baselineAverage = average(baselineEntries.map((entry) => entry.count));

  return {
    years,
    counts,
    shares,
    total,
    average: average(counts),
    baselineAverage,
    min,
    max,
    entries
  };
}

export function getTopRangePositionTrend(model, range = 'TOP-60') {
  const years = [...model.years];
  const series = positions.map((position) => {
    const key = `${position}_${range}`;
    return {
      position,
      label: position,
      values: years.map((year) => requireMatrixValue(model.seasonOutputMatrix, key, year))
    };
  });

  return {
    years,
    range,
    series
  };
}

export function getRbWrDeltaMatrix(model) {
  const tiers = [...ORDERED_TIERS_DESC];
  const seasons = RB_WR_ANALYSIS_SEASONS.filter((season) =>
    tiers.every((tier) => model.posBySeasonTier.has(`${season}-${tier}`))
  );

  const entries = seasons
    .flatMap((season) =>
      tiers.map((tier) => {
        const row = getPosRow(model, season, tier);
        return {
          season,
          tier,
          rb: row.RB,
          wr: row.WR,
          delta: row.RB - row.WR
        };
      })
    )
    .sort((left, right) => left.season - right.season || right.tier - left.tier);

  const maxMagnitude = entries.reduce(
    (maxValue, entry) => Math.max(maxValue, Math.abs(entry.delta)),
    0
  );

  const toBubblePoint = (entry) => ({
    x: entry.season,
    y: entry.tier,
    r: 6 + Math.abs(entry.delta) * 2.1,
    season: entry.season,
    tier: entry.tier,
    rb: entry.rb,
    wr: entry.wr,
    delta: entry.delta
  });

  return {
    seasons,
    tiers,
    maxMagnitude,
    entries,
    positive: entries.filter((entry) => entry.delta >= 0).map(toBubblePoint),
    negative: entries.filter((entry) => entry.delta < 0).map(toBubblePoint)
  };
}

export function getRbWrDeltaByTierAndYear(model) {
  const seasons = [2024, 2025];
  const labels = ORDERED_TIERS_DESC.map((tier) => `Top-${tier}`);

  const bySeason = seasons.map((season) => ({
    season,
    values: ORDERED_TIERS_DESC.map((tier) => {
      const row = getPosRow(model, season, tier);
      return {
        tier,
        rb: row.RB,
        wr: row.WR,
        delta: row.RB - row.WR
      };
    })
  }));

  return {
    labels,
    bySeason
  };
}

export function getCompositionForSeason(model, season) {
  const labels = ORDERED_TIERS_ASC.map((tier) => `Top-${tier}`);
  const rows = ORDERED_TIERS_ASC.map((tier) => getPosRow(model, season, tier));

  const counts = positions.reduce((accumulator, position) => {
    accumulator[position] = rows.map((row) => row[position]);
    return accumulator;
  }, {});

  const percentages = positions.reduce((accumulator, position) => {
    accumulator[position] = rows.map((row) => (row[position] / row.total) * 100);
    return accumulator;
  }, {});

  return {
    season,
    labels,
    tiers: ORDERED_TIERS_ASC,
    counts,
    percentages
  };
}

export function getMomentumSeries(model, range = 'TOP-60') {
  const baselineYears = [2020, 2021, 2022, 2023, 2024];
  const currentYear = 2025;

  const current = positions.map((position) =>
    requireMatrixValue(model.seasonOutputMatrix, `${position}_${range}`, currentYear)
  );
  const baseline = positions.map((position) => {
    const key = `${position}_${range}`;
    const total = baselineYears.reduce(
      (sum, year) => sum + requireMatrixValue(model.seasonOutputMatrix, key, year),
      0
    );
    return total / baselineYears.length;
  });

  return {
    positions,
    currentYear,
    baselineYears,
    current,
    baseline,
    delta: current.map((value, index) => value - baseline[index]),
    range
  };
}

export function getInsightBullets(model) {
  const rbSweep2025 = ORDERED_TIERS_DESC.every((tier) => {
    const row = getPosRow(model, 2025, tier);
    return row.RB > row.WR;
  });

  const transition2024 =
    getPosRow(model, 2024, 60).RB < getPosRow(model, 2024, 60).WR &&
    ORDERED_TIERS_DESC.slice(1).every((tier) => getPosRow(model, 2024, tier).RB > getPosRow(model, 2024, tier).WR);

  const wr2023 = requireMatrixValue(model.seasonOutputMatrix, 'WR_TOP-60', 2023);
  const wr2025 = requireMatrixValue(model.seasonOutputMatrix, 'WR_TOP-60', 2025);
  const wrDropPct = ((wr2025 - wr2023) / wr2023) * 100;

  const te2025 = requireMatrixValue(model.seasonOutputMatrix, 'TE_TOP-60', 2025);
  const te2020 = requireMatrixValue(model.seasonOutputMatrix, 'TE_TOP-60', 2020);
  const te2022 = requireMatrixValue(model.seasonOutputMatrix, 'TE_TOP-60', 2022);

  return {
    highlights: [
      {
        id: 'rb-sweep-2025',
        title: 'Complete RB sweep in 2025',
        text: rbSweep2025
          ? '2025 is the only year RB exceeds WR in every tier (Top-12 through Top-60).'
          : 'RB does not exceed WR across all tiers in 2025.',
        metric: 'RB > WR in 5 of 5 tiers'
      },
      {
        id: 'rb-shift-2024',
        title: '2024 as the transition year',
        text: transition2024
          ? '2024 is the transition year: RB leads from Top-12 to Top-48, trailing only in Top-60.'
          : '2024 does not match the expected transition pattern.',
        metric: 'RB leads 4 of 5 tiers'
      },
      {
        id: 'wr-compression',
        title: 'WR depth compression',
        text: `WR Top-60 count fell from ${wr2023} in 2023 to ${wr2025} in 2025 (${formatPercent(wrDropPct, 0)}).`,
        metric: '12 → 8 → 6 trajectory confirmed'
      },
      {
        id: 'te-depth-spike',
        title: 'TE depth expansion',
        text: `TE Top-60 reached ${te2025} in 2025, double 2020 (${te2020}) and over 2x 2022 (${te2022}).`,
        metric: 'TE Top-48 also peaks at 11 in 2025'
      }
    ],
    forecast: {
      title: 'Qualitative 2026–2027 Outlook',
      text: 'The analysis suggests another strong RB year in 2026, then a likely cyclical pivot back toward WR in 2027. This note is directional only and does not introduce new numeric forecasts.'
    }
  };
}
