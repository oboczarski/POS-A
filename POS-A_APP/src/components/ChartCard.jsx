export default function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div className={`glow-card p-5 md:p-6 ${className}`}>
      <div className="mb-4">
        <h2 className="text-base md:text-lg font-semibold text-white tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="relative h-80 md:h-96">
        {children}
      </div>
    </div>
  );
}
