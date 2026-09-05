import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import QuotationBuilder from './pages/QuotationBuilder';
import DealHealth from './pages/DealHealth';
import Approvals from './pages/Approvals';
import Fulfillment from './pages/Fulfillment';
import Subscriptions from './pages/Subscriptions';
import Negotiations from './pages/Negotiations';
import Login from './pages/Login';

function Sidebar({ onLogout }: { onLogout: () => void }) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'bg-zinc-800 text-white border-zinc-700' : 'text-zinc-400 hover:text-white hover:bg-zinc-900';

  return (
    <nav className="bg-[#111412] w-64 h-screen border-r border-zinc-800 flex flex-col p-6 shrink-0 sticky top-0 overflow-y-auto">
      <div className="text-2xl font-bold text-white mb-10">DealFlow360</div>
      <div className="flex flex-col gap-2 text-sm font-medium flex-1">
        <Link to="/" className={`px-4 py-3 rounded-md border border-transparent transition-colors ${isActive('/')}`}>Dashboard</Link>
        <Link to="/quotations" className={`px-4 py-3 rounded-md border border-transparent transition-colors ${isActive('/quotations')}`}>Quotations</Link>
        <Link to="/approvals" className={`px-4 py-3 rounded-md border border-transparent transition-colors ${isActive('/approvals')}`}>Approvals</Link>
        <Link to="/negotiations" className={`px-4 py-3 rounded-md border border-transparent transition-colors ${isActive('/negotiations')}`}>Negotiations</Link>
        
        <Link to="/fulfillment" className={`px-4 py-3 rounded-md border border-transparent transition-colors ${isActive('/fulfillment')}`}>Fulfillment</Link>
        <Link to="/subscriptions" className={`px-4 py-3 rounded-md border border-transparent transition-colors ${isActive('/subscriptions')}`}>Subscriptions</Link>
        <Link to="/deal-health" className={`px-4 py-3 rounded-md border border-transparent transition-colors ${isActive('/deal-health')}`}>Deal Health</Link>
      </div>
      
      <div className="mt-auto border-t border-zinc-800 pt-4">
        <button 
          onClick={onLogout}
          className="w-full text-left px-4 py-3 rounded-md text-zinc-400 hover:text-[#e57373] hover:bg-[#e57373]/10 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role: string) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-[#111412] text-zinc-300 font-sans overflow-hidden">
        <Sidebar onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/quotations" element={<QuotationBuilder />} />
              <Route path="/approvals" element={<Approvals />} />
              <Route path="/negotiations" element={<Negotiations />} />
              <Route path="/fulfillment" element={<Fulfillment />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/deal-health" element={<DealHealth />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
