import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Tag, Scale, Building2, Repeat, Activity, Settings, FileText, List, Link as LinkIcon, Lock } from 'lucide-react';
import Dashboard from './pages/Dashboard';

function Sidebar() {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Products', path: '/products', icon: Package },
    { name: 'Price Lists', path: '/pricing', icon: Tag },
    { name: 'Discount Tiers', path: '/governance', icon: Scale },
    { name: 'Approval Chains', path: '/approvals', icon: Lock },
    { name: 'Warehouses', path: '/warehouses', icon: Building2 },
    { name: 'Subscription Plans', path: '/subscriptions', icon: Repeat },
    { name: 'Upsell Rules', path: '/upsells', icon: LinkIcon },
    { name: 'Reports', path: '/reports', icon: Activity },
    { name: 'Audit Logs', path: '/audit', icon: FileText },
  ];

  return (
    <div className="w-64 bg-[#0f1110] border-r border-[#212623] text-gray-300 min-h-screen p-6 flex flex-col font-sans">
      <div className="text-white font-semibold text-lg mb-8 tracking-tight">
        DealFlow360
      </div>
      
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive 
                  ? 'bg-[#151816] text-white font-medium border border-[#212623]' 
                  : 'text-gray-400 hover:text-white hover:bg-[#151816]/50'
              }`}
            >
              <item.icon size={16} /> 
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0f1110] text-[#f3f4f6]">
      <Router>
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </Router>
    </div>
  );
}

import Products from './pages/Products';
import Pricing from './pages/Pricing';
import DiscountTiers from './pages/DiscountTiers';
import ApprovalChains from './pages/ApprovalChains';
import Warehouses from './pages/Warehouses';
import SubscriptionPlans from './pages/SubscriptionPlans';
import Upsells from './pages/Upsells';
import Reports from './pages/Reports';
import AuditLogs from './pages/AuditLogs';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/governance" element={<DiscountTiers />} />
        <Route path="/approvals" element={<ApprovalChains />} />
        <Route path="/warehouses" element={<Warehouses />} />
        <Route path="/subscriptions" element={<SubscriptionPlans />} />
        <Route path="/upsells" element={<Upsells />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/audit" element={<AuditLogs />} />
      </Routes>
    </Layout>
  );
}
