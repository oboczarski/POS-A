import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * Stat card — large number with glow, label, trend indicator, and icon.
 */
export default function StatCard({
  value,
  label,
  sublabel,
  accentColor,
  statGlowClass = '',
  trend,
  prevValue,
  icon: Icon,
  className = '',
}) {
  return (
    <div
      className={`glass-card rounded-2xl p-5 sm:p-6 animate-fade-in-up relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 ${className}`}
      style={{ borderTop: `2px solid ${accentColor}` }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[60px] opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity duration-500"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative z-10">
        {/* Icon + trend row */}
        <div className="flex items-center justify-between mb-3">
          {Icon && (
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}15`, border: `1px solid ${accentColor}25` }}
            >
              <Icon size={18} style={{ color: accentColor }} strokeWidth={2} />
            </div>
          )}
          {trend && prevValue !== undefined && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold ${
                trend === 'up'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>from {prevValue}</span>
            </div>
          )}
        </div>

        {/* Value */}
        <span
          className={`block text-3xl sm:text-4xl font-black tracking-tight leading-none ${statGlowClass}`}
          style={{ color: accentColor }}
        >
          {value}
        </span>

        {/* Label */}
        <p className="mt-2 text-sm text-slate-300 font-medium leading-snug">{label}</p>
        {sublabel && (
          <p className="mt-1 text-[11px] text-slate-500 font-light tracking-wide">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
