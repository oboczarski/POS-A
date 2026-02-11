import { getStatCardMetrics } from '../../data/dataHelpers';
import {
  BarChart3,
  Activity,
  Zap,
  Target,
  ShieldAlert,
  Waves,
  ArrowRightLeft,
  LayoutGrid,
  Crosshair,
  TrendingDown,
  Telescope,
  AlertTriangle,
} from 'lucide-react';
import StatCard from './StatCard';
import InsightCallout from './InsightCallout';
import RBvsWRTrendChart from '../charts/RBvsWRTrendChart';
import QBEliteDroughtChart from '../charts/QBEliteDroughtChart';
import TEDepthChart from '../charts/TEDepthChart';
import PositionalDistChart from '../charts/PositionalDistChart';

const stats = getStatCardMetrics();

/** Small reusable section divider with icon + label */
function SectionLabel({ icon: Icon, label, color = '#94a3b8' }) {
  return (
    <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${color}12`, border: `1px solid ${color}18` }}
      >
        <Icon size={14} style={{ color }} strokeWidth={2.5} />
      </div>
      <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color }}>
        {label}
      </span>
      <div className="flex-1 h-px opacity-20" style={{ backgroundColor: color }} />
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-mesh">
      {/* ── Ambient glow orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#00FF99] opacity-[0.025] blur-[150px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#8F00FF] opacity-[0.03] blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] rounded-full bg-[#00a9f1] opacity-[0.02] blur-[130px]" />
        <div className="absolute top-[60%] left-[60%] w-[400px] h-[400px] rounded-full bg-[#ff0aa5] opacity-[0.015] blur-[120px]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

        {/* ══════════════════════════ HEADER ══════════════════════════ */}
        <header className="mb-12 sm:mb-16 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
              <Activity size={13} className="text-[#00FF99]" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-400">
                Fantasy Football Analytics
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-medium text-slate-500">2019–2025</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
            <span className="gradient-text-hero">Positional</span>
            <br />
            <span className="text-white/90">Analysis</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-400 font-light max-w-2xl leading-relaxed">
            Tracking positional value shifts across overall fantasy finishers.
            Distribution, trends, and the rise of the running back.
          </p>
        </header>

        {/* ══════════════════════════ STAT CARDS ══════════════════════════ */}
        <section className="mb-10 sm:mb-14">
          <SectionLabel icon={Zap} label="Key Metrics" color="#e2e8f0" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatCard
              value={stats.qbEliteDrought.value}
              label={stats.qbEliteDrought.label}
              sublabel={stats.qbEliteDrought.sublabel}
              accentColor="#ff0aa5"
              statGlowClass="stat-glow-pink"
              trend="down"
              prevValue={stats.qbEliteDrought.prevValue}
              icon={ShieldAlert}
              className="delay-1"
            />
            <StatCard
              value={stats.rbDominance.value}
              label={stats.rbDominance.label}
              sublabel={stats.rbDominance.sublabel}
              accentColor="#00FF99"
              statGlowClass="stat-glow-green"
              icon={Target}
              className="delay-2"
            />
            <StatCard
              value={stats.teDepthExplosion.value}
              label={stats.teDepthExplosion.label}
              sublabel={stats.teDepthExplosion.sublabel}
              accentColor="#00DDFA"
              statGlowClass="stat-glow-blue"
              trend="up"
              prevValue={stats.teDepthExplosion.prevValue}
              icon={Waves}
              className="delay-3"
            />
            <StatCard
              value={stats.wrDecline.value}
              label={stats.wrDecline.label}
              sublabel={stats.wrDecline.sublabel}
              accentColor="#FFB847"
              statGlowClass="stat-glow-amber"
              trend="down"
              prevValue={stats.wrDecline.prevValue}
              icon={TrendingDown}
              className="delay-4"
            />
          </div>
        </section>

        {/* ══════════════════════════ HERO CHART ══════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <SectionLabel icon={ArrowRightLeft} label="Positional Trends" color="#00FF99" />
          <RBvsWRTrendChart />
        </section>

        {/* ── Insight: RB/WR narrative ── */}
        <section className="mb-8 sm:mb-10">
          <InsightCallout accentColor="#00FF99" className="delay-4">
            <strong className="text-slate-100 not-italic">2025 marked a complete changing of the tide.</strong>{' '}
            It was the only year where Running Backs outnumbered Wide Receivers at every single threshold
            within the Top 60 — from Top-12 all the way through Top-60. The precursor appeared in 2024,
            where RBs led in every tier except the broad Top-60 view.
          </InsightCallout>
        </section>

        {/* ══════════════════════════ TWO-COLUMN CHARTS ══════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <SectionLabel icon={Crosshair} label="Position Deep Dives" color="#d747ff" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <QBEliteDroughtChart />
            <TEDepthChart />
          </div>
        </section>

        {/* ── Insights: QB + TE ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 sm:mb-10">
          <InsightCallout accentColor="#ff0aa5" icon={AlertTriangle} className="delay-5">
            <strong className="text-slate-100 not-italic">The Elite QB Drought of 2025:</strong>{' '}
            2025 is the only year in the entire dataset to produce zero Top-12 quarterbacks.
            It produced only 2 QBs in the Top-24, marking it as the weakest year for high-end
            QB relevance by a wide margin.
          </InsightCallout>
          <InsightCallout accentColor="#69D6FF" className="delay-6">
            <strong className="text-slate-100 not-italic">TE Volume Surge — But No Breakout Star.</strong>{' '}
            2025 lists 12 TEs in the Top-60 and 11 in the Top-48 — double the volume of 2020 and 2022.
            However, the very top-end "league-winning" talent remains elusive, with only 1 TE in the Top-12.
          </InsightCallout>
        </section>

        {/* ══════════════════════════ FULL-WIDTH COMPOSITION ══════════════════════════ */}
        <section className="mb-8 sm:mb-10">
          <SectionLabel icon={LayoutGrid} label="Composition Breakdown" color="#FFB847" />
          <PositionalDistChart />
        </section>

        {/* ── Insights: WR Decline + Forecast ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 sm:mb-16">
          <InsightCallout accentColor="#FFB847" icon={TrendingDown} className="delay-7">
            <strong className="text-slate-100 not-italic">The WR Decline is Real.</strong>{' '}
            The count of WRs entering the Top-60 finishes since 2019 has been cut in half over the last
            three years: 2023 (12) → 2024 (8) → 2025 (6). This correlates directly with the RB resurgence
            as positional value has shifted dramatically.
          </InsightCallout>
          <InsightCallout accentColor="#8F00FF" icon={Telescope} className="delay-8">
            <strong className="text-slate-100 not-italic">2026–2027 Forecast.</strong>{' '}
            Current indicators — from incoming draft classes to the free agency landscape — suggest
            another dominant year for RBs in 2026. However, all signs point toward 2027 marking
            a definitive pivot back to the Wide Receiver as the next wave of elite pass-catching
            talent enters the league. Smart managers should enjoy the RB production now while
            preparing for the shift.
          </InsightCallout>
        </section>

        {/* ══════════════════════════ FOOTER ══════════════════════════ */}
        <footer className="pt-8 border-t border-white/[0.04]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BarChart3 size={14} className="text-slate-600" />
              <span className="text-xs text-slate-600 font-medium">POS-A Dashboard</span>
            </div>
            <p className="text-[11px] text-slate-600 font-light">
              Fantasy Football Positional Analysis • Data: 2019–2025 Seasons
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
