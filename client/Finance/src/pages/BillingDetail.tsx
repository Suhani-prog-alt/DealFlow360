import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area, CartesianGrid
} from 'recharts';
import { 
  FileSpreadsheet, Search, Filter, AlertCircle, CheckCircle, 
  XCircle, AlertTriangle, ChevronRight, X, DollarSign, 
  Activity, PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight, Clock
} from 'lucide-react';

// --- MOCK DATA ---
const KPI_DATA = [
  { title: 'Total Billing', value: '$1.24M', trend: '+12%', isPositive: true },
  { title: 'Collected', value: '$840K', trend: '+8%', isPositive: true },
  { title: 'Outstanding', value: '$320K', trend: '-2%', isPositive: true },
  { title: 'Overdue', value: '$55K', trend: '+15%', isPositive: false },
  { title: 'Pending Review', value: '$25K', count: 14, isPositive: true },
  { title: 'Disputed', value: '$12K', count: 3, isPositive: false },
];

const BILLING_CHART_DATA = [
  { name: 'Jan', billed: 120000, collected: 100000 },
  { name: 'Feb', billed: 150000, collected: 130000 },
  { name: 'Mar', billed: 180000, collected: 150000 },
  { name: 'Apr', billed: 140000, collected: 120000 },
  { name: 'May', billed: 200000, collected: 170000 },
  { name: 'Jun', billed: 220000, collected: 180000 },
];

const AGING_DATA = [
  { name: 'Current', value: 200000 },
  { name: '1-30 Days', value: 80000 },
  { name: '31-60 Days', value: 25000 },
  { name: '61-90 Days', value: 10000 },
  { name: '90+ Days', value: 5000 },
];

const STATUS_DISTRIBUTION = [
  { name: 'Paid', value: 45 },
  { name: 'Pending', value: 30 },
  { name: 'Overdue', value: 15 },
  { name: 'Disputed', value: 10 },
];

const COLORS = ['#4d6a45', '#e87040', '#ef4444', '#eab308'];

interface Invoice {
  id: string;
  vendor: string;
  poNumber: string;
  amount: number;
  paid: number;
  outstanding: number;
  dueDate: string;
  matchStatus: 'Matched' | 'Mismatch' | 'Pending';
  financeStatus: 'Approved' | 'Pending Review' | 'Disputed' | 'Reconciled';
  analysis: {
    poMatch: boolean;
    fulfillmentMatch: boolean;
    taxVerification: boolean;
    duplicateCheck: boolean;
    paymentVerification: boolean;
  };
}

const INVOICES: Invoice[] = [
  {
    id: 'INV-9021', vendor: 'TechCorp Solutions', poNumber: 'PO-2091', amount: 45000, paid: 45000, outstanding: 0,
    dueDate: '2023-10-15', matchStatus: 'Matched', financeStatus: 'Reconciled',
    analysis: { poMatch: true, fulfillmentMatch: true, taxVerification: true, duplicateCheck: true, paymentVerification: true }
  },
  {
    id: 'INV-9022', vendor: 'Global Logistics', poNumber: 'PO-2095', amount: 12500, paid: 0, outstanding: 12500,
    dueDate: '2023-10-20', matchStatus: 'Pending', financeStatus: 'Pending Review',
    analysis: { poMatch: true, fulfillmentMatch: false, taxVerification: true, duplicateCheck: true, paymentVerification: false }
  },
  {
    id: 'INV-9025', vendor: 'Alpha Industries', poNumber: 'PO-2104', amount: 8400, paid: 4000, outstanding: 4400,
    dueDate: '2023-09-10', matchStatus: 'Mismatch', financeStatus: 'Disputed',
    analysis: { poMatch: false, fulfillmentMatch: true, taxVerification: false, duplicateCheck: true, paymentVerification: false }
  },
  {
    id: 'INV-9030', vendor: 'ServerHost Pro', poNumber: 'PO-2110', amount: 3200, paid: 0, outstanding: 3200,
    dueDate: '2023-11-01', matchStatus: 'Matched', financeStatus: 'Approved',
    analysis: { poMatch: true, fulfillmentMatch: true, taxVerification: true, duplicateCheck: true, paymentVerification: false }
  }
];

// --- COMPONENTS ---
const BillingDetail = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAction = (id: string, action: Invoice['financeStatus']) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, financeStatus: action } : inv));
    setToast({ message: `Invoice ${id} has been marked as ${action}.`, type: 'success' });
    if (selectedInvoice && selectedInvoice.id === id) {
      setSelectedInvoice({ ...selectedInvoice, financeStatus: action });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Reconciled': return 'text-teal-400 bg-teal-400/10 border-teal-400/30';
      case 'Approved': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Pending Review': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'Disputed': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'Matched': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Mismatch': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'Pending': return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
      default: return 'text-gray-400 bg-gray-800 border-gray-600';
    }
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen text-white animate-in fade-in duration-500 pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-xl border flex items-center space-x-3 animate-in slide-in-from-top-5 duration-300 ${
          toast.type === 'success' ? 'bg-[#141414] border-emerald-500/50 text-emerald-400' : 'bg-[#141414] border-red-500/50 text-red-400'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing & Collections</h1>
          <p className="text-gray-400 text-sm mt-1">Review pending invoices, manage collections, and reconcile accounts.</p>
        </div>
        <button className="bg-[#4d6a45] hover:bg-[#5b7c52] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-[#4d6a45]/20 flex items-center space-x-2">
          <Activity size={16} />
          <span>Review Pending Invoices</span>
        </button>
      </div>

      {/* Finance Alerts */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <div className="flex items-center space-x-3 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-lg flex-shrink-0">
          <AlertCircle className="text-red-400" size={20} />
          <div>
            <p className="text-sm font-bold text-red-400">14 Overdue Invoices</p>
            <p className="text-xs text-red-400/80">Require immediate follow-up</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-yellow-500/10 border border-yellow-500/30 px-4 py-3 rounded-lg flex-shrink-0">
          <AlertTriangle className="text-yellow-400" size={20} />
          <div>
            <p className="text-sm font-bold text-yellow-400">3 PO Mismatches</p>
            <p className="text-xs text-yellow-400/80">Pending dispute resolution</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-blue-500/10 border border-blue-500/30 px-4 py-3 rounded-lg flex-shrink-0">
          <Clock className="text-blue-400" size={20} />
          <div>
            <p className="text-sm font-bold text-blue-400">22 Pending Reconciliations</p>
            <p className="text-xs text-blue-400/80">Payments received, unmatched</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {KPI_DATA.map((kpi, idx) => (
          <div key={idx} className="bg-[#141414] border border-[#222] p-5 rounded-xl hover:border-[#333] transition-colors group">
            <p className="text-xs font-medium text-gray-500 mb-1">{kpi.title}</p>
            <h3 className="text-2xl font-black text-white group-hover:scale-105 transform transition-transform origin-left">{kpi.value}</h3>
            {kpi.trend && (
              <div className={`flex items-center space-x-1 mt-2 text-xs font-medium ${kpi.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                {kpi.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                <span>{kpi.trend} vs last month</span>
              </div>
            )}
            {kpi.count && (
              <p className="text-xs text-gray-400 mt-2 font-medium">{kpi.count} items</p>
            )}
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#141414] border border-[#222] p-6 rounded-xl">
          <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Billing vs Collection</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={BILLING_CHART_DATA}>
                <defs>
                  <linearGradient id="colorBilled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4d6a45" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4d6a45" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e87040" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#e87040" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#555" tick={{fill: '#888', fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis stroke="#555" tick={{fill: '#888', fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="billed" stroke="#4d6a45" strokeWidth={3} fillOpacity={1} fill="url(#colorBilled)" />
                <Area type="monotone" dataKey="collected" stroke="#e87040" strokeWidth={3} fillOpacity={1} fill="url(#colorCollected)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-[#141414] border border-[#222] p-6 rounded-xl flex flex-col">
          <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">Invoice Status Distribution</h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STATUS_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {STATUS_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Outstanding Aging Pipeline */}
      <div className="bg-[#141414] border border-[#222] p-6 rounded-xl mb-8">
        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Outstanding Aging</h3>
        <div className="flex h-4 rounded-full overflow-hidden mb-4">
          {AGING_DATA.map((bucket, idx) => (
            <div 
              key={idx} 
              className="h-full group relative cursor-pointer hover:opacity-80 transition-opacity"
              style={{ 
                width: `${(bucket.value / 320000) * 100}%`,
                backgroundColor: ['#4d6a45', '#738b6d', '#e87040', '#ef4444', '#7f1d1d'][idx]
              }}
            >
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[#222] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {bucket.name}: ${bucket.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500 font-medium">
          {AGING_DATA.map((bucket, idx) => (
            <span key={idx}>{bucket.name}</span>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#141414] border border-[#222] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#222] flex justify-between items-center bg-[#0a0a0a]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-sm text-white focus:outline-none focus:border-[#4d6a45] transition-colors w-64"
            />
          </div>
          <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors bg-[#1a1a1a] border border-[#333] px-3 py-2 rounded-lg">
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0f0f0f] border-b border-[#222]">
              <tr>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID / PO</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Amount</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Match Status</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Finance Status</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#1a1a1a] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-bold text-white">{inv.id}</p>
                    <p className="text-xs text-gray-500 mt-1">{inv.poNumber}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-medium">{inv.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <p className="text-sm font-bold text-white">${inv.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Bal: <span className={inv.outstanding > 0 ? "text-red-400" : "text-gray-500"}>${inv.outstanding.toLocaleString()}</span></p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{inv.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getStatusColor(inv.matchStatus)}`}>
                      {inv.matchStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getStatusColor(inv.financeStatus)}`}>
                      {inv.financeStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      onClick={() => setSelectedInvoice(inv)}
                      className="text-[#e87040] hover:text-white transition-colors text-sm font-medium border border-transparent hover:border-[#e87040] px-3 py-1.5 rounded-lg hover:bg-[#e87040]/10 flex items-center space-x-1 ml-auto"
                    >
                      <span>View & Analyze</span>
                      <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Overlay */}
      {selectedInvoice && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity backdrop-blur-sm"
          onClick={() => setSelectedInvoice(null)}
        />
      )}

      {/* Detail Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-lg bg-[#141414] shadow-2xl z-50 border-l border-[#333] transform transition-transform duration-300 ease-in-out ${selectedInvoice ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedInvoice && (
          <div className="h-full flex flex-col">
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-[#222] flex justify-between items-center bg-[#0a0a0a]">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Invoice Analysis</h2>
                <p className="text-sm text-gray-400 mt-1">{selectedInvoice.id} • {selectedInvoice.vendor}</p>
              </div>
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="text-gray-400 hover:text-white bg-[#222] hover:bg-[#333] p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Status Banner */}
              <div className={`p-4 rounded-lg border ${selectedInvoice.financeStatus === 'Disputed' ? 'bg-red-500/10 border-red-500/30' : selectedInvoice.financeStatus === 'Pending Review' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                <h4 className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70">Current Finance Status</h4>
                <p className="text-lg font-black">{selectedInvoice.financeStatus}</p>
              </div>

              {/* Financials Overview */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-[#222] pb-2">Financial Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333]">
                    <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                    <p className="text-xl font-bold text-white">${selectedInvoice.amount.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333]">
                    <p className="text-xs text-gray-500 mb-1">Outstanding Balance</p>
                    <p className={`text-xl font-bold ${selectedInvoice.outstanding > 0 ? 'text-[#e87040]' : 'text-emerald-400'}`}>
                      ${selectedInvoice.outstanding.toLocaleString()}
                    </p>
                  </div>
                </div>
                {/* Payment Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Payment Progress</span>
                    <span>{Math.round((selectedInvoice.paid / selectedInvoice.amount) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#222] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#4d6a45]" 
                      style={{ width: `${(selectedInvoice.paid / selectedInvoice.amount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Automated Analysis Checklist */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-[#222] pb-2">System Analysis Checklist</h3>
                <div className="space-y-3">
                  <AnalysisItem label="PO Match Verified" passed={selectedInvoice.analysis.poMatch} detail={`Matches ${selectedInvoice.poNumber}`} />
                  <AnalysisItem label="Fulfillment Match Verified" passed={selectedInvoice.analysis.fulfillmentMatch} detail="Goods receipt confirmed" />
                  <AnalysisItem label="Tax Calculation Verification" passed={selectedInvoice.analysis.taxVerification} detail="Compliant with local rates" />
                  <AnalysisItem label="Duplicate Check" passed={selectedInvoice.analysis.duplicateCheck} detail="No previous records found" />
                  <AnalysisItem label="Payment Verification" passed={selectedInvoice.analysis.paymentVerification} detail="Funds settled in ledger" />
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-6 border-t border-[#222] bg-[#0a0a0a]">
              {selectedInvoice.financeStatus === 'Pending Review' || selectedInvoice.financeStatus === 'Disputed' ? (
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleAction(selectedInvoice.id, 'Disputed')}
                    className="w-full py-3 bg-transparent border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-lg font-medium transition-colors text-sm"
                  >
                    Raise Dispute
                  </button>
                  <button 
                    onClick={() => handleAction(selectedInvoice.id, 'Approved')}
                    className="w-full py-3 bg-[#4d6a45] hover:bg-[#5b7c52] text-white rounded-lg font-medium transition-colors text-sm shadow-lg shadow-[#4d6a45]/20"
                  >
                    Approve Invoice
                  </button>
                </div>
              ) : selectedInvoice.financeStatus === 'Approved' ? (
                <button 
                  onClick={() => handleAction(selectedInvoice.id, 'Reconciled')}
                  className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium transition-colors text-sm shadow-lg shadow-teal-600/20"
                >
                  Mark as Reconciled
                </button>
              ) : (
                <div className="text-center py-2 px-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <p className="text-sm font-medium text-gray-400 flex justify-center items-center gap-2">
                    <CheckCircle size={16} /> Fully Reconciled & Closed
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- HELPER COMPONENT ---
const AnalysisItem = ({ label, passed, detail }: { label: string, passed: boolean, detail: string }) => (
  <div className="flex items-start justify-between p-3 rounded-lg border border-[#333] bg-[#1a1a1a] hover:bg-[#222] transition-colors">
    <div className="flex items-start space-x-3">
      <div className="mt-0.5">
        {passed ? <CheckCircle className="text-emerald-400" size={16} /> : <XCircle className="text-red-400" size={16} />}
      </div>
      <div>
        <p className={`text-sm font-medium ${passed ? 'text-gray-300' : 'text-white'}`}>{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{detail}</p>
      </div>
    </div>
    {!passed && <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded">Action Required</span>}
  </div>
);

export default BillingDetail;
