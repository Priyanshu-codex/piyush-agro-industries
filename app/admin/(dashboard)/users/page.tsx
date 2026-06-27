'use client';

import { Shield, Plus } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-rajdhani">Admin Users</h1>
          <p className="text-sm text-gray-500">Manage administrator access (Super Admin only)</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          <Plus size={18} />
          <span>Add Admin</span>
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
        <Shield className="mx-auto h-12 w-12 text-yellow-500 mb-3" />
        <h3 className="text-lg font-bold text-yellow-800">Super Admin Feature</h3>
        <p className="text-sm text-yellow-700 mt-2">
          This section allows Super Admins to invite new administrators and manage roles. 
          Authentication is handled directly through Supabase Auth.
        </p>
      </div>
    </div>
  );
}
