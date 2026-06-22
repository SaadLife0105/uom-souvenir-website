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
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1f2937] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-sm leading-7 text-[#475569] w-full md:w-11/12 max-w-3xl ${wideDescription ? 'sm:whitespace-nowrap' : ''} ${descriptionClassName}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
