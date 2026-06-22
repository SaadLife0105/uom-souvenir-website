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
  return (
    <article className="rounded-[2rem] border border-[#3f5a80] bg-[#162c47] p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_24px_80px_-45px_rgba(0,0,0,0.3)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#faa153] text-base font-semibold text-[#0d1f33]">
        {step}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-[#eef3fb]">{title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-7 text-[#99a7c0]">{description}</p>
    </article>
  );
}
