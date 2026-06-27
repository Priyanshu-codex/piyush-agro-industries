'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for developer diagnostic visibility
    console.error('[Root Error Boundary] caught error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center animate-bounce-in relative z-10">
        {/* Error icon container */}
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <span className="text-3xl text-red-400" role="img" aria-label="Error">⚠️</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white font-rajdhani mb-3 tracking-wide uppercase">
          Application Error
        </h2>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          An unexpected error occurred during page rendering. You can try resetting the component state or reload the website.
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
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-primary text-white text-xs font-bold uppercase tracking-wider
                       hover:opacity-90 transition-opacity shadow-primary"
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

        {/* Support contact info */}
        <p className="mt-6 text-[10px] text-gray-400">
          Need assistance? Reach support at{' '}
          <a href="tel:9425245291" className="text-primary font-bold hover:underline">
            +91 9425245291
          </a>
        </p>
      </div>
    </div>
  );
}
