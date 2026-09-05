import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, FileSpreadsheet, Percent, Settings, FileBarChart } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', path: '/finance', icon: <LayoutDashboard size={18} /> },
    { name: 'Invoices', path: '/finance/invoices', icon: <FileText size={18} /> },
    { name: 'Billing', path: '/finance/billing', icon: <FileSpreadsheet size={18} /> },
    { name: 'Reports', path: '/finance/reports', icon: <FileBarChart size={18} /> },
    { name: 'Discount Approvals', path: '/finance/discounts', icon: <Percent size={18} /> },
  ];

  return (
    <div className="w-64 bg-[#0d0d0d] border-r border-[#222] text-white min-h-screen flex flex-col font-sans">
      <div className="p-6 pb-4">
        <h1 className="text-xl font-bold tracking-wide">DealFlow360</h1>
      </div>
      
      <nav className="flex-1 px-3 mt-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/finance');
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors text-sm ${
                isActive
                  ? 'bg-[#1a1a1a] text-white font-medium border border-[#333]'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#161616] border border-transparent'
              }`}
            >
              <span className={isActive ? 'text-gray-300' : 'text-gray-500'}>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-[#222]">
        <button className="flex items-center space-x-3 text-gray-500 hover:text-gray-300 px-3 py-2 w-full transition-colors text-sm">
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export const Layout = () => {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-gray-300 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
