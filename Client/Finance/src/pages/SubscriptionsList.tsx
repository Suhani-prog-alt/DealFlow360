import React from 'react';

const SubscriptionsList = () => {
  const subscriptions = [
    { id: 'SUB-4001', customer: 'TechCorp Inc.', plan: 'Enterprise License', status: 'Active', nextBilling: 'Oct 28, 2023', amount: '$4,500/mo' },
    { id: 'SUB-4002', customer: 'Delta LLC', plan: 'Pro Tier', status: 'Past Due', nextBilling: 'Oct 01, 2023', amount: '$850/mo' },
    { id: 'SUB-4003', customer: 'Global Systems', plan: 'Standard API', status: 'Active', nextBilling: 'Nov 05, 2023', amount: '$200/mo' },
  ];

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Subscriptions List</h1>
          <p className="text-gray-500 text-sm mt-1">Manage recurring billing and plans</p>
        </div>
        <button className="bg-[#4d6a45] hover:bg-[#5b7c52] text-white text-sm font-medium py-2 px-6 rounded transition-colors">
          New Subscription
        </button>
      </div>

      <div className="bg-[#141414] border border-[#222] rounded-lg overflow-hidden w-full">
        <table className="w-full text-left">
          <thead className="bg-[#0f0f0f] border-b border-[#222]">
            <tr>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Sub ID</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Next Billing</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-[#1a1a1a] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{sub.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sub.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{sub.plan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{sub.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sub.nextBilling}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${sub.status === 'Active' ? 'text-[#4d6a45] bg-[#4d6a45]/10' : 'text-[#e87040] bg-[#e87040]/10'}`}>
                    {sub.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionsList;
