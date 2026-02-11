import clsx from 'clsx';

function SectionHeader({ title, subtitle, eyebrow = 'DATA VISUAL', className }) {
  return (
    <header className={clsx('mb-4 flex flex-col gap-2', className)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90">{eyebrow}</p>
      <h3 className="text-lg font-semibold tracking-tight text-slate-100 sm:text-xl">{title}</h3>
      {subtitle ? <p className="text-sm leading-relaxed text-slate-400">{subtitle}</p> : null}
    </header>
  );
}

export default SectionHeader;
