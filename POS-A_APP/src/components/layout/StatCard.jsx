/**
 * Stat card — large number with glow, label, and trend indicator.
 * @param {{ value: string|number, label: string, sublabel?: string, accentColor: string, glowClass: string, statGlowClass: string, trend?: 'up'|'down', prevValue?: number, className?: string }} props
 */
export default function StatCard({
  value,
  label,
  sublabel,
  accentColor,
  glowClass = '',
  statGlowClass = '',
  trend,
  prevValue,
  className = '',
}) {
  return (
    <div
      className={`glass-card rounded-xl p-4 sm:p-5 animate-fade-in-up relative overflow-hidden ${className}`}
      style={{ borderLeft: `3px solid ${accentColor}` }}
    >
      {/* Subtle accent glow behind card */}
      <div
        className="absolute -top-8 -left-8 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative z-10">
        <div className="flex items-end gap-2">
          <span
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${statGlowClass}`}
            style={{ color: accentColor }}
          >
            {value}
          </span>
          {trend && prevValue !== undefined && (
            <span
              className={`text-xs font-semibold pb-1 ${
                trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {trend === 'up' ? '↑' : '↓'} from {prevValue}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm text-slate-300 font-medium">{label}</p>
        {sublabel && (
          <p className="mt-0.5 text-xs text-slate-500 font-light">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
