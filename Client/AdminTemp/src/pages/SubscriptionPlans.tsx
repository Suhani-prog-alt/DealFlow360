import CrudPage from '../components/CrudPage';
export default function SubscriptionPlans() {
  const columns = [
    { key: 'name', label: 'Plan Name' },
    { key: 'frequency', label: 'Billing Frequency', options: ['MONTHLY', 'QUARTERLY', 'YEARLY'] },
    { key: 'prorationRule', label: 'Proration Rule', options: ['Daily', 'Monthly', 'None'] },
    { key: 'cancelRule', label: 'Cancellation Policy', options: ['End of Cycle', 'Immediate with fee', 'Immediate'] },
    { key: 'isActive', label: 'Status', render: (v: boolean) => v ? <span className="text-[#7d9b6b]">Active</span> : <span className="text-[#db7b5e]">Inactive</span> }
  ];
  return <CrudPage title="Subscription Plans" description="Configure recurring billing, proration, and cancellation rules." model="subscriptionPlans" columns={columns} />;
}
