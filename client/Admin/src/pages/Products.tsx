import React from 'react';
import CrudPage from '../components/CrudPage';

export default function Products() {
  const columns = [
    { key: 'id', label: 'SKU / ID' },
    { key: 'name', label: 'Product Name' },
    { key: 'type', label: 'Category', options: ['HARDWARE', 'SERVICE', 'SUBSCRIPTION'] },
    { key: 'price', label: 'Price', render: (val: number) => `$${val?.toLocaleString()}` },
    { key: 'cost', label: 'Cost', render: (val: number) => val ? `$${val?.toLocaleString()}` : '—' },
    { key: 'margin', label: 'Margin', render: (val: number) => val ? <span className={`text-xs ${val >= 50 ? 'text-green-400' : val >= 30 ? 'text-[#e69865]' : 'text-red-400'}`}>{val}%</span> : '—' },
    { key: 'unit', label: 'Unit' },
    { key: 'tax', label: 'Tax', render: (val: number) => `${((val || 0) * 100).toFixed(0)}%` },
    { key: 'isActive', label: 'Status', render: (val: boolean) => (val ? <span className="text-green-400">Active</span> : <span className="text-red-400">Inactive</span>) }
  ];

  return <CrudPage title="Products Management" description="Manage your global product catalog across Hardware, Services, and Software." model="products" columns={columns} />;
}
