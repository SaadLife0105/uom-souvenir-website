interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
  wideDescription?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
  descriptionClassName = "",
  wideDescription = false,
}: SectionHeaderProps) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#faa153]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#eef3fb] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-sm leading-7 text-[#99a7c0] ${wideDescription ? 'sm:whitespace-nowrap' : 'max-w-xl'} ${descriptionClassName}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
