import React from 'react';

const DiscountApprovals = () => {
  const approvals = [
    { id: 'DA-1042', deal: 'TechCorp Q3 Expansion', rep: 'Sarah Jenkins', requested: '18%', limit: '15%', status: 'Pending Review' },
    { id: 'DA-1043', deal: 'Global Systems SLA', rep: 'Mark T.', requested: '12%', limit: '10%', status: 'Pending Review' },
    { id: 'DA-1039', deal: 'Delta LLC Licenses', rep: 'Sarah Jenkins', requested: '20%', limit: '15%', status: 'Approved' },
  ];

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Discount Approvals</h1>
        <p className="text-gray-500 text-sm mt-1">Review quotations exceeding standard discount ceilings</p>
      </div>

      <div className="bg-[#141414] border border-[#222] rounded-lg overflow-hidden w-full">
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
              <tr key={req.id} className="hover:bg-[#1a1a1a] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{req.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{req.deal}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{req.rep}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#e87040] font-bold">{req.requested}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.limit}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${req.status === 'Approved' ? 'text-[#4d6a45] bg-[#4d6a45]/10' : 'text-yellow-500 bg-yellow-500/10'}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  {req.status === 'Pending Review' ? (
                    <div className="space-x-2">
                      <button className="text-[#4d6a45] hover:text-[#5b7c52] transition-colors font-medium">Approve</button>
                      <span className="text-gray-600">|</span>
                      <button className="text-gray-400 hover:text-red-400 transition-colors font-medium">Reject</button>
                    </div>
                  ) : (
                    <button className="text-gray-500 hover:text-white transition-colors">View Details</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiscountApprovals;
