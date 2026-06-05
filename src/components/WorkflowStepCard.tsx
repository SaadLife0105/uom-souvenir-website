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
    <article className="rounded-[2rem] border border-[#A88243]/20 bg-[#F4F7FA] p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_24px_80px_-45px_rgba(15,23,42,0.12)] dark:border-slate-700/40 dark:bg-slate-950">
      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#009AD9] text-base font-semibold text-white">
        {step}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-950">{title}</h3>
      <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">{description}</p>
    </article>
  );
}
