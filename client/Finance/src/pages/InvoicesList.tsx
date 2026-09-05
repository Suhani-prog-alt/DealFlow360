import React, { useState } from 'react';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  orderId: string;
  customer: string;
  items: InvoiceItem[];
  subtotal: string;
  taxAmount: string;
  totalAmount: string;
  status: string;
}

const initialInvoices: Invoice[] = [
  { 
    id: '1', invoiceNumber: 'INV-2023-089', issueDate: 'Oct 12, 2023', dueDate: 'Nov 12, 2023', 
    orderId: 'ORD-9921', customer: 'TechCorp Inc.',
    items: [
      { description: 'Software licensing renewal for Q4', quantity: 1, unitPrice: 12000.00, totalPrice: 12000.00 }
    ],
    subtotal: '$12,000.00', taxAmount: '$450.00', totalAmount: '$12,450.00', status: 'Received' 
  },
  { 
    id: '2', invoiceNumber: 'INV-2023-090', issueDate: 'Oct 14, 2023', dueDate: 'Nov 14, 2023', 
    orderId: 'ORD-9925', customer: 'Delta LLC',
    items: [
      { description: 'Consulting services for database migration', quantity: 40, unitPrice: 100.00, totalPrice: 4000.00 }
    ],
    subtotal: '$4,000.00', taxAmount: '$200.00', totalAmount: '$4,200.00', status: 'Received' 
  },
  { 
    id: '3', invoiceNumber: 'INV-2023-091', issueDate: 'Oct 15, 2023', dueDate: 'Nov 15, 2023', 
    orderId: 'ORD-9930', customer: 'Global Systems',
    items: [
      { description: 'Enterprise support package', quantity: 1, unitPrice: 25000.00, totalPrice: 25000.00 },
      { description: 'On-site training', quantity: 2, unitPrice: 1500.00, totalPrice: 3000.00 }
    ],
    subtotal: '$28,000.00', taxAmount: '$900.00', totalAmount: '$28,900.00', status: 'Received' 
  },
  { 
    id: '4', invoiceNumber: 'INV-2023-080', issueDate: 'Sep 28, 2023', dueDate: 'Oct 28, 2023', 
    orderId: 'ORD-9880', customer: 'Alpha Industries',
    items: [
      { description: 'Hardware procurement for new office', quantity: 10, unitPrice: 1450.00, totalPrice: 14500.00 }
    ],
    subtotal: '$14,500.00', taxAmount: '$500.00', totalAmount: '$15,000.00', status: 'Received' 
  },
  { 
    id: '5', invoiceNumber: 'INV-2023-092', issueDate: 'Oct 18, 2023', dueDate: 'Nov 18, 2023', 
    orderId: 'ORD-9941', customer: 'TechCorp Inc.',
    items: [
      { description: 'Additional cloud storage (10TB)', quantity: 10, unitPrice: 750.00, totalPrice: 7500.00 }
    ],
    subtotal: '$7,500.00', taxAmount: '$650.00', totalAmount: '$8,150.00', status: 'Received' 
  },
];

const STATUS_OPTIONS = [
  'Received',
  'Under Review',
  'Approved',
  'Rejected',
  'Reconciliation',
  'Reconciled',
  'Payment Pending',
  'Paid'
];

const InvoicesList = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Received': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'Under Review': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Approved': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Rejected': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'Reconciliation': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'Reconciled': return 'text-teal-400 bg-teal-400/10 border-teal-400/30';
      case 'Payment Pending': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'Paid': return 'text-[#4d6a45] bg-[#4d6a45]/20 border-[#4d6a45]/40 font-bold';
      default: return 'text-gray-400 bg-gray-800 border-gray-600';
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (!selectedInvoice) return;
    
    // Update local state
    const updatedInvoice = { ...selectedInvoice, status: newStatus };
    setSelectedInvoice(updatedInvoice);
    
    // Update main list
    setInvoices(invoices.map(inv => inv.id === selectedInvoice.id ? updatedInvoice : inv));
  };

  return (
    <div className="w-full animate-in fade-in duration-500 relative">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Invoices</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track customer invoices</p>
        </div>
      </div>

      <div className="bg-[#141414] border border-[#222] rounded-lg overflow-hidden w-full">
        <table className="w-full text-left">
          <thead className="bg-[#0f0f0f] border-b border-[#222]">
            <tr>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Invoice ID</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Issue Date</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Total Amount</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#222]">
            {invoices.map((inv) => (
              <tr 
                key={inv.id} 
                className="hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                onClick={() => setSelectedInvoice(inv)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">{inv.invoiceNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{inv.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{inv.issueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{inv.totalAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(inv.status)}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <button className="text-gray-400 hover:text-white transition-colors">Analyze</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Realistic Invoice Modal */}
      {selectedInvoice && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedInvoice(null)}
        >
          <div 
            className="flex flex-col bg-[#141414] rounded-xl shadow-2xl max-w-3xl w-full relative animate-in zoom-in-95 duration-200 max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The "Paper" part of the invoice */}
            <div className="bg-white rounded-t-xl overflow-y-auto w-full text-black relative">
              <button 
                onClick={() => setSelectedInvoice(null)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-full z-10"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <div className="p-10">
                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-gray-100 pb-8 mb-8">
                  <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">INVOICE</h2>
                    <p className="text-gray-500 font-medium mt-2 tracking-widest text-sm">#{selectedInvoice.invoiceNumber}</p>
                  </div>
                  <div className="text-right">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tighter mb-1">DealFlow360</h1>
                    <p className="text-gray-500 text-sm">123 Business Avenue</p>
                    <p className="text-gray-500 text-sm">Tech District, CA 94025</p>
                    <p className="text-gray-500 text-sm mt-1">contact@dealflow360.com</p>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex justify-between mb-10">
                  <div className="w-1/2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Billed To</p>
                    <p className="text-lg font-bold text-gray-900">{selectedInvoice.customer}</p>
                    <p className="text-gray-600 text-sm mt-1">Corporate Headquarters</p>
                    <p className="text-gray-600 text-sm">Global Operations</p>
                  </div>
                  <div className="w-1/2 flex justify-end">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-right">
                      <span className="text-gray-500 font-medium">Issue Date:</span>
                      <span className="font-semibold text-gray-900">{selectedInvoice.issueDate}</span>
                      
                      <span className="text-gray-500 font-medium">Due Date:</span>
                      <span className="font-semibold text-red-600">{selectedInvoice.dueDate}</span>
                      
                      <span className="text-gray-500 font-medium">PO Number:</span>
                      <span className="font-semibold text-gray-900">{selectedInvoice.orderId}</span>
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="min-h-[250px]">
                  <table className="w-full text-left mb-8">
                    <thead className="bg-gray-50 border-y border-gray-200">
                      <tr>
                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Item Description</th>
                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Qty</th>
                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Unit Price</th>
                        <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedInvoice.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                          <td className="py-4 px-4 text-sm text-gray-800 font-medium">{item.description}</td>
                          <td className="py-4 px-4 text-sm text-gray-600 text-center">{item.quantity}</td>
                          <td className="py-4 px-4 text-sm text-gray-600 text-right">${item.unitPrice.toFixed(2)}</td>
                          <td className="py-4 px-4 text-sm text-gray-900 text-right font-semibold">${item.totalPrice.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-full md:w-1/2 lg:w-2/5">
                    <div className="flex justify-between py-3 text-sm border-b border-gray-100">
                      <span className="text-gray-500 font-medium">Subtotal</span>
                      <span className="font-semibold text-gray-900">{selectedInvoice.subtotal}</span>
                    </div>
                    <div className="flex justify-between py-3 text-sm border-b border-gray-100">
                      <span className="text-gray-500 font-medium">Tax Amount</span>
                      <span className="font-semibold text-gray-900">{selectedInvoice.taxAmount}</span>
                    </div>
                    <div className="flex justify-between py-4 text-lg border-b-2 border-gray-900 mt-2">
                      <span className="font-black text-gray-900 uppercase tracking-wider">Total Due</span>
                      <span className="font-black text-[#4d6a45]">{selectedInvoice.totalAmount}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 text-center text-sm text-gray-400">
                  <p>Thank you for your business. Please remit payment by the due date.</p>
                </div>
              </div>
            </div>
            
            {/* The Bottom Action Bar */}
            <div className="bg-[#0f0f0f] border-t border-[#333] p-5 rounded-b-xl flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-400">Finance Status:</span>
                <div className="relative">
                  <select
                    value={selectedInvoice.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className={`pl-3 pr-8 py-2.5 rounded-lg appearance-none cursor-pointer border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#4d6a45] transition-colors ${getStatusColor(selectedInvoice.status)}`}
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status} className="bg-[#141414] text-white py-2 font-normal">
                        {status}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-current">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => window.print()} 
                className="bg-[#2a2a2a] hover:bg-[#333] border border-[#444] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesList;
