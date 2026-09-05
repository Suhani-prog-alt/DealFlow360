import React from 'react';
import CrudPage from '../components/CrudPage';

export default function Products() {
  const columns = [
    { key: 'name', label: 'Product Name' },
    { key: 'type', label: 'Category', options: ['HARDWARE', 'SERVICE', 'SUBSCRIPTION'] },
    { key: 'price', label: 'Base Price', render: (val: number) => `$${val.toFixed(2)}` },
    { key: 'unit', label: 'Unit' },
    { key: 'tax', label: 'Tax Rate', render: (val: number) => `${(val * 100).toFixed(1)}%` },
    { key: 'isActive', label: 'Status', render: (val: boolean) => (val ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>) }
  ];

  return <CrudPage title="Products Management" description="Manage your global product catalog." model="products" columns={columns} />;
}
