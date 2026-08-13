'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/supabase/client';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  ClipboardList, 
  Image as ImageIcon, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck
} from 'lucide-react';
import PiyushAgroLogo from '@/components/branding/PiyushAgroLogo';

const MENU_ITEMS = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Categories', path: '/admin/categories', icon: FolderTree },
  { name: 'Orders/Enquiries', path: '/admin/orders', icon: ClipboardList },
  { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
  { name: 'Admin Users', path: '/admin/users', icon: Users },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  desktopCollapsed: boolean;
  setDesktopCollapsed: (v: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen, desktopCollapsed, setDesktopCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin');
    router.refresh();
  };

  const SidebarContent = (
    <div className="flex flex-col h-full bg-[#0a1a10] text-slate-300 border-r border-slate-800/60 relative overflow-hidden shadow-2xl">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      
      <div className={`relative z-10 flex items-center h-20 px-5 border-b border-white/5 shrink-0 transition-all duration-300 ${desktopCollapsed ? 'justify-center px-0' : 'justify-between'}`}>
        {!desktopCollapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <PiyushAgroLogo variant="horizontal" mode="dark" size="sm" />
          </Link>
        )}
        {desktopCollapsed && (
          <Link href="/admin/dashboard" className="flex items-center justify-center hover:scale-105 transition-transform">
            <PiyushAgroLogo variant="icon" mode="dark" size="sm" />
          </Link>
        )}
        <button suppressHydrationWarning 
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-hide">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center rounded-xl font-medium transition-all duration-300 relative ${
                desktopCollapsed ? 'justify-center p-3' : 'px-4 py-3.5'
              } ${
                isActive 
                  ? 'text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title={desktopCollapsed ? item.name : undefined}
            >
              {/* Active Background Glow */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-primary opacity-100 rounded-xl shadow-primary-lg -z-10" />
              )}
              {/* Hover Background */}
              {!isActive && (
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity -z-10" />
              )}
              
              <item.icon 
                size={20} 
                className={`shrink-0 transition-transform duration-300 ${
                  isActive ? 'text-white scale-110' : 'text-slate-400 group-hover:text-white group-hover:scale-110'
                } ${desktopCollapsed ? '' : 'mr-3'}`} 
              />
              {!desktopCollapsed && (
                <span className={`text-[14px] transition-transform duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      <div className={`relative z-10 p-4 border-t border-white/5 shrink-0 bg-black/20 backdrop-blur-sm ${desktopCollapsed ? 'flex flex-col items-center gap-3' : 'space-y-2'}`}>
        <button suppressHydrationWarning
          onClick={() => setDesktopCollapsed(!desktopCollapsed)}
          className={`hidden md:flex items-center justify-center p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all group ${
            !desktopCollapsed ? 'w-full justify-start' : ''
          }`}
          title="Toggle Sidebar"
        >
          {desktopCollapsed ? (
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          ) : (
            <>
              <ChevronLeft size={20} className="mr-3 group-hover:-translate-x-1 transition-transform" /> 
              <span className="text-[14px] font-medium">Collapse</span>
            </>
          )}
        </button>
        <button suppressHydrationWarning
          onClick={handleLogout}
          className={`flex items-center rounded-xl font-medium text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 ${
            desktopCollapsed ? 'justify-center p-3 w-full' : 'w-full px-4 py-3'
          }`}
          title={desktopCollapsed ? 'Logout' : undefined}
        >
          <LogOut size={20} className={`shrink-0 ${desktopCollapsed ? '' : 'mr-3'}`} />
          {!desktopCollapsed && <span className="text-[14px]">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-[#0a1a10] transform transition-all duration-300 ease-in-out ${
        desktopCollapsed ? 'w-20' : 'w-64'
      } ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {SidebarContent}
      </div>
    </>
  );
}
