import React from 'react';
import CrudPage from '../components/CrudPage';

export default function DiscountTiers() {
  const columns = [
    { key: 'customerTier', label: 'Customer Tier', options: ['Bronze', 'Silver', 'Gold'] },
    { key: 'maxDiscount', label: 'Max Discount (%)' },
    { key: 'createdAt', label: 'Created At', render: (val: string) => new Date(val).toLocaleDateString() }
  ];

  return <CrudPage title="Discount Tiers" description="Configure discount ceilings for customer tiers." model="discountRules" columns={columns} />;
}
