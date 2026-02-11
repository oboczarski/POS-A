import { useMemo } from 'react';
import InsightCallout from '../components/InsightCallout';
import StatCard from '../components/StatCard';
import OverallFinishesTrendChart from '../charts/OverallFinishesTrendChart';
import PositionCompositionByTierChart from '../charts/PositionCompositionByTierChart';
import PositionMomentumChart from '../charts/PositionMomentumChart';
import RbWrTideShiftChart from '../charts/RbWrTideShiftChart';
import { registerChartTheme } from '../charts/chartTheme';
import { loadRawData } from '../data/loaders';
import {
  buildDashboardModel,
  getCompositionForSeason,
  getHeadlineStats,
  getInsightBullets,
  getMomentumSeries,
  getOverallDeclineSeries,
  getRbWrDeltaByTierAndYear
} from '../data/metrics';

registerChartTheme();

function DashboardPage() {
  const model = useMemo(() => {
    const { posDistributionRows, seasonOutputMatrix } = loadRawData();
    return buildDashboardModel(posDistributionRows, seasonOutputMatrix);
  }, []);

  const stats = useMemo(() => getHeadlineStats(model), [model]);
  const trendSeries = useMemo(() => getOverallDeclineSeries(model), [model]);
  const rbWrDelta = useMemo(() => getRbWrDeltaByTierAndYear(model), [model]);
  const composition = useMemo(() => getCompositionForSeason(model, 2025), [model]);
  const momentum = useMemo(() => getMomentumSeries(model, 'TOP-60'), [model]);
  const insights = useMemo(() => getInsightBullets(model), [model]);

  return (
    <main className="dashboard-bg thin-scrollbar px-4 py-6 text-slate-100 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="glass-panel relative overflow-hidden p-6 sm:p-8">
          <div
            className="pointer-events-none absolute -top-16 right-0 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-8 h-48 w-48 rounded-full bg-fuchsia-500/10 blur-3xl"
            aria-hidden="true"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Single-Page Dashboard</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            POS-A Positional Tide Dashboard
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            The dashboard uses cumulative 12-player tiers (Top-12 through Top-60) to compare positional
            distribution and season output from 2019 to 2025. Every chart and KPI is derived directly from
            your provided CSV data and analysis narrative.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.id} label={stat.label} value={stat.valueDisplay} context={stat.context} />
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          <OverallFinishesTrendChart chartData={trendSeries} />
          <RbWrTideShiftChart chartData={rbWrDelta} />
          <PositionCompositionByTierChart chartData={composition} />
          <PositionMomentumChart chartData={momentum} />
        </section>

        <section className="grid gap-4 xl:grid-cols-[1.9fr_1fr]">
          <article className="glass-panel p-4 sm:p-5">
            <p className="text-sm font-semibold tracking-wide text-slate-100">Analysis Callouts</p>
            <p className="mt-1 text-xs text-slate-400">
              Narrative callouts mirror your markdown conclusions without adding invented numeric assumptions.
            </p>
            <div className="mt-4 grid gap-3">
              {insights.highlights.map((item) => (
                <InsightCallout key={item.id} title={item.title} text={item.text} metric={item.metric} />
              ))}
            </div>
          </article>

          <article className="glass-panel p-4 sm:p-5">
            <p className="text-sm font-semibold tracking-wide text-slate-100">Forecast Framing</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{insights.forecast.text}</p>
            <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-500/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">
                Constraint Guardrail
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                2026–2027 values are intentionally qualitative; no synthetic numeric projections are plotted.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
