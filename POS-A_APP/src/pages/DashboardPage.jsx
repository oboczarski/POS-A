import { useMemo } from 'react';
import InsightCallout from '../components/InsightCallout';
import StatCard from '../components/StatCard';
import EliteScarcityChart from '../charts/EliteScarcityChart';
import OverallFinishesTrendChart from '../charts/OverallFinishesTrendChart';
import PositionCompositionByTierChart from '../charts/PositionCompositionByTierChart';
import RbWrDominanceMatrixChart from '../charts/RbWrDominanceMatrixChart';
import Top60PositionTrendChart from '../charts/Top60PositionTrendChart';
import { registerChartTheme } from '../charts/chartTheme';
import { loadRawData } from '../data/loaders';
import {
  buildDashboardModel,
  getCompositionForSeason,
  getEliteScarcitySeries,
  getHeadlineStats,
  getInsightBullets,
  getOverallDeclineSeries,
  getRbWrDeltaMatrix,
  getTopRangePositionTrend
} from '../data/metrics';
import { palettes } from '../data/palettes';

registerChartTheme();

const statAccentPool = [
  palettes.combo1[0],
  palettes.combo1[4],
  palettes.combo2[2],
  palettes.combo3[0],
  palettes.combo3[5],
  palettes.combo4[7]
];

function DashboardPage() {
  const model = useMemo(() => {
    const { posDistributionRows, seasonOutputMatrix } = loadRawData();
    return buildDashboardModel(posDistributionRows, seasonOutputMatrix);
  }, []);

  const stats = useMemo(() => getHeadlineStats(model), [model]);
  const trendSeries = useMemo(() => getOverallDeclineSeries(model), [model]);
  const scarcitySeries = useMemo(() => getEliteScarcitySeries(model), [model]);
  const rbWrMatrix = useMemo(() => getRbWrDeltaMatrix(model), [model]);
  const top60Trend = useMemo(() => getTopRangePositionTrend(model, 'TOP-60'), [model]);
  const composition = useMemo(() => getCompositionForSeason(model, 2025), [model]);
  const insights = useMemo(() => getInsightBullets(model), [model]);

  const statById = useMemo(() => Object.fromEntries(stats.map((entry) => [entry.id, entry])), [stats]);

  const signalDeck = [
    {
      key: '2025 Elite Share',
      value: statById['elite-share-2025']?.valueDisplay ?? '—'
    },
    {
      key: 'QB Top-12 in 2025',
      value: statById['qb-top-12-2025']?.valueDisplay ?? '—'
    },
    {
      key: 'RB Top-12 in 2025',
      value: statById['rb-top-12-2025']?.valueDisplay ?? '—'
    },
    {
      key: 'WR Shift (2023→2025)',
      value: statById['wr-top-60-change-2023-2025']?.valueDisplay ?? '—'
    }
  ];

  return (
    <main className="nebula-root px-4 pb-10 pt-6 text-slate-100 sm:px-6 lg:px-10">
      <div className="noise-overlay" aria-hidden="true" />

      <div className="dashboard-content mx-auto flex w-full max-w-[1450px] flex-col gap-6">
        <header className="lux-panel hero-panel">
          <div className="grid gap-6 xl:grid-cols-[1.55fr_1fr] xl:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Single-Page Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl xl:text-[2.6rem]">
                POS-A Positional Tide Dashboard
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                This build focuses on high-impact data storytelling across cumulative 12-player tiers (Top-12
                through Top-60), combining your two source datasets to surface regime shifts, scarcity, and
                position-level momentum from 2019–2025.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="hero-chip">Data Integrity Locked</span>
                <span className="hero-chip">2019–2025 Coverage</span>
                <span className="hero-chip">Tier Method: 12/24/36/48/60</span>
                <span className="hero-chip">Dark Mode Cinematic</span>
              </div>
            </div>

            <aside className="signal-panel">
              <p className="signal-title">Signal Deck</p>
              <ul className="signal-list">
                {signalDeck.map((signal) => (
                  <li key={signal.key}>
                    <span className="signal-key">{signal.key}</span>
                    <span className="signal-value">{signal.value}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.valueDisplay}
              context={stat.context}
              accent={statAccentPool[index % statAccentPool.length]}
            />
          ))}
        </section>

        <section className="grid gap-6">
          <OverallFinishesTrendChart chartData={trendSeries} />

          <div className="grid gap-6 xl:grid-cols-2">
            <EliteScarcityChart chartData={scarcitySeries} />
            <RbWrDominanceMatrixChart chartData={rbWrMatrix} />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Top60PositionTrendChart chartData={top60Trend} />
            <PositionCompositionByTierChart chartData={composition} />
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.9fr_1fr]">
          <article className="lux-panel p-5">
            <p className="text-sm font-semibold tracking-wide text-slate-100">Analysis Callouts</p>
            <p className="mt-1 text-xs text-slate-400">
              Narrative blocks below map directly to your analysis without injecting synthetic values.
            </p>

            <div className="mt-4 grid gap-3">
              {insights.highlights.map((item, index) => (
                <InsightCallout
                  key={item.id}
                  title={item.title}
                  text={item.text}
                  metric={item.metric}
                  accent={palettes.combo2[index % palettes.combo2.length]}
                />
              ))}
            </div>
          </article>

          <article className="lux-panel p-5">
            <p className="text-sm font-semibold tracking-wide text-slate-100">Forecast Framing</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{insights.forecast.text}</p>

            <div className="forecast-card mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-cyan-300">
                Constraint Guardrail
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                2026 and 2027 remain qualitative directional notes only. No projected numeric points are
                visualized.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
