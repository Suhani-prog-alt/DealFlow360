import React from 'react';
import CrudPage from '../components/CrudPage';

export default function Pricing() {
  const columns = [
    { key: 'name', label: 'Price List Name' },
    { key: 'customerTier', label: 'Tier', options: ['Bronze', 'Silver', 'Gold'] },
    { key: 'currency', label: 'Currency', options: ['USD', 'EUR', 'GBP'] },
    { key: 'isActive', label: 'Status', render: (val: boolean) => (val ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>) }
  ];

  return <CrudPage title="Price Lists" description="Manage regional and tier-based pricing structures." model="priceLists" columns={columns} />;
}
