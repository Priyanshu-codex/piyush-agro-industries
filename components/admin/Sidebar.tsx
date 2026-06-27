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
  Menu,
  X
} from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Categories', path: '/admin/categories', icon: FolderTree },
  { name: 'Orders/Enquiries', path: '/admin/orders', icon: ClipboardList },
  { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
  { name: 'Admin Users', path: '/admin/users', icon: Users },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function Sidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean, setMobileOpen: (v: boolean) => void }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin');
    router.refresh();
  };

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100 bg-white shrink-0">
        <span className="text-xl font-bold font-rajdhani text-gray-900">
          Admin<span className="text-primary">Panel</span>
        </span>
        <button 
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 bg-white">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={18} className={`mr-3 shrink-0 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-100 bg-white shrink-0">
        <button
          onClick={handleLogout}
          className="flex w-full items-center px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} className="mr-3 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {SidebarContent}
      </div>
    </>
  );
}
