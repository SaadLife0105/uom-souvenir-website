import type { ReactElement } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: "shield" | "leaf" | "delivery" | "lock";
}

const featureIcons: Record<FeatureCardProps["icon"], ReactElement> = {
  shield: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3 5 6v5c0 5.25 3.75 9.75 7 10 3.25-.25 7-4.75 7-10V6l-7-3Z" />
      <path d="M9.25 11.75 11.5 14l4.25-4.5" />
    </svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 19c3.7-1.9 6-6.2 6-11 0-1.1-.12-2.18-.35-3.2" />
      <path d="M8 19c-3-2.7-4.3-7.7-3-11 1.2-3 4.8-4 8-2" />
      <path d="M8 12.5c2.7 0 5-2.2 5-5" />
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 11h12v6H3z" />
      <path d="M15 13h5l3 3v2H15v-5Z" />
      <path d="M6 17a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm12 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-emerald-700" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="6" y="11" width="12" height="8" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  ),
};

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-950 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_24px_80px_-50px_rgba(15,23,42,0.08)]">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-50">
        {featureIcons[icon]}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}
