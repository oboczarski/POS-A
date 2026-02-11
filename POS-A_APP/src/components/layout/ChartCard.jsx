/**
 * Reusable chart card wrapper — glassmorphism panel with title and optional subtitle.
 * @param {{ title: string, subtitle?: string, className?: string, glowClass?: string, children: React.ReactNode }} props
 */
export default function ChartCard({ title, subtitle, className = '', glowClass = '', children }) {
  return (
    <div
      className={`glass-card rounded-2xl p-5 sm:p-6 ${glowClass} animate-fade-in-up ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-slate-100 tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-1 text-xs sm:text-sm text-slate-400 font-light">
            {subtitle}
          </p>
        )}
      </div>
      <div className="relative w-full">{children}</div>
    </div>
  );
}
