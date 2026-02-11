function StatCard({ label, value, context, accent }) {
  return (
    <article className="metric-card" style={{ '--metric-accent': accent ?? '#7866FF' }}>
      <span className="metric-glow" aria-hidden="true" />
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
      <p className="metric-context">{context}</p>
    </article>
  );
}

export default StatCard;
