import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'MegaCorp', requested: 22, limit: 15 },
  { name: 'Nexus Sys', requested: 18, limit: 12 },
  { name: 'Alpha Ind', requested: 25, limit: 18 },
  { name: 'Stark', requested: 15, limit: 10 },
  { name: 'Acme', requested: 30, limit: 15 },
];

const HighRiskApprovals = () => {
  const [approvals, setApprovals] = useState(data);

  const handleAction = (name: string, action: string) => {
    setApprovals(approvals.filter(a => a.name !== name));
    // Optional: show a small toast or log
    console.log(`Action: ${action} for ${name}`);
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
          <span className="w-3 h-3 rounded-full bg-red-500 mr-3 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
          High Risk Approvals
        </h1>
        <p className="text-gray-400 text-sm mt-2">Analyze and process discount requests exceeding standard tier limits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-[#141414] border border-[#222] rounded-xl p-6 shadow-2xl transition-all duration-500 hover:border-red-900/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]">
          <h3 className="text-lg font-semibold text-white mb-6">Discount Risk Analysis</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={approvals} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="name" stroke="#888" tickLine={false} axisLine={false} />
                <YAxis stroke="#888" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }} 
                  itemStyle={{ color: '#fff' }}
                  cursor={{ fill: '#222' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="requested" name="Requested %" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  {
                    approvals.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.requested - entry.limit > 8 ? '#ef4444' : '#f97316'} />
                    ))
                  }
                </Bar>
                <Bar dataKey="limit" name="Tier Limit %" fill="#4d6a45" radius={[4, 4, 0, 0]} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#141414] border border-[#222] rounded-xl p-6 shadow-2xl">
           <h3 className="text-lg font-semibold text-white mb-6">Action Queue</h3>
           <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
             {approvals.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <svg className="w-12 h-12 mb-3 text-[#4d6a45]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p>All clear! No pending approvals.</p>
                </div>
             ) : (
               approvals.map((item, idx) => (
                 <div key={idx} className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4 transition-all duration-300 hover:bg-[#222] hover:-translate-y-1 hover:shadow-lg">
                   <div className="flex justify-between items-start mb-3">
                     <p className="text-sm font-medium text-gray-200">{item.name}</p>
                     <span className="text-xs font-bold px-2 py-1 bg-red-500/10 text-red-500 rounded">+{item.requested - item.limit}% Risk</span>
                   </div>
                   <div className="flex space-x-2">
                     <button onClick={() => handleAction(item.name, 'Approve')} className="flex-1 bg-[#4d6a45] hover:bg-[#5b7c52] text-white text-xs py-2 rounded transition-colors font-medium">Approve</button>
                     <button onClick={() => handleAction(item.name, 'Reject')} className="flex-1 bg-transparent border border-red-900/50 hover:bg-red-900/20 text-red-400 text-xs py-2 rounded transition-colors font-medium">Reject</button>
                   </div>
                 </div>
               ))
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default HighRiskApprovals;
