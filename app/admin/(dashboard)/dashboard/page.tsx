'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { Package, FolderTree, ClipboardList, TrendingUp } from 'lucide-react';
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
    { name: 'Total Products', value: stats.products, icon: Package, href: '/admin/products', color: 'bg-blue-500' },
    { name: 'Total Categories', value: stats.categories, icon: FolderTree, href: '/admin/categories', color: 'bg-purple-500' },
    { name: 'Total Enquiries', value: stats.inquiries, icon: ClipboardList, href: '/admin/orders', color: 'bg-green-500' },
    { name: 'Monthly Views', value: '1,234', icon: TrendingUp, href: '#', color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-rajdhani">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Welcome to the Piyush Agro admin panel.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((item) => (
          <Link key={item.name} href={item.href}>
            <div className="bg-white overflow-hidden rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`rounded-md p-3 ${item.color}`}>
                      <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                      <dd>
                        <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link href="/admin/products?new=true" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Add New Product
          </Link>
          <Link href="/admin/gallery" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            Manage Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
