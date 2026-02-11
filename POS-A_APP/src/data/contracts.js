/**
 * @typedef {Object} PosDistributionRow
 * @property {number} season
 * @property {number} tier
 * @property {`TOP-${number}`} range
 * @property {number} QB
 * @property {number} RB
 * @property {number} WR
 * @property {number} TE
 * @property {number} total
 */

/**
 * @typedef {Object} SeasonOutputMatrix
 * @property {number[]} years
 * @property {Record<string, Record<number, number>>} data
 */

/**
 * @typedef {Object} DashboardModel
 * @property {PosDistributionRow[]} posDistributionRows
 * @property {SeasonOutputMatrix} seasonOutputMatrix
 * @property {Map<string, PosDistributionRow>} posBySeasonTier
 * @property {number[]} years
 * @property {number[]} tiers
 */

/**
 * @typedef {Object} HeadlineStat
 * @property {string} id
 * @property {string} label
 * @property {number} value
 * @property {string} valueDisplay
 * @property {string} context
 */

/**
 * @typedef {Object} ChartSeries
 * @property {string} id
 * @property {string} label
 * @property {number[]} values
 */

export {};
