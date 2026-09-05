import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, CheckCircle, Activity, Scale, GitBranch, BarChart3, FileClock, ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

import Dashboard from './pages/Dashboard';
import QuotationsList from './pages/QuotationsList';
import Approvals from './pages/Approvals';
import DealHealth from './pages/DealHealth';
import DiscountTiers from './pages/DiscountTiers';
import ApprovalChains from './pages/ApprovalChains';
import Reports from './pages/Reports';
import AuditLogs from './pages/AuditLogs';

// We'll keep Admin pages registered in routes but not in sidebar
import Products from './pages/Products';
import PriceLists from './pages/PriceLists';
import Warehouses from './pages/Warehouses';
import SubscriptionPlans from './pages/SubscriptionPlans';
import UpsellRules from './pages/UpsellRules';

function Sidebar() {
  const location = useLocation();
  const [approvalsOpen, setApprovalsOpen] = useState(true);
  
  const isApprovalsActive = location.pathname.startsWith('/approvals');

  return (
    <div className="w-64 border-r border-border bg-card p-4 flex flex-col h-screen overflow-y-auto">
      <div className="font-bold text-xl mb-8 flex items-center space-x-2">
        <span>DealFlow360</span>
      </div>
      <nav className="flex-1 space-y-1">
        <Link to="/" className={clsx("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors", location.pathname === '/' ? "bg-white/10 text-white font-medium" : "text-textMuted hover:bg-white/5 hover:text-text")}>
          <LayoutDashboard size={18} /><span>Dashboard</span>
        </Link>
        <Link to="/quotations" className={clsx("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors", location.pathname === '/quotations' ? "bg-white/10 text-white font-medium" : "text-textMuted hover:bg-white/5 hover:text-text")}>
          <FileText size={18} /><span>Quotations</span>
        </Link>

        {/* Nested Approvals */}
        <div>
          <button 
            onClick={() => setApprovalsOpen(!approvalsOpen)}
            className={clsx("w-full flex items-center justify-between space-x-3 px-3 py-2 rounded-md text-sm transition-colors", isApprovalsActive ? "text-white font-medium" : "text-textMuted hover:bg-white/5 hover:text-text")}
          >
            <div className="flex items-center space-x-3">
              <CheckCircle size={18} />
              <span>Approvals</span>
            </div>
            {approvalsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          
          {approvalsOpen && (
            <div className="ml-7 mt-1 border-l border-[#333] space-y-1">
              <Link to="/approvals/pending" className={clsx("block px-3 py-1.5 text-sm transition-colors relative before:content-[''] before:absolute before:-left-[1px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-[1px] before:bg-[#333]", location.pathname === '/approvals/pending' ? "text-white" : "text-textMuted hover:text-white")}>Pending</Link>
              <Link to="/approvals/approved" className={clsx("block px-3 py-1.5 text-sm transition-colors relative before:content-[''] before:absolute before:-left-[1px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-[1px] before:bg-[#333]", location.pathname === '/approvals/approved' ? "text-white" : "text-textMuted hover:text-white")}>Approved</Link>
              <Link to="/approvals/rejected" className={clsx("block px-3 py-1.5 text-sm transition-colors relative before:content-[''] before:absolute before:-left-[1px] before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-[1px] before:bg-[#333]", location.pathname === '/approvals/rejected' ? "text-white" : "text-textMuted hover:text-white")}>Rejected</Link>
              <Link to="/approvals/history" className={clsx("block px-3 py-1.5 text-sm transition-colors relative before:content-[''] before:absolute before:-left-[1px] before:bottom-[11px] before:w-2 before:h-2 before:border-l before:border-b before:border-[#333]", location.pathname === '/approvals/history' ? "text-white" : "text-textMuted hover:text-white")}>History</Link>
            </div>
          )}
        </div>

        <Link to="/deal-health" className={clsx("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors", location.pathname === '/deal-health' ? "bg-white/10 text-white font-medium" : "text-textMuted hover:bg-white/5 hover:text-text")}>
          <Activity size={18} /><span>Deal Health</span>
        </Link>
        <Link to="/discount-tiers" className={clsx("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors", location.pathname === '/discount-tiers' ? "bg-white/10 text-white font-medium" : "text-textMuted hover:bg-white/5 hover:text-text")}>
          <Scale size={18} /><span>Discount Tiers</span>
        </Link>
        <Link to="/approval-chains" className={clsx("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors", location.pathname === '/approval-chains' ? "bg-white/10 text-white font-medium" : "text-textMuted hover:bg-white/5 hover:text-text")}>
          <GitBranch size={18} /><span>Approval Chains</span>
        </Link>
        <Link to="/reports" className={clsx("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors", location.pathname === '/reports' ? "bg-white/10 text-white font-medium" : "text-textMuted hover:bg-white/5 hover:text-text")}>
          <BarChart3 size={18} /><span>Reports</span>
        </Link>
        <Link to="/audit-logs" className={clsx("flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors", location.pathname === '/audit-logs' ? "bg-white/10 text-white font-medium" : "text-textMuted hover:bg-white/5 hover:text-text")}>
          <FileClock size={18} /><span>Audit Logs</span>
        </Link>
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-text flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            {/* Sales Manager Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/quotations" element={<QuotationsList />} />
            <Route path="/approvals/*" element={<Approvals />} />
            <Route path="/deal-health" element={<DealHealth />} />
            <Route path="/discount-tiers" element={<DiscountTiers />} />
            <Route path="/approval-chains" element={<ApprovalChains />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/audit-logs" element={<AuditLogs />} />

            {/* Admin Routes (Kept available but not in sidebar) */}
            <Route path="/products" element={<Products />} />
            <Route path="/price-lists" element={<PriceLists />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/subscriptions" element={<SubscriptionPlans />} />
            <Route path="/upsell" element={<UpsellRules />} />

            <Route path="*" element={<div className="p-8 text-textMuted">Page not implemented yet.</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
