'use client';

import { User } from 'lucide-react';

export default function AdminProfilePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-rajdhani">Admin Profile</h1>
        <p className="text-sm text-gray-500">Manage your personal account settings</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Administrator</h2>
            <p className="text-sm text-gray-500">Super Admin</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" disabled className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-100 p-2 border text-gray-500" value="admin@piyushagro.com" />
              <p className="mt-1 text-xs text-gray-500">Email cannot be changed directly.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input type="password" placeholder="Leave blank to keep current" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-gray-50 p-2 border" />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="button" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm shadow-sm">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
