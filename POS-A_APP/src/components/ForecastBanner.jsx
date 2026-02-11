import { forecast } from '../data/insights.js';

export default function ForecastBanner() {
  return (
    <div className="glow-card p-5 md:p-6 mt-8 border-[rgba(120,102,255,0.15)]">
      <h3 className="text-base md:text-lg font-bold text-white mb-2 flex items-center gap-2">
        <svg className="w-5 h-5 text-[#00DDFA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
        {forecast.title}
      </h3>
      <p className="text-sm text-slate-300 leading-relaxed">
        {forecast.body}
      </p>
    </div>
  );
}
