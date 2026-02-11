function InsightCallout({ title, text, metric }) {
  return (
    <article className="rounded-xl border border-white/10 bg-slate-950/55 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-200">{text}</p>
      <p className="mt-2 text-xs text-slate-400">{metric}</p>
    </article>
  );
}

export default InsightCallout;
