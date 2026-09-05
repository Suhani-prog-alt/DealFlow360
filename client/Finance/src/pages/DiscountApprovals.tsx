import React, { useState } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface Approval {
  id: string;
  deal: string;
  rep: string;
  requested: string;
  limit: string;
  status: string;
  reason?: string;
  marginImpact?: string;
}

const DiscountApprovals = () => {
  const [approvals, setApprovals] = useState<Approval[]>([
    { id: 'DA-1042', deal: 'TechCorp Q3 Expansion', rep: 'Sarah Jenkins', requested: '18%', limit: '15%', status: 'Pending Review', reason: 'Strategic account, matching competitor pricing.', marginImpact: '-3.2%' },
    { id: 'DA-1043', deal: 'Global Systems SLA', rep: 'Mark T.', requested: '12%', limit: '10%', status: 'Pending Review', reason: 'Multi-year commitment secured if discount approved.', marginImpact: '-1.8%' },
    { id: 'DA-1039', deal: 'Delta LLC Licenses', rep: 'Sarah Jenkins', requested: '20%', limit: '15%', status: 'Approved', reason: 'Volume based tiering exception approved by VP Sales.', marginImpact: '-4.5%' },
  ]);

  const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);

  const handleStatusUpdate = (id: string, newStatus: string) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    setSelectedApproval(prev => prev && prev.id === id ? { ...prev, status: newStatus } : prev);
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Discount Approvals</h1>
        <p className="text-gray-500 text-sm mt-1">Review quotations exceeding standard discount ceilings</p>
      </div>

      <div className="bg-[#141414] border border-[#222] rounded-lg overflow-hidden w-full shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-[#0f0f0f] border-b border-[#222]">
            <tr>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Request ID</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Deal / Quotation</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Sales Rep</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Requested</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Tier Limit</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
            {approvals.map((req) => (
              <tr 
                key={req.id} 
                className="hover:bg-[#1a1a1a] transition-colors cursor-pointer group"
                onClick={() => setSelectedApproval(req)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{req.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{req.deal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{req.rep}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#e87040] font-bold">{req.requested}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.limit}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                    req.status === 'Approved' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 
                    req.status === 'Rejected' ? 'text-red-400 bg-red-500/10 border-red-500/30' : 
                    'text-yellow-500 bg-yellow-500/10 border-yellow-500/30'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <button className="text-gray-500 hover:text-white transition-colors border border-transparent group-hover:border-[#444] px-3 py-1 rounded bg-[#0a0a0a] group-hover:bg-[#222]">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Advanced Dark Theme Modal - Form Style */}
      {selectedApproval && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedApproval(null)}
        >
          <div 
            className="flex flex-col bg-[#141414] rounded-xl shadow-2xl max-w-3xl w-full relative animate-in zoom-in-95 duration-200 max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The "Document" part */}
            <div className="bg-[#1a1a1a] rounded-t-xl overflow-y-auto w-full text-white relative">
              <button 
                onClick={() => setSelectedApproval(null)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors bg-[#2a2a2a] hover:bg-[#333] p-2 rounded-full z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-10">
                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-[#333] pb-8 mb-8">
                  <div>
                    <h2 className="text-4xl font-black text-white tracking-tight uppercase">Approval Request</h2>
                    <p className="text-gray-400 font-medium mt-2 tracking-widest text-sm">#{selectedApproval.id}</p>
                  </div>
                  <div className="text-right">
                    <h1 className="text-2xl font-black text-white tracking-tighter mb-1">DealFlow360</h1>
                    <p className="text-gray-500 text-sm">Internal Review Board</p>
                    <p className="text-gray-500 text-sm">Global Operations</p>
                    <p className="text-gray-500 text-sm mt-1">finance@dealflow360.com</p>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex justify-between mb-10">
                  <div className="w-1/2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Deal Information</p>
                    <p className="text-lg font-bold text-white">{selectedApproval.deal}</p>
                    <p className="text-gray-400 text-sm mt-1">Sales Rep: {selectedApproval.rep}</p>
                    <p className="text-gray-400 text-sm">Region: North America</p>
                  </div>
                  <div className="w-1/2 flex justify-end">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-right">
                      <span className="text-gray-500 font-medium">Standard Limit:</span>
                      <span className="font-semibold text-gray-300">{selectedApproval.limit}</span>
                      
                      <span className="text-gray-500 font-medium">Requested Discount:</span>
                      <span className="font-bold text-[#e87040] text-lg">{selectedApproval.requested}</span>
                    </div>
                  </div>
                </div>

                {/* Justification & Impact */}
                <div className="min-h-[250px]">
                  <div className="mb-8">
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Justification / Reason</p>
                     <div className="bg-[#141414] border border-[#222] p-6 rounded-lg">
                       <p className="text-base text-gray-300 italic leading-relaxed">"{selectedApproval.reason}"</p>
                     </div>
                  </div>

                  <div>
                     <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Financial Impact</p>
                     <div className="flex items-center justify-between bg-red-500/10 border border-red-500/20 p-6 rounded-lg">
                        <div>
                          <p className="text-base font-medium text-red-400">Estimated Margin Impact</p>
                          <p className="text-sm text-red-400/80 mt-1">Compared to standard tier limit</p>
                        </div>
                        <span className="text-2xl font-black text-red-500">{selectedApproval.marginImpact}</span>
                     </div>
                  </div>
                </div>

                <div className="mt-12 text-center text-sm text-gray-500">
                  <p>This document is for internal review purposes only. Confidential.</p>
                </div>
              </div>
            </div>
            
            {/* The Bottom Action Bar */}
            <div className="bg-[#0f0f0f] border-t border-[#333] p-5 rounded-b-xl flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-400">Current Status:</span>
                <span className={`px-3 py-1 text-xs font-bold rounded-full border uppercase tracking-wider ${
                  selectedApproval.status === 'Approved' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 
                  selectedApproval.status === 'Rejected' ? 'text-red-400 bg-red-500/10 border-red-500/30' : 
                  'text-yellow-500 bg-yellow-500/10 border-yellow-500/30'
                }`}>
                  {selectedApproval.status}
                </span>
              </div>
              
              {selectedApproval.status === 'Pending Review' ? (
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleStatusUpdate(selectedApproval.id, 'Rejected')}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-transparent hover:bg-red-500/10 border border-[#333] hover:border-red-500/50 text-gray-300 hover:text-red-400 rounded-lg transition-colors text-sm font-medium"
                  >
                    <XCircle className="w-4 h-4" /> <span>Reject Request</span>
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate(selectedApproval.id, 'Approved')}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-[#4d6a45] hover:bg-[#5b7c52] text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-[#4d6a45]/20"
                  >
                    <CheckCircle className="w-4 h-4" /> <span>Approve Request</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => window.print()} 
                  className="bg-[#2a2a2a] hover:bg-[#333] border border-[#444] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                  <span>Print Record</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscountApprovals;
