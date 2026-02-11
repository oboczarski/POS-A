import Header from './components/Header.jsx';
import StatCardRow from './components/StatCardRow.jsx';
import InsightCallout from './components/InsightCallout.jsx';
import ChartCard from './components/ChartCard.jsx';
import PositionShareChart from './components/charts/PositionShareChart.jsx';
import RBvsWRTrendChart from './components/charts/RBvsWRTrendChart.jsx';
import SeasonRadarChart from './components/charts/SeasonRadarChart.jsx';
import EliteTierDoughnutChart from './components/charts/EliteTierDoughnutChart.jsx';
import ForecastBanner from './components/ForecastBanner.jsx';

export default function App() {
  return (
    <div className="dashboard-bg min-h-screen px-4 py-8 md:px-8 lg:px-16 xl:px-24">
      <div className="max-w-7xl mx-auto">
        <Header />
        <StatCardRow />
        <InsightCallout />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartCard
            title="Positional Composition"
            subtitle="Position share within overall fantasy rankings by tier"
          >
            <PositionShareChart />
          </ChartCard>

          <ChartCard
            title="RB vs WR Trend"
            subtitle="Head-to-head positional count comparison across seasons"
          >
            <RBvsWRTrendChart />
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Season Output Radar"
            subtitle="Positional output fingerprint \u2014 compare seasons across tiers"
          >
            <SeasonRadarChart />
          </ChartCard>

          <ChartCard
            title="Elite Top-12 Breakdown"
            subtitle="Who owns the elite tier? Composition of the Top 12 overall finishers"
          >
            <EliteTierDoughnutChart />
          </ChartCard>
        </div>

        <ForecastBanner />
      </div>
    </div>
  );
}
