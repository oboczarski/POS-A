function StatCard({ label, value, context }) {
  return (
    <article className="glass-panel relative overflow-hidden px-4 py-4 sm:px-5 sm:py-5">
      <div className="absolute -right-10 top-0 h-24 w-24 rounded-full bg-fuchsia-500/15 blur-2xl" aria-hidden="true" />
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-100 sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">{context}</p>
    </article>
  );
}

export default StatCard;
