import React from 'react';
import CrudPage from '../components/CrudPage';

export default function Upsells() {
  const columns = [
    { key: 'sourceProduct', label: 'Source Product' },
    { key: 'recommendedProduct', label: 'Recommended Product' },
    { key: 'ruleType', label: 'Rule Type', options: ['Upsell', 'Cross-sell'] },
    { key: 'minMargin', label: 'Min Margin (%)' },
    { key: 'promotion', label: 'Promotion / Offer' },
    { key: 'priority', label: 'Priority', options: ['High', 'Medium', 'Low'], render: (val: string) => <span className={`px-2 py-1 rounded text-xs font-medium ${val === 'High' ? 'bg-[#db7b5e]/10 text-[#db7b5e]' : val === 'Medium' ? 'bg-[#e69865]/10 text-[#e69865]' : 'bg-gray-700/50 text-gray-400'}`}>{val}</span> },
    { key: 'isActive', label: 'Status', render: (val: boolean) => (val ? <span className="text-[#7d9b6b]">Active</span> : <span className="text-[#db7b5e]">Inactive</span>) }
  ];

  return <CrudPage title="Upsell Rules" description="Configure upsell and cross-sell relationships." model="upsellRules" columns={columns} />;
}
