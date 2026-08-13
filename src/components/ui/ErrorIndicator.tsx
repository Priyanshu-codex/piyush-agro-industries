'use client';

import { useEffect, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// 1. Inline field-level error indicator
// ─────────────────────────────────────────────────────────────────────────────

interface FieldErrorProps {
  message?: string;
  /** Animate in when the message first appears */
  animate?: boolean;
}

export function FieldError({ message, animate = true }: FieldErrorProps) {
  if (!message) return null;

  return (
    <p
      role="alert"
      aria-live="polite"
      className={`flex items-center gap-1.5 mt-1.5 text-sm text-red-600 font-medium
        ${animate ? 'animate-slide-down' : ''}`}
    >
      {/* Red dot indicator */}
      <span
        className="inline-block w-4 h-4 rounded-full bg-red-100 border border-red-300
                   flex items-center justify-center flex-shrink-0 text-[10px]"
        aria-hidden="true"
      >
        !
      </span>
      {message}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Global error / success toast notification
// ─────────────────────────────────────────────────────────────────────────────

export type ToastType = 'error' | 'success' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  /** Auto-dismiss after N ms (0 = no auto-dismiss) */
  duration?: number;
  onClose?: () => void;
}

const TOAST_STYLES: Record<ToastType, string> = {
  error:   'bg-red-600   border-red-700',
  success: 'bg-[#0B7A3B] border-[#065F2E]',
  warning: 'bg-amber-500 border-amber-600',
  info:    'bg-[#243B8F] border-[#1a2f6f]',
};

const TOAST_ICONS: Record<ToastType, string> = {
  error:   '✕',
  success: '✓',
  warning: '⚠',
  info:    'ℹ',
};

export function ErrorToast({
  message,
  type = 'error',
  duration = 6000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const id = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(id);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        fixed top-4 right-4 z-[9999] max-w-sm w-full
        flex items-start gap-3 p-4 rounded-xl border shadow-xl text-white
        animate-slide-down
        ${TOAST_STYLES[type]}
      `}
    >
      {/* Icon badge */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
        {TOAST_ICONS[type]}
      </div>

      {/* Message */}
      <p className="flex-1 text-sm leading-relaxed font-medium">{message}</p>

      {/* Close button */}
      <button suppressHydrationWarning
        onClick={() => { setVisible(false); onClose?.(); }}
        aria-label="Close notification"
        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Firebase / configuration warning banner (shown in development)
// ─────────────────────────────────────────────────────────────────────────────

interface ConfigWarningProps {
  show: boolean;
}

export function FirebaseConfigWarning({ show }: ConfigWarningProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!show || dismissed) return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[9998]
        bg-amber-50 border-2 border-amber-400 rounded-xl p-4 shadow-lg animate-bounce-in"
    >
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">⚠️</span>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-amber-800 text-sm">Supabase Not Configured</p>
          <p className="text-amber-700 text-xs mt-0.5 leading-relaxed">
            Add your credentials to{' '}
            <code className="bg-amber-100 px-1 rounded text-amber-900 font-mono">
              lib/supabase/client.ts
            </code>{' '}
            or{' '}
            <code className="bg-amber-100 px-1 rounded text-amber-900 font-mono">
              .env.local
            </code>
          </p>
        </div>
        <button suppressHydrationWarning
          onClick={() => setDismissed(true)}
          className="text-amber-600 hover:text-amber-800 flex-shrink-0 text-lg leading-none"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
