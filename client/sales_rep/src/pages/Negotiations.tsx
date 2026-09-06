import React, { useState, useEffect } from 'react';
import { MessageSquare, Check, X } from 'lucide-react';

export default function Negotiations() {
  const [negotiations, setNegotiations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/approvals')
      .then(res => res.json())
      .then(data => {
        const negs = (data.approvals || []).filter((q: any) => q.status === 'Under Negotiation');
        setNegotiations(negs);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-white">Loading negotiations...</div>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Customer Negotiations</h1>
        <p className="text-zinc-400">Review and respond to counter-offers made by customers in their portal.</p>
      </div>

      <div className="bg-[#1f2921] border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#111412] border-b border-zinc-800">
            <tr>
              <th className="p-4 text-zinc-400 font-medium">Customer</th>
              <th className="p-4 text-zinc-400 font-medium">Original Quote</th>
              <th className="p-4 text-zinc-400 font-medium">Counter Offer</th>
              <th className="p-4 text-zinc-400 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {negotiations.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-zinc-500">No active negotiations</td>
              </tr>
            ) : (
              negotiations.map((neg) => {
                const amount = neg.totalAmount || neg.amount || 0;
                const counter = Math.floor(amount * 0.9);
                return (
                  <tr key={neg.id} className="hover:bg-[#111412]/50 transition-colors">
                    <td className="p-4">
                      <p className="text-white font-medium">{neg.customer}</p>
                      <p className="text-xs text-[#ffb74d] flex items-center gap-1 mt-1">
                        <MessageSquare size={12} /> Pending Review
                      </p>
                    </td>
                    <td className="p-4 text-zinc-300 line-through">${amount.toLocaleString()}</td>
                    <td className="p-4 text-[#81c784] font-bold">
                      ${counter.toLocaleString()}
                      <p className="text-xs text-zinc-400 font-normal italic mt-1">"Can we do ${counter}?"</p>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => alert(`Accepted counter offer of $${counter} for ${neg.customer}. Proceeding to confirmation.`)}
                          className="text-sm bg-[#81c784] text-black px-3 py-1.5 rounded hover:bg-[#6fbf73] transition-colors flex items-center gap-1"
                        >
                          <Check size={16} /> Accept
                        </button>
                        <button 
                          onClick={() => alert(`Rejected counter offer for ${neg.customer}.`)}
                          className="text-sm border border-zinc-700 text-zinc-300 px-3 py-1.5 rounded hover:bg-zinc-800 transition-colors flex items-center gap-1"
                        >
                          <X size={16} /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
