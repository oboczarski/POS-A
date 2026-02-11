import clsx from 'clsx';

function SectionHeader({ title, subtitle, className }) {
  return (
    <div className={clsx('mb-4 flex flex-col gap-1', className)}>
      <h3 className="text-base font-semibold tracking-tight text-slate-100 sm:text-lg">{title}</h3>
      {subtitle ? <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">{subtitle}</p> : null}
    </div>
  );
}

export default SectionHeader;
