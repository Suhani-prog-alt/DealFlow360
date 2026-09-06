import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { useStore } from '../mock/store';

const COLORS = ['#7d9b6b', '#e69865', '#db7b5e', '#9ca3af', '#60a5fa', '#a78bfa'];

export default function Reports() {
  const { products, customers, subscriptionPlans, warehouses, discountRules } = useStore();
  const [activeTab, setActiveTab] = useState<'sales' | 'customers' | 'subscriptions' | 'inventory'>('sales');

  // ── Sales by Category
  const hwProducts = products.filter(p => p.type === 'HARDWARE');
  const svProducts = products.filter(p => p.type === 'SERVICE');
  const subProducts = products.filter(p => p.type === 'SUBSCRIPTION');
  const salesByCategory = [
    { name: 'Hardware', sales: hwProducts.length * 48200, margin: hwProducts.length * 48200 * 0.43 },
    { name: 'Services', sales: svProducts.length * 32600, margin: svProducts.length * 32600 * 0.62 },
    { name: 'Software', sales: subProducts.filter(p => p.categoryId === 'cat-3').length * 64800, margin: subProducts.filter(p => p.categoryId === 'cat-3').length * 64800 * 0.88 },
    { name: 'Support', sales: subProducts.filter(p => p.categoryId === 'cat-4').length * 18400, margin: subProducts.filter(p => p.categoryId === 'cat-4').length * 18400 * 0.85 },
  ];

  // ── Monthly Revenue (12 months)
  const monthlyRevenue = [
    { month: 'Oct', revenue: 312000, orders: 42 }, { month: 'Nov', revenue: 348000, orders: 47 },
    { month: 'Dec', revenue: 421000, orders: 61 }, { month: 'Jan', revenue: 289000, orders: 38 },
    { month: 'Feb', revenue: 356000, orders: 51 }, { month: 'Mar', revenue: 398000, orders: 57 },
    { month: 'Apr', revenue: 442000, orders: 63 }, { month: 'May', revenue: 476000, orders: 68 },
    { month: 'Jun', revenue: 512000, orders: 74 }, { month: 'Jul', revenue: 489000, orders: 70 },
    { month: 'Aug', revenue: 543000, orders: 79 }, { month: 'Sep', revenue: 601000, orders: 87 },
  ];

  // ── Customers by Tier
  const goldCount = customers.filter(c => c.tier === 'Gold').length;
  const silverCount = customers.filter(c => c.tier === 'Silver').length;
  const bronzeCount = customers.filter(c => c.tier === 'Bronze').length;
  const tierData = [
    { name: 'Gold', value: goldCount },
    { name: 'Silver', value: silverCount },
    { name: 'Bronze', value: bronzeCount },
  ];

  // ── Revenue by Tier
  const revByTier = [
    { name: 'Gold', revenue: customers.filter(c => c.tier === 'Gold').reduce((s: number, c: any) => s + c.totalRevenue, 0) },
    { name: 'Silver', revenue: customers.filter(c => c.tier === 'Silver').reduce((s: number, c: any) => s + c.totalRevenue, 0) },
    { name: 'Bronze', revenue: customers.filter(c => c.tier === 'Bronze').reduce((s: number, c: any) => s + c.totalRevenue, 0) },
  ];

  // ── Subscription revenue by plan type
  const subRevenue = [
    { name: 'Monthly', value: subscriptionPlans.filter(s => s.frequency === 'MONTHLY').reduce((sum: number, s: any) => sum + s.price * (s.subscribers || 0), 0) },
    { name: 'Quarterly', value: subscriptionPlans.filter(s => s.frequency === 'QUARTERLY').reduce((sum: number, s: any) => sum + s.price * (s.subscribers || 0), 0) },
    { name: 'Yearly', value: subscriptionPlans.filter(s => s.frequency === 'YEARLY').reduce((sum: number, s: any) => sum + s.price * (s.subscribers || 0) / 12, 0) },
  ];

  // ── Warehouse utilization
  const warehouseUtil = warehouses.map((w: any) => ({
    name: w.name.replace(' Distribution Center', ' DC').replace(' Warehouse', ''),
    used: Math.round((w.usedCapacity / w.capacity) * 100),
    free: Math.round(((w.capacity - w.usedCapacity) / w.capacity) * 100),
  }));

  // ── Top customers
  const topCustomers = [...customers].sort((a: any, b: any) => b.totalRevenue - a.totalRevenue).slice(0, 10);

  const tabs = [
    { key: 'sales', label: 'Sales Analytics' },
    { key: 'customers', label: 'Customers' },
    { key: 'subscriptions', label: 'Subscriptions' },
    { key: 'inventory', label: 'Inventory & Warehouses' },
  ] as const;

  const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;

  return (
    <div className="max-w-6xl space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Reports & Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">Platform-wide sales, customer, and operations metrics</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: fmt(customers.reduce((s: number, c: any) => s + c.totalRevenue, 0)) },
          { label: 'Active Customers', value: customers.filter((c: any) => c.status === 'Active').length },
          { label: 'Total Orders', value: customers.reduce((s: number, c: any) => s + c.totalOrders, 0) },
          { label: 'Subscription MRR', value: fmt(subscriptionPlans.filter((s: any) => s.isActive).reduce((sum: number, s: any) => sum + s.price * (s.subscribers || 0), 0)) },
        ].map(item => (
          <div key={item.label} className="bg-[#151816] border border-[#212623] rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">{item.label}</p>
            <p className="text-xl font-semibold text-[#7d9b6b]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#212623]">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${activeTab === tab.key ? 'border-[#7d9b6b] text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SALES TAB */}
      {activeTab === 'sales' && (
        <div className="space-y-6">
          <div className="bg-[#151816] rounded-lg border border-[#212623] p-6">
            <h2 className="text-white font-medium mb-4">Monthly Revenue & Orders (Last 12 months)</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#212623" />
                <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ backgroundColor: '#151816', borderColor: '#212623', color: '#f3f4f6' }} formatter={(v: number) => [`$${(v / 1000).toFixed(0)}K`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#7d9b6b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#151816] rounded-lg border border-[#212623] p-6">
              <h2 className="text-white font-medium mb-4">Sales & Margin by Category</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={salesByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#212623" />
                  <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ backgroundColor: '#151816', borderColor: '#212623', color: '#f3f4f6' }} formatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
                  <Legend />
                  <Bar dataKey="sales" name="Sales" fill="#7d9b6b" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="margin" name="Margin" fill="#e69865" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-[#151816] rounded-lg border border-[#212623] p-6">
              <h2 className="text-white font-medium mb-4">Revenue by Customer Tier</h2>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={revByTier} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#212623" />
                  <XAxis type="number" stroke="#9ca3af" tick={{ fontSize: 12 }} tickFormatter={v => `$${(v / 1000000).toFixed(1)}M`} />
                  <YAxis dataKey="name" type="category" stroke="#9ca3af" tick={{ fontSize: 12 }} width={50} />
                  <Tooltip contentStyle={{ backgroundColor: '#151816', borderColor: '#212623', color: '#f3f4f6' }} formatter={(v: number) => `$${(v / 1000000).toFixed(2)}M`} />
                  <Bar dataKey="revenue" name="Revenue" fill="#7d9b6b" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMERS TAB */}
      {activeTab === 'customers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#151816] rounded-lg border border-[#212623] p-6">
              <h2 className="text-white font-medium mb-4">Customer Tier Distribution</h2>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={tierData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {tierData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#151816', borderColor: '#212623', color: '#f3f4f6' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-[#151816] rounded-lg border border-[#212623] p-6">
              <h2 className="text-white font-medium mb-4">Customers by Industry</h2>
              <div className="space-y-2 mt-2">
                {['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail'].map(ind => {
                  const count = customers.filter((c: any) => c.industry === ind).length;
                  return (
                    <div key={ind} className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-28 truncate">{ind}</span>
                      <div className="flex-1 bg-[#212623] rounded-full h-2">
                        <div className="h-2 rounded-full bg-[#7d9b6b]" style={{ width: `${Math.round((count / customers.length) * 100)}%` }} />
                      </div>
                      <span className="text-xs text-gray-400 w-6 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bg-[#151816] rounded-lg border border-[#212623] overflow-hidden">
            <div className="p-4 border-b border-[#212623]">
              <h2 className="text-white font-medium">Top 10 Customers by Revenue</h2>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#212623] bg-[#1a1e1b]">
                  {['Rank', 'Company', 'Industry', 'Tier', 'Orders', 'Revenue', 'Status'].map(h => (
                    <th key={h} className="p-3 text-xs font-medium text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212623]">
                {topCustomers.map((c: any, i: number) => (
                  <tr key={c.id} className="hover:bg-[#1a1e1b]/50">
                    <td className="p-3 text-xs text-gray-600">#{i + 1}</td>
                    <td className="p-3 text-sm text-gray-200">{c.name}</td>
                    <td className="p-3 text-xs text-gray-400">{c.industry}</td>
                    <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded ${c.tier === 'Gold' ? 'bg-[#e69865]/20 text-[#e69865]' : c.tier === 'Silver' ? 'bg-gray-700 text-gray-300' : 'bg-[#c2875a]/20 text-[#c2875a]'}`}>{c.tier}</span></td>
                    <td className="p-3 text-xs text-gray-400">{c.totalOrders}</td>
                    <td className="p-3 text-sm text-[#7d9b6b] font-medium">${(c.totalRevenue / 1000).toFixed(0)}K</td>
                    <td className="p-3"><span className={`text-xs ${c.status === 'Active' ? 'text-green-400' : 'text-gray-500'}`}>{c.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBSCRIPTIONS TAB */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#151816] rounded-lg border border-[#212623] p-6">
              <h2 className="text-white font-medium mb-4">MRR by Billing Frequency</h2>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={subRevenue} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: $${(value / 1000).toFixed(0)}K`}>
                    {subRevenue.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#151816', borderColor: '#212623', color: '#f3f4f6' }} formatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-[#151816] rounded-lg border border-[#212623] p-6">
              <h2 className="text-white font-medium mb-4">Plan Performance</h2>
              <div className="space-y-3">
                {[...subscriptionPlans].filter((s: any) => s.isActive).sort((a: any, b: any) => b.subscribers - a.subscribers).slice(0, 7).map((plan: any) => (
                  <div key={plan.id} className="flex items-center justify-between border-b border-[#212623] pb-2 last:border-0">
                    <div>
                      <p className="text-sm text-gray-200">{plan.name}</p>
                      <p className="text-xs text-gray-500">{plan.frequency} · ${plan.price}/cycle</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#7d9b6b] font-medium">{plan.subscribers} subs</p>
                      <p className="text-xs text-gray-500">${(plan.price * plan.subscribers / 1000).toFixed(0)}K/mo</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INVENTORY TAB */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="bg-[#151816] rounded-lg border border-[#212623] p-6">
            <h2 className="text-white font-medium mb-4">Warehouse Utilization (%)</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={warehouseUtil.filter((w: any) => w.used !== undefined)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#212623" />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickFormatter={v => `${v}%`} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#151816', borderColor: '#212623', color: '#f3f4f6' }} formatter={(v: number) => `${v}%`} />
                <Legend />
                <Bar dataKey="used" name="Used %" fill="#7d9b6b" radius={[3, 3, 0, 0]} />
                <Bar dataKey="free" name="Free %" fill="#212623" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-[#151816] rounded-lg border border-[#212623] overflow-hidden">
            <div className="p-4 border-b border-[#212623]">
              <h2 className="text-white font-medium">Warehouse Summary</h2>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#212623] bg-[#1a1e1b]">
                  {['Warehouse', 'Location', 'Manager', 'Capacity', 'Used', 'Utilization', 'Status'].map(h => (
                    <th key={h} className="p-3 text-xs font-medium text-gray-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#212623]">
                {warehouses.map((w: any) => {
                  const util = Math.round((w.usedCapacity / w.capacity) * 100);
                  return (
                    <tr key={w.id} className="hover:bg-[#1a1e1b]/50">
                      <td className="p-3 text-sm text-gray-200">{w.name}</td>
                      <td className="p-3 text-xs text-gray-400">{w.location}</td>
                      <td className="p-3 text-xs text-gray-400">{w.manager}</td>
                      <td className="p-3 text-xs text-gray-400">{w.capacity.toLocaleString()} sqft</td>
                      <td className="p-3 text-xs text-gray-400">{w.usedCapacity.toLocaleString()} sqft</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-[#212623] rounded-full h-1.5">
                            <div className="h-1.5 rounded-full" style={{ width: `${util}%`, backgroundColor: util > 80 ? '#db7b5e' : util > 60 ? '#e69865' : '#7d9b6b' }} />
                          </div>
                          <span className="text-xs text-gray-400">{util}%</span>
                        </div>
                      </td>
                      <td className="p-3"><span className={`text-xs ${w.isActive ? 'text-green-400' : 'text-gray-500'}`}>{w.isActive ? 'Active' : 'Inactive'}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
