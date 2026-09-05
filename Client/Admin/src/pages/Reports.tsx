import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../mock/store';

export default function Reports() {
  const { products } = useStore();
  const hardwareCount = products.filter(p => p.type === 'HARDWARE').length * 1000;
  const serviceCount = products.filter(p => p.type === 'SERVICE').length * 1000;
  const subscriptionCount = products.filter(p => p.type === 'SUBSCRIPTION').length * 1000;

  const data = [
    { name: 'Hardware', sales: hardwareCount, margin: hardwareCount * 0.4 },
    { name: 'Services', sales: serviceCount, margin: serviceCount * 0.6 },
    { name: 'Subscriptions', sales: subscriptionCount, margin: subscriptionCount * 0.8 },
  ];

  return (
    <div className="max-w-5xl space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Reports & Analytics</h1>
        <p className="text-gray-400 text-sm mt-1">Platform-wide sales and operations metrics.</p>
      </div>

      <div className="bg-[#151816] rounded-lg border border-[#212623] p-6 h-96">
        <h2 className="text-white font-medium mb-6">Sales by Category</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#212623" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#151816', borderColor: '#212623', color: '#f3f4f6' }} />
            <Bar dataKey="sales" fill="#7d9b6b" />
            <Bar dataKey="margin" fill="#e69865" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
