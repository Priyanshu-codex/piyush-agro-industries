'use client';

import { Menu, Search, Bell, User } from 'lucide-react';
import Link from 'next/link';

export default function Header({ setMobileOpen }: { setMobileOpen: (v: boolean) => void }) {
  return (
    <header className="relative z-30 flex items-center justify-between h-20 px-4 md:px-8 bg-white/70 backdrop-blur-xl border-b border-white shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.02)] shrink-0 transition-all duration-300">
      <div className="flex items-center flex-1">
        <button suppressHydrationWarning
          onClick={() => setMobileOpen(true)}
          className="p-2.5 mr-4 rounded-xl text-slate-500 hover:text-slate-900 bg-white md:hidden shadow-sm border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all active:scale-95"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center max-w-md w-full bg-slate-50/80 hover:bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-2.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all duration-300 shadow-inner group">
          <Search size={18} className="text-slate-400 mr-3 group-focus-within:text-primary transition-colors" />
          <input suppressHydrationWarning 
            type="text" 
            placeholder="Quick search..." 
            className="bg-transparent border-none outline-none w-full text-sm text-slate-700 placeholder-slate-400 font-medium"
          />
          {/* Subtle decorative command hint */}
          <div className="hidden lg:flex items-center gap-1 opacity-60">
            <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-white border border-slate-200 rounded-md shadow-sm text-slate-500">⌘</kbd>
            <kbd className="px-1.5 py-0.5 text-[10px] font-semibold bg-white border border-slate-200 rounded-md shadow-sm text-slate-500">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button suppressHydrationWarning className="p-2.5 relative rounded-2xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent hover:border-slate-200 hover:shadow-sm transition-all duration-300">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-[0_0_0_2px_rgba(239,68,68,0.2)] animate-pulse"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200/60 mx-1"></div>
        
        <Link href="/admin/profile" className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:bg-slate-50 hover:shadow-sm border border-transparent hover:border-slate-200 transition-all duration-300 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary group-hover:from-primary group-hover:to-primary-light group-hover:text-white group-hover:shadow-primary transition-all duration-300">
            <User size={18} />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">Admin User</span>
            <span className="text-[11px] font-medium text-slate-400">Super Admin</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
