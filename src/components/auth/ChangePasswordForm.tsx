'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { getPasswordErrors } from '@/lib/password-validation';
import { camelHex, whiteSmokeHex, racingRedHex } from '@/constants/variables';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const newPasswordErrors = newPassword.length > 0 ? getPasswordErrors(newPassword) : [];
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
  const canSubmit =
    currentPassword.length > 0 && newPasswordErrors.length === 0 && passwordsMatch && !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    const { error: changeError } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });

    if (changeError) {
      setError(changeError.message ?? 'Could not change your password.');
      setSubmitting(false);
      return;
    }

    setSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-semibold" style={{ color: camelHex }}>
          Current password
        </label>
        <input
          id="currentPassword"
          type="password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ borderColor: `color-mix(in srgb, ${camelHex} 25%, transparent)`, outlineColor: camelHex }}
        />
      </div>

      <div>
        <label htmlFor="newPassword" className="mb-1.5 block text-sm font-semibold" style={{ color: camelHex }}>
          New password
        </label>
        <input
          id="newPassword"
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ borderColor: `color-mix(in srgb, ${camelHex} 25%, transparent)`, outlineColor: camelHex }}
        />
        {newPasswordErrors.length > 0 && (
          <ul className="mt-2 space-y-0.5 text-xs font-medium" style={{ color: racingRedHex }}>
            {newPasswordErrors.map((err) => (
              <li key={err}>• {err}</li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold" style={{ color: camelHex }}>
          Confirm new password
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ borderColor: `color-mix(in srgb, ${camelHex} 25%, transparent)`, outlineColor: camelHex }}
        />
        {confirmPassword.length > 0 && !passwordsMatch && (
          <p className="mt-2 text-xs font-medium" style={{ color: racingRedHex }}>Passwords don&apos;t match</p>
        )}
      </div>

      {error && (
        <p className="text-sm font-medium" style={{ color: racingRedHex }}>{error}</p>
      )}
      {success && (
        <p className="text-sm font-medium" style={{ color: camelHex }}>
          Password changed. You&apos;ve been signed out of other devices.
        </p>
      )}

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-2 inline-flex w-fit cursor-pointer items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        style={{ backgroundColor: camelHex, color: whiteSmokeHex, outlineColor: camelHex }}
      >
        Update Password
      </button>
    </form>
  );
}
