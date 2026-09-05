import React from 'react';
import CrudPage from '../components/CrudPage';

export default function Warehouses() {
  const columns = [
    { key: 'name', label: 'Warehouse Name' },
    { key: 'location', label: 'Location' },
    { key: 'shippingWeight', label: 'Shipping Weight Limit' },
    { key: 'isActive', label: 'Status', render: (val: boolean) => (val ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>) }
  ];

  return <CrudPage title="Warehouses" model="warehouses" columns={columns} description="Manage fulfillment locations and inventory rules." />;
}
