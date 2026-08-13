'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { Package, FolderTree, ClipboardList, TrendingUp, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    inquiries: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();
      
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      const { count: categoriesCount } = await supabase
        .from('categories')
        .select('*', { count: 'exact', head: true });

      const { count: inquiriesCount } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });

      setStats({
        products: productsCount || 0,
        categories: categoriesCount || 0,
        inquiries: inquiriesCount || 0,
      });
    }

    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Products', value: stats.products, icon: Package, href: '/admin/products', color: 'text-blue-600', bgColor: 'bg-blue-100/50', border: 'border-blue-100' },
    { name: 'Total Categories', value: stats.categories, icon: FolderTree, href: '/admin/categories', color: 'text-purple-600', bgColor: 'bg-purple-100/50', border: 'border-purple-100' },
    { name: 'Total Enquiries', value: stats.inquiries, icon: ClipboardList, href: '/admin/orders', color: 'text-green-600', bgColor: 'bg-green-100/50', border: 'border-green-100' },
    { name: 'Monthly Views', value: '1,234', icon: TrendingUp, href: '#', color: 'text-orange-600', bgColor: 'bg-orange-100/50', border: 'border-orange-100' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-rajdhani tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back to the Piyush Agro Admin Panel.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => (
          <Link key={item.name} href={item.href} className="group block">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md hover:border-slate-200 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{item.name}</p>
                  <h3 className="text-3xl font-bold text-slate-900 group-hover:text-primary transition-colors">{item.value}</h3>
                </div>
                <div className={`p-4 rounded-xl ${item.bgColor} ${item.border} border`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
            <button suppressHydrationWarning className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">View All</button>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/50">
            <p className="text-slate-500 font-medium">No recent activity to show.</p>
            <p className="text-sm text-slate-400 mt-1">Updates and logs will appear here.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="flex flex-col gap-3">
            <Link href="/admin/products" className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Package size={18} />
                </div>
                <span className="font-medium text-slate-700">Add New Product</span>
              </div>
            </Link>
            <Link href="/admin/categories" className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <FolderTree size={18} />
                </div>
                <span className="font-medium text-slate-700">Manage Categories</span>
              </div>
            </Link>
            <Link href="/admin/gallery" className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <ImageIcon size={18} />
                </div>
                <span className="font-medium text-slate-700">Upload to Gallery</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
