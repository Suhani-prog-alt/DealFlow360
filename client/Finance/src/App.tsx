import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import InvoicesList from './pages/InvoicesList';
import BillingDetail from './pages/BillingDetail';
import DiscountApprovals from './pages/DiscountApprovals';
import SubscriptionsList from './pages/SubscriptionsList';
import HighRiskApprovals from './pages/HighRiskApprovals';
import WarehouseSplits from './pages/WarehouseSplits';

const AdminReporting = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/finance/revenue')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => {
        console.error("Error fetching revenue:", err);
        // Fallback dummy data if server is not running
        setData([
          { month: 'Jan', revenue: 4000, expenses: 2400 },
          { month: 'Feb', revenue: 3000, expenses: 1398 },
          { month: 'Mar', revenue: 2000, expenses: 9800 },
          { month: 'Apr', revenue: 2780, expenses: 3908 },
          { month: 'May', revenue: 1890, expenses: 4800 },
        ]);
      });
  }, []);

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Reporting</h1>
          <p className="text-gray-500 text-sm mt-1">Global revenue and performance analytics</p>
        </div>
        <button 
          onClick={() => alert("Downloading report...")}
          className="bg-[#4d6a45] hover:bg-[#5b7c52] text-white text-sm font-medium py-2 px-6 rounded transition-colors"
        >
          Download Report
        </button>
      </div>
      <div className="bg-[#141414] border border-[#222] rounded-lg p-6 h-96 flex items-center justify-center">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }} />
              <Legend />
              <Bar dataKey="revenue" fill="#4d6a45" />
              <Bar dataKey="expenses" fill="#e87040" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500">Loading analytics visualization...</p>
        )}
      </div>
    </div>
  );
};


import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/finance" replace />} />
        
        <Route path="/finance" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="invoices" element={<InvoicesList />} />
          <Route path="billing" element={<BillingDetail />} />
          <Route path="subscriptions" element={<SubscriptionsList />} />
          <Route path="reports" element={<AdminReporting />} />
          <Route path="discounts" element={<DiscountApprovals />} />
          <Route path="high-risk-approvals" element={<HighRiskApprovals />} />
          <Route path="warehouse-splits" element={<WarehouseSplits />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
