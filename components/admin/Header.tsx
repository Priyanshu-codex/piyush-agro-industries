'use client';

import { Menu, User } from 'lucide-react';
import Link from 'next/link';

export default function Header({ setMobileOpen }: { setMobileOpen: (v: boolean) => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 md:px-6 shadow-sm shrink-0">
      <div className="flex items-center">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 mr-3 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 md:hidden"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/admin/profile" className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
          <User size={16} />
        </Link>
      </div>
    </header>
  );
}
