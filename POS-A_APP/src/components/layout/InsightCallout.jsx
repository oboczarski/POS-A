/**
 * Insight callout — styled blockquote for key analysis takeaways.
 * @param {{ accentColor?: string, children: React.ReactNode, className?: string }} props
 */
export default function InsightCallout({ accentColor = '#00FF99', children, className = '' }) {
  return (
    <div
      className={`relative glass-card rounded-xl px-5 py-4 sm:px-6 sm:py-5 animate-fade-in-up ${className}`}
      style={{ borderLeft: `3px solid ${accentColor}` }}
    >
      {/* Subtle glow */}
      <div
        className="absolute -top-6 -left-6 w-24 h-24 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative z-10">
        <div className="flex items-start gap-3">
          <span className="text-lg mt-0.5 opacity-50 select-none shrink-0">💡</span>
          <div className="text-sm sm:text-[0.9rem] leading-relaxed text-slate-300 font-light italic">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
