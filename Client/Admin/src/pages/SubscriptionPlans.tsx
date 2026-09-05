import React from 'react';
import CrudPage from '../components/CrudPage';

export default function SubscriptionPlans() {
  const columns = [
    { key: 'name', label: 'Plan Name' },
    { key: 'frequency', label: 'Billing Frequency', options: ['MONTHLY', 'QUARTERLY', 'YEARLY'] },
    { key: 'prorationRule', label: 'Proration Rule', options: ['Daily', 'Monthly', 'None'] },
    { key: 'cancelRule', label: 'Cancellation Policy', options: ['End of Cycle', 'Immediate with fee', 'Immediate'] },
    { key: 'isActive', label: 'Status', render: (val: boolean) => (val ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>) }
  ];

  return <CrudPage title="Subscription Plans" description="Configure recurring billing, proration, and cancellation rules." model="subscriptionPlans" columns={columns} />;
}
