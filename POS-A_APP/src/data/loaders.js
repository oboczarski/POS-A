import Papa from 'papaparse';
import posDistributionCsvRaw from '../../data/csv/POS-Distribution.csv?raw';
import seasonOutputCompareCsvRaw from '../../data/csv/SeasonOutputCompare_2019-2025.csv?raw';

const POS_DISTRIBUTION_HEADERS = ['SZN & Range', 'QB', 'RB', 'WR', 'TE'];
const SEASON_OUTPUT_FIRST_HEADER = 'POS & RANGE';

function parseCsv(raw, fileLabel) {
  const result = Papa.parse(raw, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false
  });

  if (result.errors?.length) {
    throw new Error(`${fileLabel}: CSV parsing failed (${result.errors[0].message}).`);
  }

  return {
    fields: result.meta?.fields ?? [],
    rows: result.data ?? []
  };
}

function assertHeaders(actual, expected, fileLabel) {
  if (actual.length !== expected.length) {
    throw new Error(`${fileLabel}: Expected ${expected.length} headers, received ${actual.length}.`);
  }

  expected.forEach((header, index) => {
    if (actual[index] !== header) {
      throw new Error(
        `${fileLabel}: Missing or misplaced header "${header}" at index ${index}. Received "${actual[index]}".`
      );
    }
  });
}

function parseNumericCell(value, fileLabel, rowNumber, columnName) {
  const normalized = String(value ?? '').trim();
  const numeric = Number(normalized);
  if (!Number.isFinite(numeric)) {
    throw new Error(
      `${fileLabel}: Non-numeric value "${value}" found at row ${rowNumber}, column "${columnName}".`
    );
  }
  return numeric;
}

function parseSeasonTier(rawKey, fileLabel, rowNumber) {
  const match = String(rawKey ?? '').trim().match(/^(\d{4})_TOP-(12|24|36|48|60)$/);
  if (!match) {
    throw new Error(
      `${fileLabel}: Malformed "SZN & Range" value "${rawKey}" at row ${rowNumber}. Expected format YYYY_TOP-XX.`
    );
  }

  const season = Number(match[1]);
  const tier = Number(match[2]);

  return {
    season,
    tier,
    range: `TOP-${tier}`
  };
}

/**
 * @param {string} raw
 * @returns {import('./contracts').PosDistributionRow[]}
 */
export function parsePosDistribution(raw) {
  const fileLabel = 'POS-Distribution.csv';
  const { fields, rows } = parseCsv(raw, fileLabel);
  assertHeaders(fields, POS_DISTRIBUTION_HEADERS, fileLabel);

  const seenKeys = new Set();
  const normalizedRows = rows.map((row, rowIndex) => {
    const rowNumber = rowIndex + 2;
    const seasonTier = parseSeasonTier(row['SZN & Range'], fileLabel, rowNumber);

    const values = {
      QB: parseNumericCell(row.QB, fileLabel, rowNumber, 'QB'),
      RB: parseNumericCell(row.RB, fileLabel, rowNumber, 'RB'),
      WR: parseNumericCell(row.WR, fileLabel, rowNumber, 'WR'),
      TE: parseNumericCell(row.TE, fileLabel, rowNumber, 'TE')
    };

    const total = values.QB + values.RB + values.WR + values.TE;
    if (total !== seasonTier.tier) {
      throw new Error(
        `${fileLabel}: Row ${rowNumber} totals ${total}, but expected ${seasonTier.tier} for ${seasonTier.range}.`
      );
    }

    const uniqueKey = `${seasonTier.season}-${seasonTier.tier}`;
    if (seenKeys.has(uniqueKey)) {
      throw new Error(`${fileLabel}: Duplicate season/tier row for ${uniqueKey}.`);
    }
    seenKeys.add(uniqueKey);

    return {
      ...seasonTier,
      ...values,
      total
    };
  });

  return normalizedRows.sort((left, right) => {
    if (left.season !== right.season) {
      return right.season - left.season;
    }
    return right.tier - left.tier;
  });
}

/**
 * @param {string} raw
 * @returns {import('./contracts').SeasonOutputMatrix}
 */
export function parseSeasonOutputCompare(raw) {
  const fileLabel = 'SeasonOutputCompare_2019-2025.csv';
  const { fields, rows } = parseCsv(raw, fileLabel);

  if (!fields.length || fields[0] !== SEASON_OUTPUT_FIRST_HEADER) {
    throw new Error(
      `${fileLabel}: Missing required first header "${SEASON_OUTPUT_FIRST_HEADER}". Found "${fields[0] ?? ''}".`
    );
  }

  const yearHeaders = fields.slice(1);
  if (!yearHeaders.length) {
    throw new Error(`${fileLabel}: Missing year columns.`);
  }

  const years = yearHeaders.map((yearHeader) => {
    const parsedYear = Number(yearHeader);
    if (!Number.isInteger(parsedYear) || String(parsedYear).length !== 4) {
      throw new Error(`${fileLabel}: Invalid year column "${yearHeader}".`);
    }
    return parsedYear;
  });

  const sortedYears = [...years].sort((left, right) => left - right);
  const data = {};

  rows.forEach((row, rowIndex) => {
    const rowNumber = rowIndex + 2;
    const metricKey = String(row[SEASON_OUTPUT_FIRST_HEADER] ?? '').trim();

    if (!metricKey) {
      throw new Error(`${fileLabel}: Empty metric key at row ${rowNumber}.`);
    }

    if (data[metricKey]) {
      throw new Error(`${fileLabel}: Duplicate metric key "${metricKey}" at row ${rowNumber}.`);
    }

    data[metricKey] = {};
    yearHeaders.forEach((yearHeader, index) => {
      const year = years[index];
      data[metricKey][year] = parseNumericCell(row[yearHeader], fileLabel, rowNumber, yearHeader);
    });
  });

  return {
    years: sortedYears,
    data
  };
}

export function loadRawData() {
  const posDistributionRows = parsePosDistribution(posDistributionCsvRaw);
  const seasonOutputMatrix = parseSeasonOutputCompare(seasonOutputCompareCsvRaw);
  return {
    posDistributionRows,
    seasonOutputMatrix
  };
}
