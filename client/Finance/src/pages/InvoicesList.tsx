import React from 'react';

const InvoicesList = () => {
  const invoices = [
    { id: 'INV-2023-089', customer: 'TechCorp Inc.', date: 'Oct 12, 2023', amount: '$12,450.00', status: 'Paid' },
    { id: 'INV-2023-090', customer: 'Delta LLC', date: 'Oct 14, 2023', amount: '$4,200.00', status: 'Pending' },
    { id: 'INV-2023-091', customer: 'Global Systems', date: 'Oct 15, 2023', amount: '$28,900.00', status: 'Draft' },
    { id: 'INV-2023-080', customer: 'Alpha Industries', date: 'Sep 28, 2023', amount: '$15,000.00', status: 'Overdue' },
    { id: 'INV-2023-092', customer: 'TechCorp Inc.', date: 'Oct 18, 2023', amount: '$8,150.00', status: 'Pending' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Paid': return 'text-[#4d6a45] bg-[#4d6a45]/10';
      case 'Pending': return 'text-yellow-500 bg-yellow-500/10';
      case 'Overdue': return 'text-[#e87040] bg-[#e87040]/10';
      default: return 'text-gray-400 bg-gray-800';
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Invoices</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track customer invoices</p>
        </div>
        <button className="bg-[#4d6a45] hover:bg-[#5b7c52] text-white text-sm font-medium py-2 px-6 rounded transition-colors">
          Create Invoice
        </button>
      </div>

      <div className="bg-[#141414] border border-[#222] rounded-lg overflow-hidden w-full">
        <table className="w-full text-left">
          <thead className="bg-[#0f0f0f] border-b border-[#222]">
            <tr>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Invoice ID</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-[#1a1a1a] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{inv.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{inv.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{inv.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{inv.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(inv.status)}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <button className="text-gray-400 hover:text-white transition-colors">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesList;
