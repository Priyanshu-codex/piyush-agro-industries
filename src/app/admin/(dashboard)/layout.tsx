'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import { Loader2 } from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const isConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your-supabase-url';
      if (!isConfigured) {
        setIsAuthenticated(true);
        return;
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/admin');
      } else {
        setIsAuthenticated(true);
      }
    }

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2 className="animate-spin text-primary w-8 h-8" />
          <span className="text-sm font-medium">Verifying administrator session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans selection:bg-primary/20 selection:text-primary-dark">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 z-0 bg-[url('/pattern.svg')] opacity-[0.015] pointer-events-none" />

      <Sidebar 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
        desktopCollapsed={desktopCollapsed} 
        setDesktopCollapsed={setDesktopCollapsed} 
      />
      
      <div 
        className={`relative z-10 flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300 ease-in-out ${
          desktopCollapsed ? 'md:pl-20' : 'md:pl-64'
        }`}
      >
        <Header setMobileOpen={setMobileOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth scrollbar-dropdown">
          <div className="max-w-[1600px] mx-auto h-full animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
