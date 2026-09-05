import React from 'react';
import { MessageSquare, Check, X } from 'lucide-react';

const MOCK_NEGOTIATIONS = [
  { id: '1', customer: 'Acme Corp', quoteAmount: 8400, counterOffer: 8000, message: "Can we round this down to $8k flat?", status: 'Pending Review' }
];

export default function Negotiations() {
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
            {MOCK_NEGOTIATIONS.map((neg) => (
              <tr key={neg.id} className="hover:bg-[#111412]/50 transition-colors">
                <td className="p-4">
                  <p className="text-white font-medium">{neg.customer}</p>
                  <p className="text-xs text-[#ffb74d] flex items-center gap-1 mt-1">
                    <MessageSquare size={12} /> {neg.status}
                  </p>
                </td>
                <td className="p-4 text-zinc-300 line-through">${neg.quoteAmount.toLocaleString()}</td>
                <td className="p-4 text-[#81c784] font-bold">
                  ${neg.counterOffer.toLocaleString()}
                  <p className="text-xs text-zinc-400 font-normal italic mt-1">"{neg.message}"</p>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => alert(`Accepted counter offer of $${neg.counterOffer} for ${neg.customer}. Proceeding to confirmation.`)}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
