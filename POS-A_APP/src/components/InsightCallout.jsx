function InsightCallout({ title, text, metric, accent }) {
  return (
    <article className="insight-card" style={{ '--insight-accent': accent ?? '#00a9f1' }}>
      <p className="insight-title">{title}</p>
      <p className="insight-body">{text}</p>
      <p className="insight-metric">{metric}</p>
    </article>
  );
}

export default InsightCallout;
