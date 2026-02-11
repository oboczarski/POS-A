/**
 * Reusable chart card wrapper — glassmorphism panel with icon, title, subtitle.
 */
export default function ChartCard({ title, subtitle, icon: Icon, iconColor, className = '', glowClass = '', children }) {
  return (
    <div
      className={`glass-card rounded-2xl p-5 sm:p-7 ${glowClass} animate-fade-in-up relative overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-5">
        {Icon && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{
              backgroundColor: `${iconColor || '#ffffff'}12`,
              border: `1px solid ${iconColor || '#ffffff'}20`,
            }}
          >
            <Icon size={19} style={{ color: iconColor || '#e2e8f0' }} strokeWidth={2} />
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-50 tracking-tight leading-snug">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div className="relative w-full">{children}</div>
    </div>
  );
}
