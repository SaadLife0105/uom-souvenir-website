'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { whiteSmokeHex, camelHex, racingRedHex, brightSkyHex } from '@/constants/variables';

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    const { error: signInError } = await authClient.signIn.email({ email, password });

    if (signInError) {
      setError(signInError.message ?? 'Invalid email or password.');
      setSubmitting(false);
      return;
    }

    // ponytail: everyone lands on the homepage for now — there's no account
    // page or admin panel yet to route to differently by role (Steps 7/8).
    router.push('/');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="mb-6 flex flex-col items-center gap-1 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: camelHex }}>
          University of Mauritius
        </span>
        <h1 className="text-2xl font-bold" style={{ color: whiteSmokeHex }}>Sign in to your account</h1>
        <p className="text-sm" style={{ color: `color-mix(in srgb, ${whiteSmokeHex} 70%, transparent)` }}>
          Enter your email below to sign in
        </p>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold" style={{ color: whiteSmokeHex }}>
          Email
        </label>
        <div className="relative">
          <Mail
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: `color-mix(in srgb, ${whiteSmokeHex} 60%, transparent)` }}
          />
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm outline-none transition-colors"
            style={{
              backgroundColor: `color-mix(in srgb, ${whiteSmokeHex} 8%, transparent)`,
              borderColor: `color-mix(in srgb, ${whiteSmokeHex} 15%, transparent)`,
              color: whiteSmokeHex,
            }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold" style={{ color: whiteSmokeHex }}>
          Password
        </label>
        <div className="relative">
          <Lock
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: `color-mix(in srgb, ${whiteSmokeHex} 60%, transparent)` }}
          />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm outline-none transition-colors"
            style={{
              backgroundColor: `color-mix(in srgb, ${whiteSmokeHex} 8%, transparent)`,
              borderColor: `color-mix(in srgb, ${whiteSmokeHex} 15%, transparent)`,
              color: whiteSmokeHex,
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex items-center px-3"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" style={{ color: `color-mix(in srgb, ${whiteSmokeHex} 60%, transparent)` }} />
            ) : (
              <Eye className="h-4 w-4" style={{ color: `color-mix(in srgb, ${whiteSmokeHex} 60%, transparent)` }} />
            )}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm font-medium" style={{ color: racingRedHex }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: camelHex, color: brightSkyHex, outlineColor: camelHex }}
      >
        {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Sign In
      </button>

      <p className="text-center text-sm" style={{ color: `color-mix(in srgb, ${whiteSmokeHex} 70%, transparent)` }}>
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" className="font-semibold" style={{ color: camelHex }}>
          Sign up
        </Link>
      </p>
    </form>
  );
}
