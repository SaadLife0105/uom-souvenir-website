interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#009AD9]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}
