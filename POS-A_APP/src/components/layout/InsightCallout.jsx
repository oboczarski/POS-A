import { Lightbulb } from 'lucide-react';

/**
 * Insight callout — styled blockquote for key analysis takeaways.
 */
export default function InsightCallout({ accentColor = '#00FF99', icon: Icon = Lightbulb, children, className = '' }) {
  return (
    <div
      className={`relative glass-card rounded-2xl px-5 py-4 sm:px-6 sm:py-5 animate-fade-in-up group ${className}`}
      style={{ borderLeft: `3px solid ${accentColor}` }}
    >
      {/* Subtle glow */}
      <div
        className="absolute -top-8 -left-8 w-32 h-32 rounded-full blur-[50px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-500"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative z-10">
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <Icon size={14} style={{ color: accentColor }} strokeWidth={2.5} />
          </div>
          <div className="text-sm sm:text-[0.9rem] leading-relaxed text-slate-300 font-light italic">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
