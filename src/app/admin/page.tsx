'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import { Lock, Mail, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';
import PiyushAgroLogo from '@/components/branding/PiyushAgroLogo';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px] animate-pulse-ring" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[100px]" />
      </div>

      <div className="z-10 w-full max-w-md px-4 sm:px-6 animate-fade-up">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 flex flex-col items-center">
          <PiyushAgroLogo variant="stacked" mode="dark" size="xl" showTagline={true} />
          <span className="block text-primary-100 text-sm font-medium mt-3 tracking-wide opacity-90">
            Admin Workspace
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-2xl p-8 sm:p-10 rounded-[2rem] shadow-card-hover border border-white/50">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-800 font-rajdhani">Welcome Back</h3>
            <p className="text-sm text-slate-500 mt-1">Please enter your credentials to continue</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input suppressHydrationWarning
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all duration-300 sm:text-sm shadow-sm"
                  placeholder="Email address"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input suppressHydrationWarning
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all duration-300 sm:text-sm shadow-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 p-3.5 rounded-xl text-sm flex items-center gap-2 animate-shake">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                {error}
              </div>
            )}

            <button suppressHydrationWarning
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center py-3.5 px-4 overflow-hidden rounded-2xl text-white font-semibold transition-all duration-300 hover:shadow-primary-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-80 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-gradient-primary transition-transform duration-500 group-hover:scale-[1.02]" />
              <div className="relative flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
        
        {/* Footer info */}
        <p className="text-center text-white/60 text-xs mt-8 font-medium">
          Secure Admin Access • Piyush Agro Industries
        </p>
      </div>
    </div>
  );
}
