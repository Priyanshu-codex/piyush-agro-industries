'use client';

import React, { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

/**
 * ErrorBoundary — catches any React rendering error in its subtree
 * and displays a styled recovery screen instead of a blank page.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ errorInfo: info.componentStack ?? null });
    // In production you'd report this to an error-tracking service (Sentry, etc.)
    console.error('[ErrorBoundary] Uncaught error:', error, info);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen bg-red-50 flex items-center justify-center p-6"
        >
          <div className="bg-white rounded-2xl shadow-card-hover border border-red-100 max-w-lg w-full p-8 text-center animate-bounce-in">
            {/* Error Icon */}
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-3xl" role="img" aria-label="Error">⚠️</span>
            </div>

            {/* Heading */}
            <h2 className="text-xl font-bold text-gray-900 font-rajdhani mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-500 text-sm mb-5 leading-relaxed">
              An unexpected error occurred while rendering this section. You can try
              to recover or reload the page.
            </p>

            {/* Error message pill */}
            {this.state.error && (
              <div className="mb-5 bg-red-50 border border-red-200 rounded-lg p-3 text-left">
                <p className="text-xs font-mono text-red-700 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <button suppressHydrationWarning
                onClick={this.handleReset}
                className="px-5 py-2.5 rounded-lg bg-gradient-primary text-white text-sm font-semibold
                           hover:opacity-90 transition-opacity shadow-primary"
              >
                Try Again
              </button>
              <button suppressHydrationWarning
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm
                           font-semibold hover:bg-gray-50 transition-colors"
              >
                Reload Page
              </button>
            </div>

            {/* Contact fallback */}
            <p className="mt-5 text-xs text-gray-400">
              If the problem persists, call us at{' '}
              <a href="tel:9425245291" className="text-primary font-semibold">
                9425245291
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
