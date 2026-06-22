interface WorkflowStepCardProps {
  step: number;
  title: string;
  description: string;
}

export default function WorkflowStepCard({
  step,
  title,
  description,
}: WorkflowStepCardProps) {
  const stepLabel = String(step).padStart(2, "0");

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border-2 border-[#C82520] bg-white p-8 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-[#E99C19] text-white shadow-sm">
          <span className="text-2xl font-bold">→</span>
        </div>
        <div>
          <div className="text-3xl font-bold text-[#E99C19]">{stepLabel}</div>
          <h3 className="text-xl font-bold text-[#7F0906]">{title}</h3>
        </div>
      </div>
      <p className="mt-6 text-sm leading-7 text-[#7F0906]">{description}</p>
    </article>
  );
}
