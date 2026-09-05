import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, Percent, Shield, Warehouse, RefreshCw, TrendingUp, FileText, ClipboardList } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Pricing from './pages/Pricing';
import DiscountTiers from './pages/DiscountTiers';
import ApprovalChains from './pages/ApprovalChains';
import WarehousesPage from './pages/Warehouses';
import SubscriptionPlans from './pages/SubscriptionPlans';
import Upsells from './pages/Upsells';
import Reports from './pages/Reports';
import AuditLogs from './pages/AuditLogs';

const nav = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/pricing', icon: Tag, label: 'Price Lists' },
  { to: '/governance', icon: Percent, label: 'Discount Tiers' },
  { to: '/approvals', icon: Shield, label: 'Approval Chains' },
  { to: '/warehouses', icon: Warehouse, label: 'Warehouses' },
  { to: '/subscriptions', icon: RefreshCw, label: 'Subscriptions' },
  { to: '/upsells', icon: TrendingUp, label: 'Upsell Rules' },
  { to: '/reports', icon: FileText, label: 'Reports' },
  { to: '/audit', icon: ClipboardList, label: 'Audit Logs' },
];

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-[#0f1110] overflow-hidden">
        <aside className="w-56 bg-[#0c0e0d] border-r border-[#212623] flex flex-col py-6 px-3 space-y-1 flex-shrink-0">
          <div className="px-3 mb-6"><span className="text-[#7d9b6b] font-bold text-lg tracking-tight">DealFlow</span><span className="text-gray-400 text-lg">360</span><div className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest">Admin Console</div></div>
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => 'flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ' + (isActive ? 'bg-[#7d9b6b]/10 text-[#7d9b6b] font-medium' : 'text-gray-400 hover:text-gray-200 hover:bg-[#151816]')}>
              <Icon size={16} /><span>{label}</span>
            </NavLink>
          ))}
        </aside>
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/governance" element={<DiscountTiers />} />
            <Route path="/approvals" element={<ApprovalChains />} />
            <Route path="/warehouses" element={<WarehousesPage />} />
            <Route path="/subscriptions" element={<SubscriptionPlans />} />
            <Route path="/upsells" element={<Upsells />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/audit" element={<AuditLogs />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
