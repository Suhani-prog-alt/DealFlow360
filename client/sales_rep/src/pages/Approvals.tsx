import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function Approvals() {
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/approvals')
      .then(res => res.json())
      .then(data => {
        setApprovals(data.approvals || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-white">Loading approvals...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Approvals Tracking</h1>
        <p className="text-zinc-400">Track the status of your quotations that exceeded discount ceilings.</p>
      </div>

      <div className="bg-[#1f2921] border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#111412] border-b border-zinc-800">
            <tr>
              <th className="p-4 text-zinc-400 font-medium">Customer</th>
              <th className="p-4 text-zinc-400 font-medium">Risk Score</th>
              <th className="p-4 text-zinc-400 font-medium">Amount</th>
              <th className="p-4 text-zinc-400 font-medium">Status</th>
              <th className="p-4 text-zinc-400 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {approvals.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-zinc-500">No approvals found</td>
              </tr>
            ) : (
              approvals.map((approval) => (
                <tr key={approval.id} className="hover:bg-[#111412]/50 transition-colors">
                  <td className="p-4">
                    <p className="text-white font-medium">{approval.customer}</p>
                    <p className="text-xs text-zinc-500">Tier: {approval.tier || 'Standard'}</p>
                  </td>
                  <td className="p-4 text-[#ff8a65] font-bold">{approval.riskScore}</td>
                  <td className="p-4 text-zinc-300">${approval.totalAmount?.toLocaleString() || approval.amount?.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-[#ffb74d] text-sm bg-[#ffb74d]/10 w-max px-3 py-1 rounded-full">
                      <Clock size={14} />
                      {approval.status}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => alert(`Opening details for ${approval.customer}...`)}
                      className="text-sm text-zinc-400 hover:text-white border border-zinc-700 px-3 py-1.5 rounded transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
