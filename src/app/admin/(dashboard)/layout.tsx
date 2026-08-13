'use client';

import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

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
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="max-w-[1600px] mx-auto h-full animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
