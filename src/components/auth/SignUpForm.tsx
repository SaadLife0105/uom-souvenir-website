'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Eye, EyeOff, User as UserIcon, Mail, Lock } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { getPasswordErrors } from '@/lib/password-validation';
import { whiteHex, goldHex, redHex, deepBlueHex } from '@/constants/variables';

type Affiliation = 'student' | 'staff' | 'alumni' | 'none';

const AFFILIATION_OPTIONS: { value: Affiliation; label: string }[] = [
  { value: 'student', label: 'Student' },
  { value: 'staff', label: 'Staff' },
  { value: 'alumni', label: 'Alumni' },
  { value: 'none', label: 'None' },
];

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [affiliation, setAffiliation] = useState<Affiliation>('none');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordErrors = password.length > 0 ? getPasswordErrors(password) : [];
  const canSubmit =
    name.trim().length > 0 && email.trim().length > 0 && passwordErrors.length === 0 && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    const { error: signUpError } = await authClient.signUp.email({
      email,
      password,
      name,
      // @ts-expect-error — additionalFields aren't in the base client type
      affiliation,
    });

    if (signUpError) {
      setError(signUpError.message ?? 'Could not create your account.');
      setSubmitting(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="mb-6 flex flex-col items-center gap-1 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: goldHex }}>
          University of Mauritius
        </span>
        <h1 className="text-2xl font-bold" style={{ color: whiteHex }}>Create an account</h1>
        <p className="text-sm" style={{ color: `color-mix(in srgb, ${whiteHex} 70%, transparent)` }}>
          Enter your details below to sign up
        </p>
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold" style={{ color: whiteHex }}>
          Full name
        </label>
        <div className="relative">
          <UserIcon
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: `color-mix(in srgb, ${whiteHex} 60%, transparent)` }}
          />
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors"
            style={{
              backgroundColor: `color-mix(in srgb, ${whiteHex} 8%, transparent)`,
              borderColor: `color-mix(in srgb, ${whiteHex} 15%, transparent)`,
              color: whiteHex,
            }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold" style={{ color: whiteHex }}>
          Email
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: `color-mix(in srgb, ${whiteHex} 60%, transparent)` }}
          />
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors"
            style={{
              backgroundColor: `color-mix(in srgb, ${whiteHex} 8%, transparent)`,
              borderColor: `color-mix(in srgb, ${whiteHex} 15%, transparent)`,
              color: whiteHex,
            }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold" style={{ color: whiteHex }}>
          Password
        </label>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: `color-mix(in srgb, ${whiteHex} 60%, transparent)` }}
          />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm outline-none transition-colors"
            style={{
              backgroundColor: `color-mix(in srgb, ${whiteHex} 8%, transparent)`,
              borderColor: `color-mix(in srgb, ${whiteHex} 15%, transparent)`,
              color: whiteHex,
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex items-center px-3"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" style={{ color: `color-mix(in srgb, ${whiteHex} 60%, transparent)` }} />
            ) : (
              <Eye className="h-4 w-4" style={{ color: `color-mix(in srgb, ${whiteHex} 60%, transparent)` }} />
            )}
          </button>
        </div>
        {passwordErrors.length > 0 && (
          <ul className="mt-2 space-y-0.5 text-xs font-medium" style={{ color: redHex }}>
            {passwordErrors.map((err) => (
              <li key={err}>• {err}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <p className="mb-2 block text-sm font-semibold" style={{ color: whiteHex }}>
          Affiliation
        </p>
        <div role="radiogroup" aria-label="Affiliation" className="flex flex-wrap gap-2">
          {AFFILIATION_OPTIONS.map((opt) => {
            const active = affiliation === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setAffiliation(opt.value)}
                className="cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: active ? goldHex : `color-mix(in srgb, ${whiteHex} 25%, transparent)`,
                  backgroundColor: active ? goldHex : 'transparent',
                  color: active ? deepBlueHex : whiteHex,
                  outlineColor: goldHex,
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="text-sm font-medium" style={{ color: redHex }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: goldHex, color: deepBlueHex, outlineColor: goldHex }}
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Create Account
      </button>

      <p className="text-center text-sm" style={{ color: `color-mix(in srgb, ${whiteHex} 70%, transparent)` }}>
        Already have an account?{' '}
        <Link href="/sign-in" className="font-semibold" style={{ color: goldHex }}>
          Sign in
        </Link>
      </p>
    </form>
  );
}
