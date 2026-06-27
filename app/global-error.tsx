'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Global Error Boundary] caught critical layout error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 sm:p-6 font-sans">
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center relative z-10">
          {/* Error icon container */}
          <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <span className="text-3xl text-red-400" role="img" aria-label="Error">⚠️</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-white mb-3 tracking-wide uppercase">
            Critical System Error
          </h2>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            A fatal error occurred inside the root website layout. Please retry or contact technical support.
          </p>

          {/* Error details */}
          {error.message && (
            <div className="mb-6 bg-black/30 border border-white/10 rounded-xl p-4 text-left">
              <p className="text-xs font-mono text-red-300 break-all select-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Control actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-bold uppercase tracking-wider
                         hover:opacity-90 transition-opacity shadow-md"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/20 text-white text-xs font-bold uppercase tracking-wider
                         hover:bg-white/10 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
