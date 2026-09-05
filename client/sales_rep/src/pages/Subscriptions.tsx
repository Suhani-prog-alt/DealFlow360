import React from 'react';
import { Calendar, RefreshCw, StopCircle } from 'lucide-react';

const MOCK_SUBSCRIPTIONS = [
  { id: '1', customer: 'Acme Corp', product: 'DealFlow Pro License', cycle: 'Yearly', nextBilling: '2027-09-05', amount: 12000, status: 'Active' },
  { id: '2', customer: 'Beta Industries', product: 'Cloud Setup & Maintenance', cycle: 'Monthly', nextBilling: '2026-10-05', amount: 450, status: 'Active' }
];

export default function Subscriptions() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Recurring Billing</h1>
        <p className="text-zinc-400">Manage hybrid deals with active subscriptions and proration.</p>
      </div>

      <div className="bg-[#1f2921] border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#111412] border-b border-zinc-800">
            <tr>
              <th className="p-4 text-zinc-400 font-medium">Customer & Plan</th>
              <th className="p-4 text-zinc-400 font-medium">Billing Cycle</th>
              <th className="p-4 text-zinc-400 font-medium">Next Invoice</th>
              <th className="p-4 text-zinc-400 font-medium">Amount</th>
              <th className="p-4 text-zinc-400 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {MOCK_SUBSCRIPTIONS.map((sub) => (
              <tr key={sub.id} className="hover:bg-[#111412]/50 transition-colors">
                <td className="p-4">
                  <p className="text-white font-medium">{sub.customer}</p>
                  <p className="text-xs text-zinc-500">{sub.product}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-zinc-300 text-sm">
                    <RefreshCw size={14} className="text-[#81c784]" />
                    {sub.cycle}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-zinc-300 text-sm">
                    <Calendar size={14} className="text-zinc-500" />
                    {sub.nextBilling}
                  </div>
                </td>
                <td className="p-4 text-white font-bold">${sub.amount.toLocaleString()}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => alert(`Opening quantity modifier for ${sub.customer}'s ${sub.product}...`)}
                      className="text-sm text-zinc-300 border border-zinc-700 px-3 py-1.5 rounded hover:bg-zinc-800 transition-colors"
                    >
                      Modify Qty
                    </button>
                    <button 
                      onClick={() => {
                        if(confirm(`Are you sure you want to cancel the subscription for ${sub.customer}?`)) {
                          alert('Subscription canceled and partial refund triggered.');
                        }
                      }}
                      className="text-sm text-[#e57373] border border-zinc-700 px-3 py-1.5 rounded hover:bg-zinc-800 transition-colors flex items-center gap-1"
                    >
                      <StopCircle size={14} /> Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
