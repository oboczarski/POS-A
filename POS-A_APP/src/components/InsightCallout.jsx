import { insights } from '../data/insights.js';

export default function InsightCallout() {
  const primary = insights[0];

  return (
    <div className="mb-8 space-y-3">
      <div
        className="glow-card p-5 md:p-6"
        style={{ borderLeft: `4px solid ${primary.accentColor}` }}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
               style={{ background: `${primary.accentColor}15` }}>
            <svg className="w-5 h-5" style={{ color: primary.accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-white mb-1">{primary.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{primary.body}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {insights.slice(1).map((insight) => (
          <div
            key={insight.id}
            className="glow-card p-4"
            style={{ borderLeft: `3px solid ${insight.accentColor}` }}
          >
            <h4 className="text-sm font-bold text-white mb-1">{insight.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{insight.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
