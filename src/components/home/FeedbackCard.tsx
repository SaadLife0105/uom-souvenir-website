interface FeedbackCardProps {
  name: string;
  role: string;
  quote: string;
}

export default function FeedbackCard({ name, role, quote }: FeedbackCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-[#C82520] bg-[#C82520] p-8 text-white shadow-[0_20px_60px_-30px_rgba(200,37,32,0.35)] transition hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/15 text-lg font-semibold text-white">
          P
        </div>
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-white/80">{role}</p>
        </div>
      </div>
      <p className="mt-8 text-sm leading-7 text-white/90">“{quote}”</p>
    </article>
  );
}
