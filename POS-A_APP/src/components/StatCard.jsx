export default function StatCard({ value, label, delta, deltaType, accent }) {
  const deltaColors = {
    success: 'text-emerald-400',
    danger: 'text-red-400',
    warning: 'text-amber-400',
    info: 'text-cyan-400',
  };

  const deltaIcons = {
    success: '\u25B2',
    danger: '\u25BC',
    warning: '\u26A0',
    info: '\u25C6',
  };

  return (
    <div
      className="glow-card p-5 relative overflow-hidden group"
      style={{ borderLeft: `3px solid ${accent}` }}
    >
      <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 tracking-tight">
        {value}
      </div>
      <div className="text-sm text-slate-400 mb-2 font-medium">{label}</div>
      <div className={`text-xs font-semibold flex items-center gap-1 ${deltaColors[deltaType] || 'text-slate-500'}`}>
        <span>{deltaIcons[deltaType]}</span>
        <span>{delta}</span>
      </div>
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${accent}, transparent)` }}
      />
    </div>
  );
}
